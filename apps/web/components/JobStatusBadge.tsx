import { cn } from '@/lib/utils';
import { jobStatusBadgeColor } from '@/types';
import { JobStatus } from '@repo/types';
import React from 'react'
import { Badge } from './ui/badge';

export default function JobStatusBadge({ value }: { value: JobStatus }) {
    const jobStatusColor = jobStatusBadgeColor[value];
    return (
        <Badge className={cn(jobStatusColor, "capitalize")}>
            {value}
        </Badge>
    )
}
