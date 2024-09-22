import { User } from "../models/user.model";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//register function
export const register = async (req, res) => {
      try {
            //fetching data from request body
            const { fullName, email, phoneNo, password, role } = req.body;
            //checking all fields are filled
            if (!fullName || !email || !phoneNo || !password || !role) {
                  return res.status(400).json({
                        message: 'Something is missing',
                        success: false
                  })
            }

            //checking email is already in the db
            const user = User.findOne({ email });
            if (user) {
                  return res.status(400).json({
                        message: 'User is already Exist with this email',
                        success: false
                  })
            }

            //converting pw -> hashedPw
            const hashedPassword = await bcrypt.hash(password, 10);

            //Creating user
            await User.create({
                  fullName,
                  email,
                  phoneNo,
                  password: hashedPassword,
                  role
            })
            return res.status(201).json({
                  message: 'Account created successfully.',
                  success: true
            })

      } catch (error) {
            console.log(error)
      }
}

//login function
export const login = async (req, res) => {
      try {
            //fetching data from request body
            const { email, password, role } = req.body;

            //checking all fields are filled 
            if (!email || !password || !role) {
                  return res.status(400).json({
                        message: 'Something is missing',
                        success: false
                  })
            }

            //checking user email is already registered or not
            let user = await User.findOne({ email })
            if (!user) {
                  return res.status(400).json({
                        message: 'Incorrect email',
                        success: false
                  })
            }

            //checking user password is matching or not
            const isPwMatch = await bcrypt.compare(password, user.password);
            if (!isPwMatch) {
                  return res.status(400).json({
                        message: 'Incorrect Password',
                        success: false
                  })
            }

            //checking the role is correct or not
            if (role !== user.role) {
                  return res.status(400).json({
                        message: 'Account is not exist with current role',
                        success: false
                  })
            }

            //creating token to save as a token in cookies
            const tokenData = { userId: user._id }
            const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })

            //updating user to send a response
            user = {
                  _id: user._id,
                  fullName: user.fullName,
                  email: user.email,
                  phoneNo: user.phoneNo,
                  role: user.role,
                  profile: user.profile
            }

            //login as the user if all's ok
            return res.status(200).cookie('token', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
                  message: `Welcome Back ${user.fullName}`,
                  user,
                  success: true
            })


      } catch (error) {
            console.log(error)
      }
}

//logout function
export const logout = async (req, res) => {
      try {
            //setting cookie token to nothing and max age = 0 to logout
            return req.status(200).cookie('token', '', { maxAge: 0 }).json({
                  message: 'Logout Successfully',
                  success: true
            })
      } catch (error) {
            console.log(error)
      }
}

//update profile function
export const updateProfile = async (req, res) => {
      try {
            //fetching from request body
            const { fullName, email, phoneNo, bio, skills } = req.body;
            const file = req.file

            if (!fullName || !email || !phoneNo || !bio || !skills) {
                  return res.status(400).json({
                        message: 'Something is missing',
                        success: true
                  })
            }
            //converting skills string -> array
            const skillsArray = skills.split(',');
            const userId = req.id; //Middleware authentication
            //checking user is exists or not
            const user = User.findById(userId);
            if (!user) {
                  return res.status(400).json({
                        message: 'User not found',
                        success: false
                  })
            }

            //updating db
            user.fullName = fullName
            user.email = email
            user.phoneNo = phoneNo
            user.profile.bio = bio
            user.profile.skills = skillsArray

            await user.save();

            //updated user
            user = {
                  _id: user._id,
                  fullName: user.fullName,
                  email: user.email,
                  phoneNo: user.phoneNo,
                  role: user.role,
                  profile: user.profile
            }

            return res.status(200).json({
                  message: 'Account updated successfully',
                  user,
                  success: true
            })

      } catch (error) {
            console.log(error)
      }
}

