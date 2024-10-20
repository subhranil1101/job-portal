import { Loader2 } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_ENDPOINT } from "@/utils/constant"
import { setUser } from "@/redux/authSlice"
import { toast } from "sonner"
import { Button } from "../ui/button"

const UpdateAdminProfileDialog = ({ open, setOpen }) => {
      const [loading, setLoading] = useState(false)
      const { user } = useSelector(store => store.auth)

      const [input, setInput] = useState({
            fullName: user?.fullName,
            email: user?.email,
            phoneNo: user?.phoneNo,
            profilePhoto: user?.profile?.profilePhoto
      })

      const dispatch = useDispatch()

      const changeEventHandler = (e) => {
            setInput({ ...input, [e.target.name]: e.target.value })
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
                                    <div className="grid gap-5 py-4">
                                          <div className="grid items-center gap-1">
                                                <label htmlFor="name" className="px-3 text-xl font-medium">Name <span className="text-red-600">*</span></label>
                                                <input id="name" name="fullName" value={input.fullName} onChange={changeEventHandler} className="col-span-3  border border-gray-600 outline-none px-3 py-2 rounded-2xl text-xl" />
                                          </div>
                                          <div className="grid  items-center gap-1">
                                                <label htmlFor="profilePhoto" className="px-3 text-xl font-medium">Profile Photo</label>
                                                <input type="file" accept="image/*" id="profilePhoto" name="profilePhoto" onChange={profilePhotoChangeHandler} className="col-span-3  border border-gray-600 outline-none px-3 py-2 rounded-2xl text-xl" />
                                          </div>
                                          <div className="grid  items-center gap-1">
                                                <label htmlFor="email" className="px-3 text-xl font-medium">Email <span className="text-red-600">*</span></label>
                                                <input type='email' id="email" name="email" value={input.email} placeholder="example@email.com" onChange={changeEventHandler} className="col-span-3  border border-gray-600 outline-none px-3 py-2 rounded-2xl text-xl" />
                                          </div>
                                          <div className="grid items-center gap-1">
                                                <label htmlFor="phoneNo" className="px-3 text-xl font-medium">Phone No <span className="text-red-600">*</span></label>
                                                <input id="phoneNo" name="phoneNo" value={input.phoneNo} onChange={changeEventHandler} placeholder="0123456789" className="col-span-3  border border-gray-600 outline-none px-3 py-2 rounded-2xl text-xl" />
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
                                                      disabled={!input.fullName || !input.email || !input.phoneNo}
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

export default UpdateAdminProfileDialog
