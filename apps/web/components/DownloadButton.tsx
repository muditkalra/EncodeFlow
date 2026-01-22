"use client";

import { cn } from '@/lib/utils';
import { API_URL } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { VariantProps } from 'class-variance-authority';
import { Download, Loader } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { Button, buttonVariants } from './ui/button';

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
            toast.success("Downloading Started...");
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
