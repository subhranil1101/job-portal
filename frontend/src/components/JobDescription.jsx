import { useParams } from "react-router-dom";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";

const JobDescription = () => {
      const dispatch = useDispatch()
      const { singleJob } = useSelector(store => store.job)
      const { user } = useSelector(store => store.auth)
      const params = useParams()
      const jobId = params.id

      const applyJobHandler = async () => {
            try {
                  const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, { withCredentials: true })
                  console.log(res.data)
                  if (res.data.success) {
                        setIsApplied(true)
                        const updatedSinglejob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                        dispatch(setSingleJob(updatedSinglejob))
                        toast.success(res.data.message)
                  }
            } catch (error) {
                  console.log(error)
                  toast.error(error.response.data.message)
            }
      }

      useEffect(() => {
            const fetchSingleJob = async () => {
                  try {
                        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, { withCredentials: true })
                        if (res.data.success) {
                              dispatch(setSingleJob(res.data.job))
                              setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                        }
                  } catch (error) {
                        console.log(error)
                  }
            }
            fetchSingleJob();
      }, [jobId, dispatch, user?._id])
      const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
      const [isApplied, setIsApplied] = useState(isInitiallyApplied)
      return (
            <div>
                  <Navbar />
                  <div className="max-w-7xl mx-auto my-10">
                        <div className="flex justify-between items-center ">
                              <div>
                                    <h1 className="text-4xl font-bold font-mono">{singleJob?.title}</h1>
                                    <div className="flex gap-3 items-center pt-3">
                                          <Badge variant='ghost' className='text-blue-700 font-bold text-sm'>{singleJob?.position} position</Badge>
                                          <Badge variant='ghost' className='text-green-500 font-bold text-sm'>{singleJob?.jobType}</Badge>
                                          <Badge variant='ghost' className='text-red-600 font-bold text-sm'>{singleJob?.salary}LPA</Badge>
                                    </div>
                              </div>
                              {isApplied ? <Button variant="outline" disabled={isApplied} className="rounded-full cursor-not-allowed bg-gray-700 text-gray-200  font-bold">
                                    Already Applied
                              </Button> : <Button onClick={applyJobHandler} variant="outline" className="rounded-full bg-green-800 text-white hover:bg-green-900 hover:text-white font-bold">
                                    Apply now
                              </Button>}
                        </div>
                        <h1 className="text-3xl font-medium  my-5 font-mono">Job Description</h1>
                        <hr className="mt-2" />
                        <div className="my-2">
                              <h1 className="text-lg  my-1 font-bold">Role: <span className="pl-2 font-normal ">{singleJob?.title}</span></h1>
                              <h1 className="text-lg  my-1 font-bold">Location: <span className="pl-2 font-normal ">{singleJob?.location}</span></h1>
                              <h1 className="text-lg  my-1 font-bold">Description: <span className="pl-2 font-normal ">{singleJob?.description}</span></h1>
                              <h1 className="text-lg  my-1 font-bold">Experience: <span className="pl-2 font-normal ">{singleJob?.experience} year</span></h1>
                              <h1 className="text-lg  my-1 font-bold">Salary: <span className="pl-2 font-normal ">{singleJob?.salary} LPA</span></h1>
                              <h1 className="text-lg  my-1 font-bold">Total Applicants: <span className="pl-2 font-normal ">{singleJob?.applications?.length}</span></h1>
                              <h1 className="text-lg  my-1 font-bold">Posted Date: <span className="pl-2 font-normal ">{singleJob?.createdAt.split("T")[0]}</span></h1>
                        </div>
                  </div>
            </div>
      )
}

export default JobDescription
