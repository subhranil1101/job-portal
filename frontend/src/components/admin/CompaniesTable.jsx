import { EditIcon, MoreHorizontalIcon } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux"

const CompaniesTable = () => {
      const { companies } = useSelector(store => store.company)
      return (
            <div>
                  <Table>
                        <TableCaption>A List of Your Registered Companies</TableCaption>
                        <TableHeader>
                              <TableRow>
                                    <TableHead>Logo</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Website</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className='text-right'>Action</TableHead>
                              </TableRow>
                        </TableHeader>
                        <TableBody>
                              {companies?.map((company) => (
                                    <tr key={company._id}>
                                          <TableCell>
                                                <Avatar>
                                                      <AvatarImage src={company?.logo} />
                                                </Avatar>
                                          </TableCell>
                                          <TableCell className="text-xl font-bold">{company?.name}</TableCell>
                                          <TableCell className="text-sm">
                                                <a className="hover:text-blue-700 hover:underline" href={company?.website} target="_blank" rel="noopener noreferrer" >{company?.website}</a>
                                          </TableCell>
                                          <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                                          <TableCell className='text-right'>
                                                <Popover>
                                                      <PopoverTrigger><MoreHorizontalIcon /></PopoverTrigger>
                                                      <PopoverContent className='w-fit bg-slate-50'>
                                                            <div className="flex gap-2 items-center cursor-pointer">
                                                                  <EditIcon size='20' />
                                                                  <span>Edit</span>
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

export default CompaniesTable
