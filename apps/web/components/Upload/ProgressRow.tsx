import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Progress } from '../ui/progress'
import { Badge } from '../ui/badge'

export default function ProgressRow({ job }: { job: any }) {
    return (
        <TableRow>
            <TableCell className="font-medium">
                {job.fileName}
            </TableCell>
            <TableCell>
                <Badge variant={"destructive"}>
                    {job.status}
                </Badge>
            </TableCell>
            <TableCell className=''>
                <Progress value={job.progress} />
            </TableCell>
        </TableRow>
    )
}
