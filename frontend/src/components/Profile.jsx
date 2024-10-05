import { Mail, Pen, PhoneCall } from "lucide-react"
import Navbar from "./shared/Navbar"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Link } from "react-router-dom"
import AppliedJobTable from "./AppliedJobTable"
import UpdateProfileDialog from "./UpdateProfileDialog"
import { useState } from "react"

const skills = ['HTML', 'CSS', 'JavaScript', 'ReactJs']
const Profile = () => {

      const [open, setOpen] = useState(false)
      const isResume = true;
      return (
            <div>
                  <Navbar />
                  <div className="max-w-5xl mx-auto border border-slate-600 rounded-2xl bg-white my-10 p-10">
                        <div className="flex justify-between items-center">
                              <div className="flex items-center gap-5">
                                    <Avatar className='h-24 w-24'>
                                          <AvatarImage src='https://github.com/shadcn.png' />
                                    </Avatar>
                                    <div>
                                          <h1 className="text-3xl font-serif font-bold">Full Name</h1>
                                          <p className="text-xl font-serif italic text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quo suscipit itaque quisquam obcaecati libero?</p>
                                    </div>
                              </div>
                              <div>
                                    <Button onClick={() => setOpen(true)} variant='ghost' className='bg-gray-200 hover:bg-gray-100 rounded-full'><Pen size='icon' /></Button>
                              </div>
                        </div>
                        <div className="flex flex-col my-5 gap-4 text-xl">
                              <div className="flex gap-2 items-center"><Mail />subhranil@gmail.com</div>
                              <div className="flex gap-2 items-center"><PhoneCall />8989898989</div>
                        </div>
                        <div>
                              <h1 className="text-2xl font-mono font-bold">Skills</h1>
                              {skills.length !== 0 ? skills.map((item, index) => <Badge className=' font-mono mr-2 mt-3 px-3 cursor-default text-lg bg-gray-700 text-white hover:bg-gray-800' key={index}>{item}</Badge>) : <span className="text-lg">Add your skills</span>}
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
                              <label className="text-2xl font-bold font-mono">Resume</label>
                              {isResume ? <Link target="_blank" to='https://drive.google.com/file/d/1vUqUtGItw2Sg6TdfOGDUUOWcbw9ICL2Z/view?usp=sharing' className="text-xl font-serif font-semibold cursor-pointer hover:underline hover:text-blue-700">Subhranil Das</Link> : <span className="text-lg font-mono">Add your resume</span>}
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
