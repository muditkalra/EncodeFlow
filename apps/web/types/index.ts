import { Format, VideoResolution } from "@repo/types";

export interface OutputConfigType {
    format: Format,
    resolution: VideoResolution,
    includeAudio: boolean
}

export type UploadState = "IDLE" | "FILE_SELECTED" | "UPLOADING" | "PROCESSING" | "COMPLETED" | "FAILED";
