"use client";

import { API_URL } from '@/utils/constants';
import { ActiveJob } from '@repo/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table';
import ActivityFeedRow from './ActivityFeedRow';

// const data: ActiveJob[] = [{
//     jobId: "12121",
//     videoId: "121221",
//     video: {
//         name: "Funny-video.mp4"
//     },
//     createdAt: new Date().toString(),
//     progress: 40,
//     status: "PROCESSING"
// }]

export default function ActivityFeedTable({ enabled }: { enabled: boolean }) {

    const { data } = useQuery<ActiveJob[]>({
        queryKey: ["active-jobs"],
        queryFn: () => axios.get(`${API_URL}/jobs/active`).then(res => res.data),
        refetchInterval: 1000, //every second
        enabled
    })

    if (!enabled) {
        return;
    }


    return (
        <div className='flex flex-col'>
            <div className="text-center text-muted-foreground">
                Recent Jobs
                <div className='text-xs'>
                    (for more details visit jobs page)
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-1/5'>FileName</TableHead>
                        <TableHead className='w-1/5'>Status</TableHead>
                        <TableHead className='w-2/5'>Progress</TableHead>
                        <TableHead>Created at</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((job, id) =>
                        <ActivityFeedRow key={id} job={job} />
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
