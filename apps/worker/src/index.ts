import "dotenv/config.js";
import { Worker } from "bullmq";
import { createClient, GetObjectCommand, PutObjectCommand } from "@repo/s3";
import { type VideoTask, resolutionMap } from "@repo/types";
import path from "path";
import { pipeline } from "stream/promises";
import fs from "fs";
import ffmpegPath from "ffmpeg-static";
import { spawn } from "child_process";

const redisUrl = process.env.REDIS_URL!;

// s3client;
const s3Client = createClient("ap-south-1");
const transcodedBucketName = process.env.AWS_S3_TRANSCODED_BUCKET_NAME!;

async function processVideo(job: { data: VideoTask }) {
    const { id, bucketName, fileName, targetResolution, videoId } = job.data;

    const dir = path.resolve("tmp");  // tmpv folder;
    await fs.promises.mkdir(dir, { recursive: true }); //ensures dir is created;

    const localInput = path.resolve("tmp", `${id}-input.mp4`);
    const localOutput = path.resolve("tmp", `${id}-output.mp4`);

    try {
        console.log(`[${id}] Starting job: ${bucketName}/${fileName} -> ${targetResolution}`);

        // 1. downloading from s3
        console.log(`[${id}] Downloading...`);
        const command = new GetObjectCommand({ Bucket: bucketName, Key: fileName });
        const s3Resp = await s3Client.send(command);

        // storing to local;
        if (!s3Resp.Body) throw new Error("file body is empty");
        await pipeline(s3Resp.Body as any, fs.createWriteStream(localInput));

        const stat = fs.statSync(localInput);
        console.log(`[${id}] File downloaded. Size: ${stat.size} bytes`);
        if (stat.size < 1000) {
            throw new Error("Downloaded file is not a valid video");
        }

        // 2. starting transcoding/processing;
        const scale = resolutionMap[targetResolution] || "1280x720";

        console.log(`[${id}] Transcoding to ${targetResolution}...`);
        await new Promise<void>((resolve, reject) => {
            if (!ffmpegPath) throw new Error("ffmpeg binary not found");

            const ffmpeg = spawn(ffmpegPath, [
                "-i", localInput,
                "-vf", `scale=${scale}`,
                "-c:v", "libx264",
                "-c:a", "aac",
                "-f", "mp4",
                localOutput
            ])

            ffmpeg.on("close", (code) => {
                if (code == 0) resolve();
                else reject(new Error(`FFmpeg exited with code ${code}`));
            });
        })

        // 3. uploading back to s3;
        console.log(`uploading transcoded file ${fileName}_${targetResolution} to s3 `);

        const outputKey = `${videoId}/${targetResolution}.mp4`;

        const fileStream = fs.createReadStream(localOutput);
        const uploadCmd = new PutObjectCommand({
            Bucket: transcodedBucketName,
            Key: outputKey,
            Body: fileStream,
            ContentType: "video/mp4"
        });
        await s3Client.send(uploadCmd);

        console.log(`Done: ${fileName}_${targetResolution}`);

        return { status: "completed", outputUrl: `s3://${transcodedBucketName}/${outputKey}` };
    } catch (error) {
        console.error(`[${id}] failed`, error);
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