import { type Redis } from "@repo/bullq";
import { WorkerData, WorkerJobStage } from "@repo/types";
import fs from "fs";
import os from "os";
import { redisConnection } from "./utils";

export class WorkerMonitor {
    private currentJobId: string | null = null;
    private jobStage: WorkerJobStage | null = null;
    public workerId: string;
    private redisClient: Redis = redisConnection;
    private previousCpuUsage: number | null = null;
    private previousTime: number | null = null;
    private memoryLimit: number;
    private cpuCores: number;
    private startedAt: number;

    constructor(wid: string) {
        this.workerId = wid;
        this.memoryLimit = this.readMemoryLimit();
        this.cpuCores = this.readCpuCores();
        this.startedAt = Date.now() // for worker uptime;
    }

    sendHeartBeat = async () => {
        const cpuUsage = this.getCpuUsage(); // between 0 -> 1
        const memUsage = this.readMemoryUsage(); // in bytes

        const heartBeatData: WorkerData = {
            workerId: this.workerId,
            status: this.currentJobId ? "RUNNING" : "IDLE",
            currentJobId: this.currentJobId,
            jobStage: this.jobStage,
            cpu: cpuUsage,
            cpuCores: this.cpuCores,
            memoryUsed: memUsage,
            memoryLimit: this.memoryLimit,
            heartBeatAt: Date.now(),
            uptime: Math.floor((Date.now() - this.startedAt) / 1000) // uptime in seconds;
        };


        await this.redisClient.hset(this.workerId, heartBeatData);
        await this.redisClient.expire(this.workerId, 15); // expiry for worker - 15s
        await this.redisClient.sadd("known_workers", this.workerId);
    }

    setCurrentJobId = (id: string | null) => {
        this.currentJobId = id;
    }

    setJobStage = (stage: WorkerJobStage | null) => {
        this.jobStage = stage;
    }

    getCpuUsage() {
        const currentCpuUsage = this.readCpuUsage(); // usage in microseconds
        const currentTime = Date.now();
        const cpuCores = this.cpuCores;

        if (!this.previousCpuUsage || !this.previousTime) {
            this.previousCpuUsage = currentCpuUsage;
            this.previousTime = currentTime;
            return 0;
        }

        const cpuDelta = (currentCpuUsage - this.previousCpuUsage) / 1_000_000; // converting from microseconds to second
        const deltaTime = (currentTime - this.previousTime) / 1000; // converting from milliseconds to seconds

        const cpuUsage = cpuDelta / deltaTime / cpuCores;

        this.previousCpuUsage = currentCpuUsage;
        this.previousTime = currentTime;

        return cpuUsage;
    }

    // memory usage for container, fallback to system memory usage
    private readMemoryUsage(): number {
        // cgroup v2
        try {
            return Number(fs.readFileSync("/sys/fs/cgroup/memory.current", "utf8"));
        } catch { }

        // cgroup v1
        try {
            return Number(fs.readFileSync("/sys/fs/cgroup/memory/memory.usage_in_bytes", "utf8"));
        } catch { }

        // fallback (Node process only)
        return process.memoryUsage().rss;
    }

    // memory limit for container, fallback to system memory
    private readMemoryLimit(): number {
        try {
            const limit = fs.readFileSync("/sys/fs/cgroup/memory.max", "utf8").trim(); //cgroup v2;
            if (limit !== "max") return Number(limit);
        } catch { }
        try {
            const limit = Number(fs.readFileSync("/sys/fs/cgroup/memory/memory.limit_in_bytes", "utf8")); // cgroup v1
            if (limit > 0 && limit < os.totalmem()) return limit;
        } catch { }
        return os.totalmem();
    }

    // cpu cores for container, fallback to system cores
    private readCpuCores() {
        // cgroup v2;
        try {
            const cpuMax = fs.readFileSync("/sys/fs/cgroup/cpu.max", "utf8").trim();
            const [quota, period] = cpuMax.split(" ");
            if (quota !== "max") {
                return Number(quota) / Number(period);
            }
        } catch { }

        // cgroup v1;
        try {
            const quota = Number(fs.readFileSync("/sys/fs/cgroup/cpu/cpu.cfs_quota_us", "utf8"));
            const period = Number(fs.readFileSync("/sys/fs/cgroup/cpu/cpu.cfs_period_us", "utf8"));

            if (quota > 0 && period > 0) {
                return quota / period;
            }
        } catch { }

        return os.cpus().length;
    }

    // cpu usage for container, 
    //! Action Required:  no fallback for system
    private readCpuUsage(): number {
        //cgroup-v2
        try {
            const stat = fs.readFileSync("/sys/fs/cgroup/cpu.stat", "utf8");
            const line = stat.split("\n").find(l => l.startsWith("usage_usec"));
            if (line) {
                return Number(line.split(" ")[1]);
            }
        } catch { }

        // cgroup-v1
        try {
            const usage = fs.readFileSync("/sys/fs/cgroup/cpuacct/cpuacct.usage", "utf8");
            return Number(usage) / 1000 // nano to microseconds
        } catch { }

        return 0; // system cpu usage looks like this  = { user:number, system:number };
    }

}