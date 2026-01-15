import { cn } from '@/lib/utils'
import { jobStatusBadgeColor } from '@/types'
import { ActiveJob } from '@repo/types'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { TableCell, TableRow } from '../ui/table'

export default function ActivityFeedRow({ job }: { job: ActiveJob }) {
    const jobStatusColor = jobStatusBadgeColor[job.status];

    return (
        <TableRow>
            <TableCell className="font-medium">
                {job.video.name}
            </TableCell>
            <TableCell>
                <Badge className={cn("border lowercase text-neutral-200", jobStatusColor)}>
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
                {new Date(job.createdAt).toLocaleString("en-IN")}
            </TableCell>
        </TableRow>
    )
}
