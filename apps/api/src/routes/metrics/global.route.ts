import { Router } from "express";
import { getCpuMetrics, getMemMetrics } from "../../controllers/metrics/global";

const router: Router = Router();

// All global metric related routes, global includes worker, api etc.
router.get("/cpu", getCpuMetrics);
router.get("/mem", getMemMetrics);

export default router;


// start - need to be unix stamp
// end - need to be unix stamp
// step - 15s and 30s 