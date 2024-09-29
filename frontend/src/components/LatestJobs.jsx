import LatestJobCard from "./LatestJobCard"

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8]
const LatestJobs = () => {
      return (
            <div className='w-[90%] mx-auto flex flex-col items-center mb-6'>
                  <h1 className='text-4xl font-semibold my-5'><span className='font-mono text-cyan-700'>Latest & Top </span>Job Openings</h1>
                  <div className="grid grid-cols-3 gap-10 my-2 w-full ">
                        {randomJobs.slice(0, 6).map((item, index) => <LatestJobCard key={index} />)}
                  </div>
            </div>
      )
}

export default LatestJobs
