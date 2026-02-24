import client from "prom-client";
import { register } from "./registry";

export const jobDurationHistogram = new client.Histogram({
    name: "worker_job_duration_seconds",
    help: "Job duration in seconds",
    labelNames: ["worker_id"],
    buckets: [30, 60, 120, 300, 600, 1200, 1500, 1800], // 30s to 30min,
    registers: [register]
});

export const jobProcessedCounter = new client.Counter({
    name: "worker_jobs_processed_total",
    help: "Total number of jobs processed",
    labelNames: ["worker_id", "status"],
    registers: [register]
});


export function recordJobData(workerId: string, durationSeconds: number, status: "success" | "failed") {
    jobProcessedCounter.inc({ worker_id: workerId, status });
    jobDurationHistogram.observe({ worker_id: workerId }, durationSeconds);
}