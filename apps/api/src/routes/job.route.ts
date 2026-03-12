import { Router } from "express";
import { createJob, getActiveJobs, getAllJobs, getMetricData, getRecentJobs } from "../controllers/job";
import { createJobLimiter } from "../middleware/ratelimiter";


const router: Router = Router();

router.post('/createJob', createJobLimiter, createJob);
router.get('/all', getAllJobs);
router.get('/active', getActiveJobs);
router.get('/recent', getRecentJobs);
router.get('/metricsdata', getMetricData);

export default router;