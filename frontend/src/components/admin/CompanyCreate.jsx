import { ArrowRight } from "lucide-react"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { COMPANY_API_ENDPOINT } from "@/utils/constant"
import { useState } from "react"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { setSingleCompany } from "@/redux/companySlice"

const CompanyCreate = () => {
      const dispatch = useDispatch()
      const navigate = useNavigate()
      const [companyName, setCompanyName] = useState()
      const registerNewCompany = async () => {
            try {
                  const res = await axios.post(`${COMPANY_API_ENDPOINT}/register`, { companyName }, {
                        headers: {
                              'Content-Type': 'application/json'
                        },
                        withCredentials: true
                  })

                  if (res?.data?.success) {
                        dispatch(setSingleCompany(res.data.company))
                        toast.success(res.data.message)
                        const companyId = res?.data?.company?._id
                        navigate(`/admin/companies/${companyId}`)
                  }
            } catch (error) {
                  console.log(error)
                  toast.error(error.response.data.message)
            }
      }
      return (
            <div>
                  <Navbar />
                  <div className="max-w-6xl mx-auto my-10">
                        <div className="flex flex-col gap-1 mt-6 mb-10">
                              <h1 className="text-3xl font-bold">Your Company Name</h1>
                              <p className="text-base italic font-serif text-slate-500">What would you like to give your company name? You can change this later.</p>
                        </div>
                        <div className="flex flex-col gap-2">
                              <label className="text-2xl font-mono font-bold">Company Name</label>
                              <input type="text" placeholder="Google, Microsoft, Amazon, JobCat" className="rounded-full outline-none border border-gray-500 text-xl px-2 py-3" onChange={(e) => setCompanyName(e.target.value)} />
                        </div>
                        <div className="flex gap-5 items-center justify-center my-8">
                              <Button onClick={() => navigate("/admin/companies")} className='text-base border border-black hover:bg-gray-100 rounded-full font-semibold'>Cancel</Button>
                              <Button onClick={registerNewCompany} className='text-base bg-green-300 hover:bg-green-500 rounded-full'>Continue &nbsp;<ArrowRight /></Button>
                        </div>
                  </div>
            </div>
      )
}

export default CompanyCreate
