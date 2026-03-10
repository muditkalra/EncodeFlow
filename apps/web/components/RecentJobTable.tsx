"use client";
import useRecentJobs from '@/hooks/useRecentJobs';
import { calculateProcessingTime, getRelativeTime } from '@/utils';
import { JobStatus, RecentJob } from '@repo/types';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import StatusBadge from './StatusBadge';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

// const data = [{
//     jobId: "12121",
//     videoId: "121221",
//     video: {
//         name: "Funny-video.mp4"
//     },
//     createdAt: new Date().toString(),
//     progress: 40,
//     status: "PROCESSING"
// }]


export default function RecentJobTable() {

    const { data } = useRecentJobs();

    return (
        <div className="flex flex-col gap-2">
            <Button asChild variant={"outline"} size={"sm"} className='hover:underline place-self-end'>
                <Link href={"/jobs"}>
                    View All jobs
                    <MoveRight className='size-4' />
                </Link>
            </Button>
            <div className="border rounded-md overflow-hidden">
                <Table>
                    <TableHeader className='bg-muted'>
                        <TableRow>
                            <TableHead className='w-1/3'>FileName</TableHead>
                            <TableHead className='w-1/5'>Status</TableHead>
                            <TableHead className='w-1/5'>progress</TableHead>
                            <TableHead className='w-1/4'>Processing time</TableHead>
                            <TableHead className='w-1/4'>Created at</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((job, id) =>
                            <RecentJobRow key={id} data={job} />
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

function RecentJobRow({ data }: { data: RecentJob }) {
    return (
        <TableRow className='h-12'>
            <TableCell className="font-medium">
                {data.video.name}
            </TableCell>
            <TableCell>
                <StatusBadge value={data.status.toLocaleLowerCase() as JobStatus} />
            </TableCell>
            <TableCell>
                {data.progress}%
            </TableCell>
            <TableCell>
                {(data.finishedAt && data.startedAt) ? calculateProcessingTime(data.finishedAt, data.startedAt) : "-"}
            </TableCell>
            <TableCell title={new Date(data.createdAt).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })}>
                {getRelativeTime(data.createdAt)}
            </TableCell>
        </TableRow>
    )
}
