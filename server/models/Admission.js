import mongoose from "mongoose";

const admissionCourseSchema = new mongoose.Schema({
  id: { type: String },
  course: { type: String, required: true, trim: true },
  courseName: { type: String, trim: true },
  duration: { type: String, default: "3 Years" },
  intake: { type: String, default: "60" }
});

const feeStructureSchema = new mongoose.Schema({
  id: { type: String },
  category: { type: String, required: true, trim: true },
  amount: { type: String, default: "" },
  notes: { type: String, default: "" },
  tuitionFee: { type: String, default: "" },
  hostelFee: { type: String, default: "" },
  totalFee: { type: String, default: "" }
});

const admissionProcessSchema = new mongoose.Schema({
  id: { type: String },
  step: { type: String, required: true },
  description: { type: String, required: true }
});

const faqSchema = new mongoose.Schema({
  id: { type: String },
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const importantLinkSchema = new mongoose.Schema({
  id: { type: String },
  label: { type: String, required: true },
  url: { type: String, required: true },
  external: { type: Boolean, default: true }
});

const admissionSchema = new mongoose.Schema(
  {
    academicYear: {
      type: String,
      trim: true,
      default: "2026-2027"
    },
    title: {
      type: String,
      default: "Admissions at Government Polytechnic Kanpur"
    },
    eyebrow: {
      type: String,
      default: "Admissions"
    },
    introduction: {
      type: String,
      default: "Admissions are primarily conducted through the Joint Entrance Examination Council Uttar Pradesh (JEECUP). The process is structured to keep application, counselling, document verification, and final admission clear and student-friendly."
    },
    officialJeecupLink: {
      type: String,
      default: "https://jeecup.admissions.nic.in/"
    },
    prospectusUrl: {
      type: String,
      default: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    },
    coursesOffered: [admissionCourseSchema],
    feeStructure: [feeStructureSchema],
    eligibilityCriteria: {
      type: [String],
      default: []
    },
    requiredDocuments: {
      type: [String],
      default: []
    },
    admissionProcess: [admissionProcessSchema],
    scholarshipContent: {
      title: { type: String, default: "Scholarship Support" },
      description: { type: String, default: "Eligible students can apply for state scholarship schemes through the official Uttar Pradesh scholarship portal, subject to category, income, attendance, and document requirements." },
      link: {
        label: { type: String, default: "Open Scholarship Portal" },
        url: { type: String, default: "http://scholarship.up.nic.in/" }
      }
    },
    importantLinks: [importantLinkSchema],
    faqs: [faqSchema],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Admission = mongoose.model("Admission", admissionSchema);
export default Admission;

