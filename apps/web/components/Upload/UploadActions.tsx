"use client";

import { UploadState, VideoDetail } from '@/types';
import { Loader } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

interface Props {
    uploadState: UploadState;
    disabled: boolean;
    progress: number;
    setVideo: Dispatch<SetStateAction<File | null>>;
    setVideoDetail: Dispatch<SetStateAction<VideoDetail | null>>;
    onUpload: () => void;
}

export default function UploadActions({ uploadState, disabled, progress, setVideo, setVideoDetail, onUpload }: Props) {

    if (uploadState === "UPLOADING") {
        return (
            <div className="flex flex-col gap-1 w-full">
                <div className="text-muted-foreground text-sm text-center">
                    uploading({progress}%) ...
                </div>
                <Progress value={progress} />
            </div>
        )
    }

    return (
        <>
            <Button className='cursor-pointer' size={"sm"} variant={"ghost"} onClick={() => { setVideo(null); setVideoDetail(null); }} disabled={disabled}>
                Change file
            </Button>
            <Button className='cursor-pointer' variant={"default"} size={"sm"} onClick={onUpload} disabled={disabled}>
                {uploadState == "FETCHINGURL" && <Loader aria-label='loading' className='animate-spin' />} Upload & Start Transcoding
            </Button>
        </>
    );
}

