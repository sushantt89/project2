import express, { Router } from "express";
import statusCheck from "../controllers/statusCheck";
const router: Router = express.Router();

router.route("/status").get(statusCheck.status);

export default router;