import { type Job, Status } from "@repo/db";

// used for sending active-jobs from be to fe in progress-table(upload-videpo page)
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
