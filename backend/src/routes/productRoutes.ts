import express, { Router } from 'express';
import upload from '../config/productPhotoStorage';
import productController from '../controllers/productController';
import errorHandler from '../services/catchAsyncError';
const router = express.Router();

router.route("/product").post(upload.single('file'),errorHandler(productController.addProducts))

export default router