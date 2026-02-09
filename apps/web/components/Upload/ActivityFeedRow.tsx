import { ActiveJob, JobStatus } from '@repo/types'
import JobStatusBadge from '../JobStatusBadge'
import { Progress } from '../ui/progress'
import { TableCell, TableRow } from '../ui/table'

export default function ActivityFeedRow({ job }: { job: ActiveJob }) {

    return (
        <TableRow>
            <TableCell className="font-medium">
                {job.video.name}
            </TableCell>
            <TableCell>
                <JobStatusBadge value={job.status.toLocaleLowerCase() as JobStatus} />
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
