import { WorkerData } from "@repo/types";
import { redisConnection } from "./utils";

export class WorkerMonitor {
    private currentJobId: string | null = null;
    public workerId: string;
    private redisClient = redisConnection;

    constructor(wid: string) {
        this.workerId = wid;
    }

    async sendHeartBeat() {
        const cpuUsage = process.cpuUsage().user;
        const memUsageMB = process.memoryUsage().heapUsed / 1024 / 1024;

        const heartBeatData: WorkerData = {
            workerId: this.workerId,
            status: this.currentJobId ? "RUNNING" : "IDLE",
            currentJobId: this.currentJobId,
            cpu: cpuUsage,
            memoryUsed: memUsageMB,
            heartBeatAt: Date.now()
        }

        await this.redisClient.hset(this.workerId, heartBeatData);
        await this.redisClient.expire(this.workerId, 15); // expiry for worker - 15s
        await this.redisClient.sadd("known_workers", this.workerId);
    }

    setCurrentJobId(id: string | null) {
        this.currentJobId = id;
    }

}