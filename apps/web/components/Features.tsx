import { ChartNoAxesCombined, FileVideoCamera, Repeat, Settings, Sparkles, Star } from 'lucide-react';
import React from 'react'

const features = [
    {
        icon: <Settings />,
        title: "Distributed Processing",
        description: "Jobs are queued and processed asynchronously using workers for high throughput and fault tolerance",
    },
    {
        icon: <FileVideoCamera />,
        title: "Multi-Format Encoding",
        description: "Generate HLS/DASH streams, multiple resolutions, and optimized codecs using FFmpeg",
    },
    {
        icon: <Repeat />,
        title: "Retry & Failure Handling",
        description: "Automatic retries, dead-letter queues, and job status tracking",
    },
    {
        icon: <ChartNoAxesCombined />,
        title: "Real-Time Monitoring",
        description: "Track job progress, failures, and processing time from a single dashboard",
    },
];


export default function Features() {
    return (
        <div className="flex flex-col gap-10 items-center text-center mb-24 xl:mx-10 xl:mt-20">
            <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-secondary text-secondary-foreground gap-2">
                    <Star className='text-primary fill-primary size-4!'/>
                    Features
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-4xl tracking-tight">
                        Powerful. Predictable. Production-Ready
                    </div>
                    <div className="text-muted-foreground text-lg tracking-wide">
                        Every part of the pipeline is optimized for asynchronous processing, fault tolerance, and high throughput.
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-4 gap-2">
                {features.map(({ icon, title, description }) => (
                    <div
                        key={title}
                        className="p-6 rounded-xl border flex flex-col items-center"
                    >
                        <div className="size-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-2.5">
                            {icon}
                        </div>
                        <h3 className="font-semibold mb-1.5">{title}</h3>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
