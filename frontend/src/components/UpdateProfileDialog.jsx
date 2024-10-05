import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_ENDPOINT } from "@/utils/constant"
import { setUser } from "@/redux/authSlice"
import { toast } from "sonner"

const UpdateProfileDialog = ({ open, setOpen }) => {
      const [loading, setLoading] = useState(false)
      const { user } = useSelector(store => store.auth)

      const [input, setInput] = useState({
            fullName: user?.fullName,
            email: user?.email,
            phoneNo: user?.phoneNo,
            bio: user?.profile?.bio,
            skills: user?.profile?.skills?.map(skill => skill),
            file: user?.profile?.resume
      })

      const dispatch = useDispatch()

      const changeEventHandler = (e) => {
            setInput({ ...input, [e.target.name]: e.target.value })
      }

      const fileChangeHandler = (e) => {
            const file = e.target.files?.[0]
            setInput({ ...input, file })
      }

      const submitHandler = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append("fullName", input.fullName)
            formData.append("email", input.email)
            formData.append("phoneNo", input.phoneNo)
            formData.append("bio", input.bio)
            formData.append("skills", input.skills)
            if (input.file)
                  formData.append("file", input.file)

            try {
                  const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
                        headers: {
                              'Content-Type': 'multipart/form-data'
                        },
                        withCredentials: true
                  });
                  if (res.data.success) {
                        dispatch(setUser(res.data.user));
                        toast.success(res.data.message)
                  }
            } catch (error) {
                  console.log(error)
                  toast.error(error.response.data.message)
            }
            setOpen(false)
            console.log(input)
      }


      return (
            <div>
                  <Dialog open={open} >
                        <DialogContent className='bg-white sm:max-w-[700px]' onInteractOutside={() => setOpen(false)} >
                              <DialogHeader>
                                    <DialogTitle className='text-center text-2xl font-bold font-mono'>Update Profile</DialogTitle>
                              </DialogHeader>
                              <form onSubmit={submitHandler}>
                                    <div className="grid gap-4 py-4">
                                          <div className="grid grid-cols-4 items-center gap-1">
                                                <label htmlFor="name" className="text-center text-xl">Name</label>
                                                <input id="name" name="name" value={input.fullName} onChange={changeEventHandler} className="col-span-3  border border-gray-600 outline-none px-3 py-2 rounded-2xl text-xl" />
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-1">
                                                <label htmlFor="email" className="text-center text-xl">Email</label>
                                                <input type='email' id="email" name="email" value={input.email} onChange={changeEventHandler} className="col-span-3  border border-gray-600 outline-none px-3 py-2 rounded-2xl text-xl" />
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-1">
                                                <label htmlFor="phoneNo" className="text-center text-xl">Phone No</label>
                                                <input id="phoneNo" name="phoneNo" value={input.phoneNo} onChange={changeEventHandler} className="col-span-3  border border-gray-600 outline-none px-3 py-2 rounded-2xl text-xl" />
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-1">
                                                <label htmlFor="bio" className="text-center text-xl">Bio</label>
                                                <textarea rows={3} id="bio" name="bio" value={input.bio} onChange={changeEventHandler} className="col-span-3  border border-gray-600 outline-none px-3 py-2 rounded-2xl text-xl" />
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-1">
                                                <label htmlFor="skills" className="text-center text-xl">Skills</label>
                                                <input id="skills" name="skills" value={input.skills} onChange={changeEventHandler} className="col-span-3  border border-gray-600 outline-none px-3 py-2 rounded-2xl text-xl" />
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-1">
                                                <label htmlFor="file" className="text-center text-xl">Resume</label>
                                                <input type="file" accept="application/pdf" id="file" name="file" onChange={fileChangeHandler} className="col-span-3  border border-gray-600 outline-none px-3 py-2 rounded-2xl text-xl" />
                                          </div>
                                    </div>

                                    <DialogFooter>
                                          {loading ? (
                                                <Button className="border border-slate-200 bg-black text-white w-3/4 mx-auto text-lg font-mono font-bold rounded-xl hover:bg-slate-800">
                                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                      Please wait..
                                                </Button>
                                          ) : (
                                                <Button
                                                      type="submit"
                                                      className="border border-slate-200 bg-black text-white w-3/4 mx-auto text-lg font-mono font-bold rounded-xl hover:bg-slate-800"
                                                >
                                                      Update
                                                </Button>
                                          )}
                                    </DialogFooter>
                              </form>
                        </DialogContent>
                  </Dialog>

            </div>
      )
}

export default UpdateProfileDialog
