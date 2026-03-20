import type { Metadata } from "next";

export const baseMetadata: Metadata = {
    title: "EncodeFlow — High-Performance Video Transcoding",
    description: "A lightning-fast, open-source video transcoding engine built for modern workflows.",
    keywords: ["video-transcoder", "ffmpeg", "media-processing", "encodeflow"],
    authors: [{ name: "Mudit kalra" }],
    creator: "Mudit kalra",
    manifest: '/manifest.json',
    // Open Graph
    openGraph: {
        title: "EncodeFlow — High-Performance Video Transcoding",
        description: "Modern video transcoding simplified. High-efficiency encoding, cloud-ready, and open-source.",
        url: "https://encodeflow.muditkalra.in",
        siteName: "encodeflow",
        images: [
            {
                url: "https://encodeflow.muditkalra.in/og/og-image.png", // Must be an absolute URL
                width: 1200,
                height: 630,
                alt: "EncodeFlow preview",
            },
        ],
        locale: "en_IN",
        type: "website",
    },

    // Twitter
    twitter: {
        card: "summary_large_image",
        title: "EncodeFlow | High-Performance Video Transcoding",
        description: "The open-source engine for fast media processing.",
        images: ["https://encodeflow.com/og/og-image.png"], // Absolute URL
        creator: "@muditkalra_45",
    },

    // Search Engine Bot Instructions
    robots: {
        index: true,
        follow: true,
    },
};