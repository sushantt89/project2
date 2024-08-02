import express, { Router } from "express";
import AuthController from "../controllers/userController";

import errorHandler from "../services/catchAsyncError";
import Authentication, { Role } from "../middleware/authentication";


const router: Router = express.Router();
router.route("/register").post(errorHandler(AuthController.registerUser));
router.route("/login").post(errorHandler(AuthController.userLogin));
router.route("/getAllUser").get(Authentication.authenticationToken, Authentication.restrictTo(Role.Admin), errorHandler(AuthController.getAllUser));

export default router;