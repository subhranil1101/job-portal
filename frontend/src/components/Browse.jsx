import Job from "./Job"
import Navbar from "./shared/Navbar"

const randomJobs = [1, 2, 3, 4]
const Browse = () => {
      return (
            <div>
                  <Navbar />
                  <div className="max-w-7xl mx-auto my-10">
                        <h1 className="text-2xl font-bold my-5">Search Jobs ({randomJobs.length})</h1>
                        <div className="grid grid-cols-3 gap-5">
                              {randomJobs.map((item, index) => {
                                    return (
                                          <Job key={index} />
                                    )
                              })}
                        </div>
                  </div>
            </div>
      )
}

export default Browse
