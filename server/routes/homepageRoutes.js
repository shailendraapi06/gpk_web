import express from "express";
import {
  getPublicHomepageData,
  getHeroSlides,
  addHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  getLeadership,
  addLeader,
  updateLeader,
  deleteLeader,
  getPrincipalMessage,
  updatePrincipalMessage,
  getRecruiters,
  addRecruiter,
  updateRecruiter,
  deleteRecruiter,
  getGalleryPreview,
  addGalleryPreview,
  updateGalleryPreview,
  deleteGalleryPreview,
  getContactInfo,
  updateContactInfo
} from "../controllers/homepageController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Main Aggregated Homepage Endpoint
router.get("/", getPublicHomepageData);

// Hero Slides
router.route("/hero")
  .get(getHeroSlides)
  .post(protectAdmin, addHeroSlide);

router.route("/hero/:id")
  .put(protectAdmin, updateHeroSlide)
  .delete(protectAdmin, deleteHeroSlide);

// Leadership
router.route("/leadership")
  .get(getLeadership)
  .post(protectAdmin, addLeader);

router.route("/leadership/:id")
  .put(protectAdmin, updateLeader)
  .delete(protectAdmin, deleteLeader);

// Principal Message
router.route("/principal")
  .get(getPrincipalMessage)
  .put(protectAdmin, updatePrincipalMessage);

// Recruiters
router.route("/recruiters")
  .get(getRecruiters)
  .post(protectAdmin, addRecruiter);

router.route("/recruiters/:id")
  .put(protectAdmin, updateRecruiter)
  .delete(protectAdmin, deleteRecruiter);

// Gallery Preview
router.route("/gallery")
  .get(getGalleryPreview)
  .post(protectAdmin, addGalleryPreview);

router.route("/gallery/:id")
  .put(protectAdmin, updateGalleryPreview)
  .delete(protectAdmin, deleteGalleryPreview);

// Contact Information
router.route("/contact-info")
  .get(getContactInfo)
  .put(protectAdmin, updateContactInfo);

export default router;
