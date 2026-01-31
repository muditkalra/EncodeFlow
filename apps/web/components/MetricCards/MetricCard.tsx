import { JSX } from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

interface MetriCardProps {
    title: string;
    value: number | string | undefined;
    icon: JSX.Element;
    footer: string;
}


export default function MetricCard({ title, value, icon, footer }: MetriCardProps) {
    return (
        <Card>
            <CardContent>
                <div className="">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">{title}</p>
                        {icon}
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
