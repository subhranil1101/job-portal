import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
      const dispatch = useDispatch();
      const { loading } = useSelector((store) => store.auth);
      const [input, setInput] = useState({
            email: "",
            password: "",
            role: "",
      });
      const navigate = useNavigate();
      const changeEventHandler = (e) => {
            setInput({ ...input, [e.target.name]: e.target.value });
      };
      const submitHandler = async (e) => {
            e.preventDefault();
            try {
                  dispatch(setLoading(true));
                  const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
                        headers: {
                              "Content-Type": "application/json",
                        },
                        withCredentials: true,
                  });
                  if (res.data.success) {
                        dispatch(setUser(res.data.user))
                        if (input.role === 'recruiter') {
                              navigate("/admin/companies")
                        } else {
                              navigate("/");
                        }
                        toast.success(res.data.message);
                  }
            } catch (error) {
                  console.log(error);
                  toast.error(error.response.data.message);
            } finally {
                  dispatch(setLoading(false));
            }
      };

      return (
            <div className="border border-gray-600 rounded-xl w-[60%] bg-slate-300">
                  <form
                        onSubmit={submitHandler}
                        className="flex flex-col gap-7 text-2xl p-6"
                  >
                        <div className="w-full flex flex-col">
                              <input
                                    type="email"
                                    name="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    placeholder=" Enter your email"
                                    className="border border-black rounded-xl py-1.5 px-3"
                              />
                        </div>

                        <div className="w-full flex flex-col">
                              <input
                                    placeholder="Enter your password"
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    className="border border-black rounded-xl px-3 py-1.5"
                              />
                        </div>

                        <div className="text-lg flex gap-6">
                              <span className="flex items-center">
                                    <input
                                          id="student"
                                          type="radio"
                                          name="role"
                                          value="student"
                                          onChange={changeEventHandler}
                                          className="w-10 h-5 accent-blue-950 bg-gray-100 border-gray-300 cursor-pointer"
                                    />
                                    <label htmlFor="student" className="font-semibold">
                                          Student
                                    </label>
                              </span>
                              <span className="flex items-center">
                                    <input
                                          id="recruiter"
                                          type="radio"
                                          name="role"
                                          value="recruiter"
                                          onChange={changeEventHandler}
                                          className="w-10 h-5 accent-blue-950 bg-gray-100 border-gray-300 cursor-pointer"
                                    />
                                    <label htmlFor="student" className="font-semibold">
                                          Recruiter
                                    </label>
                              </span>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
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
                                          Login
                                    </Button>
                              )}
                              <span className=" mx-auto text-base">
                                    Don&apos;t have an account?&nbsp;
                                    <Link to="/signup" className="text-blue-600 hover:underline">
                                          Create new Account
                                    </Link>
                              </span>
                        </div>
                  </form>
            </div>
      );
};

export default LoginForm;
