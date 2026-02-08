import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

interface WorkerCardProps {
    title: string;
    value: number | string | undefined;
    Icon: LucideIcon;
    footer: string;
    classes: string;
}


export default function WorkerCard({ Icon, classes, footer, title, value }: WorkerCardProps) {
    return (
        <Card>
            <CardContent className='px-4'>
                <div className="flex gap-2.5 items-start">
                    <div>
                        <div className="border border-border rounded-full p-1">
                            <Icon className={cn(classes)} />
                        </div>
                    </div>
                    <div className="space-y-2.5">
                        <p className="text-xs text-muted-foreground tracking-wide">{title}</p>
                        <div className="mt-2 text-3xl font-bold ml-1.5">
                            {value ?? <Skeleton className='h-10 w-full rounded-sm' />}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            {footer}
                        </div>
                    </div>
                </div>
            </CardContent>
            {/* <CardFooter className='text-xs text-muted-foreground px-4'>
                {footer}
            </CardFooter> */}
        </Card>
    )
}
