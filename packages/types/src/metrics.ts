// here m:minutes, h:hours
export type TimeRanges = "15m" | "1h" | "6h" | "24h";
export const timeRanges: TimeRanges[] = ["15m", "1h", "6h", "24h"];
// timerange and their values in seconds
export const chartRangeMap: Record<string, number> = {
    "15m": 60 * 15,
    "1h": 60 * 60,
    "6h": 60 * 60 * 6,
    "24h": 60 * 60 * 24,
}

export type ChartData = {
    timeStamp: string;
    avg: number;
    max: number;
};

export type globalChartData = {
    metric: "cpu" | "mem";
    unit: "%"
    data: ChartData[];
};

export type KpiData = {
    throughput: number, // jobs processed per minute
    requestRate: number, // request rate per minute
    avgEncode: number, // avg encoding time
    latency: number, // p95 latency in ms
    errorRate: number
}