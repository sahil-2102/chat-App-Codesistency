import express from "express";
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/signup", signup);
router.post('/login', login);
router.post('/logout', logout);
router.put("/update",protect, updateProfile);

router.get("/check",protect, checkAuth);

export default router;