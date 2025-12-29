import { JSX } from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';

interface MetriCardProps {
    title: string;
    value: number | string;
    icon: JSX.Element;
    subText: string;
}


export default function MetricCard({ title, value, icon, subText }: MetriCardProps) {
    return (
        <Card>
            <CardContent>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{title}</p>
                    {icon}
                </div>
                <div className="mt-2 text-3xl font-bold">
                    {value}
                </div>
            </CardContent>
            <CardFooter className='text-xs text-muted-foreground'>
                {subText}
            </CardFooter>
        </Card>
    )
}
