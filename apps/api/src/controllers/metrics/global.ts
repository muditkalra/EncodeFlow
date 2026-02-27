import { Request, Response } from "express";
import { mergeSeries, parseRange } from "../../helpers";
import { queryRange } from "../../helpers/prom";

export const getCpuMetrics = async (req: Request, res: Response) => {
    try {
        const range = req.query["range"] as string;
        const { start, end, step } = parseRange(range);

        // avg cpu
        const avgResp = await queryRange("avg(worker_cpu_usage)*100", start, end, step);
        // max cpu
        const maxResp = await queryRange("max(worker_cpu_usage)*100", start, end, step);

        const data = mergeSeries(avgResp, maxResp, "avg", "max");

        return res.status(200).json({ metric: "cpu", unit: "%", data });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

export const getMemMetrics = async (req: Request, res: Response) => {
    try {
        const range = req.query["range"] as string;
        const { start, end, step } = parseRange(range);

        // avg cpu
        const avgResp = await queryRange("avg(worker_memory_usage_ratio)*100", start, end, step);
        // max cpu
        const maxResp = await queryRange("max(worker_memory_usage_ratio)*100", start, end, step);

        const data = mergeSeries(avgResp, maxResp, "avg", "max");

        return res.status(200).json({ metric: "mem", unit: "%", data });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

