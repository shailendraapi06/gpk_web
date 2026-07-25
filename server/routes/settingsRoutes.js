import express from "express";
import {
  getSettings,
  updateSettings,
  uploadLogo
} from "../controllers/settingsController.js";

const router = express.Router();

// Public route to fetch settings
router.get("/", getSettings);

// Admin routes
router.put("/", updateSettings);
router.post("/", updateSettings);
router.post("/logo", uploadLogo);

export default router;
