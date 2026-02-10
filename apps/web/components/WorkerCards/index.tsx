"use client";
import useWorkerMetrics from '@/hooks/useWorkerMetrics';
import { formatToPercent } from '@/utils';
import { Activity, Cpu, MemoryStick, Pause, Server } from 'lucide-react';
import WorkerCard from './WorkerCard';

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
            <WorkerCard Icon={<Server className='size-4' />} title='Total Workers' footer='Currently active' value={data?.total} />
            <WorkerCard Icon={<Activity className='size-4 text-green-700' />} title='Running Workers' footer='Workers processing jobs' value={data?.running} />
            <WorkerCard Icon={<Pause className='size-4 text-amber-700' />} title='Idle Workers' footer='Available for new jobs' value={data?.idle} />
            <WorkerCard Icon={<Cpu className='size-4 text-blue-700' />} title='Avg Cpu Usage' footer='Across all workers' value={formatToPercent(data?.cpu)} showPercentage />
            <WorkerCard Icon={<MemoryStick className='size-4 text-red-700' />} title='Avg Memory Usage' footer='Used vs Allocated memory' value={formatToPercent(data?.mem)} showPercentage />
        </div>
    )
}
