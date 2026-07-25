import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";
import Placement from "../models/Placement.js";
import { uploadToCloudinary, uploadFileToCloudinary } from "../utils/cloudinary.js";

const DEFAULT_PLACEMENT_DATA = {
  pageContent: {
    eyebrow: "Training & Placement",
    title: "Training & Placement Cell",
    introduction:
      "The Training & Placement Cell of Government Polytechnic Kanpur supports students through industry readiness, campus engagement, placement coordination, and skill-building initiatives aligned with technical education outcomes."
  },
  placementOverview: {
    title: "Placement Cell Overview",
    description: [
      "The placement cell works as a bridge between the institute, industry, and students by coordinating training activities, pre-placement support, and campus recruitment opportunities.",
      "With a focus on employability, communication, discipline, and technical preparedness, the cell helps students become industry-ready for internships, drives, and professional growth."
    ],
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Government Polytechnic Kanpur academic campus"
  },
  placementOfficer: {
    name: "Prof. Amit Kumar",
    designation: "Training & Placement Officer, GPK",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
    message:
      "Our objective is to equip students with practical confidence, workplace readiness, and professional discipline so they can participate effectively in training programs, internship opportunities, and placement drives.",
    contact: {
      email: "tpo@gpk.ac.in",
      phone: "+91 512 258 0188",
      officeHours: "Monday to Saturday, 10:00 AM to 5:00 PM"
    },
    profileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  placementProcess: [
    { id: "step-1", step: "Registration", description: "Students register with the placement cell and complete profile information, academic details, and interest areas." },
    { id: "step-2", step: "Pre-Placement Training", description: "Skill development sessions, resume support, aptitude practice, and interview readiness are conducted." },
    { id: "step-3", step: "Company Outreach", description: "The cell coordinates with recruiters and shares hiring criteria, schedules, and participation guidelines." },
    { id: "step-4", step: "Shortlisting", description: "Eligible candidates are shortlisted according to company requirements, academic rules, and application status." },
    { id: "step-5", step: "Assessment & Interview", description: "Students appear in written tests, technical rounds, HR interviews, and selection activities." },
    { id: "step-6", step: "Offer & Follow-Up", description: "Selected candidates receive updates on offers, joining procedures, and post-selection coordination." }
  ],
  recruiters: [
    { id: "rec-1", name: "Tech Axis", logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150&auto=format&fit=crop" },
    { id: "rec-2", name: "BuildCraft India", logo: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=150&auto=format&fit=crop" },
    { id: "rec-3", name: "Prime Electro", logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150&auto=format&fit=crop" },
    { id: "rec-4", name: "AutoMotion Works", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=150&auto=format&fit=crop" },
    { id: "rec-5", name: "ProcessNova", logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=150&auto=format&fit=crop" },
    { id: "rec-6", name: "Campus Connect Labs", logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=150&auto=format&fit=crop" }
  ],
  trainingPrograms: [
    { id: "training-1", icon: "communication", title: "Communication Skills", description: "Focused sessions on speaking, writing, interviews, and professional presentation." },
    { id: "training-2", icon: "aptitude", title: "Aptitude Preparation", description: "Practice modules for quantitative aptitude, reasoning, and placement assessments." },
    { id: "training-3", icon: "industry", title: "Industry Interaction", description: "Guest talks, industrial visits, and recruiter interactions to improve exposure." },
    { id: "training-4", icon: "resume", title: "Resume & Interview Support", description: "Guided support for resume drafting, mock interviews, and professional readiness." }
  ],
  placementNotices: [
    { id: "pn-1", date: "10 Jul 2026", title: "Campus recruitment registration for final year diploma students", actionLabel: "View PDF", actionUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: "pn-2", date: "04 Jul 2026", title: "Aptitude and interview preparation workshop schedule", actionLabel: "View PDF", actionUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: "pn-3", date: "28 Jun 2026", title: "Internship orientation notice for pre-final year students", actionLabel: "View PDF", actionUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
  ],
  placementDrives: [
    { id: "drv-1", company: "Tech Axis", date: "2026-07-22", eligibility: "CSE / IT / AIML, 60% and above", status: "Applications Open", actionLabel: "Apply", actionUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: "drv-2", company: "BuildCraft India", date: "2026-07-27", eligibility: "Civil / Mechanical, 55% and above", status: "Upcoming", actionLabel: "Register", actionUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: "drv-3", company: "Prime Electro", date: "2026-08-02", eligibility: "Electrical / Electronics, 60% and above", status: "Registration Soon", actionLabel: "Details", actionUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: "drv-4", company: "AutoMotion Works", date: "2026-08-08", eligibility: "Automobile / Mechanical, 50% and above", status: "Shortlisting", actionLabel: "View", actionUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
  ]
};

// Format document for output
const formatPlacementData = (doc) => {
  if (!doc) return DEFAULT_PLACEMENT_DATA;

  // Format overview description array
  let overviewDesc = DEFAULT_PLACEMENT_DATA.placementOverview.description;
  if (doc.placementOverview?.description) {
    if (Array.isArray(doc.placementOverview.description)) {
      overviewDesc = doc.placementOverview.description;
    } else if (typeof doc.placementOverview.description === "string") {
      overviewDesc = doc.placementOverview.description.split("\n\n").filter(Boolean);
    }
  }

  // Format officer photo
  let officerPhoto = doc.placementOfficer?.photo || DEFAULT_PLACEMENT_DATA.placementOfficer.photo;
  if (typeof officerPhoto === "object" && officerPhoto.src) {
    officerPhoto = officerPhoto.src;
  }

  return {
    _id: doc._id ? doc._id.toString() : "placement-main",
    pageContent: doc.pageContent?.title ? doc.pageContent : DEFAULT_PLACEMENT_DATA.pageContent,
    placementOverview: {
      title: doc.placementOverview?.title || DEFAULT_PLACEMENT_DATA.placementOverview.title,
      description: overviewDesc,
      image: doc.placementOverview?.image || DEFAULT_PLACEMENT_DATA.placementOverview.image,
      imageAlt: doc.placementOverview?.imageAlt || DEFAULT_PLACEMENT_DATA.placementOverview.imageAlt
    },
    placementOfficer: {
      name: doc.placementOfficer?.name || DEFAULT_PLACEMENT_DATA.placementOfficer.name,
      designation: doc.placementOfficer?.designation || DEFAULT_PLACEMENT_DATA.placementOfficer.designation,
      photo: officerPhoto,
      message: doc.placementOfficer?.message || DEFAULT_PLACEMENT_DATA.placementOfficer.message,
      contact: {
        email: doc.placementOfficer?.contact?.email || doc.placementOfficer?.email || DEFAULT_PLACEMENT_DATA.placementOfficer.contact.email,
        phone: doc.placementOfficer?.contact?.phone || doc.placementOfficer?.phone || DEFAULT_PLACEMENT_DATA.placementOfficer.contact.phone,
        officeHours: doc.placementOfficer?.contact?.officeHours || doc.placementOfficer?.officeHours || DEFAULT_PLACEMENT_DATA.placementOfficer.contact.officeHours
      },
      profileUrl: doc.placementOfficer?.profileUrl || DEFAULT_PLACEMENT_DATA.placementOfficer.profileUrl
    },
    placementProcess: (doc.placementProcess && doc.placementProcess.length > 0)
      ? doc.placementProcess.map(p => ({
          id: p.id || p._id?.toString() || `step-${Math.random()}`,
          step: p.step || "",
          description: p.description || ""
        }))
      : DEFAULT_PLACEMENT_DATA.placementProcess,
    recruiters: (doc.recruiters && doc.recruiters.length > 0)
      ? doc.recruiters.map(r => ({
          id: r.id || r._id?.toString() || `rec-${Math.random()}`,
          name: r.name || "",
          logo: r.logo || r.logoUrl || ""
        }))
      : DEFAULT_PLACEMENT_DATA.recruiters,
    trainingPrograms: (doc.trainingPrograms && doc.trainingPrograms.length > 0)
      ? doc.trainingPrograms.map(tp => ({
          id: tp.id || tp._id?.toString() || `training-${Math.random()}`,
          icon: tp.icon || "communication",
          title: tp.title || "",
          description: tp.description || ""
        }))
      : DEFAULT_PLACEMENT_DATA.trainingPrograms,
    placementNotices: (doc.placementNotices && doc.placementNotices.length > 0)
      ? doc.placementNotices.map(n => ({
          id: n.id || n._id?.toString() || `pn-${Math.random()}`,
          date: n.date || "",
          title: n.title || "",
          actionLabel: n.actionLabel || "View PDF",
          actionUrl: n.actionUrl || ""
        }))
      : DEFAULT_PLACEMENT_DATA.placementNotices,
    placementDrives: (doc.placementDrives && doc.placementDrives.length > 0)
      ? doc.placementDrives.map(d => ({
          id: d.id || d._id?.toString() || `drv-${Math.random()}`,
          company: d.company || "",
          date: d.date || "",
          eligibility: d.eligibility || "",
          status: d.status || "Upcoming",
          actionLabel: d.actionLabel || "Apply",
          actionUrl: d.actionUrl || ""
        }))
      : DEFAULT_PLACEMENT_DATA.placementDrives
  };
};

// @desc    Get placement details
// @route   GET /api/placements
// @access  Public
export const getPlacement = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    let doc = await Placement.findOne({ isActive: true });

    if (!doc) {
      try {
        doc = await Placement.create(DEFAULT_PLACEMENT_DATA);
      } catch (err) {
        console.warn("Could not seed default placement data:", err.message);
      }
    }

    if (doc) {
      return res.status(200).json({
        success: true,
        placement: formatPlacementData(doc)
      });
    }
  }

  res.status(200).json({
    success: true,
    placement: DEFAULT_PLACEMENT_DATA
  });
});

// @desc    Update whole placement document
// @route   PUT /api/placements
// @access  Private (Admin)
export const updatePlacement = asyncHandler(async (req, res) => {
  const body = req.body;

  let updatedDoc = null;
  if (mongoose.connection.readyState === 1) {
    let doc = await Placement.findOne({ isActive: true });
    if (!doc) doc = new Placement(DEFAULT_PLACEMENT_DATA);

    Object.assign(doc, body);
    updatedDoc = await doc.save();
  }

  res.status(200).json({
    success: true,
    message: "Placement page information updated successfully.",
    placement: updatedDoc ? formatPlacementData(updatedDoc) : { ...DEFAULT_PLACEMENT_DATA, ...body }
  });
});

// @desc    Update Cell Overview & TPO Officer bio
// @route   PUT /api/placements/overview-officer
// @access  Private (Admin)
export const updateOverviewAndOfficer = asyncHandler(async (req, res) => {
  const { overview, overviewDesc, tpo } = req.body;

  let overviewImg = overview?.image;
  if (overviewImg && overviewImg.startsWith("data:")) {
    overviewImg = await uploadToCloudinary(overviewImg, "gpk_placements");
  }

  let tpoPhoto = (typeof tpo?.photo === "object" && tpo.photo?.src) ? tpo.photo.src : tpo?.photo;
  if (tpoPhoto && tpoPhoto.startsWith("data:")) {
    tpoPhoto = await uploadToCloudinary(tpoPhoto, "gpk_placements");
  }

  let updatedDoc = null;
  if (mongoose.connection.readyState === 1) {
    let doc = await Placement.findOne({ isActive: true });
    if (!doc) doc = new Placement(DEFAULT_PLACEMENT_DATA);

    if (overview || overviewDesc) {
      doc.placementOverview = {
        title: overview?.title || doc.placementOverview?.title || "Placement Cell Overview",
        image: overviewImg || doc.placementOverview?.image || "",
        imageAlt: overview?.imageAlt || doc.placementOverview?.imageAlt || "",
        description: overviewDesc
          ? (Array.isArray(overviewDesc) ? overviewDesc : overviewDesc.split("\n\n").filter(Boolean))
          : (doc.placementOverview?.description || [])
      };
    }

    if (tpo) {
      doc.placementOfficer = {
        name: tpo.name || doc.placementOfficer?.name || "",
        designation: tpo.designation || doc.placementOfficer?.designation || "",
        photo: tpoPhoto || doc.placementOfficer?.photo || "",
        message: tpo.message || doc.placementOfficer?.message || "",
        contact: {
          email: tpo.email || doc.placementOfficer?.contact?.email || "",
          phone: tpo.phone || doc.placementOfficer?.contact?.phone || "",
          officeHours: tpo.officeHours || doc.placementOfficer?.contact?.officeHours || ""
        },
        profileUrl: tpo.profileUrl || doc.placementOfficer?.profileUrl || ""
      };
    }

    updatedDoc = await doc.save();
  }

  res.status(200).json({
    success: true,
    message: "Placement cell and officer profile saved successfully.",
    placement: updatedDoc ? formatPlacementData(updatedDoc) : DEFAULT_PLACEMENT_DATA
  });
});

// @desc    Update Recruiters list
// @route   PUT /api/placements/recruiters
// @access  Private (Admin)
export const updateRecruiters = asyncHandler(async (req, res) => {
  const { recruiters } = req.body;
  if (!Array.isArray(recruiters)) {
    throw new ApiError(400, "Recruiters array is required.");
  }

  const processedRecruiters = await Promise.all(
    recruiters.map(async (r) => {
      let logoUrl = r.logo || r.logoUrl || "";
      if (logoUrl && logoUrl.startsWith("data:")) {
        logoUrl = await uploadToCloudinary(logoUrl, "gpk_recruiters");
      }
      return {
        id: r.id || `rec-${Date.now()}`,
        name: r.name || "",
        logo: logoUrl,
        logoUrl: logoUrl
      };
    })
  );

  let updatedDoc = null;
  if (mongoose.connection.readyState === 1) {
    let doc = await Placement.findOne({ isActive: true });
    if (!doc) doc = new Placement(DEFAULT_PLACEMENT_DATA);

    doc.recruiters = processedRecruiters;
    updatedDoc = await doc.save();
  }

  res.status(200).json({
    success: true,
    message: "Recruiter logos updated successfully.",
    recruiters: updatedDoc ? formatPlacementData(updatedDoc).recruiters : processedRecruiters
  });
});

// @desc    Update Placement Notices list
// @route   PUT /api/placements/notices
// @access  Private (Admin)
export const updateNotices = asyncHandler(async (req, res) => {
  const { notices } = req.body;
  if (!Array.isArray(notices)) {
    throw new ApiError(400, "Notices array is required.");
  }

  let updatedDoc = null;
  if (mongoose.connection.readyState === 1) {
    let doc = await Placement.findOne({ isActive: true });
    if (!doc) doc = new Placement(DEFAULT_PLACEMENT_DATA);

    doc.placementNotices = notices.map(n => ({
      id: n.id || `pn-${Date.now()}`,
      date: n.date || "",
      title: n.title || "",
      actionLabel: n.actionLabel || "View PDF",
      actionUrl: n.actionUrl || ""
    }));

    updatedDoc = await doc.save();
  }

  res.status(200).json({
    success: true,
    message: "Placement notices updated successfully.",
    notices: updatedDoc ? formatPlacementData(updatedDoc).placementNotices : notices
  });
});

// @desc    Update Campus Drives list
// @route   PUT /api/placements/drives
// @access  Private (Admin)
export const updateDrives = asyncHandler(async (req, res) => {
  const { drives } = req.body;
  if (!Array.isArray(drives)) {
    throw new ApiError(400, "Drives array is required.");
  }

  let updatedDoc = null;
  if (mongoose.connection.readyState === 1) {
    let doc = await Placement.findOne({ isActive: true });
    if (!doc) doc = new Placement(DEFAULT_PLACEMENT_DATA);

    doc.placementDrives = drives.map(d => ({
      id: d.id || `drv-${Date.now()}`,
      company: d.company || "",
      date: d.date || "",
      eligibility: d.eligibility || "",
      status: d.status || "Upcoming",
      actionLabel: d.actionLabel || "Apply",
      actionUrl: d.actionUrl || ""
    }));

    updatedDoc = await doc.save();
  }

  res.status(200).json({
    success: true,
    message: "Recruitment drives updated successfully.",
    drives: updatedDoc ? formatPlacementData(updatedDoc).placementDrives : drives
  });
});
