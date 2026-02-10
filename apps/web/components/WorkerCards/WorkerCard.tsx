import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { JSX } from 'react';

interface WorkerCardProps {
    title: string;
    value: number | string | undefined;
    Icon: JSX.Element;
    footer: string;
    showPercentage?: boolean
}


export default function WorkerCard({ Icon, footer, title, value, showPercentage }: WorkerCardProps) {
    return (
        <Card className='py-5'>
            <CardContent>
                <div>
                    <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground tracking-wide">{title}</p>
                        <div className="border border-border rounded-full p-1">
                            {/* <Icon className={cn(classes)} /> */}
                            {Icon}
                        </div>
                    </div>
                    <div className="text-3xl font-semibold mt-1">
                        {!Number.isNaN(Number(value)) ?
                            <div className="">
                                {value} {showPercentage && <span className='text-sm'>%</span>}
                            </div>
                            :
                            <Skeleton className='h-10 w-full rounded-sm' />
                        }
                    </div>
                </div>
                <div className="text-xs text-muted-foreground mt-4">
                    {footer}
                </div>
            </CardContent>
        </Card>
    )
}
