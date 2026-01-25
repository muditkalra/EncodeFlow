import { S3Client } from "@aws-sdk/client-s3";

export function creates3Client(region: string,) {
    return new S3Client({
        region: region || "us-east-1",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
    });
}