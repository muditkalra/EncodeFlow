import FileCard from '@/components/FileCard'
import { Button } from '@/components/ui/button';
import { API_URL } from '@/utils';
import { VideoType } from '@repo/types';
import axios from 'axios';
import { ArrowUpRight, FileVideo } from 'lucide-react';
import React from 'react'

const getVideos = async (): Promise<VideoType[]> => {
	try {
		const videos = await axios.get(`${API_URL}/all-videos`);
		return videos.data;
	} catch (error) {
		console.log(error);
		return [];
	}
}

// const videos: VideoType[] = [
// 	{
// 		"id": "367c88da-4ecb-48bc-ae68-5d510d3abae0",
// 		"name": "0_Santa_Claus_Christmas_3840x2160.mp4",
// 		"userId": "1485a80a-3712-4bbf-a200-018dab61142c",
// 		"fileType": "video/mp4",
// 		"size": 33633179,
// 		"duration": 10,
// 		"width": 3840,
// 		"height": 2160,
// 		"originalUrl": "s3://video-transcoder-temp-bucket/0_Santa_Claus_Christmas_3840x2160.mp4",
// 		"createdAt": new Date("2026-01-25T17:48:57.745Z")
// 	},
// 	{
// 		"id": "a09a9dad-f021-471d-a394-bd323bbce981",
// 		"name": "funny-video.mp4",
// 		"userId": "c22ff3ff-6a20-4a0d-a10d-05e95a826991",
// 		"fileType": "video/mp4",
// 		"size": 641131,
// 		"duration": 11,
// 		"width": 1920,
// 		"height": 1080,
// 		"originalUrl": "s3://video-transcoder-temp-bucket/funny-video.mp4",
// 		"createdAt": new Date("2026-01-25T17:41:39.620Z")
// 	},
// 	{
// 		"id": "c380da4a-9698-4031-8ab0-8ea233278ce7",
// 		"name": "funny-video.mp4",
// 		"userId": "a044e960-7acf-4f84-afe6-0ccfcb897579",
// 		"fileType": "video/mp4",
// 		"size": 641131,
// 		"duration": 11,
// 		"width": 1920,
// 		"height": 1080,
// 		"originalUrl": "s3://video-transcoder-temp-bucket/funny-video.mp4",
// 		"createdAt": new Date("2026-01-25T17:38:37.842Z")
// 	},
// 	{
// 		"id": "b539526f-e9d6-4d21-9db6-a3140de4f80c",
// 		"name": "0_Santa_Claus_Christmas_3840x2160.mp4",
// 		"userId": "0e242c5a-d19e-4684-b974-fd8908b1321c",
// 		"fileType": "video/mp4",
// 		"size": 33633179,
// 		"duration": 10,
// 		"width": 3840,
// 		"height": 2160,
// 		"originalUrl": "s3://video-transcoder-temp-bucket/0_Santa_Claus_Christmas_3840x2160.mp4",
// 		"createdAt": new Date("2026-01-25T17:36:45.662Z")
// 	},
// 	{
// 		"id": "d6610fa9-6ecd-4d7b-b830-02ee051edae7",
// 		"name": "funny-video.mp4",
// 		"userId": "d20ac18f-73d4-44ce-b598-79ecf4149ff4",
// 		"fileType": "video/mp4",
// 		"size": 641131,
// 		"duration": 11,
// 		"width": 1920,
// 		"height": 1080,
// 		"originalUrl": "s3://video-transcoder-temp-bucket/funny-video.mp4",
// 		"createdAt": new Date("2026-01-25T17:31:12.015Z")
// 	},
// 	{
// 		"id": "124a6420-1045-4120-bf13-7f4748b5f869",
// 		"name": "0_Santa_Claus_Christmas_3840x2160.mp4",
// 		"userId": "5945c261-7f86-431e-9a52-4911c8ae43cf",
// 		"fileType": "video/mp4",
// 		"size": 33633179,
// 		"duration": 10,
// 		"width": 3840,
// 		"height": 2160,
// 		"originalUrl": "s3://video-transcoder-temp-bucket/0_Santa_Claus_Christmas_3840x2160.mp4",
// 		"createdAt": new Date("2026-01-25T17:26:59.337Z")
// 	},
// 	{
// 		"id": "53ee29c6-74a7-4f75-9343-32eb778b4673",
// 		"name": "0_Santa_Claus_Christmas_3840x2160.mp4",
// 		"userId": "5945c261-7f86-431e-9a52-4911c8ae43cf",
// 		"fileType": "video/mp4",
// 		"size": 33633179,
// 		"duration": 10,
// 		"width": 3840,
// 		"height": 2160,
// 		"originalUrl": "s3://video-transcoder-temp-bucket/0_Santa_Claus_Christmas_3840x2160.mp4",
// 		"createdAt": new Date("2026-01-25T17:26:56.940Z")
// 	},
// 	{
// 		"id": "2230d000-f53b-4d27-954d-96518f3bacb2",
// 		"name": "funny-video.mp4",
// 		"userId": "eeed37dc-d022-4e9d-894a-4ab0a01edf70",
// 		"fileType": "video/mp4",
// 		"size": 641131,
// 		"duration": 11,
// 		"width": 1920,
// 		"height": 1080,
// 		"originalUrl": "s3://video-transcoder-temp-bucket/funny-video.mp4",
// 		"createdAt": new Date("2026-01-22T11:37:19.536Z")
// 	}
// ]

export default async function page() {
	const videos = await getVideos();

	return (
		<div className='px-6 py-4'>
			<div className="text-xl">
				Storage
			</div>
			<div className="text-xs text-muted-foreground mt-1.5 mb-6 tracking-wide">
				Find all the input files
			</div>
			{videos.length > 0 ?
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{videos.map((video, i) => <FileCard key={i} video={video} />)}
				</div>
				:
				<div className="p-16 flex flex-col justify-center items-center border gap-3 rounded-lg">
					<div className="bg-muted text-foreground p-2.5 rounded-lg">
						<FileVideo className='size-6' />
					</div>
					<div className="font-medium tracking-tight">
						No Videos Yet
					</div>
					<div className="text-muted-foreground text-sm text-center max-w-3xs">
						You haven't created any transcoding job yet. Get started by creating your first job.
					</div>
					<div>
						<Button asChild variant={"outline"}>
							<a href="/upload-video">
								Start Transcoding
							</a>
						</Button>
					</div>
				</div>
			}
		</div>
	)
}
