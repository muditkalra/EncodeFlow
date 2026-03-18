import express, { Express, Request, Response } from "express";
import { register } from "../metrics/registry";

export function startMetricServer(port: number = 9100) {
    const app: Express = express();

    app.get('/health', (req: Request, res: Response) => {
        res.status(200).json({
            status: "ok",
            uptime: process.uptime(),
            timestamp: Date.now()
        });
        return;
    });


    app.get('/metrics', async (req: Request, res: Response) => {
        console.log("WORKER: data scraped");
        const metrics = await register.metrics();
        res.set("Content-Type", register.contentType);
        res.end(metrics);
    });

    app.listen(port, () => {
        console.log(`worker is running on: http://localhost:${9100}`);
    });
}



