import { API_URL } from '@/utils/constants'
import { ActiveJob } from '@repo/types'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table'
import ActivityFeedRow from './ActivityFeedRow'

export default function ActivityFeedTable({ enabled }: { enabled: boolean }) {

    const { data } = useQuery<ActiveJob[]>({
        queryKey: ["active-jobs"],
        queryFn: () => axios.get(`${API_URL}/jobs/active`).then(res => res.data),
        refetchInterval: 1000, //every second
        enabled
    })

    if (!enabled || !data) {
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
                {data.map((job, id) =>
                    <ActivityFeedRow key={id} job={job} />
                )}
            </TableBody>
        </Table>
    )
}
