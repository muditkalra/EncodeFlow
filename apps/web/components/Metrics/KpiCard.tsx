"use client";
import { Card, CardContent } from "@/components/ui/card";

interface KpiCardProps {
    title: string
    value: number | string
    unit?: string
    trend?: number // percentage change
    description?: string
    className?: string
}

export default function KpiCard({ title, value, description, trend, unit }: KpiCardProps) {

    return (
        <Card>
            <CardContent>
                <div className="text-sm text-muted-foreground">
                    {title}
                </div>
                <div className="flex gap-2 mt-1">
                    <div className="text-3xl font-semibold">
                        {value}
                        <span className="text-lg ml-1 text-muted-foreground">
                            {unit}
                        </span>
                    </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                    {description}
                </div>
            </CardContent>
        </Card>
    )
}