import { GetObjectCommand, getSignedUrl, PutObjectCommand } from "@repo/s3";
import { Request, Response } from "express";
import { awsS3TempBucketName, transcodedBucketName } from "../config/constants";
import { parseS3Url, s3Client } from "../utils";

// 1. frontend call this to get signed url to put objects in s3;
// url will look like this, /s3/getUploadUrl?video-title=xyz&format=video/*
export const getUploadUrl = async (req: Request, res: Response) => {
    try {
        const fileName = req.query["video-title"];
        const format = req.query["format"];

        if (!fileName || !format) {
            return res.status(500).json({ message: "Cannot Create url without video-title or format" });
        }

        const command = new PutObjectCommand({
            Bucket: awsS3TempBucketName,
            Key: `${fileName}`,
            ContentType: `${format}`
        })

        const url = await getSignedUrl(s3Client, command, { expiresIn: 300 }); // expires in 5min

        return res.json({ url, fileName });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to generate upload url" });
    }
}

// getting direct-download url for the input and output file
export const createDownloadUrl = async (req: Request, res: Response) => {
    try {
        const { url, bucket } = req.body as { url: string, bucket: "original" | "output" };

        let key = parseS3Url(url, transcodedBucketName); // getting filename from url;
        let bucketName = transcodedBucketName;
        if (bucket == "original") {
            key = parseS3Url(url, awsS3TempBucketName);
            bucketName = awsS3TempBucketName;
        }

        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: key,
            ResponseContentDisposition: `attachment; filename="${key}"`,
            ResponseContentType: 'application/octet-stream'
        })

        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 600 });
        return res.status(200).json({ signedUrl });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}