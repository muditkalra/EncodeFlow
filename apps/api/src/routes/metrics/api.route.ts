import { Router } from "express";
import { getCpu, getKpiData, getMem } from "../../controllers/metrics/api";

const router: Router = Router();

router.get("/cpu", getCpu);
router.get("/mem", getMem);
// router.get("/request-rate", getRequestRate);
// router.get("/latency", getLatency);

// global indicator, comprises all worker and api related data;
router.get("/kpi", getKpiData);

export default router;