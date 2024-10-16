import { useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByName } from '@/redux/jobSlice'

const AdminJobs = () => {
      useGetAllAdminJobs()
      const [input, setInput] = useState('')
      const navigate = useNavigate()

      const dispatch = useDispatch()
      useEffect(() => {
            dispatch(setSearchJobByName(input))
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [input])
      return (
            <div>
                  <Navbar />
                  <div className=' max-w-7xl mx-auto my-10'>
                        <div className='flex justify-between items-center my-5'>
                              <input type="text" className='w-1/3 text-lg border border-slate-900 outline-none rounded-2xl px-5 py-1' placeholder='Filter by Job role or company name' onChange={(e) => setInput(e.target.value)} />
                              <Button onClick={() => navigate("/admin/jobs/create")} className='px-6 bg-black text-lg text-white rounded-full hover:bg-gray-700'>New Jobs</Button>
                        </div>
                        <AdminJobsTable />
                  </div>
            </div>
      )
}

export default AdminJobs
