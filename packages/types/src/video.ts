
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
}