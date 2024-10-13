import { useSelector } from "react-redux"
import LatestJobCard from "./LatestJobCard"

const LatestJobs = () => {
      const { allJobs } = useSelector(store => store.job);
      return (
            <div className='w-[90%] mx-auto flex flex-col items-center mb-6'>
                  <h1 className='text-4xl font-semibold my-5'><span className='font-mono text-cyan-700'>Latest & Top </span>Job Openings</h1>
                  <div className="grid grid-cols-3 gap-10 my-2 w-full ">
                        {allJobs.length <= 0 ? <span>No Jobs Available</span> : allJobs?.slice(0, 6).map((job) => <LatestJobCard key={job._id} job={job} />)}
                  </div>
            </div>
      )
}

export default LatestJobs
