import { Badge } from "./ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

const AppliedJobTable = () => {
      return (
            <div>
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
                              {[1, 2, 3, 4, 5].map((item, index) => (
                                    <TableRow key={index}>
                                          <TableCell>17-07-2024</TableCell>
                                          <TableCell>Frontend Developer</TableCell>
                                          <TableCell>ABC Company</TableCell>
                                          <TableCell className="text-right"><Badge className="bg-black text-white hover:bg-black">Selected</Badge></TableCell>
                                    </TableRow>
                              ))}
                        </TableBody>
                  </Table>
            </div>
      )
}

export default AppliedJobTable
