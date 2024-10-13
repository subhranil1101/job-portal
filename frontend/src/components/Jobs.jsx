import { useSelector } from "react-redux"
import FilterCard from "./FilterCard"
import Job from "./Job"
import Navbar from "./shared/Navbar"

const Jobs = () => {
      const { allJobs } = useSelector(store => store.job)
      return (
            <div>
                  <Navbar />
                  <div className="w-[90%] h-[84vh] mx-auto mt-7 pb-2 ">
                        <div className="flex gap-7 ">
                              <div className="w-[20%] h-[84vh] overflow-y-auto">
                                    <FilterCard />
                              </div>

                              {allJobs.length === 0 ? <span>Jobs not found</span> : (
                                    <div className="flex-1 h-[84vh] overflow-y-auto  p-3">
                                          <div className="grid grid-cols-3 gap-10">
                                                {allJobs?.map((job) => <Job key={job?._id} job={job} />)}
                                          </div>
                                    </div>
                              )}
                        </div>
                  </div>

            </div>
      )
}

export default Jobs
