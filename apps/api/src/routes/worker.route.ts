import { Router } from "express";
import { getAllWorker, getMetricData, getWorkerData } from "../controllers/worker";

const router: Router = Router();


router.get('/all', getAllWorker);
router.get('/metricdata', getMetricData);
router.get('/workerDetail/:id', getWorkerData);


export default router;