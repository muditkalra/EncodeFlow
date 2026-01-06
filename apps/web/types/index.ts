import { Format, VideoResolution } from "@repo/types";

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