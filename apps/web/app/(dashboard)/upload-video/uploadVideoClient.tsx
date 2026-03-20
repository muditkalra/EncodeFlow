"use client";

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import ActivityFeedTable from '@/components/Upload/ActivityFeedTable';
import OutputConfig from '@/components/Upload/OutputConfig';
import UploadActions from '@/components/Upload/UploadActions';
import UploadDropzone from '@/components/Upload/UploadDropzone';
import VideoPreview from '@/components/Upload/VideoPreview';
import useApiClient from '@/hooks/useApiClient';
import useCreateJob from '@/hooks/useCreateJob';
import { UploadState, VideoDetail } from '@/types';
import { useAuth } from '@clerk/nextjs';
import { OutputConfigType, TranscodeJobBody } from '@repo/types';
import { useMutation } from '@tanstack/react-query';
import axios from "axios";
import { useState } from 'react';
import { toast } from 'sonner';



export default function UploadVideoClient() {
    const [video, setVideo] = useState<File | null>(null);
    const [videoDetail, setVideoDetail] = useState<VideoDetail | null>(null);
    const [config, setConfig] = useState<OutputConfigType>({ format: "mp4", resolution: "1080p", includeAudio: true });
    const [uploadState, setUploadState] = useState<UploadState>("IDLE");
    const [progress, setProgress] = useState<number>(0);
    const [tableEnabled, setTableEnabled] = useState<boolean>(false);

    const { apiPOST } = useApiClient();
    const { userId } = useAuth();


    const getUploadUrlMutation = useMutation({
        mutationFn: async (): Promise<{ url: string }> => apiPOST(`api/s3/uploadUrl`, { "video-title": video?.name, "format": video?.type }),
        onSuccess: () => {
            toast.success("Uploading started ...");
            setUploadState("UPLOADING");
        },
        onError: (error) => {
            console.log(error);
            toast.error(error.message);
            setUploadState("FILE_SELECTED");
        }
    });

    async function uploadFile(uploadUrl: string) {
        try {
            await axios.put(uploadUrl, video, {
                headers: {
                    "Content-Type": video?.type
                },
                onUploadProgress: (e) => {
                    if (!e.total) return;
                    setProgress(Math.round((e.loaded * 100) / e.total));
                }
            });
        } catch (error) {
            console.log(error, "error uploading file");
        }
    }

    const createJobMutation = useCreateJob({
        onSuccess: () => {
            setUploadState("PROCESSING");
            setVideo(null);
            setVideoDetail(null);
        },
        onError: (error) => {
            toast.error(error.message);
            setUploadState("FILE_SELECTED");
        }
    })

    const handleClick = async () => {
        if (!video || !videoDetail) {
            return;
        }

        try {
            // fetching signed Url;
            setUploadState("FETCHINGURL");
            const { url } = await getUploadUrlMutation.mutateAsync();

            // uploading to s3
            await uploadFile(url);

            // starting transcoding;
            const { duration, height, width } = videoDetail;
            const { format, includeAudio, resolution } = config;
            const job: TranscodeJobBody = {
                fileName: video.name,
                userId: userId ?? crypto.randomUUID(),
                fileType: video.type,
                size: video.size,
                duration,
                width,
                height,
                outputConfig: { format, resolution, includeAudio }
            };
            const res = await createJobMutation.mutateAsync(job);
            setTableEnabled(true);
            setVideo(null);
            setVideoDetail(null);
            setConfig({ format: 'mp4', includeAudio: true, resolution: "1080p" }); //setting to default;
            console.log(res, "res");
            toast.success("Transcoding started.. ");
        } catch (error) {
            console.log("error", error);
            setUploadState("FAILED");
        }
    };

    return (
        <div className="p-4 space-y-6">
            {(!video || !videoDetail) && <UploadDropzone setVideo={setVideo} setVideoDetail={setVideoDetail} />}
            {(video && videoDetail) &&
                <Card className=''>
                    <CardContent className='w-full max-w-xl 2xl:max-w-2xl mx-auto flex flex-col gap-6'>
                        <VideoPreview video={video} videoDetail={videoDetail} />
                        <OutputConfig config={config} setConfig={setConfig} disabled={uploadState == "FETCHINGURL" || uploadState == "UPLOADING"} uploadState={uploadState} />
                    </CardContent>
                    <CardFooter className='w-full max-w-xl 2xl:max-w-2xl mx-auto justify-end'>
                        <UploadActions uploadState={uploadState} onUpload={handleClick} setVideo={setVideo} setVideoDetail={setVideoDetail} disabled={uploadState == "FETCHINGURL"} progress={progress} />
                    </CardFooter>
                </Card>
            }
            <ActivityFeedTable enabled={tableEnabled} />
        </div>
    )
}
