import { register } from "./registry";
import client from "prom-client";


export const httpRequestsTotal = new client.Counter({
    name: "api_http_requests_total",
    help: "Total HTTP requests",
    labelNames: ["method", "route", "status_code"],
    registers: [register]
});

export const httpRequestDuration = new client.Histogram({
    name: "api_http_request_duration_seconds",
    help: "HTTP request duration",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.01, 0.025, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 15], // 10ms to 15s
    registers: [register]
})

export const activeRequests = new client.Gauge({
    name: "api_active_requests",
    help: "Active requests",
    registers: [register]
});


export const jobCreatedTotal = new client.Counter({
    name: "api_jobs_created_total",
    help: "Total Jobs created",
    labelNames: ["format", "resolution", "includeAudio"],
    registers: [register]
})