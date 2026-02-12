
export function getRelativeTime(date: Date | string | number) {
    const now = new Date();
    const diffInSeconds = Math.floor(getTimediff(now, date) / 1000);

    const rtf = new Intl.RelativeTimeFormat('en-IN', { numeric: "always" });

    const units: { unit: Intl.RelativeTimeFormatUnit, seconds: number }[] = [
        { unit: 'year', seconds: 31536000 },
        { unit: 'month', seconds: 2592000 },
        { unit: 'week', seconds: 604800 },
        { unit: 'day', seconds: 86400 },
        { unit: 'hour', seconds: 3600 },
        { unit: 'minute', seconds: 60 },
        { unit: 'second', seconds: 1 }
    ];

    for (const { seconds, unit } of units) {
        const interval = Math.floor(diffInSeconds / seconds);
        if (interval >= 1) {
            return rtf.format(-interval, unit);
        }
    }
    return rtf.format(0, "second");
}

/**
 * This function formats time in seconds, minutes
 * @param milliseconds 
 * @returns {string} 4s, 4m 12s, 1h 28m etc.
 */
export function formatTime(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    // Format based on duration
    if (hours > 0) {
        return `${hours}h ${minutes % 60}m `
    } else if (minutes > 0) {
        return `${minutes}m ${seconds % 60}s`;
    } else if (seconds > 0) {
        return `${seconds}s`;
    } else {
        return `${milliseconds}ms`;
    }
}


export function calculateProcessingTime(endTime: Date | null, startTime: Date | null): string {
    if (!endTime || !startTime) {
        return "-";
    }

    const milliseconds = getTimediff(endTime, startTime);
    return formatTime(milliseconds);
};


/**
 * 
 * @param endTime 
 * @param startTime 
 * @returns in milliseconds;
 */
export function getTimediff(endTime: Date | number | string, startTime: Date | number | string) {
    return new Date(endTime).getTime() - new Date(startTime).getTime();
};
