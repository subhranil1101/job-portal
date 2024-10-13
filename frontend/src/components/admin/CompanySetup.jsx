import { ArrowLeft, Loader2 } from "lucide-react"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import axios from "axios"
import { COMPANY_API_ENDPOINT } from "@/utils/constant"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const CompanySetup = () => {
      const [input, setInput] = useState({
            name: "",
            description: "",
            website: "https://",
            location: "",
            file: null
      });

      const { singleCompany } = useSelector(store => store.company)
      const [loading, setLoading] = useState(false)
      const params = useParams()
      const navigate = useNavigate()

      const changeEventHandler = (e) => {
            setInput({ ...input, [e.target.name]: e.target.value })
      }

      const changeFileHandler = (e) => {
            const file = e.target.files?.[0]
            setInput({ ...input, file })
      }

      const submitHandler = async (e) => {
            e.preventDefault()
            const formData = new FormData()
            formData.append("name", input.name)
            formData.append("description", input.description)
            formData.append("website", input.website)
            formData.append("location", input.location)
            if (input.file) {
                  formData.append("file", input.file)
            }

            try {
                  setLoading(true)
                  const companyId = params.id
                  const res = await axios.put(`${COMPANY_API_ENDPOINT}/update/${companyId}`, formData, {
                        headers: {
                              'Content-Type': 'multipart/form-data'
                        },
                        withCredentials: true
                  })
                  if (res.data.success) {
                        toast.success(res.data.message)
                        navigate("/admin/companies")
                  }
            } catch (error) {
                  console.log(error)
                  toast.error(error.response.data.message)
            } finally {
                  setLoading(false)
            }
      }

      useEffect(() => {
            setInput({
                  name: singleCompany.name || "",
                  description: singleCompany.description || "",
                  website: singleCompany.website || "https://",
                  location: singleCompany.location || "",
                  file: singleCompany.file || null
            })
      }, [singleCompany])

      return (
            <div>
                  <Navbar />
                  <div className="max-w-4xl mx-auto my-10">
                        <form onSubmit={submitHandler}>
                              <div className="flex items-center gap-10 my-10 px-5">
                                    <Button onClick={() => navigate("/admin/companies")} className='text-base border border-black hover:bg-gray-100 rounded-full font-semibold'><ArrowLeft />&nbsp;Back</Button>
                                    <h1 className="text-4xl font-bold font-mono">Company Setup</h1>
                              </div>
                              <div className=" grid grid-cols-2 gap-5 my-10 px-5">
                                    <div className="flex flex-col gap-1">
                                          <label htmlFor="name" className="text-xl font-semibold px-2">Company Name</label>
                                          <input className="px-2 py-1 text-xl rounded-full border border-black" type="text" name="name" value={input.name} onChange={changeEventHandler} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                          <label htmlFor="description" className="text-xl font-semibold px-2">Description</label>
                                          <input className="px-2 py-1 text-xl rounded-full border border-black" type="text" name="description" value={input.description} onChange={changeEventHandler} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                          <label htmlFor="website" className="text-xl font-semibold px-2">Company Website</label>
                                          <input className="px-2 py-1 text-xl rounded-full border border-black" type="text" name="website" value={input.website} onChange={changeEventHandler} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                          <label htmlFor="location" className="text-xl font-semibold px-2">Company Location</label>
                                          <input className="px-2 py-1 text-xl rounded-full border border-black" type="text" name="location" value={input.location} onChange={changeEventHandler} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                          <label htmlFor="file" className="text-xl font-semibold px-2">Company Logo</label>
                                          <input className="px-2 py-1 text-xl rounded-full border border-black" type="file" accept="image/*" onChange={changeFileHandler} />
                                    </div>
                              </div>
                              {loading ? (
                                    <Button className="cursor-not-allowed py-2 my-5 border border-slate-200 bg-black text-white w-full mx-auto text-lg font-mono font-bold rounded-xl hover:bg-slate-800">
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                          Please wait..
                                    </Button>
                              ) : (
                                    <Button
                                          type="submit"
                                          className=" py-2 my-5 border border-slate-200 bg-black text-white w-full mx-auto text-lg font-mono font-bold rounded-xl hover:bg-slate-800"
                                    >
                                          Update
                                    </Button>
                              )}
                        </form>
                  </div>
            </div>
      )
}

export default CompanySetup
