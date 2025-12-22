
export type VideoFormats = "1080p" | "720p" | "480p";

export interface VideoTask {
    id: string;
    userId: string;
    originalUrl: string;
    targetFormat: VideoFormats;
    status: "pending" | "processing" | "completed" | "failed";
}