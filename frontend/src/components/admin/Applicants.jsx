import { useEffect } from "react"
import Navbar from "../shared/Navbar"
import ApplicantsTable from "./ApplicantsTable"
import axios from "axios"
import { APPLICATION_API_ENDPOINT } from "@/utils/constant"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setAllApplicants } from "@/redux/applicationSlice"

const Applicants = () => {
      const params = useParams()
      const jobId = params.id
      const dispatch = useDispatch()
      const { applicants } = useSelector(store => store.application)

      useEffect(() => {
            const fetchAllApplicants = async () => {
                  try {
                        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${jobId}/applicant`, { withCredentials: true })

                        if (res.data.success)
                              dispatch(setAllApplicants(res.data.job))

                  } catch (error) {
                        console.log(error)
                  }
            }
            fetchAllApplicants()
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      return (
            <div>
                  <Navbar />
                  <div className="max-w-7xl mx-auto my-5">
                        <h1 className="text-xl font-bold font-mono my-5">Applicants ({applicants.applications.length})</h1>
                        <ApplicantsTable />
                  </div>
            </div>
      )
}

export default Applicants
