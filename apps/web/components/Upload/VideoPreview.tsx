import { VideoDetail } from '@/types';
import { getFileSizeWithUnit } from '@/utils';

interface Props {
    video: File;
    videoDetail: VideoDetail;
}

export default function VideoPreview({ video, videoDetail }: Props) {

    return (
        <div className='space-y-4'>
            <div className="place-items-center">
                <video controls className='h-72'>
                    <source src={URL.createObjectURL(video)} type={video.type} />
                </video>
            </div>
            <div className="text-xs text-center">
                {video.name} <span className='text-muted-foreground'>({getFileSizeWithUnit(video.size)})</span>
            </div>
            <div className="flex justify-center gap-3">
                <div className="">
                    <span className='text-muted-foreground'>Duration:</span> {Math.ceil(videoDetail.duration)} seconds
                </div>
                <div className="">
                    <span className='text-muted-foreground'>Resolution:</span> {videoDetail.width}x{videoDetail.height}p
                </div>
            </div>
        </div>
    )
}