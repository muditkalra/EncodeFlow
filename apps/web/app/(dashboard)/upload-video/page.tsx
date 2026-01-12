"use client";

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import OutputConfig from '@/components/Upload/OutputConfig';
import UploadActions from '@/components/Upload/UploadActions';
import UploadDropzone from '@/components/Upload/UploadDropzone';
import VideoPreview from '@/components/Upload/VideoPreview';
import { OutputConfigType, UploadState, VideoDetail } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import axios from "axios";
import { toast } from 'sonner';
import { TranscodeJobBody } from '@repo/types';
import ProgressTable from '@/components/Upload/ProgressTable';


export default function page() {
	const [video, setVideo] = useState<File | null>(null);
	const [videoDetail, setVideoDetail] = useState<VideoDetail | null>(null);
	const [config, setConfig] = useState<OutputConfigType>({ format: "mp4", resolution: "1080p", includeAudio: true });
	const [uploadState, setUploadState] = useState<UploadState>("IDLE");
	const [progress, setProgress] = useState<number>(0);


	const getUploadUrlMutation = useMutation({
		mutationFn: () => axios.get(`${process.env.NEXT_PUBLIC_API_URL}/upload-url`, {
			params: {
				"video-title": video?.name,
				"format": video?.type
			}
		}).then(res => res.data),
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

	const createJobMutation = useMutation({
		mutationFn: (payload: TranscodeJobBody) =>
			axios.post(`${process.env.NEXT_PUBLIC_API_URL}/transcode`, payload).then(res => res.data),
		onSuccess: () => {
			toast.success("Transcoding started");
			setUploadState("PROCESSING");
			console.log("on success of job");
		},
		onError: (error) => {
			console.log(error);
			toast.error(error.message);
			setUploadState("FILE_SELECTED");
		}
	});

	const handleClick = useCallback(async () => {
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
			const job: TranscodeJobBody = {
				fileName: video.name,
				userId: crypto.randomUUID(),
				fileType: video.type,
				size: video.size,
				duration: videoDetail.duration,
				width: videoDetail.width,
				height: videoDetail.height,
				outputConfig: {
					format: config.format,
					resolution: config.resolution,
					includeAudio: config.includeAudio
				}
			};
			const res = await createJobMutation.mutateAsync(job);
			console.log(res, "res");
			console.log("finished upload");
		} catch (error) {
			console.log("error from try catch", error);
			setUploadState("FAILED");
		}
	}, [video, videoDetail]);

	return (
		<div className="p-4 space-y-8">
			{(!video || !videoDetail) && <UploadDropzone setVideo={setVideo} setVideoDetail={setVideoDetail} />}
			{(video && videoDetail) &&
				<Card className=''>
					<CardContent className='w-full max-w-2xl mx-auto flex flex-col gap-6'>
						<VideoPreview video={video} videoDetail={videoDetail} />
						<OutputConfig config={config} setConfig={setConfig} disabled={uploadState == "FETCHINGURL" || uploadState == "UPLOADING"} uploadState={uploadState} />
					</CardContent>
					<CardFooter className='w-full max-w-2xl mx-auto justify-end'>
						<UploadActions uploadState={uploadState} onUpload={handleClick} setVideo={setVideo} setVideoDetail={setVideoDetail} disabled={uploadState == "FETCHINGURL"} progress={progress} />
					</CardFooter>
				</Card>
			}
			<ProgressTable />
		</div>
	)
}
