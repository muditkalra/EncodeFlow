import { Format, JobStatus, VideoResolution } from "@repo/types";

export interface OutputConfigType {
    format: Format,
    resolution: VideoResolution,
    includeAudio: boolean
}

export type UploadState = "IDLE" | "FILE_SELECTED" | "FETCHINGURL" | "UPLOADING" | "PROCESSING" | "COMPLETED" | "FAILED";


export interface VideoDetail {
    duration: number;
    width: number;
    height: number;
}

export const jobStatusBadgeColor: Record<JobStatus, string> = {
    PENDING: "bg-transparent border-gray-500/60",
    COMPLETED: "bg-primary/40 border-primary",
    FAILED: "bg-red-500/40 border-red-500",
    PROCESSING: "bg-blue-700/40 border-blue-600"
}

// border, text-white/70, lowercase

