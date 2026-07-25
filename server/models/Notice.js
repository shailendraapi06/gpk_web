import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Notice title is required"],
      trim: true
    },
    category: {
      type: String,
      enum: ["Academic", "Admissions", "Placements", "General", "Exams"],
      default: "General"
    },
    date: {
      type: String,
      required: [true, "Date is required"]
    },
    isNewNotice: {
      type: Boolean,
      default: true
    },
    link: {
      type: String,
      default: "#"
    },
    pdfUrl: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;
