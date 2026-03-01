import useRelativeTime from '@/hooks/useRelativeTime';
import { BadgeKeys } from '@/types';
import { formatTime } from '@/utils';
import { WorkerData } from '@repo/types';
import StatusBadge from '../StatusBadge';
import { Badge } from '../ui/badge';

export default function WorkerHeader({ wid, data }: { wid: string, data: WorkerData | undefined }) {

    const heartBeatTime = useRelativeTime(Number(data?.heartBeatAt), 1000 * 5);

    return (
        <div className="my-6 space-y-2">
            <div className="text-[22px] flex gap-4 items-center">
                {wid}
                <Badge variant={"outline"} className='flex items-center gap-1.5 border-gray-400 dark:border-neutral-700 text-xs'>
                    <span className="relative flex size-1 mt-0.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-700 opacity-75"></span>
                        <span className="relative inline-flex size-1 rounded-full bg-green-700"></span>
                    </span>
                    Healthy
                </Badge>
            </div>
            <div className="flex gap-6 text-sm items-center">
                <div className="flex gap-1.5">
                    <div className="text-muted-foreground">
                        uptime:
                    </div>
                    <div className="">
                        {data ? formatTime(data.uptime * 1000) : "0 s"}
                    </div>
                </div>
                <div className="flex gap-1.5 items-center">
                    <div className="text-muted-foreground">
                        last heartbeat :
                    </div>
                    <div className="">
                        {heartBeatTime}
                    </div>
                </div>
                <div className="flex gap-1.5 items-center">
                    <div className="text-muted-foreground">
                        status :
                    </div>
                    <div className="">
                        {data ? <StatusBadge value={data.status.toLowerCase() as BadgeKeys} /> : "..."}
                    </div>
                </div>
            </div>
        </div>
    )
}
