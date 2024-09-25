import { Application } from '../models/application.model.js'
import { Job } from '../models/job.model.js'

//apply a job
export const applyJob = async (req, res) => {
      try {
            //getting userId & jobId from req
            const userId = req.id;
            const jobId = req.params.id
            //if job id is not getting
            if (!jobId) {
                  return res.status(404).json({
                        message: "Job Id is required",
                        success: false
                  })
            }

            //check is the applicant is already applied or not
            const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
            if (existingApplication) {
                  return res.status(400).json({
                        message: "You've already applied for this job",
                        success: false
                  })
            }

            //if no job is available
            const job = await Job.findById(jobId);
            if (!job) {
                  return res.status(404).json({
                        message: "Job not found",
                        success: false
                  })
            }

            //creating a new application
            const newApplication = await Application.create({
                  job: jobId,
                  applicant: userId
            })
            //push a new application in application array of job db
            job.applications.push(newApplication);
            await job.save();
            return res.status(201).json({
                  message: "Job applied successfully",
                  success: true
            })

      } catch (error) {
            console.log(error)
      }
}

//get applied jobs
export const getAppliedJob = async (req, res) => {
      try {
            //finding applications of that userId
            const userId = req.id
            const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
                  path: 'job',
                  options: { sort: { createdAt: -1 } },
                  populate: {
                        path: 'company',
                        options: { sort: { createdAt: -1 } },
                  }
            })

            //if no job is applied
            if (!application) {
                  return res.status(404).json({
                        message: "No job is applied",
                        success: false
                  })
            }

            //after all okay
            return res.status(200).json({
                  application,
                  success: true
            })
      } catch (error) {
            console.log(error)
      }
}

//get applicants for a job -- for admin
export const getApplicant = async (req, res) => {
      try {
            //finding jobs by jobId
            const jobId = req.params.id
            const job = await Job.findById(jobId).populate({
                  path: 'applications',
                  options: { sort: { createdAt: -1 } },
                  populate: {
                        path: 'applicant',
                  }
            })

            //if no job found
            if (!job) {
                  return res.status(404).json({
                        message: "No jobs found",
                        success: false
                  })
            }

            //if all okay
            return res.status(200).json({
                  job,
                  success: true
            })
      } catch (error) {
            console.log(error)
      }
}

//update status
export const updateStatus = async (req, res) => {
      try {
            //getting status from body and app. id 
            const { status } = req.body
            const applicationId = req.params.id
            if (!status) {
                  return res.status(400).json({
                        message: "Status is required",
                        success: false
                  })
            }

            //find application by application id
            const application = await Application.findOne({ _id: applicationId })
            if (!application) {
                  return res.status(404).json({
                        message: "Application not found",
                        success: false
                  })
            }

            //update the status
            application.status = status.toLowerCase()
            await application.save();
            return res.status(200).json({
                  message: "Status updated successfully",
                  success: true
            })
      } catch (error) {
            console.log(error)
      }
}