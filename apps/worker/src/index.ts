import { Worker } from "@repo/bullq";
import { prismaClient } from "@repo/db";
import { GetObjectCommand, PutObjectCommand } from "@repo/s3";
import { formatDefaults, type VideoTask } from "@repo/types";
import { spawn } from "child_process";
import dotenv from "dotenv";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import os from "os";
import path from "path";
import { pipeline } from "stream/promises";
import { transcodedBucketName } from "./config/constants";
import { recordJobData } from "./metrics/jobMetrics";
import { startMetricServer } from "./server";
import { DBService } from "./Services/db";
import { WorkerHeartbeat } from "./Services/monitor";
import { calculateProgress, createFFmpegArgs, redisConnection, s3Client } from "./utils";
dotenv.config();


const workerId = `worker:${os.hostname()}`;

// worker monitor service, dbService;
const workerMonitor = new WorkerHeartbeat(workerId, 10 * 1000);
const dbService = new DBService(prismaClient);

async function processVideo(job: { data: VideoTask }) {
    const start = Date.now();
    // here id is db-jobId and bullmq-id;
    const { id: dbJobId, bucketName, fileName, fileType, duration, outputConfig: { format, includeAudio, resolution } } = job.data;

    workerMonitor.setCurrentJobId(dbJobId);

    let lastProgress = 0; // storing last progress in memory, used for comparing progress.

    async function updateProgress(progress: number) {
        if (progress - lastProgress < 5) {
            return;
        }
        await dbService.updateProgess(progress, dbJobId);
        lastProgress = progress;
    }

    const dir = path.resolve("tmp");  // tmp folder;
    try {
        await fs.promises.mkdir(dir, { recursive: true }); //ensures dir is created;
    } catch (error) {
        workerMonitor.setCurrentJobId(null);
        workerMonitor.setJobStage(null);
        throw new Error("failed to created tmp folder");
    }

    const inputFileExtension = fileType.split("/")[1]; // ex- video/mp4, video/webm etc
    const outputFileExtension = formatDefaults[format].container;

    const localInput = path.resolve("tmp", `${dbJobId}-input.${inputFileExtension}`);
    const localOutput = path.resolve("tmp", `${dbJobId}-output.${outputFileExtension}`);

    try {
        console.log(`[${dbJobId}] Starting job: ${bucketName}/${fileName} for config -> ${JSON.stringify({ format, includeAudio, resolution })}`);

        // downloading from s3
        workerMonitor.setJobStage("downloading");
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
        workerMonitor.setJobStage("transcoding");
        console.log(`[${dbJobId}] Transcoding ...`);
        // db notify --> processing started;
        await dbService.startTranscoding(dbJobId);

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
        workerMonitor.setJobStage("uploading");
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

        recordJobData(workerId, (Date.now() - start) / 1000, "success"); // updating data for prom;
        // notifying db status --> completed
        await dbService.completedTranscoding(dbJobId, outputSize, outputUrl);
        return { status: "completed" };
    } catch (error) {
        console.error(`[${dbJobId}] failed`, error);
        recordJobData(workerId, (Date.now() - start) / 1000, "failed");

        if (error instanceof Error) {
            const isFatal = error.message.includes("file body is empty")
                || error.message.includes("not a valid video");

            if (isFatal) { // no point of retry if these error
                await dbService.failedJob(dbJobId, error.message);
                return {};
            }            
            throw error;
        }
        throw new Error("Unknown Error");
    } finally {
        if (fs.existsSync(localInput)) {
            fs.unlinkSync(localInput);
            console.log("unlinked input file");
        };
        if (fs.existsSync(localOutput)) {
            fs.unlinkSync(localOutput);
            console.log("unlinked output file");
        };
        workerMonitor.setCurrentJobId(null);
        workerMonitor.setJobStage(null);
    }
}


startMetricServer();
const worker = new Worker("transcoding-q", processVideo, { connection: redisConnection.options });

console.log("worker running ...");