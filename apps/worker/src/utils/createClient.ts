import { createRedisConnection } from "@repo/bullq";
import { creates3Client } from "@repo/s3";
import { awsS3Region, redisUrl } from "../config/constants";

export const s3Client: ReturnType<typeof creates3Client> = creates3Client(awsS3Region);
export const redisConnection: ReturnType<typeof createRedisConnection> = createRedisConnection(redisUrl);