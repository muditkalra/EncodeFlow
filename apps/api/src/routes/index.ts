import { Router } from "express";
import jobRoutes from "./job.route";
import videoRoutes from "./video.route";
import workerRoutes from "./worker.route";
import s3Routes from "./s3.route"

const router: Router = Router();

router.use('/jobs', jobRoutes);
router.use('/videos', videoRoutes);
router.use('/workers', workerRoutes);
router.use("/s3", s3Routes);


export default router;