import { Router } from "express";
import { createJob, getActiveJobs, getAllJobs, getMetricData, getRecentJobs } from "../controllers/job";


const router: Router = Router();

router.post('/createJob', createJob);
router.get('/all', getAllJobs);
router.get('/active', getActiveJobs);
router.get('/recent', getRecentJobs);
router.get('/metricsdata', getMetricData);

export default router;