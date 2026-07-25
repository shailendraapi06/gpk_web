import mongoose from "mongoose";

const laboratorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  imageUrl: {
    type: String,
    default: ""
  }
});

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Department name is required"],
      trim: true,
      unique: true
    },
    code: {
      type: String,
      required: [true, "Department code is required"],
      trim: true,
      uppercase: true
    },
    slug: {
      type: String,
      required: [true, "Department slug is required"],
      trim: true,
      lowercase: true,
      unique: true
    },
    shortDescription: {
      type: String,
      trim: true,
      default: ""
    },
    description: {
      type: String,
      trim: true,
      default: ""
    },
    establishedYear: {
      type: Number,
      default: 1960
    },
    intake: {
      type: Number,
      default: 60
    },
    duration: {
      type: String,
      default: "3 Years"
    },
    about: {
      heading: { type: String, default: "About the Department" },
      summary: { type: String, default: "" },
      focusAreas: { type: [String], default: [] }
    },
    hod: {
      name: { type: String, default: "" },
      designation: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      photoUrl: { type: String, default: "" },
      message: { type: String, default: "" }
    },
    icon: {
      type: String,
      default: "computer"
    },
    vision: {
      type: String,
      default: ""
    },
    mission: {
      type: [String],
      default: []
    },
    highlights: {
      type: [String],
      default: []
    },
    laboratories: [laboratorySchema],
    syllabusUrl: {
      type: String,
      default: ""
    },
    curriculum: {
      heading: { type: String, default: "Curriculum & Syllabus" },
      description: { type: String, default: "" },
      semesters: [
        {
          id: String,
          label: String,
          overview: String,
          links: [{ label: String, url: String }]
        }
      ]
    },
    placement: {
      heading: { type: String, default: "Training & Placement" },
      description: { type: String, default: "" },
      supportPoints: { type: [String], default: [] },
      timeline: [
        {
          year: String,
          title: String,
          description: String
        }
      ]
    },
    recruiters: [
      {
        id: String,
        name: String,
        logo: String,
        logoUrl: String
      }
    ],
    gallery: [
      {
        id: String,
        title: String,
        category: String,
        image: String,
        src: String
      }
    ],
    bannerImageUrl: {
      type: String,
      default: ""
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Department = mongoose.model("Department", departmentSchema);
export default Department;
