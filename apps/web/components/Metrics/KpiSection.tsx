"use client";
import useKpiMetrics from '@/hooks/useKpiMetrics';
import { Skeleton } from '../ui/skeleton';
import KpiCard from './KpiCard';

export default function KpiSection() {
    const { data } = useKpiMetrics();

    if (!data) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className='h-32 w-full' />
                <Skeleton className='h-32 w-full' />
                <Skeleton className='h-32 w-full' />
                <Skeleton className='h-32 w-full' />
            </div>
        )
    }

    return (
        <div className="grid gap-2 grid-cols-6 xl:grid-cols-5">
            <div className="col-span-2 xl:col-span-1">
                <KpiCard
                    title="Throughput"
                    value={(data.throughput ?? 0).toFixed(2)}
                    unit="jobs/min"
                    description="Jobs processed per minute"
                />
            </div>
            <div className="col-span-2 xl:col-span-1">
                <KpiCard
                    title="Request Rate"
                    value={(data.requestRate ?? 0).toFixed(2)}
                    unit="req/min"
                    description="Handling request per minute"
                />
            </div>
            <div className="col-span-2 xl:col-span-1">
                <KpiCard
                    title="p95 Latency"
                    value={(data.latency ?? 0).toFixed(2)}
                    unit="ms"
                    description="95th percentile latency for api"
                />
            </div>
            <div className="col-span-3 xl:col-span-1">
                <KpiCard
                    title="Avg Encode Time"
                    value={(data.avgEncode ?? 0).toFixed(2)}
                    unit="s"
                    description="Average transcoding time"
                />
            </div>
            <div className="col-span-3 xl:col-span-1">
                <KpiCard
                    title="Error Rate"
                    value={(data.errorRate ?? 0).toFixed(2)}
                    unit="%"
                    description="Failed jobs ratio"
                />
            </div>
        </div>
    )
}
