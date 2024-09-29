import { Badge } from "./ui/badge"

const LatestJobCard = () => {
      return (
            <div className="hover:scale-105 transition-transform duration-300 ease-in-out p-5 cursor-pointer rounded-xl shadow-xl shadow-slate-500 hover:shadow-blue-200 border border-slate-600 text-xl">
                  <div>
                        <h1 className="text-2xl font-semibold">company name</h1>
                        <p className="text-base text-gray-600">india</p>
                  </div>
                  <div>
                        <h1 className="text-lg font-bold my-2">job title</h1>
                        <p className="text-base font-serif italic text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, nostrum?</p>
                  </div>
                  <div className="flex gap-3 justify-center pt-3">
                        <Badge variant='ghost' className='text-blue-700 font-bold text-sm'>12 position</Badge>
                        <Badge variant='ghost' className='text-green-500 font-bold text-sm'>full time</Badge>
                        <Badge variant='ghost' className='text-red-600 font-bold text-sm'>4LPA</Badge>
                  </div>
            </div>
      )
}

export default LatestJobCard
