import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import ProgressRow from './ProgressRow'
import { useQuery } from '@tanstack/react-query'

export default function ProgressTable() {

    const { data } = useQuery({
        queryKey: ["active-jobs"],
        queryFn: () => [{
            "jobId": "job_1",
            "fileName": "video1.mp4",
            "status": "PROCESSING",
            "step": "ENCODING",
            "progress": 42
        }],
        refetchInterval: 1000,
    })


    return (
        <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead className='w-1/6'>FileName</TableHead>
                    <TableHead className='w-1/3'>Status</TableHead>
                    <TableHead>Progress</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((job, id) => <ProgressRow key={id} job={job} />)}
            </TableBody>
        </Table>
    )
}
