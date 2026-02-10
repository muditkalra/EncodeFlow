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