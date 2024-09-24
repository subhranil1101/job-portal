import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { getAdminJobs, getAllJob, getJobById, postJob } from '../controllers/job.controller.js'

const router = express.Router()

router.route("/post").post(isAuthenticated, postJob)
router.route("/get").get(isAuthenticated, getAllJob)
router.route("/get/:id").get(isAuthenticated, getJobById)
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs)

export default router