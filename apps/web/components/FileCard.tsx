import { formatTime, getFileSizeWithUnit } from '@/utils'
import { VideoType } from '@repo/types'
import { FileVideo } from 'lucide-react'
import DownloadButton from './DownloadButton'
import { Card, CardContent, CardTitle } from './ui/card'

export default function FileCard({ video }: { video: VideoType }) {
    return (
        <Card>
            <div className="flex px-4 gap-2 h-10 items-center">
                <FileVideo className='size-5' />
                <CardTitle className='flex items-center gap-2 break-all'>
                    {video.name}
                </CardTitle>
            </div>
            <CardContent className='px-4'>
                <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 text-sm space-y-3">
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
