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

    const [isDownloading, setIsDownloading] = useState<boolean>(false);

    const createDownloadUrl = useMutation({
        mutationFn: () =>
            axios.post(`${API_URL}/download-file-url`, { url, bucket: buttonType }).then(res => res.data),
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        }
    });

    const downloadFile = async () => {
        if (!url) return;

        setIsDownloading(true);
        try {
            const { signedUrl } = await createDownloadUrl.mutateAsync();
            window.location.href = signedUrl;
            toast.success("Downloading successfull");
        } catch (error) {
            console.log(error);
            toast.error("Failed to download file");
        } finally {
            setIsDownloading(false);
        }
    };


    return (
        <Button variant={"secondary"} className={cn(buttonVariants({ variant, size, className }), "cursor-pointer")} disabled={disabled || isDownloading} onClick={downloadFile}>
            {children}
            {isDownloading ? <Loader className='animate-spin' /> : <Download />}
        </Button>

    )
}
