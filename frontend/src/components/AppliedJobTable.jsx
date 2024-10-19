import { useSelector } from "react-redux"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { SquareArrowOutUpRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

const AppliedJobTable = () => {
      const { allAppliedJobs } = useSelector(store => store.job)
      const navigate = useNavigate()

      const pendingJobs = allAppliedJobs.filter(job => job.status === 'pending');
      const rejectedJobs = allAppliedJobs.filter(job => job.status === 'rejected');
      const acceptedJobs = allAppliedJobs.filter(job => job.status === 'accepted');

      return (
            <div>
                  {
                        allAppliedJobs.length <= 0 ? <div className="text-xl text-center my-5 text-red-500">
                              *You havn&apos;t applied for any job yet
                        </div> :
                              <div className="flex w-full flex-col gap-5">
                                    {
                                          pendingJobs.length === 0 ? <span className="text-red-500 text-center pt-5">
                                                *No Applications are pending
                                          </span>
                                                :
                                                <Table className="my-10 border border-black bg-slate-100 shadow-xl">
                                                      <TableCaption>
                                                            A list of your Pending Applications
                                                      </TableCaption>
                                                      <TableHeader className='text-xl font-mono'>
                                                            <TableRow className='shadow shadow-slate-800'>
                                                                  <TableHead className="font-bold">Date</TableHead>
                                                                  <TableHead className="font-bold">Job Role</TableHead>
                                                                  <TableHead className="font-bold">Company</TableHead>
                                                                  <TableHead className='text-right font-bold'>Status</TableHead>
                                                            </TableRow>
                                                      </TableHeader>
                                                      <TableBody className="text-lg">
                                                            {
                                                                  pendingJobs.map((appliedJob) => (
                                                                        <TableRow key={appliedJob._id}>
                                                                              <TableCell>{appliedJob.createdAt.split("T")[0]}</TableCell>
                                                                              <TableCell>
                                                                                    <div className="flex gap-2 items-center">
                                                                                          {appliedJob.job.title}
                                                                                          <SquareArrowOutUpRight
                                                                                                onClick={() => navigate(`/jobs/description/${appliedJob?.job?._id}`)}
                                                                                                size={20}
                                                                                                className="text-gray-600 cursor-pointer" />
                                                                                    </div>
                                                                              </TableCell>
                                                                              <TableCell>{appliedJob.job.company.name}</TableCell>
                                                                              <TableCell className="text-right">
                                                                                    <Badge className='bg-black hover:bg-black  text-white text-sm'>
                                                                                          {appliedJob.status.toUpperCase()}
                                                                                    </Badge>
                                                                              </TableCell>
                                                                        </TableRow>
                                                                  ))
                                                            }
                                                      </TableBody>
                                                </Table>
                                    }

                                    {
                                          acceptedJobs.length === 0 ? <span className="text-red-500 text-center pt-5">
                                                *No Applications are Accepted
                                          </span>
                                                :
                                                <Table className="my-10 border border-black bg-green-100 shadow-xl">
                                                      <TableCaption>A list of your Accepted Applications</TableCaption>
                                                      <TableHeader className='text-xl font-mono'>
                                                            <TableRow className='shadow shadow-green-800'>
                                                                  <TableHead className="font-bold">Apply Date</TableHead>
                                                                  <TableHead className="font-bold">Update Date</TableHead>
                                                                  <TableHead className="font-bold">Job Role</TableHead>
                                                                  <TableHead className="font-bold">Company</TableHead>
                                                                  <TableHead className='text-right font-bold'>Status</TableHead>
                                                            </TableRow>
                                                      </TableHeader>
                                                      <TableBody className="text-lg">
                                                            {
                                                                  acceptedJobs.map((appliedJob) => (
                                                                        <TableRow key={appliedJob._id}>
                                                                              <TableCell>{appliedJob.createdAt.split("T")[0]}</TableCell>
                                                                              <TableCell>{appliedJob.updatedAt.split("T")[0]}</TableCell>
                                                                              <TableCell>
                                                                                    <div className="flex gap-2 items-center">
                                                                                          {appliedJob.job.title}
                                                                                          <SquareArrowOutUpRight
                                                                                                onClick={() => navigate(`/jobs/description/${appliedJob?.job?._id}`)}
                                                                                                size={20}
                                                                                                className="text-gray-600 cursor-pointer"
                                                                                          />
                                                                                    </div>
                                                                              </TableCell>
                                                                              <TableCell>{appliedJob.job.company.name}</TableCell>
                                                                              <TableCell className="text-right">
                                                                                    <Badge className='text-white text-sm bg-green-700 hover:bg-green-700'>
                                                                                          {appliedJob.status.toUpperCase()}
                                                                                    </Badge>
                                                                              </TableCell>
                                                                        </TableRow>
                                                                  ))
                                                            }
                                                      </TableBody>
                                                </Table>
                                    }

                                    {
                                          rejectedJobs.length === 0 ? <span className="text-red-500 text-center pt-5">
                                                *No Applications are rejected
                                          </span>
                                                :
                                                <Table className="my-10 border border-black bg-red-100 shadow-xl">
                                                      <TableCaption>A list of your Rejected Applications</TableCaption>
                                                      <TableHeader className='text-xl font-mono'>
                                                            <TableRow>
                                                                  <TableHead className="font-bold">Apply Date</TableHead>
                                                                  <TableHead className="font-bold">Update Date</TableHead>
                                                                  <TableHead className="font-bold">Job Role</TableHead>
                                                                  <TableHead className="font-bold">Company</TableHead>
                                                                  <TableHead className='text-right'>Status</TableHead>
                                                            </TableRow>
                                                      </TableHeader>
                                                      <TableBody className="text-lg">
                                                            {
                                                                  rejectedJobs.map((appliedJob) => (
                                                                        <TableRow key={appliedJob._id}>
                                                                              <TableCell>{appliedJob.createdAt.split("T")[0]}</TableCell>
                                                                              <TableCell>{appliedJob.updatedAt.split("T")[0]}</TableCell>
                                                                              <TableCell>
                                                                                    <div className="flex gap-2 items-center">
                                                                                          {appliedJob.job.title}
                                                                                          <SquareArrowOutUpRight
                                                                                                onClick={() => navigate(`/jobs/description/${appliedJob?.job?._id}`)}
                                                                                                size={20}
                                                                                                className="text-gray-600 cursor-pointer" />
                                                                                    </div>
                                                                              </TableCell>
                                                                              <TableCell>{appliedJob.job.company.name}</TableCell>
                                                                              <TableCell className="text-right">
                                                                                    <Badge className="bg-red-600 hover:bg-red-600 text-white text-sm">
                                                                                          {appliedJob.status.toUpperCase()}
                                                                                    </Badge>
                                                                              </TableCell>
                                                                        </TableRow>
                                                                  ))
                                                            }
                                                      </TableBody>
                                                </Table>
                                    }
                              </div>
                  }
            </div >
      )
}

export default AppliedJobTable
