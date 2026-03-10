import { Router } from "express";
import { createDownloadUrl, uploadUrl } from "../controllers/s3";

const router: Router = Router();

router.post('/UploadUrl', uploadUrl);
router.post('/downloadUrl', createDownloadUrl);

export default router;