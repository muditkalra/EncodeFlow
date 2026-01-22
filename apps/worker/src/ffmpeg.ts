import { formatDefaults, OutputConfigType, resolutionMap } from "@repo/types";


export function createFFmpegArgs(inputPath: string, config: OutputConfigType, outputPath: string): string[] {
    const { format, includeAudio, resolution } = config;
    const args = [
        "-i", inputPath,
        '-progress', 'pipe:2', // progress output to stderr
        "-nostats"
    ];

    const videoCodec = formatDefaults[format].video || 'libx264';
    args.push('-c:v', videoCodec);

    const [width, height] = (resolutionMap[resolution] || "1280x720").split("x");
    args.push('-vf', `scale=${width}:${height}`);

    if (includeAudio) {
        const aCodec = formatDefaults[format].audio || "aac";
        args.push('-c:a', aCodec);
    } else {
        args.push('-an'); // remove audio;
    }

    // container 
    const container = formatDefaults[format].container || format;
    args.push('-f', container);

    args.push(outputPath);

    return args;
}