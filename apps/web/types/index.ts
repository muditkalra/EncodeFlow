import { JobStatus, JobType, VideoType, WorkerJobStage, WorkerStatus } from "@repo/types";

export type UploadState = "IDLE" | "FILE_SELECTED" | "FETCHINGURL" | "UPLOADING" | "PROCESSING" | "COMPLETED" | "FAILED";


export interface VideoDetail {
    duration: number;
    width: number;
    height: number;
}

export type BadgeKeys = JobStatus | Lowercase<WorkerStatus> | WorkerJobStage;

export const badgeColors: Record<BadgeKeys, string> = {
    pending: "bg-gray-100 text-gray-700 ring ring-gray-500 dark:bg-gray-900/20 dark:text-gray-300/80 dark:ring-gray-400",
    processing: "bg-blue-100 text-blue-800 ring ring-blue-600 dark:bg-blue-950/20 dark:text-blue-400 dark:ring-blue-400",
    completed: "bg-green-100 text-green-700 ring ring-green-600 dark:bg-green-900/20 dark:text-green-500 dark:ring-green-400",
    failed: "bg-red-100 text-red-800 ring ring-red-600 dark:bg-red-950/20 dark:text-red-400 dark:ring-red-400",
    idle: "bg-gray-100 text-gray-700 ring ring-gray-500 dark:bg-gray-900/40 dark:text-gray-300/80 dark:ring-gray-500",
    running: "bg-green-100 text-green-700 ring ring-green-600 dark:bg-green-900/20 dark:text-green-500 dark:ring-green-400",
    downloading: "bg-cyan-50 text-cyan-800 ring ring-cyan-600 dark:bg-cyan-800/30 dark:text-cyan-500 dark:ring-cyan-600",
    transcoding: "bg-amber-100 text-amber-700 ring ring-amber-600 dark:bg-amber-950/30 dark:text-amber-400 dark:ring-amber-500",
    uploading: "bg-violet-50 text-violet-700 ring ring-violet-600 dark:bg-violet-900/10 dark:text-violet-400 dark:ring-violet-400"
}

export type JobsColumnType = JobType & {
    video: VideoType
}
