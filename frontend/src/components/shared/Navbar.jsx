import { LogOut, User2 } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {

      const { user } = useSelector(store => store.auth)
      const dispatch = useDispatch()
      const navigate = useNavigate()
      const logoutHandler = async () => {
            try {
                  const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true })
                  if (res.data.success) {
                        dispatch(setUser(null))
                        navigate('/')
                        toast.success(res.data.message)
                  }
            } catch (error) {
                  console.log(error)
                  toast.error(error.response.data.message)
            }
      }

      return (
            <div className="bg-white flex justify-between my-2 items-center mx-auto max-w-[90%] h-16">
                  <Link to='/'><div className="text-3xl font-bold">
                        Job<span className="text-blue-600">Cat</span>
                  </div></Link>
                  <div className="flex justify-between gap-12 items-center">
                        <ul className="flex gap-6 text-xl font-bold items-center">
                              {
                                    user && user.role === 'recruiter' ? (
                                          <>
                                                <li> <Link to='/admin/companies'>Companies</Link> </li>
                                                <li> <Link to='/admin/jobs'>Jobs</Link> </li>
                                          </>
                                    ) : (
                                          <>
                                                <li> <Link to='/'>Home</Link> </li>
                                                <li> <Link to='/jobs'>Jobs</Link> </li>
                                                <li><Link to='/browse'>Browse</Link></li>
                                          </>
                                    )}
                        </ul>
                        {!user ? (
                              <div className="flex gap-2 items-center">
                                    <Link to='/login'>
                                          <Button className='text-base border border-slate-400 rounded-full bg-blue-200 hover:bg-blue-300'>Login</Button>
                                    </Link>
                                    <Link to='/signup'>
                                          <Button className='text-ba border border-slate-400 rounded-full bg-violet-800 text-white hover:bg-violet-700'>Sign Up</Button>
                                    </Link>
                              </div>
                        ) : (
                              <Popover>
                                    <PopoverTrigger asChild>
                                          <Avatar className='cursor-pointer hover:scale-105'>
                                                {
                                                      user?.profile?.profilePhoto ? <AvatarImage src={user?.profile?.profilePhoto} alt="profile" /> :
                                                            <AvatarImage src="https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png" alt="profile" />
                                                }
                                          </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-80 mr-16 rounded-3xl bg-slate-100'>
                                          <div className="flex items-center gap-2">
                                                <Avatar className='cursor-pointer hover:scale-105'>
                                                      {
                                                            user?.profile?.profilePhoto ? <AvatarImage src={user?.profile?.profilePhoto} alt="profile" /> :
                                                                  <AvatarImage src="https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png" alt="profile" />
                                                      }
                                                </Avatar>
                                                <div>
                                                      <span className="text-xl">{user?.fullName}</span>
                                                      <p className="text-sm text-muted-foreground italic text-balance">{user?.profile?.bio}</p>
                                                </div>
                                          </div>
                                          <div className="w-[90%] flex mt-5 justify-between text-sm">
                                                {user && user.role === 'student' && (
                                                      <Link to='/profile'><Button variant='link'> <User2 />&nbsp;View Profile</Button></Link>
                                                )}
                                                <Button onClick={logoutHandler} variant='destructive' className='bg-red-600 rounded-2xl hover:bg-red-500 text-white'><LogOut />&nbsp;Logout</Button>

                                          </div>
                                    </PopoverContent>
                              </Popover>
                        )}


                  </div>
            </div>
      );
};

export default Navbar;
