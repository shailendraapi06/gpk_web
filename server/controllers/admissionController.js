import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";
import Admission from "../models/Admission.js";
import { uploadFileToCloudinary } from "../utils/cloudinary.js";

const DEFAULT_ADMISSION_DATA = {
  academicYear: "2026-2027",
  title: "Admissions at Government Polytechnic Kanpur",
  eyebrow: "Admissions",
  introduction: "Admissions are primarily conducted through the Joint Entrance Examination Council Uttar Pradesh (JEECUP). The process is structured to keep application, counselling, document verification, and final admission clear and student-friendly.",
  officialJeecupLink: "https://jeecup.admissions.nic.in/",
  prospectusUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  coursesOffered: [
    { id: "c-1", course: "Computer Science & Engineering", courseName: "Computer Science & Engineering", duration: "3 Years", intake: "60" },
    { id: "c-2", course: "Information Technology", courseName: "Information Technology", duration: "3 Years", intake: "60" },
    { id: "c-3", course: "Artificial Intelligence & Machine Learning", courseName: "Artificial Intelligence & Machine Learning", duration: "3 Years", intake: "60" },
    { id: "c-4", course: "Civil Engineering", courseName: "Civil Engineering", duration: "3 Years", intake: "60" },
    { id: "c-5", course: "Mechanical Engineering", courseName: "Mechanical Engineering", duration: "3 Years", intake: "60" },
    { id: "c-6", course: "Electrical Engineering", courseName: "Electrical Engineering", duration: "3 Years", intake: "60" },
    { id: "c-7", course: "Electronics Engineering", courseName: "Electronics Engineering", duration: "3 Years", intake: "60" },
    { id: "c-8", course: "Pharmacy", courseName: "Pharmacy", duration: "2 Years", intake: "60" }
  ],
  eligibilityCriteria: [
    "Candidates should have passed High School / Class 10 or equivalent from a recognized board.",
    "Relevant subject eligibility and JEECUP rules apply according to the selected course.",
    "Admission is based on JEECUP entrance examination and counselling guidelines.",
    "Category-wise reservation and relaxation are applicable as per Government of Uttar Pradesh norms."
  ],
  requiredDocuments: [
    "JEECUP admit card and rank card",
    "JEECUP counselling / allotment letter",
    "Class 10 marksheet and certificate",
    "Transfer certificate",
    "Character certificate",
    "Domicile certificate",
    "Category certificate, if applicable",
    "Income certificate, if applicable",
    "Aadhaar card or valid photo ID",
    "Passport size photographs"
  ],
  feeStructure: [
    { id: "fee-1", category: "Tuition Fee", amount: "As per Board / Government norms", notes: "Subject to annual revision" },
    { id: "fee-2", category: "Admission Fee", amount: "At the time of reporting", notes: "One-time institutional processing" },
    { id: "fee-3", category: "Examination Fee", amount: "As notified by the board", notes: "Collected semester / yearly as applicable" },
    { id: "fee-4", category: "Caution Money", amount: "Refundable as per rules", notes: "Applicable where notified" }
  ],
  admissionProcess: [
    { step: "Registration", description: "Complete the online application form through the official JEECUP portal within the announced schedule." },
    { step: "Entrance Exam", description: "Appear for the JEECUP entrance examination as per the allotted date, time, and exam instructions." },
    { step: "Counselling", description: "Participate in online counselling, choice filling, seat allotment, and counselling rounds." },
    { step: "Document Verification", description: "Submit and verify academic, identity, and reservation-related documents at the designated stage." },
    { step: "Fee Payment", description: "Pay admission and institutional fees within the timelines shared during counselling and reporting." },
    { step: "Admission", description: "Complete final institute reporting and admission formalities to confirm your seat." }
  ],
  scholarshipContent: {
    title: "Scholarship Support",
    description: "Eligible students can apply for state scholarship schemes through the official Uttar Pradesh scholarship portal, subject to category, income, attendance, and document requirements.",
    link: {
      label: "Open Scholarship Portal",
      url: "http://scholarship.up.nic.in/"
    }
  },
  importantLinks: [
    { label: "JEECUP Portal", url: "https://jeecup.admissions.nic.in/", external: true },
    { label: "Scholarship Portal", url: "http://scholarship.up.nic.in/", external: true },
    { label: "AICTE", url: "https://www.aicte-india.org/", external: true },
    { label: "Prospectus", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", external: true }
  ],
  faqs: [
    { id: "faq-1", question: "How can I apply for admission?", answer: "Applications are generally submitted through the official JEECUP portal. Students should follow the published schedule, complete registration, and appear in counselling." },
    { id: "faq-2", question: "Is admission available without JEECUP?", answer: "Regular admissions typically follow JEECUP procedures. Any special or lateral entry process should be treated according to official notifications released for that session." },
    { id: "faq-3", question: "Which documents are commonly required during verification?", answer: "Students usually need marksheets, certificates, allotment documents, identity proof, photographs, and category or income certificates where applicable." },
    { id: "faq-4", question: "Where should students apply for scholarship support?", answer: "Eligible students should use the official Uttar Pradesh scholarship portal and complete form submission with correct academic and personal details." }
  ]
};

// Format Admission document for API output
const formatAdmissionData = (doc) => {
  if (!doc) return DEFAULT_ADMISSION_DATA;
  const prospectus = doc.prospectusUrl || DEFAULT_ADMISSION_DATA.prospectusUrl;

  const links = (doc.importantLinks && doc.importantLinks.length > 0)
    ? doc.importantLinks.map(l => l.label === "Prospectus" ? { ...l, url: prospectus } : l)
    : DEFAULT_ADMISSION_DATA.importantLinks.map(l => l.label === "Prospectus" ? { ...l, url: prospectus } : l);

  return {
    _id: doc._id ? doc._id.toString() : "admission-main",
    academicYear: doc.academicYear || "2026-2027",
    title: doc.title || DEFAULT_ADMISSION_DATA.title,
    eyebrow: doc.eyebrow || "Admissions",
    introduction: doc.introduction || DEFAULT_ADMISSION_DATA.introduction,
    officialJeecupLink: doc.officialJeecupLink || DEFAULT_ADMISSION_DATA.officialJeecupLink,
    prospectusUrl: prospectus,
    coursesOffered: (doc.coursesOffered && doc.coursesOffered.length > 0)
      ? doc.coursesOffered.map(c => ({
          id: c.id || c._id?.toString() || `c-${Math.random()}`,
          course: c.course || c.courseName || "",
          courseName: c.courseName || c.course || "",
          duration: c.duration || "3 Years",
          intake: c.intake ? String(c.intake) : "60"
        }))
      : DEFAULT_ADMISSION_DATA.coursesOffered,
    eligibilityCriteria: (doc.eligibilityCriteria && doc.eligibilityCriteria.length > 0)
      ? doc.eligibilityCriteria
      : DEFAULT_ADMISSION_DATA.eligibilityCriteria,
    requiredDocuments: (doc.requiredDocuments && doc.requiredDocuments.length > 0)
      ? doc.requiredDocuments
      : DEFAULT_ADMISSION_DATA.requiredDocuments,
    feeStructure: (doc.feeStructure && doc.feeStructure.length > 0)
      ? doc.feeStructure.map(f => ({
          id: f.id || f._id?.toString() || `fee-${Math.random()}`,
          category: f.category || "",
          amount: f.amount || f.tuitionFee || "As per norms",
          notes: f.notes || f.hostelFee || ""
        }))
      : DEFAULT_ADMISSION_DATA.feeStructure,
    admissionProcess: (doc.admissionProcess && doc.admissionProcess.length > 0)
      ? doc.admissionProcess
      : DEFAULT_ADMISSION_DATA.admissionProcess,
    scholarshipContent: doc.scholarshipContent?.title ? doc.scholarshipContent : DEFAULT_ADMISSION_DATA.scholarshipContent,
    importantLinks: links,
    faqs: (doc.faqs && doc.faqs.length > 0) ? doc.faqs : DEFAULT_ADMISSION_DATA.faqs
  };
};

// @desc    Get Admission page details
// @route   GET /api/admissions
// @access  Public
export const getAdmissions = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    let doc = await Admission.findOne({ isActive: true });

    if (!doc) {
      try {
        doc = await Admission.create(DEFAULT_ADMISSION_DATA);
      } catch (err) {
        console.warn("Could not seed default admissions:", err.message);
      }
    }

    if (doc) {
      return res.status(200).json({
        success: true,
        admissions: formatAdmissionData(doc)
      });
    }
  }

  res.status(200).json({
    success: true,
    admissions: DEFAULT_ADMISSION_DATA
  });
});

// @desc    Update whole admission configuration
// @route   PUT /api/admissions
// @access  Private (Admin)
export const updateAdmissions = asyncHandler(async (req, res) => {
  const body = req.body;

  let updatedDoc = null;
  if (mongoose.connection.readyState === 1) {
    let doc = await Admission.findOne({ isActive: true });
    if (!doc) {
      doc = new Admission(DEFAULT_ADMISSION_DATA);
    }

    Object.assign(doc, body);
    updatedDoc = await doc.save();
  }

  res.status(200).json({
    success: true,
    message: "Admission information updated successfully.",
    admissions: updatedDoc ? formatAdmissionData(updatedDoc) : { ...DEFAULT_ADMISSION_DATA, ...body }
  });
});

// @desc    Update Courses Offered list
// @route   PUT /api/admissions/courses
// @access  Private (Admin)
export const updateCourses = asyncHandler(async (req, res) => {
  const { courses } = req.body;
  if (!Array.isArray(courses)) {
    throw new ApiError(400, "Courses array is required.");
  }

  let updatedDoc = null;
  if (mongoose.connection.readyState === 1) {
    let doc = await Admission.findOne({ isActive: true });
    if (!doc) doc = new Admission(DEFAULT_ADMISSION_DATA);

    doc.coursesOffered = courses.map(c => ({
      id: c.id || `c-${Date.now()}`,
      course: c.course || c.courseName || "",
      courseName: c.courseName || c.course || "",
      duration: c.duration || "3 Years",
      intake: String(c.intake || "60")
    }));

    updatedDoc = await doc.save();
  }

  res.status(200).json({
    success: true,
    message: "Courses offered updated successfully.",
    courses: updatedDoc ? formatAdmissionData(updatedDoc).coursesOffered : courses
  });
});

// @desc    Update Eligibility Criteria list
// @route   PUT /api/admissions/eligibility
// @access  Private (Admin)
export const updateEligibility = asyncHandler(async (req, res) => {
  const { eligibility } = req.body;
  if (!Array.isArray(eligibility)) {
    throw new ApiError(400, "Eligibility array is required.");
  }

  let updatedDoc = null;
  if (mongoose.connection.readyState === 1) {
    let doc = await Admission.findOne({ isActive: true });
    if (!doc) doc = new Admission(DEFAULT_ADMISSION_DATA);

    doc.eligibilityCriteria = eligibility;
    updatedDoc = await doc.save();
  }

  res.status(200).json({
    success: true,
    message: "Eligibility criteria updated successfully.",
    eligibility: updatedDoc ? formatAdmissionData(updatedDoc).eligibilityCriteria : eligibility
  });
});

// @desc    Update Required Documents list
// @route   PUT /api/admissions/documents
// @access  Private (Admin)
export const updateDocuments = asyncHandler(async (req, res) => {
  const { documents } = req.body;
  if (!Array.isArray(documents)) {
    throw new ApiError(400, "Documents array is required.");
  }

  let updatedDoc = null;
  if (mongoose.connection.readyState === 1) {
    let doc = await Admission.findOne({ isActive: true });
    if (!doc) doc = new Admission(DEFAULT_ADMISSION_DATA);

    doc.requiredDocuments = documents;
    updatedDoc = await doc.save();
  }

  res.status(200).json({
    success: true,
    message: "Required documents updated successfully.",
    documents: updatedDoc ? formatAdmissionData(updatedDoc).requiredDocuments : documents
  });
});

// @desc    Update Fee Structure list
// @route   PUT /api/admissions/fees
// @access  Private (Admin)
export const updateFeeStructure = asyncHandler(async (req, res) => {
  const { fees } = req.body;
  if (!Array.isArray(fees)) {
    throw new ApiError(400, "Fees array is required.");
  }

  let updatedDoc = null;
  if (mongoose.connection.readyState === 1) {
    let doc = await Admission.findOne({ isActive: true });
    if (!doc) doc = new Admission(DEFAULT_ADMISSION_DATA);

    doc.feeStructure = fees.map(f => ({
      id: f.id || `fee-${Date.now()}`,
      category: f.category || "",
      amount: f.amount || "",
      notes: f.notes || ""
    }));

    updatedDoc = await doc.save();
  }

  res.status(200).json({
    success: true,
    message: "Fee structure updated successfully.",
    fees: updatedDoc ? formatAdmissionData(updatedDoc).feeStructure : fees
  });
});

// @desc    Update Prospectus PDF URL
// @route   PUT /api/admissions/prospectus
// @access  Private (Admin)
export const updateProspectus = asyncHandler(async (req, res) => {
  const { prospectusUrl } = req.body;
  if (!prospectusUrl) {
    throw new ApiError(400, "Prospectus URL is required.");
  }

  let finalUrl = prospectusUrl;
  if (finalUrl.startsWith("data:")) {
    const uploadRes = await uploadFileToCloudinary(finalUrl, "gpk_admissions");
    finalUrl = uploadRes.url;
  }

  let updatedDoc = null;
  if (mongoose.connection.readyState === 1) {
    let doc = await Admission.findOne({ isActive: true });
    if (!doc) doc = new Admission(DEFAULT_ADMISSION_DATA);

    doc.prospectusUrl = finalUrl;

    // Update link in importantLinks if present
    if (doc.importantLinks && doc.importantLinks.length > 0) {
      doc.importantLinks = doc.importantLinks.map(l =>
        l.label === "Prospectus" ? { ...l, url: finalUrl } : l
      );
    }

    updatedDoc = await doc.save();
  }

  res.status(200).json({
    success: true,
    message: "Prospectus link updated successfully.",
    prospectusUrl: updatedDoc ? formatAdmissionData(updatedDoc).prospectusUrl : finalUrl
  });
});
