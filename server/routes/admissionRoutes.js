import express from "express";
import {
  getAdmissions,
  updateAdmissions,
  updateCourses,
  updateEligibility,
  updateDocuments,
  updateFeeStructure,
  updateProspectus
} from "../controllers/admissionController.js";

const router = express.Router();

// GET /api/admissions - Get all admission details
router.get("/", getAdmissions);

// PUT /api/admissions - Update entire admission document
router.put("/", updateAdmissions);

// PUT /api/admissions/courses - Update Courses Offered list
router.put("/courses", updateCourses);

// PUT /api/admissions/eligibility - Update Eligibility Criteria
router.put("/eligibility", updateEligibility);

// PUT /api/admissions/documents - Update Required Documents
router.put("/documents", updateDocuments);

// PUT /api/admissions/fees - Update Fee Structure
router.put("/fees", updateFeeStructure);

// PUT /api/admissions/prospectus - Update Prospectus PDF URL
router.put("/prospectus", updateProspectus);

export default router;
