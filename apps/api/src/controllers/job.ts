import { prismaClient } from "@repo/db";
import { HeadObjectCommand } from "@repo/s3";
import { JobMetricData, JobMetricStatus, TranscodeJobBody, VideoTask } from "@repo/types";
import { Request, Response } from "express";
import { awsS3TempBucketName } from "../config/constants";
import { s3Client, videoQueue } from "../utils";
import { jobCreatedTotal } from "../metrics";

// create a new job, right now create a new entry in video and job, push a new job to queue
export const createJob = async (req: Request, res: Response) => {
    try {
        const { outputConfig, ...data } = req.body as TranscodeJobBody;

        // checking if file exist or not;
        const command = new HeadObjectCommand({ Bucket: awsS3TempBucketName, Key: data.fileName });
        await s3Client.send(command); // if not found will throw error;

        // creating video entry in db;
        const originalUrl = `s3://${awsS3TempBucketName}/${data.fileName}`
        const video = await prismaClient.video.create({
            data: {
                name: data.fileName,
                userId: data.userId,
                fileType: data.fileType,
                size: data.size,
                duration: data.duration,
                width: data.width,
                height: data.height,
                originalUrl,
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

        await videoQueue.add("transcode", videoTask, { jobId: job.id });

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

        jobCreatedTotal.inc({
            format: outputConfig.format,
            resolution: outputConfig.resolution,
            includeAudio: String(outputConfig.includeAudio)
        });

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
}


// active jobs(status -> pending or processing) and jobs which got completed and failed in last with 2 min;
export const getActiveJobs = async (req: Request, res: Response) => {
    try {
        // find all the jobs which are 
        let twoMinutesAgo = new Date();
        twoMinutesAgo.setMinutes(twoMinutesAgo.getMinutes() - 2);

        const result = await prismaClient.job.findMany({
            where: {
                OR: [
                    {
                        status: {
                            in: ["PROCESSING", "PENDING"]
                        }
                    },
                    {
                        AND: [
                            {
                                status: {
                                    in: ["COMPLETED", "FAILED"]
                                }
                            },
                            {
                                finishedAt: {
                                    gte: twoMinutesAgo
                                }
                            }
                        ]
                    }
                ]
            },
            select: {
                id: true,
                videoId: true,
                progress: true,
                status: true,
                createdAt: true,
                video: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error });
    }
}


export const getRecentJobs = async (req: Request, res: Response) => {
    try {
        // find last 10 jobs
        const result = await prismaClient.job.findMany({
            orderBy: {
                createdAt: "desc"
            },
            take: 10,
            select: {
                id: true,
                status: true,
                progress: true,
                startedAt: true,
                finishedAt: true,
                createdAt: true,
                video: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error });
    }
}

// gives count of jobs based on their status;
export const getMetricData = async (req: Request, res: Response) => {
    try {
        const statusCounts = await prismaClient.job.groupBy({
            by: ["status"],
            _count: {
                status: true
            }
        });

        const jobMetricsData: JobMetricData = {
            total: 0,
            completed: 0,
            processing: 0,
            pending: 0,
            failed: 0
        };

        statusCounts.forEach((statusCount) => {
            const count = Number(statusCount._count.status);
            const status = statusCount.status.toLowerCase() as JobMetricStatus;
            jobMetricsData[status] += count;
            jobMetricsData.total += count;
        });

        return res.status(200).json(jobMetricsData);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

// give all jobs with their video-details as well
export const getAllJobs = async (req: Request, res: Response) => {
    try {
        const alljobs = await prismaClient.job.findMany({
            include: {
                video: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return res.status(200).json(alljobs);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}