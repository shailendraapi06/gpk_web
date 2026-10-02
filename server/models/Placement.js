import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true, trim: true },
  logo: { type: String, default: "" },
  logoPublicId: { type: String, default: "" },
  sector: { type: String, default: "Core Engineering / IT" }
});

const processStepSchema = new mongoose.Schema({
  id: { type: String },
  step: { type: String, required: true },
  description: { type: String, required: true }
});

const trainingProgramSchema = new mongoose.Schema({
  id: { type: String },
  icon: { type: String, default: "communication" },
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" }
});

const placementNoticeSchema = new mongoose.Schema({
  id: { type: String },
  date: { type: String, required: true },
  title: { type: String, required: true },
  actionLabel: { type: String, default: "View PDF" },
  actionUrl: { type: String, required: true }
});

const placementDriveSchema = new mongoose.Schema({
  id: { type: String },
  company: { type: String, required: true },
  date: { type: String, required: true },
  eligibility: { type: String, required: true },
  status: { type: String, default: "Upcoming" },
  actionLabel: { type: String, default: "Apply" },
  actionUrl: { type: String, default: "" }
});

const placementSchema = new mongoose.Schema(
  {
    pageContent: {
      eyebrow: { type: String, default: "Training & Placement" },
      title: { type: String, default: "Training & Placement Cell" },
      introduction: {
        type: String,
        default:
          "The Training & Placement Cell of Government Polytechnic Kanpur supports students through industry readiness, campus engagement, placement coordination, and skill-building initiatives aligned with technical education outcomes."
      }
    },
    placementOverview: {
      title: { type: String, default: "Placement Cell Overview" },
      description: {
        type: [String],
        default: [
          "The placement cell works as a bridge between the institute, industry, and students by coordinating training activities, pre-placement support, and campus recruitment opportunities.",
          "With a focus on employability, communication, discipline, and technical preparedness, the cell helps students become industry-ready for internships, drives, and professional growth."
        ]
      },
      image: {
        type: String,
        default: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop"
      },
      imageAlt: { type: String, default: "Government Polytechnic Kanpur academic campus" }
    },
    placementOfficer: {
      name: { type: String, default: "Prof. Amit Kumar" },
      designation: { type: String, default: "Training & Placement Officer, GPK" },
      photo: {
        type: String,
        default: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop"
      },
      message: {
        type: String,
        default:
          "Our objective is to equip students with practical confidence, workplace readiness, and professional discipline so they can participate effectively in training programs, internship opportunities, and placement drives."
      },
      contact: {
        email: { type: String, default: "tpo@gpk.ac.in" },
        phone: { type: String, default: "+91 512 258 0188" },
        officeHours: { type: String, default: "Monday to Saturday, 10:00 AM to 5:00 PM" }
      },
      profileUrl: {
        type: String,
        default: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      }
    },
    placementProcess: [processStepSchema],
    recruiters: [recruiterSchema],
    trainingPrograms: [trainingProgramSchema],
    placementNotices: [placementNoticeSchema],
    placementDrives: [placementDriveSchema],
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

const Placement = mongoose.model("Placement", placementSchema);
export default Placement;

