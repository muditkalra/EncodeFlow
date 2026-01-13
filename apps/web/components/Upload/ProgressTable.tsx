import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import ProgressRow from './ProgressRow'
import { useQuery } from '@tanstack/react-query'
import { ActiveJob } from '@repo/types'
import axios from 'axios'
import { API_URL } from '@/utils/constants'

export default function ProgressTable({ enabled }: { enabled: boolean }) {

    const { data } = useQuery<ActiveJob[]>({
        queryKey: ["active-jobs"],
        queryFn: () => axios.get(`${API_URL}/jobs/active`).then(res => res.data),
        refetchInterval: 1000,
        enabled
    })

    if (!enabled) {
        return;
    }


    return (
        <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead className='w-1/5'>FileName</TableHead>
                    <TableHead className='w-1/5'>Status</TableHead>
                    <TableHead className='w-2/5'>Progress</TableHead>
                    <TableHead>Created at</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((job, id) => <ProgressRow key={id} job={job} />)}
            </TableBody>
        </Table>
    )
}
