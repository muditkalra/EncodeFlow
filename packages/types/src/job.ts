import { type Job, Status } from "@repo/db";

export interface ActiveJob {
    jobId: string,
    videoId: string,
    video: {
        name: string;
    }
    status: Status,
    progress: number,
    createdAt: string;
}

export type JobStatus = Status;

export type JobType = Job
