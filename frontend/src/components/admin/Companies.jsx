import { useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByName } from '@/redux/companySlice'

const Companies = () => {
      useGetAllCompanies();
      const [input, setInput] = useState('')
      const navigate = useNavigate()

      const dispatch = useDispatch()
      useEffect(() => {
            dispatch(setSearchCompanyByName(input))
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [input])
      return (
            <div>
                  <Navbar />
                  <div className=' max-w-7xl mx-auto my-10'>
                        <div className='flex justify-between items-center my-5'>
                              <input type="text" className='w-fit text-lg border border-slate-900 outline-none rounded-2xl px-5 py-1' placeholder='Filter by name' onChange={(e) => setInput(e.target.value)} />
                              <Button onClick={() => navigate("/admin/companies/create")} className='px-6 bg-black text-lg text-white rounded-full hover:bg-gray-700'>New Company</Button>
                        </div>
                        <CompaniesTable />
                  </div>
            </div>
      )
}

export default Companies
