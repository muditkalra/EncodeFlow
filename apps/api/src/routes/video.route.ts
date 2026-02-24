import { Router } from "express";
import { getAllVideos } from "../controllers/video";

const router: Router = Router();

router.use("/all", getAllVideos);

export default router;