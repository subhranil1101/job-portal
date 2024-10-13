import { Company } from "../models/company.model.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

//company register function
export const companyRegister = async (req, res) => {
      try {
            //fetching name from body
            const { companyName } = req.body;
            //sending bad request if company name is empty
            if (!companyName) {
                  return res.status(400).json({
                        message: "Company name is required",
                        success: false
                  })
            }

            //checking for unique company names
            let company = await Company.findOne({ name: companyName })
            if (company) {
                  return res.status(400).json({
                        message: "This company name is not available",
                        success: false
                  })
            }

            //creating company
            company = await Company.create({
                  name: companyName,
                  userId: req.id
            })

            return res.status(201).json({
                  message: "Company created successfully",
                  company,
                  success: true
            })
      } catch (error) {
            console.log(error)
      }
}

//get company by user's id
export const getCompany = async (req, res) => {
      try {
            const userId = req.id //logged in user's id
            const companies = await Company.find({ userId })

            //if no company is found
            if (!companies) {
                  return res.status(404).json({
                        message: "Companies not found",
                        success: false
                  })
            }

            return res.status(200).json({
                  companies,
                  success: true
            })
      } catch (error) {
            console.log(error)
      }
}

//get company by id
export const getCompanyById = async (req, res) => {
      try {
            const companyId = req.params.id; //collecting id from URL
            const company = await Company.findById(companyId)

            //return if no company is present in db
            if (!company) {
                  return res.status(404).json({
                        message: "Company not found",
                        success: false
                  })
            }

            //return if company is present
            return res.status(200).json({
                  company,
                  success: true
            })
      } catch (error) {
            console.log(error)
      }
}

//company update function
export const updateCompany = async (req, res) => {
      try {
            //fetching from req body
            const { name, description, website, location } = req.body
            const file = req.file //logo
            const fileUri = getDataUri(file)
            const cloudeResponse = await cloudinary.uploader.upload(fileUri.content)
            const logo = cloudeResponse.secure_url

            //saving all updates in one variable
            const updateData = { name, description, website, location, logo }
            //updating the company after finding by req id with updateData
            const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true })

            //if company is not present
            if (!company) {
                  return res.status(404).json({
                        message: "Company not found",
                        success: false
                  })
            }

            //after all is okay
            return res.status(200).json({
                  message: "Company information updated successfully",
                  success: true
            })
      } catch (error) {
            console.log(error)
      }
}
