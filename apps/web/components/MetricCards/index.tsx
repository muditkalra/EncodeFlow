"use client";
import useJobMetrics from '@/hooks/useJobMetrics';
import { MetricKey } from '@repo/types';
import { CheckCircle, ListCheck, Loader2, LucideIcon, XCircle } from 'lucide-react';
import MetricCard from './MetricCard';

interface CardItem {
    title: string;
    datakey: MetricKey;
    Icon: LucideIcon,
    footer: string;
    classes: string;
}

const cards: CardItem[] = [
    {
        title: "Total Jobs",
        datakey: "total",
        Icon: ListCheck,
        footer: "All time",
        classes: "size-4"
    },
    {
        title: "Completed",
        datakey: "completed",
        Icon: CheckCircle,
        footer: "Successfully processed",
        classes: "size-4 text-green-700"
    },
    {
        title: "Processing",
        datakey: "processing",
        Icon: Loader2,
        footer: "Currently active",
        classes: "size-4 text-blue-600"
    },
    {
        title: "Failed",
        datakey: "failed",
        Icon: XCircle,
        footer: "Requires retry",
        classes: "size-4 text-red-800"
    },
]


export default function MetricCards() {
    const { data, dataUpdatedAt } = useJobMetrics();

    return (
        <div className="space-y-1.5">
            <div className="text-muted-foreground text-right text-xs">
                last updated: {new Date(dataUpdatedAt).toLocaleTimeString("en-IN")}
            </div>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                {cards.map(({ Icon, footer, datakey, title, classes }, idx) =>
                    <MetricCard dataKey={datakey} Icon={Icon} classes={classes} footer={footer} title={title} key={datakey} value={data?.[datakey]} />
                )}
            </div>
        </div>
    )
}
