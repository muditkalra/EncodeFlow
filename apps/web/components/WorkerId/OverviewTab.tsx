import { convertToMBGB, formatToPercent } from '@/utils';
import { WorkerData } from '@repo/types';
import StatusBadge from '../StatusBadge';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export default function OverviewTab({ data }: { data: WorkerData | undefined }) {

    if (!data) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-60">
                <Skeleton />
                <Skeleton />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Card className=''>
                <CardHeader className=''>
                    Runtime & Capacity
                </CardHeader>
                <CardContent className=''>
                    <div className="grid grid-cols-2 space-y-4 text-sm">
                        <div className="text-muted-foreground">
                            CPU Core(s) :
                        </div>
                        <div className="font-medium">
                            {data.cpuCores}
                        </div>
                        <div className="text-muted-foreground">
                            Memory Limit :
                        </div>
                        <div className="font-medium">
                            {convertToMBGB(data.memoryLimit)}
                        </div>
                        <div className="text-muted-foreground">
                            Current CPU :
                        </div>
                        <div className="font-medium">
                            {formatToPercent(data.cpu)}%
                        </div>
                        <div className="text-muted-foreground">
                            Current Memory :
                        </div>
                        <div className="font-medium">
                            {convertToMBGB(data.memoryUsed)} <span className='text-muted-foreground text-xs'>
                                ( {formatToPercent(data.memoryUsed / data.memoryLimit)}% )
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className=''>
                    Current Activity
                </CardHeader>
                <CardContent className=''>
                    {data.status == "RUNNING" ? <div className="grid grid-cols-2 space-y-6 text-sm mt-2">
                        <div className="text-muted-foreground">
                            JobId :
                        </div>
                        <div className="font-medium">
                            {data.currentJobId ? data.currentJobId : "-"}
                        </div>
                        <div className="text-muted-foreground">
                            Stage :
                        </div>
                        <div className="font-medium">
                            {data.jobStage ? <StatusBadge value={data.jobStage} /> : "-"}
                        </div>
                    </div>
                        :
                        <div className="text-center flex flex-col gap-2">
                            <div>
                                No job assigned
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Worker is available to process new jobs.
                            </div>
                        </div>
                    }
                </CardContent>
            </Card>
        </div>
    )
}
