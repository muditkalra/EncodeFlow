"use client";

import { CheckCircle, ListCheck, Loader2, XCircle } from 'lucide-react'
import MetricCard from './MetricCard'
import { JSX } from 'react';
import { MetricKey } from '@repo/types';
import useJobMetrics from '@/hooks/useJobMetrics';

interface CardItem {
    title: string;
    datakey: MetricKey;
    Icon: JSX.Element,
    footer: string;
}

const cards: CardItem[] = [
    {
        title: "Total Jobs",
        datakey: "total",
        Icon: <ListCheck className='size-4' />,
        footer: "All time",
    },
    {
        title: "Completed",
        datakey: "completed",
        Icon: <CheckCircle className='size-4 text-green-700' />,
        footer: "Successfully processed",
    },
    {
        title: "Processing",
        datakey: "processing",
        Icon: <Loader2 className='size-4 text-blue-600' />,
        footer: "Currently active",
    },
    {
        title: "Failed",
        datakey: "failed",
        Icon: <XCircle className='size-4 text-red-800' />,
        footer: "Requires retry",
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
                {cards.map(({ Icon, footer, datakey, title }, idx) =>
                    <MetricCard icon={Icon} footer={footer} title={title} key={idx} value={data?.[datakey]} />
                )}
            </div>
        </div>
    )
}
