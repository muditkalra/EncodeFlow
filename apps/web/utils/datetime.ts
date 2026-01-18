
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
 * 
 * @param endTime 
 * @param startTime 
 * @returns in millieconds;
 */
export function getTimediff(endTime: Date | number | string, startTime: Date | number | string) {
    return new Date(endTime).getTime() - new Date(startTime).getTime();
};
