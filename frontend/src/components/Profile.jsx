import { Mail, Pen, PhoneCall } from "lucide-react"
import Navbar from "./shared/Navbar"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import AppliedJobTable from "./AppliedJobTable"
import UpdateProfileDialog from "./UpdateProfileDialog"
import { useState } from "react"
import { useSelector } from "react-redux"
import useGetAppliedJobs from "@/hooks/usegetAppliedJobs"

const Profile = () => {
      useGetAppliedJobs()
      const [open, setOpen] = useState(false)
      const { user } = useSelector(store => store.auth)
      return (
            <div>
                  <Navbar />
                  <div className="max-w-5xl mx-auto shadow-xl border border-slate-600 rounded-2xl bg-white my-10 p-10">
                        <div className="flex justify-between items-center">
                              <div className="flex items-center gap-5">
                                    <Avatar className='h-24 w-24'>
                                          {
                                                user?.profile?.profilePhoto ? <AvatarImage src={user?.profile?.profilePhoto} alt="profile" /> :
                                                      <AvatarImage src="https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png" alt="profile" />
                                          }
                                    </Avatar>
                                    <div>
                                          <h1 className="text-3xl font-serif font-bold">{user?.fullName}</h1>
                                          {
                                                user?.profile?.bio?.length > 0 && !user?.profile?.bio?.includes("undefined") ? <p className="text-xl font-serif italic text-gray-700">{user?.profile?.bio}</p> : <span className="text-xs text-green-500 cursor-pointer" onClick={() => setOpen(true)}>Add about yourself</span>
                                          }

                                    </div>
                              </div>
                              <div>
                                    <Button onClick={() => setOpen(true)} variant='ghost' className='bg-gray-200 hover:bg-gray-100 rounded-full'><Pen size='icon' /></Button>
                              </div>
                        </div>
                        <div className="flex flex-col my-5 gap-4 text-xl">
                              <div className="flex gap-2 items-center"><Mail />{user.email}</div>
                              <div className="flex gap-2 items-center"><PhoneCall />{user.phoneNo}</div>
                        </div>
                        <div>
                              <h1 className="text-2xl font-mono font-bold">Skills</h1>
                              {user?.profile?.skills?.length > 0 && !user?.profile?.skills?.includes("undefined") ? user?.profile?.skills?.map((item, index) => <Badge className=' font-mono mr-2 mt-3 px-3 cursor-default text-lg bg-gray-700 text-white hover:bg-gray-800' key={index}>{item}</Badge>) : <span className="cursor-pointer text-lg" onClick={() => setOpen(true)}>Add your skills</span>}
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
                              <label className="text-2xl font-bold font-mono">Resume</label>
                              {user?.profile?.resume ? <a target="blank" href={user?.profile?.resume} className="text-xl font-serif font-semibold cursor-pointer text-blue-800 hover:underline hover:text-blue-700">{user?.profile?.resumeOriginalName}</a> : <span className="text-lg font-mono cursor-pointer" onClick={() => setOpen(true)}>Add your resume</span>}
                        </div>
                  </div>
                  <div className="my-5 max-w-5xl mx-auto w-full bg-white rounded-2xl">
                        <h1 className="text-center text-2xl font-mono font-bold" >Applied Jobs</h1>
                        <hr className="mt-2" />
                        <AppliedJobTable />
                  </div>
                  <UpdateProfileDialog open={open} setOpen={setOpen} />
            </div>
      )
}

export default Profile
