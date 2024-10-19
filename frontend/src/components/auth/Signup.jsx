import Navbar from "../shared/Navbar"
import SignupForm from "./SignupForm"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Signup = () => {
      const navigate = useNavigate()
      const { user } = useSelector(store => store.auth)
      useEffect(() => {
            if (user) {
                  navigate("/")
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      return (
            <div className="w-full">
                  <Navbar />
                  <div className=" w-full flex flex-col gap-6 justify-center items-center">
                        <h1 className="text-4xl font-bold font-sans my-3">Sign Up Here</h1>
                        <SignupForm />
                  </div>
            </div>
      )
}

export default Signup
