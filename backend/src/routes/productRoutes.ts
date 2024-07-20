import express, { Router } from 'express';
import upload from '../config/productPhotoStorage';
import productController from '../controllers/productController';
const router = express.Router();

router.route("/product").post(upload.single('file'), productController.addProducts)

export default router