import express from "express";
import {
  uploadSingleFile,
  uploadMultipleFiles,
  deleteFile
} from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", uploadSingleFile);
router.post("/single", uploadSingleFile);
router.post("/multiple", uploadMultipleFiles);
router.delete("/", deleteFile);
router.post("/delete", deleteFile);

export default router;
