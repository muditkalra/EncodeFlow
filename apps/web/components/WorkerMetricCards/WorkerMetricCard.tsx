import { JSX } from 'react';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

interface WorkerCardProps {
    title: string;
    value: number | string | undefined;
    Icon: JSX.Element;
    footer: string;
    showPercentage?: boolean
}


export default function WorkerMetricCard({ Icon, footer, title, value, showPercentage }: WorkerCardProps) {
    return (
        <Card className='py-5'>
            <CardContent>
                <div className="flex justify-between items-center gap-1">
                    <p className="text-xs text-muted-foreground tracking-wide font-medium">{title}</p>
                    <div className="border border-border rounded-full p-1">
                        {Icon}
                    </div>
                </div>
                <div className="text-2xl md:text-3xl font-semibold mt-1">
                    {!Number.isNaN(Number(value)) ?
                        <div className="">
                            {value} {showPercentage && <span className='text-sm text-muted-foreground'>%</span>}
                        </div>
                        :
                        <Skeleton className='h-10 w-full rounded-sm' />
                    }
                </div>
                <div className="text-xs text-muted-foreground mt-4">
                    {footer}
                </div>
            </CardContent>
        </Card>
    )
}
