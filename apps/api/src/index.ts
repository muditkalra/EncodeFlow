import { createQueue } from "@repo/bullq";
import { createClient, getSignedUrl, HeadObjectCommand, PutObjectCommand } from "@repo/s3";
import { type TranscodeJobBody, videoResolutions, type VideoTask } from "@repo/types";
import cors from "cors";
import "dotenv/config.js";
import express, { Request, Response } from "express";
import { awsS3Region, awsS3TempBucketName, redisUrl } from "./config/constants";
import { prismaClient } from "@repo/db";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now()
    });
    return;
});

const s3Client = createClient(awsS3Region);
const videoQueue = createQueue("transcoding-q", redisUrl);


// 1. frontend call this to get signed url to put objects in s3;
// - assuming url will look like this, /upload-url?video-title=xyz&format=video/mp4
app.get("/upload-url", async (req: Request, res: Response) => {
    try {
        const fileName = req.query["video-title"];
        const format = req.query["format"];

        if (!fileName || !format) {
            return res.status(500).json({ message: "Cannot Create url without video-title or format" });
        }

        const command = new PutObjectCommand({
            Bucket: awsS3TempBucketName,
            Key: `${fileName}`,
            ContentType: `${format}`
        })

        const url = await getSignedUrl(s3Client, command, { expiresIn: 300 }); // expires in 5min

        res.json({
            url,
            fileName
        })
        return;
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to generate upload url" });
    }
})



// 2. frontend calls this to after putting objects to providing details about file and other things and will trigger transcoding for a particular file;
app.post("/transcode", async (req: Request, res: Response) => {
    try {
        const { outputConfig, ...data } = req.body as TranscodeJobBody;

        // checking if file exist or not;
        const command = new HeadObjectCommand({ Bucket: awsS3TempBucketName, Key: data.fileName });
        await s3Client.send(command); // if not found will throw error;

        // creating video entry in db;
        // const videoId = crypto.randomUUID(); // need to replace with actual db id;
        const orgUrl = `s3://${awsS3TempBucketName}/${data.fileName}`
        const video = await prismaClient.video.create({
            data: {
                name: data.fileName,
                userId: data.userId,
                fileType: data.fileType,
                size: data.size,
                duration: data.duration,
                width: data.width,
                height: data.height,
                originalUrl: orgUrl,
            },
        });

        const job = await prismaClient.job.create({
            data: {
                videoId: video.id,
                outputConfig: JSON.stringify(outputConfig)
            }
        });

        const videoTask: VideoTask = {
            id: job.id,
            videoId: video.id,
            fileType: video.fileType,
            duration: video.duration,
            fileName: data.fileName,
            bucketName: awsS3TempBucketName,
            outputConfig: outputConfig
        }

        await videoQueue.add("transcode", videoTask)

        // multiple format jobs queue;
        // for (const resolution of videoResolutions) {  // all the possible formats
        //     const jobId = `${fileName}_${resolution}`;
        //     const job: VideoTask = {
        //         id: jobId,
        //         videoId,
        //         userId: "user-123",
        //         bucketName: awsS3TempBucketName,
        //         fileName,
        //         status: "pending",
        //         targetResolution: resolution
        //     }
        //     const task = {
        //         name: "transcode",
        //         data: job,
        //     }
        //     tasks.push(task);
        // }
        // await videoQueue.addBulk(tasks);

        return res.status(200).json({
            message: "Transcoding started",
            videoId: video.id,
            jobId: job.id,
            config: outputConfig
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to start transcoding" });
    }
})


const start = () => {
    try {
        app.listen(port, () => {
            console.log(`api-service are running on: http://localhost:${port}`)
        })
    } catch (error) {
        s3Client.destroy();
        console.log(error);
        process.exit(1);
    }
};

start();