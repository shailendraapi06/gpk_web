import mongoose from "mongoose";

const leadershipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Leader name is required"],
      trim: true
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true
    },
    photoUrl: {
      type: String,
      default: ""
    },
    photoPublicId: {
      type: String,
      default: ""
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

const Leadership = mongoose.model("Leadership", leadershipSchema);
export default Leadership;
