import { cn } from '@/lib/utils';
import { MetricKey } from '@repo/types';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

interface MetriCardProps {
    title: string;
    value: number | string | undefined;
    Icon: LucideIcon;
    footer: string;
    classes: string;
    dataKey: MetricKey
}

export default function MetricCard({ title, value, Icon, footer, classes, dataKey }: MetriCardProps) {
    return (
        <Card>
            <CardContent>
                <div className="">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">{title}</p>
                        <Icon className={cn(classes, (dataKey == "processing" && Number(value) > 0) ? "animate-spin" : "")} />
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
