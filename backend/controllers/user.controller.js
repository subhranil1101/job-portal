import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

//register function
export const register = async (req, res) => {
      try {
            //fetching data from request body
            const { fullName, email, phoneNo, password, role } = req.body;

            //checking all fields are filled or not
            if (!fullName || !email || !phoneNo || !password || !role) {
                  return res.status(400).json({
                        message: 'Something is missing',
                        success: false
                  })
            }

            //details validation checks
            if (fullName.length < 3 || !email.includes("@") || phoneNo.length < 10) {
                  return res.status(500).json({
                        message: "Something is wrong",
                        success: false
                  })
            }

            //cloudinary setup for dp
            // const file = req.file
            // const fileUri = getDataUri(file)
            // const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

            // Cloudinary setup for profile picture
            const file = req.file;
            let cloudResponse;

            // If a file is provided, upload it; otherwise, use the default image
            if (file) {
                  const fileUri = getDataUri(file);
                  cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            } else {
                  cloudResponse = {
                        secure_url: "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
                  };
            }


            //checking email is already in the db
            const user = await User.findOne({ email });
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
                  role,
                  profile: { profilePhoto: cloudResponse.secure_url }
            })
            return res.status(200).json({
                  message: 'Account created successfully.',
                  success: true
            })

      } catch (error) {
            console.log(error);
            return res.status(500).json({
                  message: 'An error occurred during registration.',
                  success: false
            });
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
            return res.status(200).cookie('token', '', { maxAge: 0 }).json({
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

            //details validation checks
            if (fullName.length < 3 || !email.includes("@") || phoneNo.length < 10) {
                  return res.status(500).json({
                        message: "Something is wrong",
                        success: false
                  })
            }

            // const file = req.file

            const profilePhoto = req.files?.profilePhoto?.[0];
            const resume = req.files?.resume?.[0];

            //cloudinary response setup
            // const fileUri = getDataUri(file)
            // const cloudResponse = await cloudinary.uploader.upload(fileUri.content)


            //converting skills string -> array
            let skillsArray;
            if (skills) {
                  skillsArray = skills.split(',');
            }

            const userId = req.id; //Middleware authentication
            //checking user is exists or not
            let user = await User.findById(userId);
            if (!user) {
                  return res.status(400).json({
                        message: 'User not found',
                        success: false
                  })
            }

            //updating db as per input values
            // if (fullName) { user.fullName = fullName }
            user.fullName = fullName
            if (email) { user.email = email }
            if (phoneNo) { user.phoneNo = phoneNo }
            user.profile.bio = bio
            user.profile.skills = skillsArray

            if (!fullName || !email || !phoneNo) {
                  return res.status(400).json({
                        message: "Required fields must not be blank",
                        success: false
                  })
            }

            // Upload files to Cloudinary and update user profile if provided
            if (profilePhoto) {
                  const profilePhotoUri = getDataUri(profilePhoto);
                  const profilePhotoResponse = await cloudinary.uploader.upload(profilePhotoUri.content);
                  user.profile.profilePhoto = profilePhotoResponse.secure_url; // Save Cloudinary URL
                  user.profile.profilePhotoOriginalName = profilePhoto.originalname; // Save original filename
            }

            if (resume) {
                  const resumeUri = getDataUri(resume);
                  const resumeResponse = await cloudinary.uploader.upload(resumeUri.content);
                  user.profile.resume = resumeResponse.secure_url; // Save Cloudinary URL
                  user.profile.resumeOriginalName = resume.originalname; // Save original filename
            }


            // if (cloudResponse) {
            //       user.profile.resume = cloudResponse.secure_url  //saving cloudinary url
            //       user.profile.resumeOriginalName = file.originalname //saving original filename
            // }

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
            console.log(error);
            return res.status(500).json({
                  message: 'Something went wrong',
                  success: false
            });
      }
}

