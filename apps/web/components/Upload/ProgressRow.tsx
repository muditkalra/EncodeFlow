import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Progress } from '../ui/progress'
import { Badge } from '../ui/badge'
import { ActiveJob } from '@repo/types'
import { jobStatusVariantMap } from '@/types'
import { cn } from '@/lib/utils'

export default function ProgressRow({ job }: { job: ActiveJob }) {
    const jobStatusVariant = jobStatusVariantMap[job.status];

    return (
        <TableRow>
            <TableCell className="font-medium">
                {job.video.name}
            </TableCell>
            <TableCell>
                <Badge className={cn(jobStatusVariant)}>
                    {job.status}
                </Badge>
            </TableCell>
            <TableCell className='flex items-center gap-4'>
                <div className="w-4/5">
                    <Progress value={job.progress} />
                </div>
                <div className="text-xs text-muted-foreground">
                    {job.progress}%
                </div>
            </TableCell>
            <TableCell>
                {new Date(job.createdAt).toUTCString()}
            </TableCell>
        </TableRow>
    )
}
