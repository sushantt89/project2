import express, { Router } from "express";
import AuthController from "../controllers/userController";
import authenticatoinController from "../controllers/authenticationController";
import errorHandler from "../services/catchAsyncError";

const router: Router = express.Router();
router.route("/register").post(errorHandler(AuthController.registerUser));
router.route("/login").post(errorHandler(AuthController.userLogin));
router.route("/getAllUser").get(authenticatoinController.authenticationToken, errorHandler(AuthController.getAllUser));

export default router;