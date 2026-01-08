import { createClient, GetObjectCommand, PutObjectCommand } from "@repo/s3";
import { type VideoTask } from "@repo/types";
import { Worker } from "bullmq";
import { spawn } from "child_process";
import "dotenv/config.js";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { createFFmpegArgs } from "./ffmpeg";
import { redisUrl, transcodedBucketName } from "./confit/constants.";


function calculateProgress(outTimeMs: number, duration: number) {
    if (duration <= 0 || outTimeMs <= 0) return 0;

    // const percentage = Math.floor();

}



// s3client;
const s3Client = createClient("ap-south-1");

async function processVideo(job: { data: VideoTask }) {
    // here id is db-jobId, not just bullmq-id;
    const { id: dbJobId, bucketName, fileName, fileType, duration, outputConfig: { format, includeAudio, resolution }, videoId } = job.data;

    let lastProgress = 0; // stores last progress in memory, used for comparing progress.

    // async function updateProgress(params:type) {

    // }

    const dir = path.resolve("tmp");  // tmp folder;
    await fs.promises.mkdir(dir, { recursive: true }); //ensures dir is created;

    const inputFileExtension = fileType.split("/")[1]; // ex- video/mp4, video/webm etc
    const outputFileExtension = format == "av1" ? 'mp4' : format; // av1 uses mp4 file extension;

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
        await new Promise<void>((resolve, reject) => {
            if (!ffmpegPath) throw new Error("ffmpeg binary not found");

            const args = createFFmpegArgs(localInput, { format, includeAudio, resolution }, localOutput);
            const ffmpeg = spawn(ffmpegPath, args);

            ffmpeg.stderr.on("data", async (chunk) => {
                console.log(chunk.toString(), "---------logs from ffmpeg----------");
                // const lines = chunk.toString().split('\n');

                // for (const line of lines) {
                //     if (line.startsWith("out_time_ms")) {
                //         const outTimeMs = Number(line.split("=")[1]);
                //         if (!Number.isNaN(outTimeMs)) {
                //             // const progress = 
                //         }
                //     }
                // }

            })

            ffmpeg.on("close", (code) => {
                if (code == 0) resolve();
                else reject(new Error(`FFmpeg exited with code ${code}`));
            });
        })

        // uploading back to s3;
        console.log(`uploading transcoded file ${dbJobId}_${fileName}_${resolution} to s3 `);

        const outputKey = `${dbJobId}.${format}`;

        const fileStream = fs.createReadStream(localOutput);
        const uploadCmd = new PutObjectCommand({
            Bucket: transcodedBucketName,
            Key: outputKey,
            Body: fileStream,
            ContentType: `video/${format}`
        });
        await s3Client.send(uploadCmd);

        console.log(`Done: ${dbJobId}_${fileName}_${resolution}`);

        return { status: "completed", outputUrl: `s3://${transcodedBucketName}/${outputKey}` };
    } catch (error) {
        console.error(`[${dbJobId}] failed`, error);
        throw Error;
    } finally {
        if (fs.existsSync(localInput)) {
            fs.unlinkSync(localInput);
            console.log("unlinked input file");
        };
        if (fs.existsSync(localOutput)) {
            fs.unlinkSync(localOutput);
            console.log("unlinked output file");
        };
    }
}


const worker = new Worker("transcoding-q", processVideo, {
    connection: {
        url: redisUrl,
    }
});

console.log("worker running ...");