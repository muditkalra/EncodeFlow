"use client";

import useCpuMetrics from '@/hooks/useCpuMetrics';
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
    avg: {
        label: "Average",
        color: "oklch(0.5800 0.0750 220.00)",
    },
    max: {
        label: "Max",
        color: "oklch(0.6400 0.1150 30.00)",
    },
} satisfies ChartConfig;


export default function CpuChart({ range = "15m" }: { range?: TimeRanges }) {

    const { data } = useCpuMetrics(range);

    return (
        <TimeSeriesLineChart
            data={data?.data}
            chartConfig={chartConfig}
            title='Worker CPU Usage (%)'
            description={`Average and Max usage in last ${range}`}
            xAxisKey="timeStamp"
        />
    )
}
