import express from 'express';
import {getAllJobs,postJob,getmyJobs,updateJob,deleteJob,getSingleJob } from '../controllers/jobController.js';
import { isAuthorized } from '../middleware/auth.js';
const router= express.Router();


router.get('/getJobs', getAllJobs);
router.post("/post", isAuthorized, postJob);
router.get("/getmyJobs", isAuthorized, getmyJobs);
router.get("/getJob/:id", getSingleJob);
router.put("/updateJob/:id", isAuthorized, updateJob);
router.delete("/deleteJob/:id", isAuthorized, deleteJob);

export default router;