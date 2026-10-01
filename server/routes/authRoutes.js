import express from "express";
import {
  loginAdmin,
  forgotPassword,
  resetPassword,
  updatePassword,
  getAdminProfile,
  logoutAdmin
} from "../controllers/authController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.put("/update-password", protectAdmin, updatePassword);
router.get("/me", protectAdmin, getAdminProfile);
router.post("/logout", protectAdmin, logoutAdmin);

export default router;
