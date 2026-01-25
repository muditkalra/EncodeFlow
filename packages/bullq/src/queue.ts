import { Queue } from "bullmq";
import { Redis } from "ioredis";

export function createQueue(queueName: string, redisConnection: Redis) {
    return new Queue(queueName, {
        connection: redisConnection.options,
        defaultJobOptions: {
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 1000,
            }
        }
    })
}


