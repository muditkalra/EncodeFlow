
export type VideoResolution = "1080p" | "720p" | "480p" | "360p";
export const videoResolutions: VideoResolution[] = ["1080p", "720p", "480p", "360p"];


export type Format = "mp4" | "webm" | "av1";
export const formats: Format[] = ["mp4", "webm", "av1"];


export interface VideoTask {
    id: string;
    videoId: string;
    userId: string;
    bucketName: string;
    fileName: string;
    targetResolution: VideoResolution;
    status: "pending" | "processing" | "completed" | "failed";
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
export interface TranscodeJobBody {
    fileName: string;
    config: OutputConfig
};