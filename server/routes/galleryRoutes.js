import express from "express";
import {
  getGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  uploadGalleryImage
} from "../controllers/galleryController.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

const uploadGalleryHandler = (req, res, next) => {
  uploadImage.any()(req, res, (err) => {
    if (err) return next(err);
    if (req.files && req.files.length > 0) {
      req.file = req.files[0];
    }
    next();
  });
};

// GET /api/gallery - Get gallery list
router.get("/", getGalleryItems);

// POST /api/gallery/upload - Direct Cloudinary image upload endpoint
router.post("/upload", uploadGalleryHandler, uploadGalleryImage);

// GET /api/gallery/:id - Get single item
router.get("/:id", getGalleryItemById);

// POST /api/gallery - Create new gallery item
router.post("/", createGalleryItem);

// PUT /api/gallery/:id - Update gallery item
router.put("/:id", updateGalleryItem);

// DELETE /api/gallery/:id - Delete gallery item
router.delete("/:id", deleteGalleryItem);

export default router;
