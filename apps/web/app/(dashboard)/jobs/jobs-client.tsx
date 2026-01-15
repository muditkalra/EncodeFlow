"use client";
import { API_URL } from '@/utils/constants';
import { JobType, VideoType } from '@repo/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { DataTable } from './data-table';
import { columns } from './columns';

type ColDef = JobType & {
    video: VideoType
}

export default function JobsClient() {
    const { data } = useQuery<ColDef[]>({
        queryKey: ["alljobs"],
        queryFn: () => axios.get(`${API_URL}/videos`).then(res => res.data),
        refetchInterval: 30_000, // 👈 polling every 30s
    });

    console.log(data);

    return (
        <DataTable columns={columns} data={data || []} />
    )
}
