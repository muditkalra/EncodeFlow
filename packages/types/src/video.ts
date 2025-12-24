
export type VideoFormat = "1080p" | "720p" | "480p" | "360p";

export const videoFormats: VideoFormat[] = ["1080p", "720p", "480p", "360p"];

export interface VideoTask {
    id: string;
    videoId: string;
    userId: string;
    bucketName: string;
    fileName: string;
    targetFormat: VideoFormat;
    status: "pending" | "processing" | "completed" | "failed";
};

export const resolutionMap: Record<VideoFormat, string> = {
    "1080p": "1920x1080",
    "720p": "1280x720",
    "480p": "854x480",
    "360p": "640x360"
}