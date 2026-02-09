import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

interface WorkerCardProps {
    title: string;
    value: number | undefined;
    Icon: LucideIcon;
    footer: string;
    classes: string;
}


export default function WorkerCard({ Icon, classes, footer, title, value }: WorkerCardProps) {
    return (
        <Card className='py-5'>
            <CardContent>
                <div>
                    <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground tracking-wide">{title}</p>
                        <div className="border border-border rounded-full p-1">
                            <Icon className={cn(classes)} />
                        </div>
                    </div>
                    <div className="text-3xl font-semibold mt-1">
                        {Math.ceil(value ?? 0) ?? <Skeleton className='h-10 w-full rounded-sm' />}
                    </div>
                </div>
                <div className="text-xs text-muted-foreground mt-4">
                    {footer}
                </div>
            </CardContent>
        </Card>
    )
}
