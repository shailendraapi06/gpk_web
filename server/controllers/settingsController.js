import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";
import WebsiteSettings from "../models/WebsiteSettings.js";
import {
  uploadToCloudinary,
  uploadBufferToCloudinary,
  deleteFromCloudinary,
  extractPublicId,
  CLOUDINARY_FOLDERS
} from "../utils/cloudinary.js";

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
  },
  about: {
    highlights: [
      { id: "hl-1", label: "Established", value: "1958" },
      { id: "hl-2", label: "Departments", value: "15+" },
      { id: "hl-3", label: "Faculty", value: "50+" },
      { id: "hl-4", label: "Students", value: "2000+" }
    ],
    journey: [
      { id: "j-1", year: "1958", title: "Institute Foundation", description: "Government Polytechnic Kanpur was established to strengthen technical education and workforce development in Uttar Pradesh." },
      { id: "j-2", year: "1980s", title: "Academic Expansion", description: "The institution expanded its diploma offerings and improved its practical learning infrastructure for core technical disciplines." },
      { id: "j-3", year: "2000s", title: "Modernization of Facilities", description: "Laboratories, workshops, and campus learning resources were gradually modernized to support evolving curriculum standards." },
      { id: "j-4", year: "Today", title: "Industry-Ready Education", description: "The college continues to focus on employability, applied skills, academic discipline, and student development in a modern technical environment." }
    ],
    infrastructure: [
      { id: "infra-1", title: "Library", description: "The library supports academic development with technical books, reference materials, study resources, and quiet reading spaces for students.", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=400&auto=format&fit=crop" },
      { id: "infra-2", title: "Laboratories", description: "Department laboratories enable applied learning, experimentation, and practical understanding across engineering and technical subjects.", image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=400&auto=format&fit=crop" },
      { id: "infra-3", title: "Workshops", description: "Hands-on workshops provide essential exposure to tools, processes, fabrication practices, and discipline-oriented technical exercises.", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=400&auto=format&fit=crop" }
    ],
    aboutPageImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
    recognitions: [
      { id: "approval-1", title: "Government Polytechnic Kanpur", description: "Institutional identity representing a long-standing government technical education presence in Kanpur.", logo: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=150&auto=format&fit=crop" },
      { id: "approval-2", title: "Technical Education Framework", description: "The college functions within state technical education systems and established academic governance structures.", logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150&auto=format&fit=crop" }
    ]
  }
};

let inMemorySettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));

const formatSettings = (doc) => {
  if (!doc) return inMemorySettings;
  const obj = typeof doc.toObject === "function" ? doc.toObject() : doc;
  return {
    ...inMemorySettings,
    ...obj,
    id: obj._id ? obj._id.toString() : "settings-1",
    primaryEmail: obj.email || obj.primaryEmail || inMemorySettings.primaryEmail
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
        settings = await WebsiteSettings.create(inMemorySettings);
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
    settings: inMemorySettings
  });
});

// @desc    Update website settings
// @route   PUT /api/settings
// @access  Private (Admin)
export const updateSettings = asyncHandler(async (req, res) => {
  const updateFields = { ...req.body };
  let oldLogoToClean = "";

  // Handle logo upload if base64 or custom string is provided
  if (updateFields.logoUrl) {
    if (inMemorySettings.logoUrl && inMemorySettings.logoUrl !== updateFields.logoUrl) {
      oldLogoToClean = inMemorySettings.logoPublicId || inMemorySettings.logoUrl;
    }
    if (updateFields.logoUrl.startsWith("data:")) {
      updateFields.logoUrl = await uploadToCloudinary(updateFields.logoUrl, CLOUDINARY_FOLDERS.BRANDING);
    }
    updateFields.logoPublicId = updateFields.logoPublicId || extractPublicId(updateFields.logoUrl);
  }

  // Handle about image upload if base64
  if (updateFields.about?.aboutPageImage && updateFields.about.aboutPageImage.startsWith("data:")) {
    updateFields.about.aboutPageImage = await uploadToCloudinary(updateFields.about.aboutPageImage, CLOUDINARY_FOLDERS.SETTINGS);
  }

  if (updateFields.primaryEmail && !updateFields.email) {
    updateFields.email = updateFields.primaryEmail;
  }

  // Always keep in-memory fallback updated
  if (updateFields.about) {
    inMemorySettings.about = { ...inMemorySettings.about, ...updateFields.about };
  }
  Object.assign(inMemorySettings, updateFields);

  let updatedSettings = null;
  if (mongoose.connection.readyState === 1) {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = new WebsiteSettings({ ...inMemorySettings, ...updateFields });
    } else {
      if (updateFields.logoUrl && settings.logoUrl && settings.logoUrl !== updateFields.logoUrl) {
        oldLogoToClean = settings.logoPublicId || settings.logoUrl;
      }
      Object.assign(settings, updateFields);
    }
    updatedSettings = await settings.save();
  }

  if (oldLogoToClean && oldLogoToClean !== updateFields.logoUrl) {
    await deleteFromCloudinary(oldLogoToClean);
  }

  res.status(200).json({
    success: true,
    message: "Website settings updated successfully.",
    settings: updatedSettings ? formatSettings(updatedSettings) : inMemorySettings
  });
});

// @desc    Upload website logo to Cloudinary
// @route   POST /api/settings/logo
// @access  Private (Admin)
export const uploadLogo = asyncHandler(async (req, res) => {
  if (req.file) {
    const result = await uploadBufferToCloudinary(req.file.buffer, CLOUDINARY_FOLDERS.BRANDING, {
      mimetype: req.file.mimetype,
      originalname: req.file.originalname
    });
    return res.status(200).json({
      success: true,
      message: "Logo uploaded successfully to Cloudinary.",
      logoUrl: result.url,
      public_id: result.public_id
    });
  }

  const { logoStr, file } = req.body;
  const target = logoStr || file;

  if (!target) {
    throw new ApiError(400, "Logo image file or string is required.");
  }

  const uploadedUrl = await uploadToCloudinary(target, CLOUDINARY_FOLDERS.BRANDING);

  res.status(200).json({
    success: true,
    message: "Logo uploaded successfully.",
    logoUrl: uploadedUrl,
    public_id: extractPublicId(uploadedUrl)
  });
});
