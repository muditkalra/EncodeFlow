import { Router } from "express";
import globalMetricRoutes from "./api.route";
import workerMetricRoutes from "./worker.route";

const router: Router = Router();

// All the metric routes
router.use("/api", globalMetricRoutes);
router.use("/worker", workerMetricRoutes);

export default router;