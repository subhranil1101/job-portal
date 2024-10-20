import { useSelector } from "react-redux"
import Navbar from "../shared/Navbar"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Mail, Pen, PhoneCall } from "lucide-react"
import { useState } from "react"
import UpdateAdminProfileDialog from "./UpdateAdminProfileDialog"


const AdminProfile = () => {
      const { user } = useSelector(store => store.auth)
      const [open, setOpen] = useState(false)
      return (
            <div>
                  <Navbar />
                  <div className="max-w-7xl mx-auto shadow-xl border border-slate-600 rounded-2xl bg-white my-10 p-10">
                        <div className="flex justify-between items-center max-w-5xl mx-auto bg-slate-200 p-5 rounded-full shadow shadow-blue-500">
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

                        <div className="flex justify-between items-center gap-5 px-10 my-10 max-w-7xl">
                              <div>
                                    <h1>Your Companies</h1>
                              </div>
                              <div>
                                    <h1>Posted Jobs</h1>
                              </div>
                        </div>

                  </div>
                  <UpdateAdminProfileDialog open={open} setOpen={setOpen} />
            </div>
      )
}

export default AdminProfile
