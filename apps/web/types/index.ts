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

export const jobStatusVariantMap: Record<JobStatus, string> = {
    PENDING: "bg-gray-500",
    COMPLETED: "",
    FAILED: "bg-red-500",
    PROCESSING: "bg-blue-700"
}

