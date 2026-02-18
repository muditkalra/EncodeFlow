"use client";

import { getRelativeTime } from "@/utils";
import { useEffect, useState } from "react";

/**
 * 
 * @param time you want to get relative from
 * @param interval Time you want to see change in time string text. Default: `5s`
 * @returns 
 */
export default function useRelativeTime(time: number | string | Date | undefined, interval: number = 5000) {
    const [relativeTime, setRelativeTime] = useState<string>("now");

    useEffect(() => {
        if (!time) return;

        const modifyRelativeTime = () => {
            const rt = getRelativeTime(time);
            setRelativeTime(rt);
        }
        const intervalId = setInterval(modifyRelativeTime, interval);
        return () => {
            clearInterval(intervalId);
        }

    }, [interval, time]);

    return relativeTime;
}
