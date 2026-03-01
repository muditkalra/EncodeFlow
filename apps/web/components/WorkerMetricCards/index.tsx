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

// Note: These are Redis-based live data Cards
export default function WorkerMetricCards() {
    const { data } = useWorkerMetrics();
    return (
        <div className="grid gap-x-1.5 gap-y-2 xl:gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-5">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <WorkerMetricCard Icon={<Server className='size-4' />} title='Active Workers' footer='Workers currently alive' value={data?.total} />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <WorkerMetricCard Icon={<Activity className='size-4 text-green-700' />} title='Running Workers' footer='Workers processing jobs' value={data?.running} />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <WorkerMetricCard Icon={<Pause className='size-4 text-gray-600 dark:text-gray-400' />} title='Idle Workers' footer='Available for new jobs' value={data?.idle} />
            </div>
            <div className="col-span-1 md:col-span-3 lg:col-span-1">
                <WorkerMetricCard Icon={<Cpu className='size-4 text-blue-700' />} title='Avg Cpu Usage' footer='Across all workers' value={formatToPercent(data?.cpu)} showPercentage />
            </div>
            <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
                <WorkerMetricCard Icon={<MemoryStick className='size-4 text-red-700' />} title='Avg Memory Usage' footer='Used vs Allocated memory' value={formatToPercent(data?.mem)} showPercentage />
            </div>
        </div>
    )
}
