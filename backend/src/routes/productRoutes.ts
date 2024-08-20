import express, { Router } from 'express';
import upload from '../config/productPhotoStorage';
import productController from '../controllers/productController';
import errorHandler from '../services/catchAsyncError';
import authentication, { Role } from '../middleware/authentication';

const router = express.Router();

router.route("/product").post(authentication.authenticationToken, authentication.restrictTo(Role.Admin), upload.single('file'), errorHandler(productController.addProducts))
router.route("/product/:id").get(authentication.authenticationToken, authentication.restrictTo(Role.Admin, Role.Customer), errorHandler(productController.getProductByID))
router.route("/product").get(authentication.authenticationToken, authentication.restrictTo(Role.Admin, Role.Customer), errorHandler(productController.getAllProducts))
router.route("/product/:id").delete(authentication.authenticationToken, authentication.restrictTo(Role.Admin), errorHandler(productController.deleteProduct))
router.route("/product/:id").patch(authentication.authenticationToken, authentication.restrictTo(Role.Admin), upload.single('file'), errorHandler(productController.updateProduct))

export default router