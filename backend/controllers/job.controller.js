import { Job } from "../models/job.model.js";

//job posting -- for admin
export const postJob = async (req, res) => {
      try {
            //saving data from body
            const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
            const userId = req.id       //job creator's id  

            //checking all mandatory fields
            if (!title || !description || !salary || !location || !jobType || !experience || !position || !companyId) {
                  return res.status(400).json({
                        message: "Something is missing",
                        success: false
                  })
            }

            //creating a job in db
            const job = await Job.create({
                  title,
                  description,
                  requirements: requirements.split(","),
                  salary: Number(salary),
                  location,
                  jobType,
                  experienceLevel: experience,
                  position,
                  company: companyId,
                  created_by: userId
            })
            return res.status(201).json({
                  message: "New Job created successfully",
                  job,
                  success: true
            })


      } catch (error) {
            console.log(error)
      }
}

//get all jobs  -- for student
export const getAllJob = async (req, res) => {
      try {
            //get keyword for filtering
            const keyword = req.query.keyword || ""
            //creating a query
            const query = {
                  $or: [
                        { title: { $regex: keyword, $options: "i" } },
                        { description: { $regex: keyword, $options: "i" } }
                  ]
            };

            //finding jobs with query
            const jobs = await Job.find(query)
            //checking if jobs are not found
            if (!jobs) {
                  return res.status(404).json({
                        message: "Jobs not found",
                        success: "false"
                  })
            }
            //all okay
            return res.status(200).json({
                  jobs,
                  success: true
            })

      } catch (error) {
            console.log(error)
      }
}

//get job by id -- for student
export const getJobById = async (req, res) => {
      try {
            //getting job id from URL
            const jobId = req.params.id
            const job = await Job.findById(jobId) //finding job in db
            //checking if no job is present
            if (!job) {
                  return res.status(404).json({
                        message: "Job not found",
                        success: false
                  })
            }
            //all okay
            return res.status(200).json({
                  job,
                  success: true
            })
      } catch (error) {
            console.log(error)
      }
}

//get all jobs -- for admin
export const getAdminJobs = async (req, res) => {
      try {
            const adminId = req.id //get admin's id
            const jobs = await Job.find({ created_by: adminId }) //finding in db
            //checking if no job is present
            if (!jobs) {
                  return res.status(404).json({
                        message: "Jobs not found",
                        success: false
                  })
            }
            //all okay
            return res.status(200).json({
                  jobs,
                  success: true
            })
      } catch (error) {
            console.log(error)
      }
}