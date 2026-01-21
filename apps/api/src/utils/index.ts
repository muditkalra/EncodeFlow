
export function parseS3Url(url: string, bucketName: string): string {
    const key = url.replace(`s3://${bucketName}/`, '');
    return key;
}