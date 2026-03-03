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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
                title="Throughput"
                value={data.throughput.toFixed(2)}
                unit="vid/min"
                description="Videos processed per minute"

            />
            <KpiCard
                title="Avg Encode Time"
                value={data.avgEncode.toFixed(2)}
                unit="s"
                description="Average transcoding time"
            />
            <KpiCard
                title="p95 Encode"
                value={data.p95Encode.toFixed(2)}
                unit="s"
                description="95th percentile latency"
            />
            <KpiCard
                title="Error Rate"
                value={data.errorRate.toFixed(2)}
                unit="%"
                description="Failed jobs ratio"
            />
        </div>
    )
}
