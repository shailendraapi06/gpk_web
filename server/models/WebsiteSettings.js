import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    default: "share"
  }
});

const linkItemSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    trim: true
  },
  to: {
    type: String,
    required: true,
    trim: true
  }
});

const websiteSettingsSchema = new mongoose.Schema(
  {
    collegeName: {
      type: String,
      default: "Government Polytechnic Kanpur"
    },
    collegeCode: {
      type: String,
      default: "3301"
    },
    establishedYear: {
      type: String,
      default: "1958"
    },
    aicteCode: {
      type: String,
      default: "1-12345678"
    },
    affiliateUniversity: {
      type: String,
      default: "Board of Technical Education, Uttar Pradesh (BTEUP)"
    },
    tagline: {
      type: String,
      default: "Approved by AICTE New Delhi & Affiliated to BTEUP Lucknow"
    },
    collegeDescription: {
      type: String,
      default: "A professional academic web platform foundation for institutional information, student services, and future API-driven updates."
    },
    logoUrl: {
      type: String,
      default: ""
    },
    address: {
      type: String,
      default: "Government Polytechnic Kanpur, GT Road, Rawatpur, Kanpur, Uttar Pradesh - 208002"
    },
    phone: {
      type: String,
      default: "+91 512 258 0188"
    },
    email: {
      type: String,
      default: "info@gpk.ac.in"
    },
    admissionEmail: {
      type: String,
      default: "admission@gpk.ac.in"
    },
    workingHours: {
      type: String,
      default: "Mon - Sat: 9:00 AM - 5:00 PM"
    },
    facebook: {
      type: String,
      default: "https://facebook.com/gpk"
    },
    youtube: {
      type: String,
      default: "https://youtube.com/c/gpk"
    },
    linkedin: {
      type: String,
      default: "https://linkedin.com/school/gpk"
    },
    twitter: {
      type: String,
      default: "https://twitter.com/gpk_kanpur"
    },
    instagram: {
      type: String,
      default: "https://instagram.com/gpk_kanpur"
    },
    socials: [
      {
        id: { type: String },
        label: { type: String },
        href: { type: String },
        shortLabel: { type: String }
      }
    ],
    mapEmbedUrl: {
      type: String,
      default: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.258837135064!2d80.29758531503565!3d26.47959088331771!2m3!1f0!0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c381f21111111%3A0x1111111111111111!2sGovernment%20Polytechnic%20Kanpur!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
    },
    socialLinks: [socialLinkSchema],
    quickLinks: [linkItemSchema],
    studentLinks: [linkItemSchema],
    maintenanceMode: {
      type: Boolean,
      default: false
    },
    announcementTicker: {
      type: String,
      default: "Admission 2026 registration dates are now extended! Check details."
    },
    bannerNotice: {
      text: { type: String, default: "Admissions open for Academic Session 2026-27. Apply via JEECUP." },
      isVisible: { type: Boolean, default: true },
      link: { type: String, default: "/admissions" }
    },
    about: {
      type: mongoose.Schema.Types.Mixed
    }
  },
  {
    timestamps: true
  }
);

const WebsiteSettings = mongoose.model("WebsiteSettings", websiteSettingsSchema);
export default WebsiteSettings;
