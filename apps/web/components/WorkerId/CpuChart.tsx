"use client";

import useWorkerCpuMetrics from '@/hooks/useWorkerCpuMetrics';
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
        label: "CPU",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;


export default function CpuChart({ wid }: { wid: string }) {

    const { data } = useWorkerCpuMetrics(wid);

    return (
        <TimeSeriesLineChart
            data={data?.data}
            chartConfig={chartConfig}
            title="CPU Usage"
            description='% utilization over the interval'
            xAxisKey="timeStamp"
        />
    )
}
