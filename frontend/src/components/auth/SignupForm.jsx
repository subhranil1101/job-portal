import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const SignupForm = () => {
      const dispatch = useDispatch();
      const { loading } = useSelector((store) => store.auth);

      const [input, setInput] = useState({
            fullName: "",
            email: "",
            phoneNo: "",
            password: "",
            role: "",
            file: "",
      });

      const changeEventHandler = (e) => {
            setInput({ ...input, [e.target.name]: e.target.value });
      };

      const changeFileHandler = (e) => {
            setInput({ ...input, file: e.target.files?.[0] });
      };

      const navigate = useNavigate();

      const onSubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append("fullName", input.fullName);
            formData.append("email", input.email);
            formData.append("phoneNo", input.phoneNo);
            formData.append("password", input.password);
            formData.append("role", input.role);
            if (input.file) {
                  formData.append("file", input.file);
            }

            try {
                  dispatch(setLoading(true));
                  const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
                        headers: {
                              "Content-Type": "multipart/form-data",
                        },
                        withCredentials: true,
                  });
                  if (res.data.success) {
                        navigate("/login");
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
            <div className="border border-gray-600 rounded-xl w-[60%] bg-slate-300 shadow-2xl shadow-slate-900">
                  <form onSubmit={onSubmit} className="flex flex-col gap-7 text-2xl p-6">
                        <div className="w-full flex flex-col">
                              <input
                                    placeholder="Enter full name"
                                    className="border border-black bg-slate-100 focus:bg-white  rounded-xl px-3 py-1.5"
                                    type="text"
                                    name="fullName"
                                    value={input.fullName}
                                    onChange={changeEventHandler}
                              />
                        </div>

                        <div className="w-full flex flex-col">
                              <input
                                    placeholder=" Enter your email"
                                    className="border border-black bg-slate-100 focus:bg-white rounded-xl py-1.5 px-3"
                                    type="email"
                                    name="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                              />
                        </div>

                        <div className="w-full flex flex-col">
                              <input
                                    placeholder=" Enter your mobile no."
                                    className="border border-black bg-slate-100 focus:bg-white rounded-xl px-3 py-1.5"
                                    type="text"
                                    name="phoneNo"
                                    value={input.phoneNo}
                                    onChange={changeEventHandler}
                              />
                        </div>

                        <div className="w-full flex flex-col">
                              <input
                                    placeholder=" Enter a password"
                                    type="password"
                                    className="border border-black bg-slate-100 focus:bg-white rounded-xl px-3 py-1.5"
                                    name="password"
                                    value={input.password}
                                    onChange={changeEventHandler}
                              />
                        </div>


                        <div className="flex justify-between">
                              <div className="flex flex-col gap-3 justify-center">
                                    <label className="text-xl left-0 px-3 font-medium">Select Your Role*</label>
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
                              </div>
                              <div className="flex flex-col text-sm justify-center my-1 gap-2">
                                    <div className="flex text-lg  gap-3">
                                          <label className="font-semibold">Profile</label>
                                          <input
                                                accept="image/*"
                                                type="file"
                                                name="file"
                                                id="file"
                                                onChange={changeFileHandler}
                                                className="cursor-pointer w-fit text-sm disable"
                                          />
                                    </div>
                                    {!input?.file && <span className="text-red-500">*You can also update profile photo later on</span>}

                              </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                              {loading ? (
                                    <Button className="border border-slate-200 bg-black text-white w-3/4 mx-auto text-lg font-mono font-bold rounded-xl hover:bg-slate-800">
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                          Please wait...
                                    </Button>
                              ) : (
                                    <Button
                                          disabled={!input?.role}
                                          type="submit"
                                          className="border border-slate-200 bg-black text-white w-3/4 mx-auto text-lg font-mono font-bold rounded-xl hover:bg-slate-800"
                                    >
                                          Sign Up
                                    </Button>
                              )}
                              <span className=" mx-auto text-base">
                                    Already have an account?&nbsp;
                                    <Link to="/login" className="text-blue-600 hover:underline">
                                          Login
                                    </Link>
                              </span>
                        </div>
                  </form>
            </div>
      );
};

export default SignupForm;
