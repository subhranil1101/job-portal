import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
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
            resume: user?.profile?.resume,
            profilePhoto: user?.profile?.profilePhoto
      })

      const dispatch = useDispatch()

      const changeEventHandler = (e) => {
            setInput({ ...input, [e.target.name]: e.target.value })
      }

      const resumeChangeHandler = (e) => {
            const resume = e.target.files?.[0]
            setInput({ ...input, resume })
      }

      const profilePhotoChangeHandler = (e) => {
            const profilePhoto = e.target.files?.[0]
            setInput({ ...input, profilePhoto })
      }


      const submitHandler = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append("fullName", input.fullName)
            formData.append("email", input.email)
            formData.append("phoneNo", input.phoneNo)
            formData.append("bio", input.bio)
            formData.append("skills", input.skills)
            if (input.resume) {
                  formData.append("resume", input.resume)
            }
            if (input.profilePhoto) {
                  formData.append("profilePhoto", input.profilePhoto)
            }
            try {
                  setLoading(true)
                  const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
                        headers: {
                              'Content-Type': 'multipart/form-data'
                        },
                        withCredentials: true
                  });
                  console.log(res.data)
                  if (res.data.success) {
                        dispatch(setUser(res.data.user));
                        toast.success(res.data.message)
                  }
            } catch (error) {
                  console.log(error)
                  toast.error(error.response.data.message)
            } finally {
                  setLoading(false)
            }
            setOpen(false)
      }


      return (
            <div>
                  <Dialog open={open} >
                        <DialogContent className='bg-white sm:max-w-[700px]' onInteractOutside={() => setOpen(false)} >
                              <DialogHeader >
                                    <DialogTitle className='text-center text-2xl font-bold font-mono'>
                                          Update Profile
                                    </DialogTitle>
                                    <DialogDescription className="text-xs mx-auto">
                                          Make changes to your profile here. Click update when you&apos;re done.
                                    </DialogDescription>
                                    <DialogClose asChild className="">
                                          <Button className="w-fit rounded-xl absolute right-3 top-3 bg-white hover:bg-white z-10" onClick={() => setOpen(false)} type="button" variant="outline">
                                                Close
                                          </Button>
                                    </DialogClose>
                              </DialogHeader>
                              <form onSubmit={submitHandler}>
                                    <div className="grid gap-4 py-4">
                                          <div className="grid grid-cols-4 items-center gap-1">
                                                <label htmlFor="name" className="text-center text-xl font-medium">Name <span className="text-red-600">*</span></label>
                                                <input id="name" name="fullName" value={input.fullName} onChange={changeEventHandler} className="col-span-3  border border-gray-600 outline-none px-3 py-2 rounded-2xl text-xl" />
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-1">
                                                <label htmlFor="profilePhoto" className="text-center text-xl font-medium">Profile Photo</label>
                                                <input type="file" accept="image/*" id="profilePhoto" name="profilePhoto" onChange={profilePhotoChangeHandler} className="col-span-3  border border-gray-600 outline-none px-3 py-2 rounded-2xl text-xl" />
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-1">
                                                <label htmlFor="email" className="text-center text-xl font-medium">Email <span className="text-red-600">*</span></label>
                                                <input type='email' id="email" name="email" value={input.email} placeholder="example@email.com" onChange={changeEventHandler} className="col-span-3  border border-gray-600 outline-none px-3 py-2 rounded-2xl text-xl" />
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-1">
                                                <label htmlFor="phoneNo" className="text-center text-xl font-medium">Phone No <span className="text-red-600">*</span></label>
                                                <input id="phoneNo" name="phoneNo" value={input.phoneNo} onChange={changeEventHandler} placeholder="0123456789" className="col-span-3  border border-gray-600 outline-none px-3 py-2 rounded-2xl text-xl" />
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-1">
                                                <label htmlFor="bio" className="text-center text-xl font-medium">Bio</label>
                                                <textarea rows={3} id="bio" name="bio" value={input.bio} onChange={changeEventHandler} placeholder="Something about yourself" className="col-span-3  border border-gray-600 outline-none px-3 py-2 rounded-2xl text-xl" />
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-1">
                                                <label htmlFor="skills" className="text-center text-xl font-medium">Skills</label>
                                                <input id="skills" name="skills" value={input.skills} onChange={changeEventHandler} placeholder="Use ',' separated value" className="col-span-3  border border-gray-600 outline-none px-3 py-2 rounded-2xl text-xl" />
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-1">
                                                <label htmlFor="resume" className="text-center text-xl font-medium">Resume</label>
                                                <input type="file" accept="application/pdf" id="resume" name="resume" onChange={resumeChangeHandler} className="col-span-3  border border-gray-600 outline-none px-3 py-2 rounded-2xl text-xl" />
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
                                                      disabled={!input.fullName || !input.email || !input.phoneNo || input.fullName.length < 3 || input.phoneNo.length !== 10 || !input.email.includes("@")}
                                                      type="submit"
                                                      className="border border-slate-200 bg-black text-white w-3/4 mx-auto text-lg font-mono font-bold rounded-xl hover:bg-slate-800"
                                                >
                                                      Update
                                                </Button>
                                          )}
                                    </DialogFooter>
                              </form>
                        </DialogContent >
                  </Dialog>

            </div>
      )
}

export default UpdateProfileDialog
