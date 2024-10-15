import { MoreHorizontal } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux"
import { toast } from "sonner"
import axios from "axios"
import { APPLICATION_API_ENDPOINT } from "@/utils/constant"

const shortListingStatus = ["Accepted", "Rejected"]
const ApplicantsTable = () => {
      const { applicants } = useSelector(store => store.application)

      const statusHandler = async (status, id) => {
            try {
                  const res = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`, { status, }, { withCredentials: true })
                  if (res.data.success) {
                        toast.success(res.data.message)
                  }
            } catch (error) {
                  console.log(error)
                  toast.error(error.response.data.message)
            }
      }
      return (
            <div>
                  <Table>
                        <TableCaption>A list of Applied Students to this job</TableCaption>
                        <TableHeader>
                              <TableRow>
                                    <TableHead>Full Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Resume</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                              </TableRow>
                        </TableHeader>
                        <TableBody>
                              {
                                    applicants && applicants?.applications?.map((item) => (
                                          <tr key={item?.id}>
                                                <TableCell>{item?.applicant?.fullName}</TableCell>
                                                <TableCell>{item?.applicant?.email}</TableCell>
                                                <TableCell>{item?.applicant?.phoneNo}</TableCell>
                                                <TableCell>
                                                      {
                                                            item?.applicant?.profile?.resume ? <a href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> :
                                                                  <span>NA</span>
                                                      }
                                                </TableCell>
                                                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                                <TableCell className="text-right">
                                                      <Popover>
                                                            <PopoverTrigger>
                                                                  <MoreHorizontal />
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-fit bg-slate-100 shadow-xl flex flex-col gap-5 ">
                                                                  {
                                                                        shortListingStatus.map((status, index) => {
                                                                              return (
                                                                                    <div onClick={() => statusHandler(status, item._id)} key={index} className="cursor-pointer hover:font-bold" >
                                                                                          <span>{status}</span>
                                                                                    </div>
                                                                              )
                                                                        })
                                                                  }
                                                            </PopoverContent>
                                                      </Popover>
                                                </TableCell>
                                          </tr>
                                    ))
                              }
                        </TableBody>
                  </Table>
            </div>
      )
}

export default ApplicantsTable
