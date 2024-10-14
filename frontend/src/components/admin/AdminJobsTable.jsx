import { EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const AdminJobsTable = () => {
      const navigate = useNavigate()
      const { allAdminJobs, searchJobByName } = useSelector(store => store.job)
      const [filterJobs, setFilterJobs] = useState(allAdminJobs)

      useEffect(() => {
            const filteredJob = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
                  if (!searchJobByName) {
                        return true
                  }
                  return job?.title?.toLowerCase().includes(searchJobByName.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByName.toLowerCase())
            })
            setFilterJobs(filteredJob)
      }, [allAdminJobs, searchJobByName])
      return (
            <div>
                  <Table>
                        <TableCaption>A List of Your Posted Jobs</TableCaption>
                        <TableHeader>
                              <TableRow>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Job Role</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className='text-right'>Action</TableHead>
                              </TableRow>
                        </TableHeader>
                        <TableBody>
                              {filterJobs?.map((job) => (
                                    <tr key={job._id}>
                                          <TableCell className="text-xl font-bold">{job?.company?.name || "Add company Name"}</TableCell>
                                          <TableCell>{job?.title || "Add company location"}</TableCell>
                                          <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                          <TableCell className='text-right'>
                                                <Popover>
                                                      <PopoverTrigger><MoreHorizontalIcon /></PopoverTrigger>
                                                      <PopoverContent className='rounded-3xl shadow-xl w-fit bg-slate-50 flex flex-col gap-5 justify-start items-start'>
                                                            <div onClick={() => navigate(`/admin/jobs/${job._id}`)} className="flex gap-2 items-center cursor-pointer">
                                                                  <EditIcon size='20' />
                                                                  <span>Edit</span>
                                                            </div>
                                                            <div className="flex gap-2 items-center cursor-pointer">
                                                                  <TrashIcon size='20' />
                                                                  <span>Delete</span>
                                                            </div>
                                                      </PopoverContent>
                                                </Popover>
                                          </TableCell>
                                    </tr>
                              ))}
                        </TableBody>
                  </Table>
            </div>
      )
}

export default AdminJobsTable
