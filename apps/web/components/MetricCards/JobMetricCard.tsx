import { cn } from '@/lib/utils';
import { JobMetricStatus } from '@repo/types';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

interface MetriCardProps {
    title: string;
    value: number | string | undefined;
    Icon: LucideIcon;
    footer: string;
    classes: string;
    status: JobMetricStatus
}

export default function JobMetricCard({ title, value, Icon, footer, classes, status }: MetriCardProps) {
    return (
        <Card>
            <CardContent>
                <div className="">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">{title}</p>
                        <Icon className={cn(classes, (status == "processing" && Number(value) > 0) ? "animate-spin" : "")} />
                    </div>
                    <div className="mt-2 text-3xl font-bold">
                        {value ?? <Skeleton className='h-10 w-full rounded-sm' />}
                    </div>
                </div>
            </CardContent>
            <CardFooter className='text-xs text-muted-foreground'>
                {footer}
            </CardFooter>
        </Card>
    )
}
