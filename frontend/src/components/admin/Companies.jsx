import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'

const Companies = () => {
      return (
            <div>
                  <Navbar />
                  <div className=' max-w-6xl mx-auto my-10'>
                        <div className='flex justify-between items-center my-5'>
                              <input type="text" className='w-fit text-lg border border-slate-900 outline-none rounded-2xl px-5 py-1' placeholder='Filter by name' />
                              <Button className='px-6 bg-black text-lg text-white rounded-full hover:bg-gray-800'>New Company</Button>
                        </div>
                        <CompaniesTable />
                  </div>
            </div>
      )
}

export default Companies
