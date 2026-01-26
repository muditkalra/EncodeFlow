export type WorkerStatus = "IDLE" | "RUNNING" | "DRAINING";

export interface WorkerData {
    workerId: string;
    status: WorkerStatus;
    currentJobId: string | null;
    cpu: number; 
    memoryUsed: number; // in MB
    heartBeatAt: number
}