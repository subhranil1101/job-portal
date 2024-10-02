import { LogOut, User2 } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link } from "react-router-dom";

const Navbar = () => {
      const user = false;
      return (
            <div className="bg-white flex justify-between my-2 items-center mx-auto max-w-[90%] h-16">
                  <div className="text-3xl font-bold">
                        Job<span className="text-blue-600">Cat</span>
                  </div>
                  <div className="flex justify-between gap-12 items-center">
                        <ul className="flex gap-6 text-xl font-bold items-center">
                              <li> <Link to='/'>Home</Link> </li>
                              <li> <Link to='/jobs'>Jobs</Link> </li>
                              <li><Link to='/'>Browse</Link></li>
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
                                                <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
                                          </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-80 mr-16 rounded-3xl bg-slate-100'>
                                          <div className="flex items-center gap-2 space-y-4">
                                                <Avatar className='cursor-pointer hover:scale-105'>
                                                      <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
                                                </Avatar>
                                                <div>
                                                      <span className="text-xl">Subhranil Das</span>
                                                      <p className="text-sm text-muted-foreground italic">Lorem ipsum dolor sit amet</p>
                                                </div>
                                          </div>
                                          <div className="w-[90%] flex mt-5 justify-between text-sm">
                                                <Button variant='link'> <User2 />&nbsp;View Profile</Button>
                                                <Button variant='destructive' className='bg-red-600 rounded-2xl hover:bg-red-500 text-white'><LogOut />&nbsp;Logout</Button>

                                          </div>
                                    </PopoverContent>
                              </Popover>
                        )}


                  </div>
            </div>
      );
};

export default Navbar;
