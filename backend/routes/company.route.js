import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { companyRegister, getCompany, getCompanyById, updateCompany } from '../controllers/company.controller.js';
import { singleUpload } from '../middleware/multer.js';

const router = express.Router();

router.route("/register").post(isAuthenticated, companyRegister)
router.route("/get").get(isAuthenticated, getCompany)
router.route("/get/:id").get(isAuthenticated, getCompanyById)
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany)

export default router