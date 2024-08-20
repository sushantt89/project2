import express, { Router } from "express";
import authentication, { Role } from "../middleware/authentication";
import categoryController from "../controllers/categoryController";
import errorHandler from "../services/catchAsyncError";
import upload from "../config/productPhotoStorage";
const router = express.Router();

router.route("/category").post(authentication.authenticationToken, authentication.restrictTo(Role.Admin), upload.single('file'), errorHandler(categoryController.addCategory))
router.route("/category").get(authentication.authenticationToken, authentication.restrictTo(Role.Admin, Role.Customer), errorHandler(categoryController.getCategories))

export default router;