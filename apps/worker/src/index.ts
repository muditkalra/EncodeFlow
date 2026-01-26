import { Worker } from "@repo/bullq";
import { prismaClient, Status } from "@repo/db";
import { GetObjectCommand, PutObjectCommand } from "@repo/s3";
import { formatDefaults, WorkerData, type VideoTask } from "@repo/types";
import { spawn } from "child_process";
import "dotenv/config.js";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import os from "os";
import path from "path";
import { pipeline } from "stream/promises";
import { transcodedBucketName } from "./config/constants";
import { createFFmpegArgs } from "./ffmpeg";
import { redisConnection, s3Client, calculateProgress } from "./utils";



async function startTranscodingDBNotify(jobId: string) {
    try {
        await prismaClient.job.update({
            where: { id: jobId },
            data: {
                status: Status.PROCESSING,
                startedAt: new Date(),
                progress: 1
            }
        })
    } catch (error) {
        throw new Error("failed to notify db");
    }
}

let currentJobId: string | null = null;

// Status of worker health;
const workerId = `worker:${os.hostname()}:${process.pid}`;
async function sendHeartBeat() {
    const cpuUsage = process.cpuUsage().user;
    const memUsageMB = process.memoryUsage().heapUsed / 1024 / 1024;

    const heartBeatData: WorkerData = {
        workerId,
        status: currentJobId ? "RUNNING" : "IDLE",
        currentJobId: currentJobId || "",
        cpu: cpuUsage,
        memoryUsed: memUsageMB,
        heartBeatAt: Date.now()
    }

    await redisConnection.hset(workerId, heartBeatData);
    //setting expiry for the worker-id
    await redisConnection.expire(workerId, 15); // 15s

    await redisConnection.sadd("known_workers", workerId);
}


// s3client;
// const s3Client = creates3Client("ap-south-1");

async function processVideo(job: { data: VideoTask }) {
    // here id is db-jobId and bullmq-id;
    const { id: dbJobId, bucketName, fileName, fileType, duration, outputConfig: { format, includeAudio, resolution } } = job.data;

    currentJobId = dbJobId;

    let lastProgress = 0; // storing last progress in memory, used for comparing progress.

    async function updateProgress(progress: number) {
        if (progress - lastProgress >= 5) {
            lastProgress = progress;
            try {
                await prismaClient.job.update({
                    where: { id: dbJobId },
                    data: { progress }
                })
            } catch (error) {
                throw new Error("failed to update progress to db");
            }
        }
    }

    const dir = path.resolve("tmp");  // tmp folder;
    try {
        await fs.promises.mkdir(dir, { recursive: true }); //ensures dir is created;
    } catch (error) {
        throw new Error("failed to created tmp folder");
    } finally {
        currentJobId = null;
    }

    const inputFileExtension = fileType.split("/")[1]; // ex- video/mp4, video/webm etc
    const outputFileExtension = formatDefaults[format].container;

    const localInput = path.resolve("tmp", `${dbJobId}-input.${inputFileExtension}`);
    const localOutput = path.resolve("tmp", `${dbJobId}-output.${outputFileExtension}`);

    try {
        console.log(`[${dbJobId}] Starting job: ${bucketName}/${fileName} for config -> ${JSON.stringify({ format, includeAudio, resolution })}`);

        // downloading from s3
        console.log(`[${dbJobId}] Downloading file...`);
        const command = new GetObjectCommand({ Bucket: bucketName, Key: fileName });
        const s3Resp = await s3Client.send(command);

        // storing to local;
        if (!s3Resp.Body) throw new Error("file body is empty");
        await pipeline(s3Resp.Body as any, fs.createWriteStream(localInput));

        const stat = fs.statSync(localInput);
        console.log(`[${dbJobId}] File downloaded. Size: ${stat.size} bytes`);
        if (stat.size < 1000) {
            throw new Error("Downloaded file is not a valid video");
        }


        // transcoding
        console.log(`[${dbJobId}] Transcoding ...`);
        await startTranscodingDBNotify(dbJobId); // db notify --> processing started;

        await new Promise<void>((resolve, reject) => {
            if (!ffmpegPath) throw new Error("ffmpeg binary not found");

            const args = createFFmpegArgs(localInput, { format, includeAudio, resolution }, localOutput);
            const ffmpeg = spawn(ffmpegPath, args);

            ffmpeg.stderr.on("data", async (chunk) => {
                // "---------logs from ffmpeg----------";
                const lines = chunk.toString().split('\n');

                for (const line of lines) {
                    if (line.startsWith("out_time_ms")) {
                        const outTimeMs = Number(line.split("=")[1]);
                        if (!Number.isNaN(outTimeMs)) {
                            const progress = calculateProgress(outTimeMs, duration);
                            console.log(progress, "% progress");
                            await updateProgress(progress); // updating progress to db rn, thinking to throttle more or switching to redis alltogether;
                        }
                    }
                }

            })

            ffmpeg.on("close", (code) => {
                if (code == 0) resolve();
                else reject(new Error(`FFmpeg exited with code ${code}`));
            });
        })

        // uploading back to s3;
        console.log(`uploading transcoded file ${dbJobId}_${fileName}_${resolution} to s3 `);

        const outputKey = `${dbJobId}.${outputFileExtension}`;

        const fileStream = fs.createReadStream(localOutput);
        const uploadCmd = new PutObjectCommand({
            Bucket: transcodedBucketName,
            Key: outputKey,
            Body: fileStream,
            ContentType: `video/${format}`
        });
        await s3Client.send(uploadCmd);

        console.log(`Done: ${dbJobId}_${fileName}_${resolution}`);

        const outputUrl = `s3://${transcodedBucketName}/${outputKey}`;

        const outputSize = (await fs.promises.stat(localOutput)).size;

        await prismaClient.job.update({
            where: { id: dbJobId },
            data: {
                status: Status.COMPLETED,
                finishedAt: new Date(),
                progress: 100,
                outputSize,
                outputUrl,
            }
        })

        return { status: "completed" };
    } catch (error) {
        console.error(`[${dbJobId}] failed`, error);

        if (error instanceof Error) {
            const isFatal = error.message.includes("file body is empty")
                || error.message.includes("not a valid video");

            if (isFatal) { // no point of retry if these error
                await prismaClient.job.update({
                    where: { id: dbJobId },
                    data: {
                        status: Status.FAILED,
                        finishedAt: new Date(),
                        errorMessage: error instanceof Error ? error.message : "Unknown Error"
                    }
                });
                return;
            }
        }
        throw error;
    } finally {
        if (fs.existsSync(localInput)) {
            fs.unlinkSync(localInput);
            console.log("unlinked input file");
        };
        if (fs.existsSync(localOutput)) {
            fs.unlinkSync(localOutput);
            console.log("unlinked output file");
        };
        currentJobId = null;
    }
}


const worker = new Worker("transcoding-q", processVideo, {
    connection: redisConnection.options
});

setInterval(sendHeartBeat, 5000);

console.log("worker running ...");
