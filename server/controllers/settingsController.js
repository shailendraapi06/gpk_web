import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";
import WebsiteSettings from "../models/WebsiteSettings.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const DEFAULT_SETTINGS = {
  collegeName: "Government Polytechnic Kanpur",
  collegeCode: "3301",
  establishedYear: "1958",
  aicteCode: "1-12345678",
  affiliateUniversity: "Board of Technical Education, Uttar Pradesh (BTEUP)",
  tagline: "Approved by AICTE New Delhi & Affiliated to BTEUP Lucknow",
  collegeDescription: "A professional academic web platform foundation for institutional information, student services, and future API-driven updates.",
  logoUrl: "",
  address: "Government Polytechnic Kanpur, GT Road, Rawatpur, Kanpur, Uttar Pradesh - 208002",
  phone: "+91 512 258 0188",
  email: "info@gpk.ac.in",
  primaryEmail: "info@gpk.ac.in",
  admissionEmail: "admission@gpk.ac.in",
  workingHours: "Mon - Sat: 9:00 AM - 5:00 PM",
  facebook: "https://facebook.com/gpk",
  youtube: "https://youtube.com/c/gpk",
  linkedin: "https://linkedin.com/school/gpk",
  twitter: "https://twitter.com/gpk_kanpur",
  instagram: "https://instagram.com/gpk_kanpur",
  socials: [
    { id: "soc-1", label: "Facebook", href: "https://facebook.com", shortLabel: "Fb" },
    { id: "soc-2", label: "Instagram", href: "https://instagram.com", shortLabel: "Ig" },
    { id: "soc-3", label: "LinkedIn", href: "https://linkedin.com", shortLabel: "In" },
    { id: "soc-4", label: "YouTube", href: "https://youtube.com", shortLabel: "Yt" }
  ],
  maintenanceMode: false,
  announcementTicker: "Admission 2026 registration dates are now extended! Check details.",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.258837135064!2d80.29758531503565!3d26.47959088331771!2m3!1f0!0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c381f21111111%3A0x1111111111111111!2sGovernment%20Polytechnic%20Kanpur!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
  bannerNotice: {
    text: "Admissions open for Academic Session 2026-27. Apply via JEECUP.",
    isVisible: true,
    link: "/admissions"
  }
};

const formatSettings = (doc) => {
  if (!doc) return DEFAULT_SETTINGS;
  const obj = typeof doc.toObject === "function" ? doc.toObject() : doc;
  return {
    ...DEFAULT_SETTINGS,
    ...obj,
    id: obj._id ? obj._id.toString() : "settings-1",
    primaryEmail: obj.email || obj.primaryEmail || DEFAULT_SETTINGS.primaryEmail
  };
};

// @desc    Get website settings
// @route   GET /api/settings
// @access  Public
export const getSettings = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      try {
        settings = await WebsiteSettings.create(DEFAULT_SETTINGS);
      } catch (err) {
        console.warn("Could not seed default website settings:", err.message);
      }
    }
    return res.status(200).json({
      success: true,
      settings: formatSettings(settings)
    });
  }

  res.status(200).json({
    success: true,
    settings: DEFAULT_SETTINGS
  });
});

// @desc    Update website settings
// @route   PUT /api/settings
// @access  Private (Admin)
export const updateSettings = asyncHandler(async (req, res) => {
  const updateFields = { ...req.body };

  // Handle logo upload if base64 or custom string is provided
  if (updateFields.logoUrl) {
    updateFields.logoUrl = await uploadToCloudinary(updateFields.logoUrl, "gpk_branding");
  }

  if (updateFields.primaryEmail && !updateFields.email) {
    updateFields.email = updateFields.primaryEmail;
  }

  let updatedSettings = null;
  if (mongoose.connection.readyState === 1) {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = new WebsiteSettings({ ...DEFAULT_SETTINGS, ...updateFields });
    } else {
      Object.assign(settings, updateFields);
    }
    updatedSettings = await settings.save();
  }

  res.status(200).json({
    success: true,
    message: "Website settings updated successfully.",
    settings: updatedSettings ? formatSettings(updatedSettings) : { ...DEFAULT_SETTINGS, ...updateFields }
  });
});

// @desc    Upload website logo to Cloudinary
// @route   POST /api/settings/logo
// @access  Private (Admin)
export const uploadLogo = asyncHandler(async (req, res) => {
  const { logoStr } = req.body;

  if (!logoStr) {
    throw new ApiError(400, "Logo image string or base64 is required.");
  }

  const uploadedUrl = await uploadToCloudinary(logoStr, "gpk_branding");

  res.status(200).json({
    success: true,
    message: "Logo uploaded successfully.",
    logoUrl: uploadedUrl
  });
});
