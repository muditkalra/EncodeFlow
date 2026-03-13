import { Router } from "express";
import { getCpu, getKpiData, getMem } from "../../controllers/metrics/api";

const router: Router = Router();

router.get("/cpu", getCpu);
router.get("/mem", getMem);

// global indicator, comprises all worker and api related data;
router.get("/kpi", getKpiData);

export default router;