import { Bookmark, Info } from "lucide-react"
import { Button } from "./ui/button"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { useNavigate } from "react-router-dom"

const Job = () => {
      const navigate = useNavigate()
      const jobId = 'sbhjsbhbsh'
      return (
            <div className="border border-slate-500 rounded-xl p-5 shadow-xl shadow-gray-300 bg-white hover:scale-105 cursor-auto">
                  <div className="flex items-center justify-between">
                        <p className="text-sm italic font-mono font-semibold text-slate-500">2 days ago</p>
                        <Button variant='outline ' size='icon' className='rounded-full'><Bookmark /></Button>
                  </div>

                  <div className="flex gap-5 items-center my-1">
                        <Button className='p-5' variant='ghost' size='icon'><Avatar ><AvatarImage src='https://www.shutterstock.com/image-vector/company-vector-logo-design-element-260nw-452062015.jpg' className='object-contain' /></Avatar></Button>
                        <div>
                              <h1 className="text-xl font-bold font-serif">Company Name</h1>
                              <span className="text-sm italic font-serif text-slate-500">India</span>
                        </div>
                  </div>
                  <div>
                        <h1 className=" my-2 text-2xl font-mono font-bold ">Title</h1>
                        <p className="text-sm text-justify italic text-gray-500 font-serif">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos obcaecati, nam esse sint fugit eius.</p>
                  </div>
                  <div className="flex gap-3 justify-center pt-3">
                        <Badge variant='ghost' className='text-blue-700 font-bold text-sm'>12 position</Badge>
                        <Badge variant='ghost' className='text-green-500 font-bold text-sm'>full time</Badge>
                        <Badge variant='ghost' className='text-red-600 font-bold text-sm'>4LPA</Badge>
                  </div>
                  <div className="flex justify-between mt-5 font-serif">
                        <Button onClick={() => navigate(`/jobs/description/${jobId}`)} variant='ghost' className=' text-xs bg-green-400 hover:bg-green-600  font-bold rounded-full'>Details &nbsp;<Info size='icon' /></Button>
                        <Button variant='ghost' className='bg-gray-300 hover:bg-gray-400 rounded-full text-xs font-bold'>Save for later &nbsp; <Bookmark size='icon' /></Button>
                  </div>
            </div>
      )
}

export default Job
