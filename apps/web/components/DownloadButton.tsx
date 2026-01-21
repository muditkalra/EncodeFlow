"use client";

import React, { useState } from 'react'
import { Button, buttonVariants } from './ui/button'
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Download, Loader } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { API_URL } from '@/utils';
import axios from 'axios';
import { toast } from 'sonner';

type DownloadButtonProps = React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> &
{ buttonType: "original" | "output", url: string | null };


export default function DownloadButton({ className, children, disabled, buttonType, url, variant = "default", size = "default" }: DownloadButtonProps) {

    const createDownloadUrl = useMutation({
        mutationFn: async () => {
            const startTime = Date.now();
            const response = await axios.post(`${API_URL}/download-file-url`, { url, bucket: buttonType });

            const elapsed = Date.now() - startTime;
            const miniDuration = 500 // 500ms to show loading;

            if (elapsed < miniDuration) { // artificially slowing response as this query is being executed in (1-5)ms and ui looking flashy;
                await new Promise((resolve) => setTimeout(resolve, miniDuration - elapsed));
            }

            return response.data;
        },
        onSuccess: () => {

        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        }
    });

    const downloadFile = async () => {
        if (!url) return;


        try {
            const { signedUrl } = (await createDownloadUrl.mutateAsync()) as { signedUrl: string };
            window.location.href = signedUrl;
        } catch (error) {
            console.log(error);
            toast.error("Failed to download file");
        }
    };


    return (
        <Button variant={"secondary"} className={cn(buttonVariants({ variant, size, className }), "cursor-pointer")} disabled={disabled || createDownloadUrl.isPending} onClick={downloadFile}>
            {children}
            {createDownloadUrl.isPending ? <Loader className='animate-spin' /> : <Download />}
        </Button>

    )
}
