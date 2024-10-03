import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

const JobDescription = () => {
      const isApplied = false;
      return (
            <div className="max-w-7xl mx-auto my-10">
                  <div className="flex justify-between items-center ">
                        <div>
                              <h1 className="text-4xl font-bold font-mono">Frontend Developer</h1>
                              <div className="flex gap-3 items-center pt-3">
                                    <Badge variant='ghost' className='text-blue-700 font-bold text-sm'>12 position</Badge>
                                    <Badge variant='ghost' className='text-green-500 font-bold text-sm'>full time</Badge>
                                    <Badge variant='ghost' className='text-red-600 font-bold text-sm'>4LPA</Badge>
                              </div>
                        </div>
                        {isApplied ? <Button variant="outline" disabled={isApplied} className="rounded-full cursor-not-allowed bg-gray-700 text-gray-200  font-bold">
                              Already Applied
                        </Button> : <Button variant="outline" className="rounded-full bg-green-800 text-white hover:bg-green-900 hover:text-white font-bold">
                              Apply now
                        </Button>}
                  </div>
                  <h1 className="text-3xl font-medium  my-5 font-mono">Job Description</h1>
                  <hr className="mt-2" />
                  <div className="my-2">
                        <h1 className="text-lg  my-1 font-bold">Role: <span className="pl-2 font-normal ">Frontend Developer</span></h1>
                        <h1 className="text-lg  my-1 font-bold">Location: <span className="pl-2 font-normal ">Kolkata</span></h1>
                        <h1 className="text-lg  my-1 font-bold">Description: <span className="pl-2 font-normal ">Lorem ipsum dolor sit amet.</span></h1>
                        <h1 className="text-lg  my-1 font-bold">Experience: <span className="pl-2 font-normal ">2 year</span></h1>
                        <h1 className="text-lg  my-1 font-bold">Salary: <span className="pl-2 font-normal ">5 LPA</span></h1>
                        <h1 className="text-lg  my-1 font-bold">Total Applicants: <span className="pl-2 font-normal ">4</span></h1>
                        <h1 className="text-lg  my-1 font-bold">Posted Date: <span className="pl-2 font-normal ">01-10-2024</span></h1>
                  </div>
            </div>
      )
}

export default JobDescription
