import express, { Router } from "express";
import upload from "../config/productPhotoStorage";
import uploadPhoto from "../controllers/uploadPhoto";
const router = express.Router();

router.route("/upload").post(upload.single('file'), uploadPhoto.uploadPhoto);
export default router;