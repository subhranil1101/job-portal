import FilterCard from "./FilterCard"
import Job from "./Job"
import Navbar from "./shared/Navbar"

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const Jobs = () => {
      return (
            <div>
                  <Navbar />
                  <div className="w-[90%] h-[84vh] mx-auto mt-7 pb-2 ">
                        <div className="flex gap-7 ">
                              <div className="w-[20%] h-[84vh] overflow-y-auto">
                                    <FilterCard />
                              </div>

                              {jobsArray.length === 0 ? <span>Jobs not found</span> : (
                                    <div className="flex-1 h-[84vh] overflow-y-auto  p-3">
                                          <div className="grid grid-cols-3 gap-10">
                                                {jobsArray.map((item, index) => <Job key={index} />)}
                                          </div>
                                    </div>
                              )}
                        </div>
                  </div>

            </div>
      )
}

export default Jobs
