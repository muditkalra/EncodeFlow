import { chartRangeMap } from "@repo/types";

// start,end,step
export const parseRange = (range: string) => {
    const end = Math.floor(Date.now() / 1000);

    const duration = chartRangeMap[range] || 60 * 60; // default: 1h

    const start = end - duration;
    
    const step = duration <= 3600 ? "15s" : duration <= 21600 ? "30s" : "60s";

    return { start, end, step };
}


export const mergeSeries = (avgSeries: any, maxSeries: any, avgKey: string, maxKey: string) => {
    const avgValues = avgSeries[0]?.values || [];
    const maxValues = maxSeries[0]?.values || [];

    return avgValues.map((point: [number, string], i: number) => ({
        timeStamp: point[0],
        [avgKey]: parseFloat(point[1]),
        [maxKey]: parseFloat(maxValues[i][1])
    }))

}