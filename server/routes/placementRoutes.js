import express from "express";
import {
  getPlacement,
  updatePlacement,
  updateOverviewAndOfficer,
  updateRecruiters,
  updateNotices,
  updateDrives
} from "../controllers/placementController.js";

const router = express.Router();

// GET /api/placements - Get placement page details
router.get("/", getPlacement);

// PUT /api/placements - Update full placement page configuration
router.put("/", updatePlacement);

// PUT /api/placements/overview-officer - Update Placement Cell Overview & TPO Bio
router.put("/overview-officer", updateOverviewAndOfficer);

// PUT /api/placements/recruiters - Update Recruiter logos
router.put("/recruiters", updateRecruiters);

// PUT /api/placements/notices - Update Placement Notices
router.put("/notices", updateNotices);

// PUT /api/placements/drives - Update Campus Recruitment Drives
router.put("/drives", updateDrives);

export default router;
