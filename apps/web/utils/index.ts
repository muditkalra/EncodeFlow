export * from './constants';
export * from './datetime';
export * from './SvgIcon';

export const getFileSizeWithUnit = (size: number): string => {
    const fileInKb = Math.round(size / 1024);
    return fileInKb < 1024 ? fileInKb + " KB" : Math.round(fileInKb / 1024) + " MB";
};

export const formatToPercent = (value: number | undefined) => {
    return Number(value) >= 0 ? (Math.min(value ?? 0, 1) * 100).toFixed(2) : undefined;
}

/**
 * @param value in byte
 * 
 * @returns values to MB or GB. ex- 512 MB, 0.6 GB
 */
export const convertToMBGB = (value: number | undefined) => {
    if (!value) {
        return 0;
    }
    const mb = Number(value) / 1024 / 1024;
    return mb > 512 ? (mb / 1024).toPrecision(3) + " GB" : mb.toPrecision(3) + " MB";
}
