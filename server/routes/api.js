import express from "express";
import healthRoutes from "./healthRoutes.js";
import contactRoutes from "./contactRoutes.js";
import authRoutes from "./authRoutes.js";
import homepageRoutes from "./homepageRoutes.js";
import noticeRoutes from "./noticeRoutes.js";
import departmentRoutes from "./departmentRoutes.js";
import facultyRoutes from "./facultyRoutes.js";
import admissionRoutes from "./admissionRoutes.js";
import placementRoutes from "./placementRoutes.js";
import galleryRoutes from "./galleryRoutes.js";
import settingsRoutes from "./settingsRoutes.js";
import uploadRoutes from "./uploadRoutes.js";

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/contact", contactRoutes);
router.use("/homepage", homepageRoutes);
router.use("/notices", noticeRoutes);
router.use("/departments", departmentRoutes);
router.use("/faculties", facultyRoutes);
router.use("/admissions", admissionRoutes);
router.use("/placements", placementRoutes);
router.use("/gallery", galleryRoutes);
router.use("/settings", settingsRoutes);
router.use("/upload", uploadRoutes);

export default router;

