import { type Video } from "@repo/db";

export type VideoResolution = "1080p" | "720p" | "480p" | "360p";
export const videoResolutions: VideoResolution[] = ["1080p", "720p", "480p", "360p"];


export type Format = "mp4" | "webm" | "hevc";
export const formats: Format[] = ["mp4", "webm", "hevc"];

export const formatDefaults: Record<Format, { video: string, audio: string, container: string }> = {
    mp4: { video: 'libx264', audio: 'aac', container: "mp4" },
    webm: { video: 'libvpx-vp9', audio: 'libopus', container: "webm" },
    hevc: { video: 'libx265', audio: 'aac', container: "mp4" },
};

// used for sending data from api-server to workers(queue).
export interface VideoTask {
    id: string;
    videoId: string;
    fileType: string;
    duration: number;
    bucketName: string;
    fileName: string;
    outputConfig: OutputConfigType
};

export const resolutionMap: Record<VideoResolution, string> = {
    "1080p": "1920x1080",
    "720p": "1280x720",
    "480p": "854x480",
    "360p": "640x360"
}


export interface OutputConfigType {
    format: Format;
    resolution: VideoResolution;
    includeAudio: boolean;
};

// used to send data from frontend to backend
export interface TranscodeJobBody {
    fileName: string;
    userId: string;
    fileType: string;
    size: number;
    duration: number;
    width: number;
    height: number;
    outputConfig: OutputConfigType
};

export type VideoType = Video;