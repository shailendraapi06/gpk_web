import express from "express";
import {
  getSettings,
  updateSettings,
  uploadLogo
} from "../controllers/settingsController.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Middleware to capture single logo file
const uploadLogoHandler = (req, res, next) => {
  uploadImage.any()(req, res, (err) => {
    if (err) return next(err);
    if (req.files && req.files.length > 0) {
      req.file = req.files[0];
    }
    next();
  });
};

// Public route to fetch settings
router.get("/", getSettings);

// Admin routes
router.put("/", updateSettings);
router.post("/", updateSettings);
router.post("/logo", uploadLogoHandler, uploadLogo);

export default router;
