import express from 'express';
import {employergetAllApplications,jobSeekergetAllApplications,jobSeekerDeleteApplication,postApplication} from '../controllers/applicationController.js';
import { isAuthorized } from '../middleware/auth.js';
const router= express.Router();

router.get("/jobseeker/getall",isAuthorized,jobSeekergetAllApplications);
router.get("/employer/getall", isAuthorized, employergetAllApplications);
router.delete("/delete/:id",isAuthorized,jobSeekerDeleteApplication);
router.post("/post",isAuthorized,postApplication);

export default router;