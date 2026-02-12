"use client";
import useWorkerMetrics from '@/hooks/useWorkerMetrics';
import { formatToPercent } from '@/utils';
import { Activity, Cpu, MemoryStick, Pause, Server } from 'lucide-react';
import WorkerMetricCard from './WorkerMetricCard';

// const data = {
//     total: 5,
//     running: 2,
//     idle: 3,
//     cpu: 1.8,
//     mem: 12
// }

export default function WorkerCards() {
    const { data } = useWorkerMetrics();
    return (
        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            <WorkerMetricCard Icon={<Server className='size-4' />} title='Active Workers' footer='Workers currently alive' value={data?.total} />
            <WorkerMetricCard Icon={<Activity className='size-4 text-green-700' />} title='Running Workers' footer='Workers processing jobs' value={data?.running} />
            <WorkerMetricCard Icon={<Pause className='size-4 text-amber-700' />} title='Idle Workers' footer='Available for new jobs' value={data?.idle} />
            <WorkerMetricCard Icon={<Cpu className='size-4 text-blue-700' />} title='Avg Cpu Usage' footer='Across all workers' value={formatToPercent(data?.cpu)} showPercentage />
            <WorkerMetricCard Icon={<MemoryStick className='size-4 text-red-700' />} title='Avg Memory Usage' footer='Used vs Allocated memory' value={formatToPercent(data?.mem)} showPercentage />
        </div>
    )
}
