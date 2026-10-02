import mongoose from "mongoose";

const heroSlideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Hero slide title is required"],
    trim: true
  },
  subtitle: {
    type: String,
    trim: true,
    default: ""
  },
  imageUrl: {
    type: String,
    required: [true, "Hero slide image URL is required"]
  },
  imagePublicId: {
    type: String,
    default: ""
  },
  ctaLabel: {
    type: String,
    default: "Learn More"
  },
  ctaLink: {
    type: String,
    default: "/about"
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const quickLinkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  url: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: "link"
  },
  badge: {
    type: String,
    default: ""
  }
});

const homepageSchema = new mongoose.Schema(
  {
    heroSlides: [heroSlideSchema],
    quickLinks: [quickLinkSchema],
    welcomeTitle: {
      type: String,
      default: "Welcome to Government Polytechnic Kanpur"
    },
    welcomeMessage: {
      type: String,
      default: "Leading Technical Institution Committed to Academic Excellence and Industry Preparedness."
    },
    stats: {
      studentsCount: { type: Number, default: 3500 },
      facultyCount: { type: Number, default: 120 },
      departmentsCount: { type: Number, default: 14 },
      placementRate: { type: String, default: "85%+" }
    },
    principalMessage: {
      name: { type: String, default: "Principal" },
      designation: { type: String, default: "Principal, GP Kanpur" },
      message: { type: String, default: "Empowering students through technical innovation and moral values." },
      photoUrl: { type: String, default: "" },
      photoPublicId: { type: String, default: "" }
    }
  },
  {
    timestamps: true
  }
);

const Homepage = mongoose.model("Homepage", homepageSchema);
export default Homepage;
