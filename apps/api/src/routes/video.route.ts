import { Router } from "express";
import { getAllVideos } from "../controllers/video";

const router: Router = Router();

router.get("/all", getAllVideos);

export default router;