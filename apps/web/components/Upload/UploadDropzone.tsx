"use client";
import { VideoDetail } from '@/types';
import { Cloud } from 'lucide-react';
import { Dispatch, SetStateAction, useRef } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface Props {
    setVideo: Dispatch<SetStateAction<File | null>>;
    setVideoDetail: Dispatch<SetStateAction<VideoDetail | null>>;
}

export default function UploadDropzone({ setVideo, setVideoDetail }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = (files: FileList | null) => {
        if (!files || files.length == 0) return;

        const file = files[0]!;
        if (!file.type.startsWith("video/")) {
            toast.error("Only Video files are allowed");
            return;
        }

        if (file.size <= 1000 || file.size >= 20000000) {
            toast.error("Size should be more than a 1KB and less than 20MB");
            return;
        }

        setVideo(file);

        const videoEle = document.createElement("video");
        videoEle.src = URL.createObjectURL(file);
        videoEle.onloadedmetadata = () => {
            setVideoDetail({ duration: videoEle.duration, width: videoEle.videoWidth, height: videoEle.videoHeight });
        }
    }


    return (
        <Card className='cursor-pointer'
            onClick={() => inputRef.current?.click()}
            onDragEnter={(e) => { e.preventDefault() }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files) }}
        >
            <CardContent>
                <div className="flex flex-col items-center gap-6 justify-center">
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <Cloud className='size-9 p-1 border rounded-lg bg-muted' />
                        <div className="text-sm text-muted-foreground text-center space-y-1">
                            <div className="">
                                Upload file for Transcoding
                            </div>
                            <div> drag and drop or click to browse</div>
                            <span className='text-xs'>( file should be less than 20 MB )</span>
                        </div>
                    </div>
                    <Button size="sm" variant="outline" className='cursor-pointer'>
                        Upload file
                    </Button>
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    accept="video/*"
                    hidden
                    onChange={(e) => { handleFile(e.target.files); }}
                />
            </CardContent>
        </Card >
    )
}
