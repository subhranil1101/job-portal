import { useState } from "react"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import axios from "axios"
import { JOB_API_ENDPOINT } from "@/utils/constant"
import { toast } from "sonner"

const PostJob = () => {
      const navigate = useNavigate()

      const { companies } = useSelector(store => store.company)
      const [loading, setLoading] = useState(false)
      const [input, setInput] = useState({
            title: "",
            description: "",
            requirements: "",
            salary: "",
            location: "",
            jobType: "",
            experience: 0,
            position: "",
            companyId: ""
      })

      const changeEventHandler = (e) => {
            setInput({ ...input, [e.target.name]: e.target.value })
      }

      const selectChangeHandler = (value) => {
            const selectedCompany = companies.find((company) => company.name.toLowerCase() === value)
            setInput({ ...input, companyId: selectedCompany._id })
      }

      const submitHandler = async (e) => {
            e.preventDefault()
            try {
                  setLoading(true)
                  const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true
                  })
                  if (res.data.success) {
                        toast.success(res.data.message)
                        navigate("/admin/jobs")
                  }
            } catch (error) {
                  console.log(error)
                  toast.error(error.response.data.message)
            } finally {
                  setLoading(false)
            }
      }


      return (
            <div>
                  <Navbar />
                  <form onSubmit={submitHandler} className="border border-gray-600 shadow-2xl w-fit mx-auto rounded-2xl my-5 flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center max-w-7xl mx-auto my-5 flex-wrap gap-7">
                              <div className="w-[45%] flex flex-col">
                                    <label className="px-2 py-2 text-xl font-medium">Job Title</label>
                                    <input placeholder="Enter Job Title" type="text" name="title" className="text-xl px-2 py-1 rounded-full outline-none border border-black" value={input.title} onChange={changeEventHandler} />
                              </div>
                              <div className="w-[45%] flex flex-col">
                                    <label className="px-2 py-2 text-xl font-medium">Job Description</label>
                                    <input placeholder="Enter Job Description" type="text" name="description" className="text-xl px-2 py-1 rounded-full outline-none border border-black" value={input.description} onChange={changeEventHandler} />
                              </div>
                              <div className="w-[45%] flex flex-col">
                                    <label className="px-2 py-2 text-xl font-medium">Job Requirements</label>
                                    <input placeholder="Enter Job Requirements" type="text" name="requirements" className="text-xl px-2 py-1 rounded-full outline-none border border-black" value={input.requirements} onChange={changeEventHandler} />
                              </div>
                              <div className="w-[45%] flex flex-col">
                                    <label className="px-2 py-2 text-xl font-medium">Salary</label>
                                    <input placeholder="Enter Salary in LPA" type="number" name="salary" className="text-xl px-2 py-1 rounded-full outline-none border border-black" value={input.salary} onChange={changeEventHandler} />
                              </div>
                              <div className="w-[45%] flex flex-col">
                                    <label className="px-2 py-2 text-xl font-medium">Location</label>
                                    <input placeholder="Enter Job Location" type="text" name="location" className="text-xl px-2 py-1 rounded-full outline-none border border-black" value={input.location} onChange={changeEventHandler} />
                              </div>
                              <div className="w-[45%] flex flex-col">
                                    <label className="px-2 py-2 text-xl font-medium">Job Type</label>
                                    <input placeholder="Enter Fulltime or Internship" type="text" name="jobType" className="text-xl px-2 py-1 rounded-full outline-none border border-black" value={input.jobType} onChange={changeEventHandler} />
                              </div>
                              <div className="w-[45%] flex flex-col">
                                    <label className="px-2 py-2 text-xl font-medium">Experience</label>
                                    <input placeholder="Enter Experience Level" type="number" name="experience" className="text-xl px-2 py-1 rounded-full outline-none border border-black" value={input.experience} onChange={changeEventHandler} />
                              </div>
                              <div className="w-[45%] flex flex-col">
                                    <label className="px-2 py-2 text-xl font-medium">Positions</label>
                                    <input placeholder="Enter number of Vacancies" type="number" name="position" className="text-xl px-2 py-1 rounded-full outline-none border border-black" value={input.position} onChange={changeEventHandler} />
                              </div>
                              <div className="w-[45%] flex flex-col">
                                    {
                                          companies.length > 0 && (
                                                <Select onValueChange={selectChangeHandler}>
                                                      <SelectTrigger className="rounded-full w-1/2 mx-auto mt-5 text-xl font-medium">
                                                            <SelectValue placeholder="Select a Company" />
                                                      </SelectTrigger>
                                                      <SelectContent className="bg-white shadow-xl text-justify text-xl">
                                                            <SelectGroup>
                                                                  {
                                                                        companies.map((company) => {
                                                                              return (
                                                                                    <SelectItem value={company?.name?.toLowerCase()} key={company._id}>{company?.name}</SelectItem>
                                                                              )
                                                                        })
                                                                  }
                                                            </SelectGroup>
                                                      </SelectContent>
                                                </Select>
                                          )
                                    }
                              </div>
                        </div>
                        <div>
                              {
                                    loading ? <Button className="cursor-not-allowed my-5 flex items-center justify-center border border-black rounded-full bg-green-500 hover:bg-green-600 font-bold"><Loader2 className="mr-2 h-5 w-5 animate-spin" />&nbsp;Please wait...</Button> :
                                          <div className="flex gap-10 my-5">
                                                <Button onClick={() => navigate("/admin/jobs")} className="flex items-center justify-center font-bold border border-black rounded-full hover:bg-gray-200"><ArrowLeft size={20} />&nbsp;Cancel</Button>
                                                <Button type="submit" disabled={companies.length <= 0} className="flex items-center justify-center border border-black rounded-full bg-green-500 hover:bg-green-600 font-bold"><Save />&nbsp;Submit</Button>
                                          </div>
                              }
                        </div>
                        {
                              companies.length === 0 ? <span className="text-xl text-red-500 text-center my-5 font-bold ">*Please Register a Company first before posting a job</span> : <></>
                        }
                  </form>
            </div>
      )
}

export default PostJob
