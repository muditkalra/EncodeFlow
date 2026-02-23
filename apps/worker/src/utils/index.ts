export * from "./createClient";
export * from "./ffmpeg";

export function calculateProgress(outTimeMs: number, duration: number): number {
    if (duration <= 0 || outTimeMs <= 0) return 0;

    const outTime = outTimeMs / 1000000 // converting to seconds
    const percentage = Math.floor((outTime / duration) * 100);
    return Math.min(percentage, 99)
}