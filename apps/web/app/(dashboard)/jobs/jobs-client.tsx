"use client";
import { ColumnType } from '@/types';
import { API_URL } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { columns } from './columns';
import { DataTable } from './data-table';

type ColDef = ColumnType;

const dummyData: ColDef[] = [
    {
        "id": "ee5f6d11-26fa-414f-808a-8ef55e0c3365",
        "videoId": "e035439c-cd81-44bd-8765-93918c5c3582",
        "status": "PROCESSING",
        "progress": 70,
        "outputConfig": "{\"format\":\"mp4\",\"resolution\":\"1080p\",\"includeAudio\":true}",
        "outputUrl": "s3://video-transcoder-transcoded-bucket/ee5f6d11-26fa-414f-808a-8ef55e0c3365.mp4",
        "errorMessage": null,
        "startedAt": new Date("2026-01-14T06:33:30.837Z"),
        "finishedAt": null,
        "createdAt": new Date("2026-01-14T06:33:27.775Z"),
        "updatedAt": new Date("2026-01-14T06:33:41.596Z"),
        "video": {
            "id": "e035439c-cd81-44bd-8765-93918c5c3582",
            "name": "0_Santa_Claus_Christmas_3840x2160.mp4",
            "userId": "e127303b-1721-4ac9-a166-5e919fde8c7a",
            "fileType": "video/mp4",
            "size": 33633179,
            "duration": 10,
            "width": 3840,
            "height": 2160,
            "originalUrl": "s3://video-transcoder-temp-bucket/0_Santa_Claus_Christmas_3840x2160.mp4",
            "createdAt": new Date("2026-01-14T06:33:27.703Z")
        }
    },
    {
        "id": "79d05ea0-34b4-46c9-b9f1-ae5aa3dfab33",
        "videoId": "868de60c-9bc1-4017-aa85-be5766497f3e",
        "status": "COMPLETED",
        "progress": 100,
        "outputConfig": "{\"format\":\"mp4\",\"resolution\":\"1080p\",\"includeAudio\":true}",
        "outputUrl": "s3://video-transcoder-transcoded-bucket/79d05ea0-34b4-46c9-b9f1-ae5aa3dfab33.mp4",
        "errorMessage": null,
        "startedAt": new Date("2026-01-14T06:33:12.188Z"),
        "finishedAt": new Date("2026-01-14T06:33:17.395Z"),
        "createdAt": new Date("2026-01-14T06:33:11.634Z"),
        "updatedAt": new Date("2026-01-14T06:33:17.399Z"),
        "video": {
            "id": "868de60c-9bc1-4017-aa85-be5766497f3e",
            "name": "funny-video.mp4",
            "userId": "3c6f7c9a-73a8-452b-8be6-38a50c74a68b",
            "fileType": "video/mp4",
            "size": 641131,
            "duration": 11,
            "width": 1920,
            "height": 1080,
            "originalUrl": "s3://video-transcoder-temp-bucket/funny-video.mp4",
            "createdAt": new Date("2026-01-14T06:33:11.166Z")
        }
    },
    {
        "id": "271ef82f-3a9b-46c1-bc44-c4504b8a1a0b",
        "videoId": "0347d539-7919-4d20-9709-67d312b06e1b",
        "status": "COMPLETED",
        "progress": 100,
        "outputConfig": "{\"format\":\"mp4\",\"resolution\":\"1080p\",\"includeAudio\":true}",
        "outputUrl": "s3://video-transcoder-transcoded-bucket/271ef82f-3a9b-46c1-bc44-c4504b8a1a0b.mp4",
        "errorMessage": null,
        "startedAt": new Date("2026-01-14T06:30:39.258Z"),
        "finishedAt": new Date("2026-01-14T06:30:49.199Z"),
        "createdAt": new Date("2026-01-14T06:30:36.209Z"),
        "updatedAt": new Date("2026-01-14T06:30:49.202Z"),
        "video": {
            "id": "0347d539-7919-4d20-9709-67d312b06e1b",
            "name": "0_Santa_Claus_Christmas_3840x2160.mp4",
            "userId": "f3e40767-7ef0-46e3-8b73-0467b8e82895",
            "fileType": "video/mp4",
            "size": 33633179,
            "duration": 10,
            "width": 3840,
            "height": 2160,
            "originalUrl": "s3://video-transcoder-temp-bucket/0_Santa_Claus_Christmas_3840x2160.mp4",
            "createdAt": new Date("2026-01-14T06:30:36.120Z")
        }
    },
    {
        "id": "2649f99d-0533-43c6-b56e-5328ba3e7024",
        "videoId": "d2fdaac9-edb7-42f5-9068-8b08a90e090d",
        "status": "COMPLETED",
        "progress": 100,
        "outputConfig": "{\"format\":\"mp4\",\"resolution\":\"1080p\",\"includeAudio\":true}",
        "outputUrl": "s3://video-transcoder-transcoded-bucket/2649f99d-0533-43c6-b56e-5328ba3e7024.mp4",
        "errorMessage": null,
        "startedAt": new Date("2026-01-14T06:30:20.792Z"),
        "finishedAt": new Date("2026-01-14T06:30:25.834Z"),
        "createdAt": new Date("2026-01-14T06:30:20.371Z"),
        "updatedAt": new Date("2026-01-14T06:30:25.835Z"),
        "video": {
            "id": "d2fdaac9-edb7-42f5-9068-8b08a90e090d",
            "name": "funny-video.mp4",
            "userId": "0613ece9-d610-4d1b-a701-77f5ee5ea321",
            "fileType": "video/mp4",
            "size": 641131,
            "duration": 11,
            "width": 1920,
            "height": 1080,
            "originalUrl": "s3://video-transcoder-temp-bucket/funny-video.mp4",
            "createdAt": new Date("2026-01-14T06:30:20.270Z")
        }
    },
    {
        "id": "77d1d6e0-4f1c-495c-abbe-08c1c9a8ffa5",
        "videoId": "8c1a42db-e8d9-4f7f-af51-43bc18ff6058",
        "status": "COMPLETED",
        "progress": 100,
        "outputConfig": "{\"format\":\"mp4\",\"resolution\":\"1080p\",\"includeAudio\":true}",
        "outputUrl": "s3://video-transcoder-transcoded-bucket/77d1d6e0-4f1c-495c-abbe-08c1c9a8ffa5.mp4",
        "errorMessage": null,
        "startedAt": new Date("2026-01-14T06:25:43.835Z"),
        "finishedAt": new Date("2026-01-14T06:25:49.038Z"),
        "createdAt": new Date("2026-01-14T06:25:43.411Z"),
        "updatedAt": new Date("2026-01-14T06:25:49.042Z"),
        "video": {
            "id": "8c1a42db-e8d9-4f7f-af51-43bc18ff6058",
            "name": "funny-video.mp4",
            "userId": "c4127110-e544-4cb3-89c5-6c5064aa7686",
            "fileType": "video/mp4",
            "size": 641131,
            "duration": 11,
            "width": 1920,
            "height": 1080,
            "originalUrl": "s3://video-transcoder-temp-bucket/funny-video.mp4",
            "createdAt": new Date("2026-01-14T06:25:43.328Z")
        }
    },
    {
        "id": "95146156-1d91-409d-8d77-08a3d84fa12f",
        "videoId": "a125fa3a-4a93-42be-828a-44d50b057580",
        "status": "COMPLETED",
        "progress": 100,
        "outputConfig": "{\"format\":\"mp4\",\"resolution\":\"1080p\",\"includeAudio\":true}",
        "outputUrl": "s3://video-transcoder-transcoded-bucket/95146156-1d91-409d-8d77-08a3d84fa12f.mp4",
        "errorMessage": null,
        "startedAt": new Date("2026-01-14T06:25:16.414Z"),
        "finishedAt": new Date("2026-01-14T06:25:27.330Z"),
        "createdAt": new Date("2026-01-14T06:25:13.472Z"),
        "updatedAt": new Date("2026-01-14T06:25:27.331Z"),
        "video": {
            "id": "a125fa3a-4a93-42be-828a-44d50b057580",
            "name": "0_Santa_Claus_Christmas_3840x2160.mp4",
            "userId": "b90b4e6d-6f3a-4264-89ee-85fb9b5a4afd",
            "fileType": "video/mp4",
            "size": 33633179,
            "duration": 10,
            "width": 3840,
            "height": 2160,
            "originalUrl": "s3://video-transcoder-temp-bucket/0_Santa_Claus_Christmas_3840x2160.mp4",
            "createdAt": new Date("2026-01-14T06:25:13.388Z")
        }
    },
    {
        "id": "fe94b2bd-0e5a-4b41-9e5e-429db8d98ae8",
        "videoId": "4411cfe3-c07f-4335-9342-67a2ec94bbd7",
        "status": "COMPLETED",
        "progress": 100,
        "outputConfig": "{\"format\":\"mp4\",\"resolution\":\"1080p\",\"includeAudio\":true}",
        "outputUrl": "s3://video-transcoder-transcoded-bucket/fe94b2bd-0e5a-4b41-9e5e-429db8d98ae8.mp4",
        "errorMessage": null,
        "startedAt": new Date("2026-01-14T06:25:02.221Z"),
        "finishedAt": new Date("2026-01-14T06:25:08.391Z"),
        "createdAt": new Date("2026-01-14T06:25:01.730Z"),
        "updatedAt": new Date("2026-01-14T06:25:08.392Z"),
        "video": {
            "id": "4411cfe3-c07f-4335-9342-67a2ec94bbd7",
            "name": "funny-video.mp4",
            "userId": "9e241ead-79b8-4a95-a220-8feafdce35f5",
            "fileType": "video/mp4",
            "size": 641131,
            "duration": 11,
            "width": 1920,
            "height": 1080,
            "originalUrl": "s3://video-transcoder-temp-bucket/funny-video.mp4",
            "createdAt": new Date("2026-01-14T06:25:01.109Z")
        }
    },
    {
        "id": "1bea3b9f-ec6a-406a-b0d4-936b6ea197b3",
        "videoId": "4c389a6b-c731-4e51-ae72-1cd891e70677",
        "status": "COMPLETED",
        "progress": 100,
        "outputConfig": "{\"format\":\"mp4\",\"resolution\":\"1080p\",\"includeAudio\":true}",
        "outputUrl": "s3://video-transcoder-transcoded-bucket/1bea3b9f-ec6a-406a-b0d4-936b6ea197b3.mp4",
        "errorMessage": null,
        "startedAt": new Date("2026-01-14T06:20:57.001Z"),
        "finishedAt": new Date("2026-01-14T06:21:02.150Z"),
        "createdAt": new Date("2026-01-14T06:20:56.556Z"),
        "updatedAt": new Date("2026-01-14T06:21:02.153Z"),
        "video": {
            "id": "4c389a6b-c731-4e51-ae72-1cd891e70677",
            "name": "funny-video.mp4",
            "userId": "7cd07527-06e2-44c3-9188-0b41e245f156",
            "fileType": "video/mp4",
            "size": 641131,
            "duration": 11,
            "width": 1920,
            "height": 1080,
            "originalUrl": "s3://video-transcoder-temp-bucket/funny-video.mp4",
            "createdAt": new Date("2026-01-14T06:20:55.956Z")
        }
    },
    {
        "id": "7f716989-1f5e-4489-95dc-67c216b0d2fc",
        "videoId": "876bc8c6-0567-47ab-bffd-6a13cc5acca4",
        "status": "COMPLETED",
        "progress": 100,
        "outputConfig": "{\"format\":\"mp4\",\"resolution\":\"1080p\",\"includeAudio\":true}",
        "outputUrl": "s3://video-transcoder-transcoded-bucket/7f716989-1f5e-4489-95dc-67c216b0d2fc.mp4",
        "errorMessage": null,
        "startedAt": new Date("2026-01-14T06:18:45.880Z"),
        "finishedAt": new Date("2026-01-14T06:18:51.841Z"),
        "createdAt": new Date("2026-01-14T06:18:28.177Z"),
        "updatedAt": new Date("2026-01-14T06:18:51.843Z"),
        "video": {
            "id": "876bc8c6-0567-47ab-bffd-6a13cc5acca4",
            "name": "funny-video.mp4",
            "userId": "f0136188-3589-493f-9f70-d0d381d3d5b3",
            "fileType": "video/mp4",
            "size": 641131,
            "duration": 11,
            "width": 1920,
            "height": 1080,
            "originalUrl": "s3://video-transcoder-temp-bucket/funny-video.mp4",
            "createdAt": new Date("2026-01-14T06:18:27.566Z")
        }
    }
]

export default function JobsClient() {
    const { data, isLoading } = useQuery<ColDef[]>({
        queryKey: ["alljobs"],
        queryFn: () => axios.get(`${API_URL}/videos`).then(res => res.data),
        refetchInterval: 60_000, // polling every minute
    });


    return (
        <DataTable columns={columns} data={data || []} loading={isLoading} />
    )
}
