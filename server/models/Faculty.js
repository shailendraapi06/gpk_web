import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Faculty name is required"],
      trim: true
    },
    designation: {
      type: String,
      required: [true, "Faculty designation is required"],
      trim: true
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department"
    },
    departmentName: {
      type: String,
      required: [true, "Department name is required"],
      trim: true
    },
    qualification: {
      type: String,
      required: [true, "Qualification is required"],
      trim: true
    },
    experience: {
      type: String,
      default: "0 Years"
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      default: ""
    },
    photo: {
      type: String,
      default: ""
    },
    profileUrl: {
      type: String,
      default: ""
    },
    specialization: {
      type: [String],
      default: []
    },
    isHod: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
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

// Index for searching faculty by name or department
facultySchema.index({ name: "text", departmentName: "text", designation: "text" });

const Faculty = mongoose.model("Faculty", facultySchema);
export default Faculty;
