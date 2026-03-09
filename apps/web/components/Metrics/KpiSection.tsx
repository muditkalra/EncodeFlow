"use client";
import React from 'react'
import KpiCard from './KpiCard'
import useKpiMetrics from '@/hooks/useKpiMetrics'
import { Skeleton } from '../ui/skeleton';

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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <KpiCard
                title="Throughput"
                value={(data.throughput ?? 0).toFixed(2)}
                unit="jobs/min"
                description="Jobs processed per minute"
            />
            <KpiCard
                title="Request Rate"
                value={(data.requestRate ?? 0).toFixed(2)}
                unit="req/min"
                description="request per minute"
            />
            <KpiCard
                title="p95 Latency"
                value={(data.latency ?? 0).toFixed(2)}
                unit="ms"
                description="95th percentile latency for request"
            />
            <KpiCard
                title="Avg Encode Time"
                value={(data.avgEncode ?? 0).toFixed(2)}
                unit="s"
                description="Average transcoding time"
            />
            <KpiCard
                title="Error Rate"
                value={(data.errorRate ?? 0).toFixed(2)}
                unit="%"
                description="Failed jobs ratio"
            />
        </div>
    )
}
