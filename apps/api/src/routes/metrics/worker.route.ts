import { Router } from "express";
import { getWorkerCpuMetrics, getWorkerMemMetrics } from "../../controllers/metrics/worker";

const router: Router = Router();

// All worker metric related routes
router.get("/:id/cpu", getWorkerCpuMetrics);
router.get("/:id/mem", getWorkerMemMetrics);


export default router;