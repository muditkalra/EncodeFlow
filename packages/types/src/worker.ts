export type WorkerStatus = "IDLE" | "RUNNING";

export type WorkerJobStage = "downloading" | "transcoding" | "uploading";

export interface WorkerData {
    workerId: string;
    status: WorkerStatus;
    currentJobId: string | null;
    jobStage: WorkerJobStage | null;
    cpu: number;
    cpuCores: number;
    memoryUsed: number; // in byte
    memoryLimit: number; // in byte
    heartBeatAt: number;
    uptime: number; // worker uptime in seconds;
};

export type WorkerMetricKeys = "total" | "running" | "idle" | "cpu" | "mem";

export type WorkerMetricData = Record<WorkerMetricKeys, number>;

export type WorkerChartData = {
    metric: "cpu" | "mem";
    unit: "%"
    data: { timeStamp: string, value: number }[]
}