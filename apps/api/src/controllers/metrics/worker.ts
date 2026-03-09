import { Request, Response } from "express";
import { formatSeries, mergeSeries, parseRange } from "../../helpers";
import { query, queryRange } from "../../services/prometheus";

// all worker cpu usage, return avg and max % usage
export const getCpuMetrics = async (req: Request, res: Response) => {
    try {
        const range = req.query["range"] as string;
        const { start, end, step } = parseRange(range);

        // avg cpu
        const avgRespProm = await queryRange("avg(worker_cpu_usage)*100", start, end, step);
        // max cpu
        const maxRespProm = await queryRange("max(worker_cpu_usage)*100", start, end, step);

        const [avgResp, maxResp] = await Promise.all([avgRespProm, maxRespProm]);

        const data = mergeSeries(avgResp, maxResp, "avg", "max");

        return res.status(200).json({ metric: "cpu", unit: "%", data });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

// all worker mem usage, return avg and max % usage
export const getMemMetrics = async (req: Request, res: Response) => {
    try {
        const range = req.query["range"] as string;
        const { start, end, step } = parseRange(range);

        // avg cpu
        const avgRespProm = queryRange("avg(worker_memory_usage_ratio)*100", start, end, step);
        // max cpu
        const maxRespProm = queryRange("max(worker_memory_usage_ratio)*100", start, end, step);

        const [avgResp, maxResp] = await Promise.all([avgRespProm, maxRespProm]);

        const data = mergeSeries(avgResp, maxResp, "avg", "max");

        return res.status(200).json({ metric: "mem", unit: "%", data });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}


// // get kpi data for all worker, returns {througput, avgEncodetime, p95encode, errorrate}
// export const getKpiData = async (req: Request, res: Response) => {
//     try {
//         // throughput
//         const throughputQueryProm = query('sum(rate(worker_jobs_processed_total{status="success"}[1m]))*60');

//         // avg-encode-time
//         const avgEncodeQueryProm = query('sum(rate(worker_job_duration_seconds_sum[5m])) / sum(rate(worker_job_duration_seconds_count[5m]))')

//         // p95Encode;
//         const p95QueryProm = query("histogram_quantile(0.95, sum(rate(worker_job_duration_seconds_bucket[5m])) by (le))");

//         // errorRate
//         const errorRateQueryProm = query('(sum(rate(worker_jobs_processed_total{status="failed"}[5m])) / sum(rate(worker_jobs_processed_total[5m]))) * 100');

//         const [throughput, avgEncode, p95Encode, errorRate] = (await Promise.all([throughputQueryProm, avgEncodeQueryProm, p95QueryProm, errorRateQueryProm]));
//         return res.status(200).json({ throughput, avgEncode, p95Encode, errorRate });
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json(error);
//     }
// }


// single worker cpu usage based on /:id, return cpu usage in %
export const getWorkerCpuMetrics = async (req: Request, res: Response) => {
    try {
        const range = req.query["range"] as string;
        const workerId = req.params.id as string;
        const { start, end, step } = parseRange(range);

        const resp = await queryRange(`worker_cpu_usage{worker_id="${workerId}"}*100`, start, end, step);
        const data = formatSeries(resp[0].values); //  [{ timeStamp: "time_in_seconds", value: float_value }]
        return res.status(200).json({ metric: "cpu", unit: "%", data });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

// single worker mem usage based on /:id, return mem usage in %
export const getWorkerMemMetrics = async (req: Request, res: Response) => {
    try {
        const range = req.query["range"] as string;
        const workerId = req.params.id as string;
        const { start, end, step } = parseRange(range);

        const resp = await queryRange(`worker_memory_usage_ratio{worker_id="${workerId}"}*100`, start, end, step);
        const data = formatSeries(resp[0].values); //  [{ timeStamp: "time_in_seconds", value: float_value }]
        return res.status(200).json({ metric: "mem", unit: "%", data });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}