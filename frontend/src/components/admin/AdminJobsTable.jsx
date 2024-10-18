import { EditIcon, Eye, MoreHorizontalIcon, TrashIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Avatar, AvatarImage } from "../ui/avatar"
import { motion } from "framer-motion"


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
            <div className="border border-black p-5 rounded-3xl shadow-lg">
                  <Table>
                        <TableCaption className="text-blue-900 font-medium text-base italic">A List of Your Posted Jobs</TableCaption>
                        <TableHeader>
                              <TableRow className="text-xl font-serif shadow shadow-slate-700">
                                    <TableHead>Company Details</TableHead>
                                    <TableHead>Job Role</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className='text-right'>Action</TableHead>
                              </TableRow>
                        </TableHeader>
                        <TableBody>
                              {filterJobs?.map((job) => (
                                    <motion.tr
                                          initial={{ opacity: 0, x: -100 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          exit={{ opacity: 0, x: 100 }}
                                          transition={{ duration: 0.4 }}
                                          key={job._id}>
                                          <TableCell
                                                className="text-xl font-bold"
                                          >
                                                <div className="flex items-center  gap-2">
                                                      <Avatar className="drop-shadow-xl">
                                                            <AvatarImage src={job?.company?.logo} />
                                                      </Avatar>
                                                      {job?.company?.name}
                                                </div>
                                          </TableCell>

                                          <TableCell className="text-xl font-medium">{job?.title}</TableCell>
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
                                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex gap-2 items-center cursor-pointer">
                                                                  <Eye size='22' />
                                                                  <span>Applicants</span>
                                                            </div>
                                                      </PopoverContent>
                                                </Popover>
                                          </TableCell>
                                    </motion.tr>
                              ))}
                        </TableBody>
                  </Table>
            </div>
      )
}

export default AdminJobsTable
