import { Router } from "express";
import { getCpuMetrics, getKpiData, getMemMetrics } from "../../controllers/metrics/global";

const router: Router = Router();

// All global metric related routes, global includes worker, api etc.
router.get("/cpu", getCpuMetrics);
router.get("/mem", getMemMetrics);
router.get("/kpi", getKpiData);

export default router;