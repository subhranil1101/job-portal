import { Search } from "lucide-react"
import { Button } from "./ui/button"
import Typewriter from 'typewriter-effect'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setSearchedQuery } from "@/redux/jobSlice"
import { useNavigate } from "react-router-dom"


const HeroSection = () => {
      const dispatch = useDispatch()
      const navigate = useNavigate()
      const [query, setQuery] = useState("")
      const searchJobHandler = () => {
            dispatch(setSearchedQuery(query))
            navigate("/browse")
      }


      const info = ["Register you as a Student & Apply various Jobs", "Register you as a Recruiter & Create a company to Post a Job"]
      return (
            <div className=" flex flex-col items-center text-center my-4">
                  <span className="text-xl font-mono bg-slate-100 text-blue-950 rounded-full px-2 py-1 shadow-lg shadow-blue-300 mx-auto border border-slate-500">Apply & Recruit in One Place</span>
                  <h1 className="text-5xl font-mono my-4">Search, apply & <br />Get your <span className="font-bold text-blue-800">Dream Job</span></h1>
                  <p className=" flex items-center text-base italic font-mono"><span className="text-2xl not-italic font-bold text-blue-900">&lt;&gt;&nbsp;</span><Typewriter
                        options={{
                              strings: info,
                              autoStart: true,
                              delay: 40,
                              deleteSpeed: 35,
                              loop: true,
                        }}
                  /><span className="text-2xl not-italic font-bold text-blue-900">&nbsp;&lt;/&gt;</span> </p>
                  <div className="flex justify-between shadow-lg shadow-slate-400 text-2xl py-1 pl-5 pr-2 border border-slate-300 rounded-full my-5 w-1/2 gap-2 ">
                        <input className="w-full outline-none border-none" type="search" name="search" id="search" placeholder="Find Your Dream Job" onChange={(e) => setQuery(e.target.value)} />
                        <Button onClick={searchJobHandler} className="bg-black text-white hover:bg-gray-900 text-2xl h-full rounded-full  "><Search className="w-fit h-fit " /></Button>
                  </div>
            </div>
      )
}

export default HeroSection
