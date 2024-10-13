import { EditIcon, MoreHorizontalIcon } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

const CompaniesTable = () => {
      return (
            <div>
                  <Table>
                        <TableCaption>A List of Your Registered Companies</TableCaption>
                        <TableHeader>
                              <TableRow>
                                    <TableHead>Logo</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className='text-right'>Action</TableHead>
                              </TableRow>
                        </TableHeader>
                        <TableBody>
                              <TableCell>
                                    <Avatar>
                                          <AvatarImage src='https://www.shutterstock.com/image-vector/company-vector-logo-design-element-260nw-452062015.jpg' />
                                    </Avatar>
                              </TableCell>
                              <TableCell>Company Name</TableCell>
                              <TableCell>13/10/2024</TableCell>
                              <TableCell className='text-right'>
                                    <Popover>
                                          <PopoverTrigger><MoreHorizontalIcon /></PopoverTrigger>
                                          <PopoverContent className='w-fit'>
                                                <div className="flex gap-2 items-center cursor-pointer">
                                                      <EditIcon size='20' />
                                                      <span>Edit</span>
                                                </div>
                                          </PopoverContent>
                                    </Popover>
                              </TableCell>
                        </TableBody>
                  </Table>
            </div>
      )
}

export default CompaniesTable
