"use client";

import useWorkerMemMetrics from '@/hooks/useWorkerMemMetrics';
import { type TimeRanges } from '@repo/types';
import { TimeSeriesLineChart } from '../LineChart';
import { ChartConfig } from '../ui/chart';

// const data = [
//     {
//         "timeStamp": "1772276356",
//         "avg": 14.178848266601562,
//         "max": 19.537353515625
//     },
//     {
//         "timeStamp": "1772276416",
//         "avg": 14.402389526367188,
//         "max": 19.57855224609375
//     },
//     {
//         "timeStamp": "1772276476",
//         "avg": 14.454269409179688,
//         "max": 19.622039794921875
//     },
//     {
//         "timeStamp": "1772276536",
//         "avg": 14.475250244140625,
//         "max": 19.7052001953125
//     }
// ]

const chartConfig = {
    value: {
        label: "Memory",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;


export default function MemChart({ wid, range = "15m" }: { wid: string, range: TimeRanges }) {

    const { data } = useWorkerMemMetrics(wid, range);

    return (
        <TimeSeriesLineChart
            data={data?.data}
            chartConfig={chartConfig}
            title="Memory Usage"
            description={`% utilization in the last ${range}`}
            xAxisKey="timeStamp"
        />
    )
}