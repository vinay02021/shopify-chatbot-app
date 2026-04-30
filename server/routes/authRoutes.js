import express from "express";
import { authCallback, beginAuth } from "../controllers/authController.js";

const router = express.Router();

router.get("/auth", beginAuth);
router.get("/auth/callback", authCallback);

export const authRoutes = router;
