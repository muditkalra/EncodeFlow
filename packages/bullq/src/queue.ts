import { Queue } from "bullmq";

export function createQueue(queueName: string, redisUrl: string) {
    return new Queue(queueName, {
        connection: {
            url: redisUrl
        },
        defaultJobOptions: {
            attempts: 3,
            backoff: {
                type: "fixed",
                delay: 1000,
            }
        }
    })
}


