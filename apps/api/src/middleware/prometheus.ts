import { NextFunction, Request, Response } from "express";
import { activeRequests, httpRequestDuration, httpRequestsTotal } from "../metrics";

export function prometheusMiddleware(req: Request, res: Response, next: NextFunction) {
    const start = process.hrtime();

    activeRequests.inc();

    res.on("finish", () => {
        const diff = process.hrtime(start);
        const duration = diff[0] + (diff[1] / 1e9); // in seconds

        const route = req.route ? req.baseUrl + req.route.path : req.path;

        httpRequestsTotal.inc({ method: req.method, route, status_code: res.statusCode });
        httpRequestDuration.observe({ method: req.method, route, status_code: res.statusCode }, duration);
        activeRequests.dec();
    })

    next();
}