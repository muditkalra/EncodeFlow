import Redis from "ioredis";

export const createRedisConnection = (url: string) => {
    return new Redis(url, {
        maxRetriesPerRequest: null
    });
}