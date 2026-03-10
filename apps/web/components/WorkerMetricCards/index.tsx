"use client";
import useWorkerMetrics from '@/hooks/useWorkerMetrics';
import { cn } from '@/lib/utils';
import { formatToPercent } from '@/utils';
import { Activity, Cpu, MemoryStick, Pause, Server } from 'lucide-react';
import WorkerMetricCard from './WorkerMetricCard';

// const data = {
//     total: 5,
//     running: 2,
//     idle: 3,
//     cpu: 1.8,
//     mem: 12,
//     depth: 2
// }

// Note: These are Redis-based live data Cards
export default function WorkerMetricCards({ view }: { view?: "home" | "worker" }) {
    const { data } = useWorkerMetrics();
    return (
        <div className={cn("grid gap-2 grid-cols-2 sm:grid-cols-3 xl:grid-cols-6", view == "home" && "sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5")}>
            <div>
                <WorkerMetricCard Icon={<Server className='size-4' />} title='Total Workers' footer='Workers currently alive' value={data?.total} />
            </div>
            <div >
                <WorkerMetricCard Icon={<Activity className='size-4 text-green-700' />} title='Running Workers' footer='Workers processing jobs' value={data?.running} />
            </div>
            <div className={view == "home" ? "hidden" : ""}>
                <WorkerMetricCard Icon={<Pause className='size-4 text-gray-600 dark:text-gray-400' />} title='Idle Workers' footer='Available for new jobs' value={data?.idle} />
            </div>
            <div>
                <WorkerMetricCard Icon={<Cpu className='size-4 text-blue-700' />} title='Avg Cpu Usage' footer='Across all workers' value={formatToPercent(data?.cpu)} showPercentage />
            </div>
            <div>
                <WorkerMetricCard Icon={<MemoryStick className='size-4 text-red-700' />} title='Avg Memory Usage' footer='Used vs Allocated memory' value={formatToPercent(data?.mem)} showPercentage />
            </div>
            <div className={view == "home" ? "col-span-2 lg:col-span-1" : ""}>
                <WorkerMetricCard Icon={<MemoryStick className='size-4 text-red-700' />} title='Queue depth' footer='Jobs waiting in Queue' value={data?.depth} />
            </div>
        </div>
    )
}
