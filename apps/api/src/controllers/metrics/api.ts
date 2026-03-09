import { Request, Response } from "express";
import { formatSeries, parseRange } from "../../helpers";
import { query, queryRange } from "../../services/prometheus";

export const getRequestRate = async (req: Request, res: Response) => {
    try {
        const requestRate = await query("sum(rate(api_http_requests_total[1m]))*60");
        return res.status(200).json({ unit: "req/min", rate: requestRate });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

export const getLatency = async (req: Request, res: Response) => {
    try {
        const latency = await query("histogram_quantile(0.95,sum(rate(api_http_request_duration_seconds_bucket[5m])) by (le))*1000");
        return res.status(200).json({ unit: "ms", latency });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

export const getKpiData = async (req: Request, res: Response) => {
    try {
        // throughput for worker
        const throughputQueryProm = query('sum(rate(worker_jobs_processed_total{status="success"}[1m]))*60');

        // requestRate for api 
        const requestRateProm = query("sum(rate(api_http_requests_total[1m]))*60");

        // p95Encode latency for api;
        const latencyProm = query("histogram_quantile(0.95,sum(rate(api_http_request_duration_seconds_bucket[5m])) by (le))*1000");

        // avg-encode-time for worker
        const avgEncodeQueryProm = query('sum(rate(worker_job_duration_seconds_sum[5m])) / sum(rate(worker_job_duration_seconds_count[5m]))')

        // errorRate for worker
        const errorRateQueryProm = query('(sum(rate(worker_jobs_processed_total{status="failed"}[5m])) / sum(rate(worker_jobs_processed_total[5m]))) * 100');

        const [throughput, requestRate, avgEncode, latency, errorRate] = (await Promise.all([throughputQueryProm, requestRateProm, avgEncodeQueryProm, latencyProm, errorRateQueryProm]));
        return res.status(200).json({ throughput, requestRate, avgEncode, latency, errorRate });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}



export const getCpu = async (req: Request, res: Response) => {
    try {
        const range = req.query["range"] as string;
        const { start, end, step } = parseRange(range);

        const resp = await queryRange('rate(process_cpu_seconds_total{job="api"}[1m])*100', start, end, step);
        const data = formatSeries(resp[0].values); //  [{ timeStamp: "time_in_seconds", value: float_value }]
        return res.status(200).json({ metric: "cpu", unit: "%", data })
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

export const getMem = async (req: Request, res: Response) => {
    try {
        const range = req.query["range"] as string;
        const { start, end, step } = parseRange(range);

        const resp = await queryRange('process_resident_memory_bytes{job="api"}/1024/1024', start, end, step);
        const data = formatSeries(resp[0].values); //  [{ timeStamp: "time_in_seconds", value: float_value }]

        return res.status(200).json({ metric: "mem", unit: "MB", data });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

