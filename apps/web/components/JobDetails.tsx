"use client";

import { ColumnType } from '@/types';
import { calculateProcessingTime, formatTime, getFileSizeWithUnit } from '@/utils';
import { OutputConfigType } from '@repo/types';
import { CheckCircle2, CircleX, FileVideoCamera } from 'lucide-react';
import DownloadButton from './DownloadButton';
import JobStatusBadge from './JobStatusBadge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from './ui/sheet';

interface JobsDetailsProps {
    job: ColumnType
}

export default function JobDetails({ job }: JobsDetailsProps) {

    const { format, includeAudio, resolution } = JSON.parse(job.outputConfig as string) as OutputConfigType;

    return (
        <SheetContent className='gap-0'>
            <SheetHeader>
                <SheetTitle className='sr-only'>
                    Jobs Details
                </SheetTitle>
                <div className="flex gap-2">
                    <FileVideoCamera className='size-7' />
                    <div className="flex gap-2">
                        {job.video.name}
                    </div>
                </div>
            </SheetHeader>

            <ScrollArea className='h-[65vh] mt-4'>
                <div className="px-4 flex flex-col gap-6">
                    {/* file status and progress */}
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-2">
                            <div className="text-muted-foreground text-sm">
                                Status
                            </div>
                            <div className="">
                                <JobStatusBadge value={job.status} />
                            </div>
                        </div>

                        <div className={"flex flex-col gap-2 items-center"}>
                            <div className="text-muted-foreground text-sm">
                                Progress %
                            </div>
                            <div className="">
                                {job.progress}
                            </div>
                        </div>

                        <div className={"flex flex-col gap-2 items-center"}>
                            <div className="text-muted-foreground text-sm">
                                Processing Time
                            </div>
                            <div className="">
                                {calculateProcessingTime(job.finishedAt, job.startedAt)}
                            </div>
                        </div>
                    </div>

                    {/* error message */}
                    {job.status == "FAILED" &&
                        <div className='flex flex-col gap-2'>
                            <div className="text-muted-foreground text-sm">
                                Error
                            </div>
                            <div className="">
                                {"Error while transcoding"}
                            </div>
                        </div>
                    }

                    <Separator />

                    {/* output config */}
                    <div className="flex flex-col gap-4">
                        <div>
                            Output Config
                        </div>
                        <div className="grid grid-cols-2 text-sm space-y-4">
                            <div className="text-muted-foreground">
                                Format
                            </div>
                            <div className="">
                                {format}
                            </div>
                            <div className="text-muted-foreground">
                                Resolution
                            </div>
                            <div className="">
                                {resolution}
                            </div>
                            <div className="text-muted-foreground">
                                Include Audio
                            </div>
                            <div className="">
                                {includeAudio ?
                                    <CheckCircle2 className="size-5 text-green-700" />
                                    :
                                    <CircleX className="size-5 text-red-800" />
                                }
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* input file details */}
                    <div className="flex flex-col gap-4">
                        <div className="">
                            Input video
                        </div>
                        <div className="grid grid-cols-2 text-sm space-y-4">
                            <div className="text-muted-foreground">
                                FileType
                            </div>
                            <div className="tracking-wide">
                                {job.video.fileType}
                            </div>
                            <div className="text-muted-foreground text-sm">
                                Size
                            </div>
                            <div className="">
                                {getFileSizeWithUnit(job.video.size)}
                            </div>
                            <div className="text-muted-foreground text-sm">
                                Duration
                            </div>
                            <div className="">
                                {formatTime(job.video.duration * 1000)}
                            </div>
                            <div className="text-muted-foreground text-sm">
                                Resolution (w : h)
                            </div>
                            <div className="">
                                {job.video.width} x {job.video.height}p
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>

            <SheetFooter>
                <div className="grid grid-cols-2 gap-2">
                    <DownloadButton variant={"secondary"} buttonType={'original'} url={job.video.originalUrl}>
                        Original
                    </DownloadButton>
                    <DownloadButton buttonType={'output'} disabled={job.status !== "COMPLETED"} url={job.outputUrl}>
                        Output
                    </DownloadButton>
                </div>
                <SheetClose asChild>
                    <Button variant={"outline"}>
                        Close
                    </Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    )
}
