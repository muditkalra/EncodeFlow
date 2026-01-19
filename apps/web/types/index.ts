import { JobStatus, JobType, VideoType } from "@repo/types";

export type UploadState = "IDLE" | "FILE_SELECTED" | "FETCHINGURL" | "UPLOADING" | "PROCESSING" | "COMPLETED" | "FAILED";


export interface VideoDetail {
    duration: number;
    width: number;
    height: number;
}

export const jobStatusBadgeColor: Record<JobStatus, string> = {
    PENDING: "bg-amber-50 text-amber-700 ring ring-amber-500 dark:bg-amber-950/30 dark:text-amber-500 dark:ring-amber-500",
    COMPLETED: "bg-green-50 text-green-700 ring ring-green-500 dark:bg-green-900/20 dark:text-green-500 dark:ring-green-400",
    FAILED: "bg-red-50 text-red-700 ring ring-red-500 dark:bg-red-950/20 dark:text-red-400 dark:ring-red-400",
    PROCESSING: "bg-blue-50 text-blue-700 ring ring-blue-500 dark:bg-blue-950/20 dark:text-blue-400 dark:ring-blue-400"
}

export type ColumnType = JobType & {
    video: VideoType
}
