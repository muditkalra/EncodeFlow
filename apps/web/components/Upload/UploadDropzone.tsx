"use client";
import { Cloud } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import OutputConfig from './OutputConfig';
import { OutputConfigType } from '@/types';


export default function UploadDropzone() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [videoDetails, setVideoDetails] = useState<{ duration: number; width: number; height: number } | null>(null);
    const [video, setVideo] = useState<File | null>(null);
    const [config, setConfig] = useState<OutputConfigType>({ format: "mp4", resolution: "1080p", includeAudio: true });

    
    const handleFile = (files: FileList | null) => {
        if (!files || files.length == 0) return;

        const file = files[0]!;
        if (!file.type.startsWith("video/")) {
            toast.error("Only Video files are allowed");
        }

        if (file.size <= 1000 || file.size >= 20000000) {
            toast.error("Size should be more than a 1KB and less than 20MB");
        }

        setVideo(file);

        const videoEle = document.createElement("video");
        videoEle.src = URL.createObjectURL(file);
        videoEle.onloadedmetadata = () => {
            setVideoDetails({ duration: videoEle.duration, width: videoEle.videoWidth, height: videoEle.videoHeight });
        }
    }

    const getFileSizeWithUnit = (size: number): string => {
        const fileInKb = Math.round(size / 1000);
        return fileInKb < 1024 ? fileInKb + " KB" : Math.round(fileInKb / 1000) + " MB";
    };

    return (
        <>
            {(!video || !videoDetails) ?
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
                :
                <Card className='items-center justify-center'>
                    <CardContent className='space-y-4 w-full'>
                        <div className="place-items-center">
                            <video controls className='max-w-xl h-74'>
                                <source src={URL.createObjectURL(video)} type={video.type} />
                            </video>
                        </div>
                        <div className="text-xs text-center">
                            {video.name} <span className='text-muted-foreground'>({getFileSizeWithUnit(video.size)})</span>
                        </div>
                        <div className="flex justify-center gap-3">
                            <div className="">
                                <span className='text-muted-foreground'>Duration:</span> {videoDetails.duration} seconds
                            </div>
                            <div className="">
                                <span className='text-muted-foreground'>Resolution:</span> {videoDetails.width}x{videoDetails.height}p
                            </div>
                        </div>
                        <div className="max-w-2xl mx-auto">
                            <OutputConfig config={config} setConfig={setConfig} disabled={false} />
                        </div>
                    </CardContent>
                    <CardFooter className='gap-4 w-full max-w-2xl mx-auto justify-end'>
                        <Button className='cursor-pointer' size={"sm"} variant={"ghost"} onClick={() => { setVideo(null); setVideoDetails(null); }}>
                            Change file
                        </Button>
                        <Button className='cursor-pointer' variant={"default"} size={"sm"}>
                            Upload & Start Transcoding
                        </Button>
                    </CardFooter>
                </Card >
            }
        </>
    )
}



//     {/* <input
//         type="file"
//         accept="video/*"
//         // onChange={handleFileChange}
//         // disabled={uploading}
//         className="block w-full text-sm text-slate-500
//   file:mr-4 file:py-2 file:px-4
//   file:rounded-full file:border-0
//   file:text-sm file:font-semibold
//   file:bg-violet-50 file:text-violet-700
//   hover:file:bg-violet-100"
//     /> */}

//     {/* {uploading && (
//         <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
//             <div
//                 className="bg-blue-600 h-2.5 rounded-full"
//                 style={{ width: `${progress}%` }}
//             ></div>
//             <p className="text-sm text-gray-600 mt-2">{progress}% uploaded</p>
//         </div>
//     )} */}
