export * from './constants';
export * from './datetime';
export * from './SvgIcon';

export const getFileSizeWithUnit = (size: number): string => {
    const fileInKb = Math.round(size / 1024);
    return fileInKb < 1024 ? fileInKb + " KB" : Math.round(fileInKb / 1024) + " MB";
};