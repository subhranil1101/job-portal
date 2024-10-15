import { useSelector } from "react-redux"
import Navbar from "../shared/Navbar"
import LoginForm from "./LoginForm"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
      const navigate = useNavigate()
      const { user } = useSelector(store => store.auth)
      useEffect(() => {
            if (user) {
                  navigate("/")
            }
      }, [])
      return (
            <div className="w-full">
                  <Navbar />
                  <div className=" w-full flex flex-col gap-6 justify-center items-center">
                        <h1 className="text-4xl font-bold font font-mono my-3">Login here</h1>
                        <LoginForm />
                  </div>
            </div>
      )
}

export default Login
