export type WorkerStatus = "IDLE" | "RUNNING";

export interface WorkerData {
    workerId: string;
    status: WorkerStatus;
    currentJobId: string | null;
    cpu: number;
    memoryUsed: number; // in byte
    memoryLimit: number; // in byte
    heartBeatAt: number;
};

export type WorkerMetricKeys = "total" | "running" | "idle" | "cpu" | "mem";

export type WorkerMetricData = Record<WorkerMetricKeys, number>;