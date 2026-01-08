
export type VideoResolution = "1080p" | "720p" | "480p" | "360p";
export const videoResolutions: VideoResolution[] = ["1080p", "720p", "480p", "360p"];


export type Format = "mp4" | "webm" | "av1";
export const formats: Format[] = ["mp4", "webm", "av1"];

export const formatDefaults: Record<Format, { video: string, audio: string }> = {
    mp4: { video: 'libx264', audio: 'aac' },
    webm: { video: 'libvpx-vp9', audio: 'libopus' },
    av1: { video: 'libaom-av1', audio: 'libopus' },
};

// used for sending data from api-server to workers(queue).
export interface VideoTask {
    id: string;
    videoId: string;
    fileType: string;
    duration: number;
    bucketName: string;
    fileName: string;
    outputConfig: OutputConfig
};

export const resolutionMap: Record<VideoResolution, string> = {
    "1080p": "1920x1080",
    "720p": "1280x720",
    "480p": "854x480",
    "360p": "640x360"
}


export interface OutputConfig {
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
    outputConfig: OutputConfig
};