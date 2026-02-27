import { Router } from "express";
import globalMetricRoutes from "./metrics/global.route";
import workerMetricRoutes from "./metrics/worker.route";

const router: Router = Router();

// All the metric routes
router.use("/global", globalMetricRoutes);
router.use("/worker", workerMetricRoutes);

export default router;