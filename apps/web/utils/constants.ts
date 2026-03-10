import { OutputConfigType } from "@repo/types";

export const MAX_FILE_SIZE = 35 * 1024 * 1024 // 35MB

export const API_URL = process.env.NEXT_PUBLIC_API_URL!;


export const defaultOutputConfig: OutputConfigType = {
    format: "mp4",
    resolution: "1080p",
    includeAudio: true,
}

export const workerDefaults = {
    maxConcurrent: 4,
    retryCount: 2,
    jobTimeout: 20,
    workerheartbeat: 15
}

export const storageDefaults = {
    autoDelete: "Yes",
    retentionPeriod: "7 days",
    maxSize: 2
}