"use client";
import useJobMetrics from '@/hooks/useJobMetrics';
import { cn } from '@/lib/utils';
import { JobMetricStatus } from '@repo/types';
import { CheckCircle, ListCheck, Loader2, LucideIcon, RotateCw, XCircle } from 'lucide-react';
import { useState } from 'react';
import JobMetricCard from './JobMetricCard';

interface CardItem {
    title: string;
    status: JobMetricStatus;
    Icon: LucideIcon,
    footer: string;
    classes: string;
}

const cards: CardItem[] = [
    {
        title: "Total Jobs",
        status: "total",
        Icon: ListCheck,
        footer: "All the jobs",
        classes: "size-4"
    },
    {
        title: "Completed",
        status: "completed",
        Icon: CheckCircle,
        footer: "Successfully processed",
        classes: "size-4 text-green-700"
    },
    {
        title: "Processing",
        status: "processing",
        Icon: Loader2,
        footer: "Currently active",
        classes: "size-4 text-blue-600"
    },
    {
        title: "Failed",
        status: "failed",
        Icon: XCircle,
        footer: "Requires retry",
        classes: "size-4 text-red-800"
    },
]

// const data: MetricData = {
//     total: Math.floor(20 * Math.random()),
//     completed: 3,
//     processing: 1,
//     failed: 1,
//     pending: 0
// }

export default function JobMetricCards() {
    const { data, dataUpdatedAt, refetch } = useJobMetrics();
    const [fetching, setFetching] = useState<boolean>(false);

    const handleRefetching = () => {
        setFetching(true);
        refetch();
        setTimeout(() => setFetching(false), 800);
    };

    return (
        <div className="space-y-1.5">
            <div className="flex justify-end gap-2 items-center">
                <div className="text-muted-foreground text-xs">
                    last updated: {new Date(dataUpdatedAt).toLocaleTimeString("en-IN")}
                </div>
                <RotateCw className={cn('size-3.5 text-accent-foreground', fetching ? "animate-spin" : "")} onClick={handleRefetching} />
            </div>
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                {cards.map(({ Icon, footer, status, title, classes }, idx) =>
                    <JobMetricCard status={status} Icon={Icon} classes={classes} footer={footer} title={title} key={status} value={data?.[status]} />
                )}
            </div>
        </div>
    )
}
