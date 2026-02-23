import { WorkerData } from "@repo/types";
import client from "prom-client";
import { register } from "./registry";

export const cpuGauge = new client.Gauge({
    name: "worker_cpu_usage",
    help: "CPU usage of worker(0-1)",
    labelNames: ["worker_id"],
    registers: [register]
});

export const memoryGauge = new client.Gauge({
    name: "worker_memory_usage_ratio",
    help: "Memory usage ratio(used/limit)",
    labelNames: ["worker_id"],
    registers: [register]
});


export function updateWorkerMetrics(workerData: WorkerData) {
    cpuGauge.set({ worker_id: workerData.workerId }, workerData.cpu);
    memoryGauge.set({ worker_id: workerData.workerId }, workerData.memoryUsed / workerData.memoryLimit);
}