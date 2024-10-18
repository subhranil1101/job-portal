import { EditIcon, MoreHorizontalIcon, SquareArrowOutUpRight, TrashIcon } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"


const CompaniesTable = () => {
      const navigate = useNavigate()
      const { companies, searchCompanyByName } = useSelector(store => store.company)
      const [filterCompany, setFilterCompany] = useState(companies)

      useEffect(() => {
            const filteredCompany = companies.length >= 0 && companies.filter((company) => {
                  if (!searchCompanyByName) {
                        return true
                  }
                  return company?.name?.toLowerCase().includes(searchCompanyByName.toLowerCase())
            })
            setFilterCompany(filteredCompany)
      }, [companies, searchCompanyByName])
      return (
            <div className="border border-black p-5 rounded-3xl shadow-xl">
                  {
                        !filterCompany ?
                              <p className="text-red-500 font-bold text-center text-xl">
                                    *No Company to display. Please register your 1st Company
                              </p>
                              :
                              <Table>
                                    <TableCaption className="text-blue-900 font-medium text-base italic">A List of Your Registered Companies</TableCaption>
                                    <TableHeader>
                                          <TableRow className="text-xl font-serif shadow shadow-slate-700">
                                                <TableHead>Logo</TableHead>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Description</TableHead>
                                                {/* <TableHead>Website</TableHead> */}
                                                <TableHead>Location</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead className='text-right'>Action</TableHead>
                                          </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                          {filterCompany?.map((company) => (
                                                <motion.tr
                                                      initial={{ opacity: 0, x: -100 }}
                                                      animate={{ opacity: 1, x: 0 }}
                                                      exit={{ opacity: 0, x: 100 }}
                                                      transition={{ duration: 0.5 }}
                                                      key={company._id}>
                                                      <TableCell className='drop-shadow-xl'>
                                                            <Avatar>
                                                                  <AvatarImage src={company?.logo} />
                                                            </Avatar>
                                                      </TableCell>
                                                      <TableCell
                                                            className="text-xl font-bold flex gap-2 items-center justify-start hover:scale-105 cursor-default"
                                                      >
                                                            {company?.name}

                                                            {
                                                                  company?.website && <a
                                                                        href={company?.website}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-gray-500 hover:text-gray-900"
                                                                  >
                                                                        <SquareArrowOutUpRight />
                                                                  </a>
                                                            }
                                                      </TableCell>
                                                      <TableCell className="text-base font-medium">{company?.description || <span className="text-gray-500 text-xs cursor-pointer hover:text-gray-700" onClick={() => navigate(`/admin/companies/${company._id}`)}>Add Company Description</span>}</TableCell>
                                                      {/* <TableCell className="text-sm">
                                                <a className="hover:text-blue-700 hover:underline" href={company?.website} target="_blank" rel="noopener noreferrer" >{company?.website || "Add company website"}</a>
                                          </TableCell> */}
                                                      <TableCell className="text-base font-medium">{company?.location || <span className="text-gray-500 text-xs cursor-pointer hover:text-gray-700" onClick={() => navigate(`/admin/companies/${company._id}`)}>Add Company Location</span>}</TableCell>

                                                      <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                                                      <TableCell className='text-right'>
                                                            <Popover>
                                                                  <PopoverTrigger><MoreHorizontalIcon /></PopoverTrigger>
                                                                  <PopoverContent className='rounded-3xl shadow-xl w-fit bg-slate-50 flex flex-col gap-5 justify-start items-start'>
                                                                        <div onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex gap-2 items-center cursor-pointer">
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
                                                </motion.tr>
                                          ))}
                                    </TableBody>
                              </Table>
                  }
            </div>
      )
}

export default CompaniesTable
