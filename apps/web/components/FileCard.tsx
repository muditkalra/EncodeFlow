import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { VideoType } from '@repo/types'
import { FileVideo } from 'lucide-react'
import { formatTime, getFileSizeWithUnit } from '@/utils'
import DownloadButton from './DownloadButton'

export default function FileCard({ video }: { video: VideoType }) {
    return (
        <Card>
            <CardHeader className=''>
                <CardTitle className='flex items-center gap-2 wrap-break-word'>
                    <FileVideo />
                    {video.name}
                </CardTitle>
            </CardHeader>
            <CardContent className=''>
                <div className="flex flex-col">
                    <div className="grid grid-cols-2 text-sm space-y-4">
                        <div className="text-muted-foreground">
                            FileType
                        </div>
                        <div className="tracking-wide">
                            {video.fileType}
                        </div>
                        <div className="text-muted-foreground">
                            Size
                        </div>
                        <div className="">
                            {getFileSizeWithUnit(video.size)}
                        </div>
                        <div className="text-muted-foreground">
                            Duration
                        </div>
                        <div className="">
                            {formatTime(video.duration * 1000)}
                        </div>
                        <div className="text-muted-foreground">
                            Resolution
                        </div>
                        <div className="">
                            {video.width} x {video.height}p
                        </div>
                        <div className="text-muted-foreground">
                            Uploaded At
                        </div>
                        <div className="">
                            {new Date(video.createdAt).toLocaleString()}
                        </div>
                    </div>
                    <DownloadButton variant={"secondary"} buttonType={'original'} url={video.originalUrl}>
                        Original
                    </DownloadButton>
                </div>
            </CardContent>
        </Card>
    )
}
