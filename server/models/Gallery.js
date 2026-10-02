import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Gallery item title is required"],
      trim: true
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Campus",
        "Events",
        "Workshops",
        "Seminars",
        "Sports",
        "Laboratories",
        "Industrial Visits",
        "General"
      ],
      default: "General"
    },
    type: {
      type: String,
      enum: ["photo", "video"],
      default: "photo"
    },
    thumbnail: {
      type: String,
      default: ""
    },
    thumbnailPublicId: {
      type: String,
      default: ""
    },
    src: {
      type: String,
      default: ""
    },
    public_id: {
      type: String,
      default: ""
    },
    embedUrl: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    featured: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;
