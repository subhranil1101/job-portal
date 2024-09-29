import Navbar from "../shared/Navbar"
import SignupForm from "./SignupForm"

const Signup = () => {
      return (
            <div className="w-full">
                  <Navbar />
                  <div className=" w-full flex flex-col gap-6 justify-center items-center">
                        <h1 className="text-4xl font-bold font font-mono my-3">Sign Up Here</h1>
                        <SignupForm />
                  </div>
            </div>
      )
}

export default Signup
