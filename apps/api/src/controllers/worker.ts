import { WorkerData, WorkerMetricData } from "@repo/types";
import { Request, Response } from "express";
import { redisClient, videoQueue } from "../utils";

// gives data about all the workers currently alive
export const getAllWorker = async (req: Request, res: Response) => {
    try {
        const workers: WorkerData[] = [];
        const workersId = await redisClient.smembers("known_workers");

        for (const workerId of workersId) {
            const data = (await redisClient.hgetall(workerId)) as unknown as WorkerData;

            if (!data || Object.keys(data).length === 0) {
                await redisClient.srem("known_workers", workerId);
                continue;
            }
            workers.push(data);
        }
        return res.status(200).json(workers);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

// getting workers status;
export const getMetricData = async (req: Request, res: Response) => {
    try {
        const workers: WorkerData[] = [];
        const workersId = await redisClient.smembers("known_workers");

        for (const workerId of workersId) {
            const data = (await redisClient.hgetall(workerId)) as unknown as WorkerData;

            if (!data || Object.keys(data).length === 0) {
                await redisClient.srem("known_workers", workerId);
                continue;
            }
            workers.push(data);
        }
        const totalMem = workers.reduce((acc, w) => acc += Number(w.memoryLimit), 0);
        const { waiting, delayed } = await videoQueue.getJobCounts("waiting", "delayed");

        const workersMetricData: WorkerMetricData = {
            total: workers.length,
            running: workers.filter((w) => w.status == "RUNNING").length,
            idle: workers.filter((w) => w.status == "IDLE").length,
            cpu: workers.reduce((acc, w) => acc += Number(w.cpu), 0) / workers.length,
            mem: workers.reduce((acc, w) => acc += Number(w.memoryUsed), 0) / totalMem,
            depth: (waiting ?? 0) + (delayed ?? 0)
        }

        return res.status(200).json(workersMetricData);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

export const getWorkerData = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (!id) {
            throw new Error("Cannot fetch worker details without id");
        }
        const workerIdExistCheck = await redisClient.sismember("known_workers", id);
        if (!workerIdExistCheck) {
            throw new Error("Worker not found"); // worker is gone forever
        }

        const workerData = await redisClient.hgetall(id) as unknown as WorkerData;

        if (!workerData || Object.keys(workerData).length == 0) {
            await redisClient.srem("known_workers", id);
            throw new Error("Worker data not found. Probably Worker died");
        }
        return res.status(200).json(workerData);
    } catch (error) {
        if (error instanceof Error) {
            const statusCode = error.message.includes("not found") ? 410 : 404; // 410 for permanently unavailable
            return res.status(statusCode).json({ error: error.message });
        }
        return res.status(400).json({ error });
    }
}