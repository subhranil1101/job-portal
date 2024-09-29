import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { useState } from "react";

const SignupForm = () => {
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
            }
      };

      return (
            <div className="border border-gray-600 rounded-xl w-[60%] bg-slate-300">
                  <form onSubmit={onSubmit} className="flex flex-col gap-7 text-2xl p-6">
                        <div className="w-full flex flex-col">
                              <input
                                    placeholder="Enter full name"
                                    className="border border-black  rounded-xl px-3 py-1.5"

                                    type="text"
                                    name="fullName"
                                    value={input.fullName}
                                    onChange={changeEventHandler}
                              />

                        </div>

                        <div className="w-full flex flex-col">
                              <input
                                    placeholder=" Enter your email"
                                    className="border border-black rounded-xl py-1.5 px-3"

                                    type="email"
                                    name="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                              />

                        </div>

                        <div className="w-full flex flex-col">
                              <input
                                    placeholder=" Enter your mobile no."
                                    className="border border-black rounded-xl px-3 py-1.5"
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
                                    className="border border-black rounded-xl px-3 py-1.5"

                                    name="password"
                                    value={input.password}
                                    onChange={changeEventHandler}
                              />

                        </div>

                        <div className="flex justify-between">
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
                              <div className="flex text-lg my-1 gap-2">
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
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                              <Button
                                    type="submit"
                                    className="border border-slate-200 bg-black text-white w-3/4 mx-auto text-lg font-mono font-bold rounded-xl hover:bg-slate-800"
                              >
                                    Sign Up
                              </Button>
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
