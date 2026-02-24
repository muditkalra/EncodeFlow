import { Router } from "express";
import { createDownloadUrl, getUploadUrl } from "../controllers/s3";

const router: Router = Router();

router.get('/getUploadUrl', getUploadUrl);
router.post('/downloadUrl', createDownloadUrl);

export default router;