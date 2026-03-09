import { Router } from "express";
import jobRoutes from "./job.route";
import metricRoutes from "./metrics";
import s3Routes from "./s3.route";
import videoRoutes from "./video.route";
import workerRoutes from "./worker.route";

const router: Router = Router();

router.use('/jobs', jobRoutes);
router.use('/videos', videoRoutes);
router.use('/workers', workerRoutes);
router.use("/s3", s3Routes);
router.use('/metrics', metricRoutes);


export default router;