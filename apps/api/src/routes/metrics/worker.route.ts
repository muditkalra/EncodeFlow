import { Router } from "express";
import { getCpuMetrics, getMemMetrics, getWorkerCpuMetrics, getWorkerMemMetrics } from "../../controllers/metrics/worker";

const router: Router = Router();

// All worker metric related routes
router.get("/all/cpu", getCpuMetrics); // all workers cpu metric
router.get("/all/mem", getMemMetrics); // all workers mem metric

// single worker related routes
router.get("/:id/cpu", getWorkerCpuMetrics); // single worker cpu metric
router.get("/:id/mem", getWorkerMemMetrics); // single worker mem metric


export default router;