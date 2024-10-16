import { useDispatch, useSelector } from "react-redux"
import Job from "./Job"
import Navbar from "./shared/Navbar"
import { useEffect } from "react"
import { setSearchedQuery } from "@/redux/jobSlice"
import useGetAllJobs from "@/hooks/useGetAllJobs"
import { motion } from "framer-motion"

const Browse = () => {
      useGetAllJobs()
      const { allJobs } = useSelector(store => store.job)
      const dispatch = useDispatch()

      useEffect(() => {
            return () => {
                  dispatch(setSearchedQuery(""))
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      return (
            <div>
                  <Navbar />
                  <div className="max-w-7xl mx-auto my-10">
                        <h1 className="text-2xl font-bold my-5">Search Jobs ({allJobs.length})</h1>
                        <div className="grid grid-cols-3 gap-5">
                              {
                                    allJobs.map((job) => {
                                          return (
                                                <motion.div
                                                      initial={{ opacity: 0, x: -100 }}
                                                      animate={{ opacity: 1, x: 0 }}
                                                      exit={{ opacity: 0, x: 100 }}
                                                      transition={{ duration: 0.3 }}
                                                      key={job._id}>
                                                      <Job job={job} />
                                                </motion.div>
                                          )
                                    })
                              }
                        </div>
                  </div>
            </div>
      )
}

export default Browse
