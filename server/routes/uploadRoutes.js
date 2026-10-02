import express from "express";
import {
  uploadSingleFile,
  uploadMultipleFiles,
  deleteFile
} from "../controllers/uploadController.js";
import { uploadDocument } from "../middleware/uploadMiddleware.js";
import { ApiError } from "../middleware/errorHandler.js";

const router = express.Router();

// Middleware to capture single file uploaded with any field name (image, file, logo, photo, etc.)
const uploadSingleHandler = (req, res, next) => {
  uploadDocument.any()(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return next(new ApiError(400, "File is too large. Maximum size is 5MB for images and 10MB for documents."));
      }
      return next(new ApiError(400, `Upload error: ${err.message}`));
    }
    if (req.files && req.files.length > 0) {
      req.file = req.files[0];
    }
    next();
  });
};

router.post("/", uploadSingleHandler, uploadSingleFile);
router.post("/single", uploadSingleHandler, uploadSingleFile);
router.post("/multiple", uploadDocument.array("files", 10), uploadMultipleFiles);
router.delete("/", deleteFile);
router.post("/delete", deleteFile);

export default router;
