export * from "./job";
export * from "./video";
export * from "./worker";

// here m:minutes, h:hours
export type TimeRanges = "15m" | "1h" | "6h" | "24h";
// timerange and their values in seconds
export const chartRangeMap: Record<string, number> = {
    "15m": 60 * 15,
    "1h": 60 * 60,
    "6h": 60 * 60 * 6,
    "24h": 60 * 60 * 24,
}


export type CpuMemChartData = {
    metric: "cpu" | "mem",
    unit: "%",
    data: { timeStamp: string, avg: number, max: number }[]
}
