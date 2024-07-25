import express, { Router } from "express";
import statusCheck from "../controllers/statusCheck";
import errorHandler from "../services/catchAsyncError";
const router: Router = express.Router();

router.route("/status").get(errorHandler(statusCheck.status));

export default router;