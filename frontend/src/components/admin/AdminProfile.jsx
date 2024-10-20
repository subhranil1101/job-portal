import { useDispatch, useSelector } from "react-redux"
import Navbar from "../shared/Navbar"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Mail, Pen, PhoneCall } from "lucide-react"
import { useEffect, useState } from "react"
import UpdateAdminProfileDialog from "./UpdateAdminProfileDialog"
import ProfileCompaniesTable from "./ProfileCompaniesTable"
import ProfileJobsTable from "./ProfileJobsTable"
import useGetAllCompanies from "@/hooks/useGetAllCompanies"
import { setSearchCompanyByName } from "@/redux/companySlice"
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs"
import { setSearchJobByName } from "@/redux/jobSlice"


const AdminProfile = () => {
      const { user } = useSelector(store => store.auth)
      const { companies } = useSelector(store => store.company)
      const { allAdminJobs } = useSelector(store => store.job)
      const [open, setOpen] = useState(false)

      useGetAllCompanies();
      useGetAllAdminJobs()

      const [input1, setInput1] = useState('')
      const [input2, setInput2] = useState('')
      const dispatch = useDispatch()

      useEffect(() => {
            dispatch(setSearchCompanyByName(input1))
            dispatch(setSearchJobByName(input2))
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [input1, input2])


      return (
            <div>
                  <Navbar />
                  <div className="max-w-7xl mx-auto shadow-xl border border-slate-600 rounded-2xl bg-white mt-10 mb-5 px-10 pt-10 pb-5">
                        <div className="flex justify-between items-center max-w-5xl mx-auto bg-cyan-100 p-5 rounded-full shadow-xl">
                              <div className="flex items-center gap-5">
                                    <Avatar className='h-24 w-24 shadow-xl'>
                                          {
                                                user?.profile?.profilePhoto ? <AvatarImage src={user?.profile?.profilePhoto} alt="profile" /> :
                                                      <AvatarImage src="https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png" alt="profile" />
                                          }
                                    </Avatar>
                                    <div>
                                          <h1 className="text-4xl font-serif font-bold">{user?.fullName}</h1>
                                    </div>
                              </div>
                              <div className="flex flex-col gap-4 text-xl">
                                    <div className="flex gap-2 items-center font-medium"><Mail />{user.email}</div>
                                    <div className="flex gap-2 items-center font-medium"><PhoneCall />{user.phoneNo}</div>
                              </div>
                              <div>
                                    <Button onClick={() => setOpen(true)} variant='ghost' className='bg-gray-600 hover:bg-gray-500 text-white hover:text-white rounded-full'><Pen size='icon' /></Button>
                              </div>
                        </div>

                        <div className="flex justify-between items-start gap-5  mt-10 max-w-7xl">
                              <div className="max-w-[50%]">
                                    <h1 className="text-start font-serif text-3xl">Your Companies ({companies?.length})</h1>
                                    <input type="text" className='w-full text-lg border border-slate-900 outline-none rounded-2xl px-5 py-1 my-6' placeholder='Filter by name' onChange={(e) => setInput1(e.target.value)} />
                                    <ProfileCompaniesTable />
                              </div>
                              <div className="max-w-[50%]">
                                    <h1 className="text-start font-serif text-3xl">Posted Jobs ({allAdminJobs?.length})</h1>
                                    <input type="text" className='w-full text-lg border border-slate-900 outline-none rounded-2xl px-5 py-1 my-6' placeholder='Filter by Job role or company name' onChange={(e) => setInput2(e.target.value)} />
                                    <ProfileJobsTable />
                              </div>
                        </div>

                  </div>
                  <UpdateAdminProfileDialog open={open} setOpen={setOpen} />
            </div>
      )
}

export default AdminProfile
