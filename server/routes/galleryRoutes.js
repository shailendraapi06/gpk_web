import express from "express";
import {
  getGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  uploadGalleryImage
} from "../controllers/galleryController.js";

const router = express.Router();

// GET /api/gallery - Get gallery list
router.get("/", getGalleryItems);

// POST /api/gallery/upload - Direct Cloudinary image upload endpoint
router.post("/upload", uploadGalleryImage);

// GET /api/gallery/:id - Get single item
router.get("/:id", getGalleryItemById);

// POST /api/gallery - Create new gallery item
router.post("/", createGalleryItem);

// PUT /api/gallery/:id - Update gallery item
router.put("/:id", updateGalleryItem);

// DELETE /api/gallery/:id - Delete gallery item
router.delete("/:id", deleteGalleryItem);

export default router;
