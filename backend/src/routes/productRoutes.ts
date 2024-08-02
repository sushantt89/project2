import express, { Router } from 'express';
import upload from '../config/productPhotoStorage';
import productController from '../controllers/productController';
import errorHandler from '../services/catchAsyncError';
import authentication, { Role } from '../middleware/authentication';

const router = express.Router();

router.route("/product").post(authentication.authenticationToken, authentication.restrictTo(Role.Admin), upload.single('file'), errorHandler(productController.addProducts))

export default router