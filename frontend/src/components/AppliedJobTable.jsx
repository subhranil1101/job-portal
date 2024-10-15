import { useSelector } from "react-redux"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

const AppliedJobTable = () => {
      const { allAppliedJobs } = useSelector(store => store.job)
      return (
            <div>
                  {
                        allAppliedJobs.length <= 0 ? <div className="text-xl text-center my-5 text-red-500">
                              *You havn&apos;t applied for any job yet
                        </div> :
                              <Table>
                                    <TableCaption>A list of your applied jobs</TableCaption>
                                    <TableHeader className='text-xl font-mono'>
                                          <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Job Role</TableHead>
                                                <TableHead>Company</TableHead>
                                                <TableHead className='text-right'>Status</TableHead>
                                          </TableRow>
                                    </TableHeader>
                                    <TableBody className="text-lg">
                                          {
                                                allAppliedJobs.map((appliedJob) => (
                                                      <TableRow key={appliedJob._id}>
                                                            <TableCell>{appliedJob.createdAt.split("T")[0]}</TableCell>
                                                            <TableCell>{appliedJob.job.title}</TableCell>
                                                            <TableCell>{appliedJob.job.company.name}</TableCell>
                                                            <TableCell className="text-right">
                                                                  <Badge className={`${appliedJob.status === 'rejected' ? 'bg-red-600 hover:bg-red-600' : appliedJob.status === 'pending' ? 'bg-black hover:bg-black' : 'bg-green-700 hover:bg-green-700'} text-white text-sm`}>
                                                                        {appliedJob.status.toUpperCase()}
                                                                  </Badge>
                                                            </TableCell>
                                                      </TableRow>
                                                ))
                                          }
                                    </TableBody>
                              </Table>
                  }
            </div >
      )
}

export default AppliedJobTable
