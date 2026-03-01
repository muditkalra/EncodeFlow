import { Request, Response } from "express";
import { formatSeries, mergeSeries, parseRange } from "../../helpers";
import { queryRange } from "../../helpers/prom";

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