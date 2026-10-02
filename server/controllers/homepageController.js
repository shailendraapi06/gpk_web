import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";
import { Homepage, Leadership, Gallery, Placement, Notice, WebsiteSettings } from "../models/index.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  extractPublicId,
  CLOUDINARY_FOLDERS
} from "../utils/cloudinary.js";

// Initial Fallback Data
const FALLBACK_HERO_SLIDES = [
  {
    id: "hero-1",
    _id: "hero-1",
    title: "Welcome to Government Polytechnic Kanpur",
    subtitle: "Nurturing technical competence, innovation, and career excellence since 1958.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop",
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop",
    ctaText: "Explore Admissions",
    ctaLink: "/admissions"
  },
  {
    id: "hero-2",
    _id: "hero-2",
    title: "State-of-the-Art Labs & Infrastructure",
    subtitle: "Equipped with advanced technical setups, workshops, and high-performance computing centers.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop",
    src: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop",
    ctaText: "Our Facilities",
    ctaLink: "/facilities"
  },
  {
    id: "hero-3",
    _id: "hero-3",
    title: "Record Breaking Placement Drives",
    subtitle: "Top-tier industrial recruiters recruiting technical graduates across IT, Civil, and Mechanical fields.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
    ctaText: "Placement Statistics",
    ctaLink: "/placement"
  }
];

const FALLBACK_LEADERSHIP = [
  {
    id: "yogi-adityanath",
    _id: "yogi-adityanath",
    name: "Shri Yogi Adityanath",
    designation: "Hon'ble Chief Minister of Uttar Pradesh",
    photo: { src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop" },
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "ashish-patel",
    _id: "ashish-patel",
    name: "Shri Ashish Patel",
    designation: "Hon'ble Minister of Technical Education, Uttar Pradesh",
    photo: { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop" },
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "mk-shanmuga-sundaram",
    _id: "mk-shanmuga-sundaram",
    name: "Dr. M.K. Shanmuga Sundaram, IAS",
    designation: "Principal Secretary, Technical Education Department, U.P.",
    photo: { src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop" },
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "aziz-ahmad",
    _id: "aziz-ahmad",
    name: "Shri Aziz Ahmad",
    designation: "Director, DTE, Kanpur, U.P.",
    photo: { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" },
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"
  }
];

const FALLBACK_PRINCIPAL = {
  sectionTitle: "Principal's Message",
  name: "Dr. A. K. Sharma",
  designation: "Principal, Government Polytechnic Kanpur",
  message: "At Government Polytechnic Kanpur, we are committed to creating an academic environment where technical knowledge, discipline, and practical learning work together to shape capable professionals. Our focus remains on student growth, responsible innovation, and preparing learners for meaningful careers in a rapidly changing world.",
  actionLabel: "Read Full Message",
  actionTo: "/about",
  photo: {
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop"
  },
  photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop"
};

const FALLBACK_RECRUITERS = [
  { id: "recruiter-1", _id: "recruiter-1", name: "TechNova", logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150&auto=format&fit=crop", logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150&auto=format&fit=crop" },
  { id: "recruiter-2", _id: "recruiter-2", name: "BuildCore", logo: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=150&auto=format&fit=crop", logoUrl: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=150&auto=format&fit=crop" },
  { id: "recruiter-3", _id: "recruiter-3", name: "PowerGrid Works", logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150&auto=format&fit=crop", logoUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150&auto=format&fit=crop" },
  { id: "recruiter-4", _id: "recruiter-4", name: "InfraAxis", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=150&auto=format&fit=crop", logoUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=150&auto=format&fit=crop" }
];

const FALLBACK_GALLERY = [
  { id: "campus", _id: "campus", title: "Main Campus", category: "Campus", src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&auto=format&fit=crop" },
  { id: "labs", _id: "labs", title: "Technical Laboratories", category: "Labs", src: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=400&auto=format&fit=crop" },
  { id: "events", _id: "events", title: "Institutional Events", category: "Events", src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=400&auto=format&fit=crop" }
];

const FALLBACK_CONTACT = [
  { id: "address", label: "Address", value: "GT Road, Near Gurudev Palace, Vikas Nagar, Kanpur(U.P.) - 208002", icon: "address" },
  { id: "phone", label: "Phone", value: "+91 00000 00000", icon: "phone" },
  { id: "email", label: "Email", value: "newprincipalgpknp18@gmail.com", icon: "email" },
  { id: "hours", label: "Office Hours", value: "Monday to Saturday, 10:00 AM to 5:00 PM", icon: "hours" }
];

let inMemoryHeroSlides = [...FALLBACK_HERO_SLIDES];
let inMemoryLeadership = [...FALLBACK_LEADERSHIP];
let inMemoryPrincipal = { ...FALLBACK_PRINCIPAL };
let inMemoryRecruiters = [...FALLBACK_RECRUITERS];
let inMemoryGallery = [...FALLBACK_GALLERY];
let inMemoryContact = [...FALLBACK_CONTACT];

// Helper to ensure single Homepage document exists
const getOrCreateHomepageDoc = async () => {
  let doc = await Homepage.findOne();
  if (!doc) {
    doc = await Homepage.create({
      heroSlides: inMemoryHeroSlides.map((s) => ({
        title: s.title,
        subtitle: s.subtitle,
        imageUrl: s.src || s.image,
        ctaLabel: s.ctaText,
        ctaLink: s.ctaLink
      })),
      principalMessage: {
        name: inMemoryPrincipal.name,
        designation: inMemoryPrincipal.designation,
        message: inMemoryPrincipal.message,
        photoUrl: inMemoryPrincipal.photo.src
      }
    });
  }
  return doc;
};

// ==========================================
// @desc    Get aggregated Public Homepage Data
// @route   GET /api/homepage
// @access  Public
// ==========================================
export const getPublicHomepageData = asyncHandler(async (req, res) => {
  let heroSlides = inMemoryHeroSlides;
  let leadership = inMemoryLeadership;
  let principal = inMemoryPrincipal;
  let recruiters = inMemoryRecruiters;
  let gallery = inMemoryGallery;
  let contact = inMemoryContact;

  if (mongoose.connection.readyState === 1) {
    try {
      const hpDoc = await Homepage.findOne();
      if (hpDoc) {
        if (hpDoc.heroSlides && hpDoc.heroSlides.length > 0) {
          heroSlides = hpDoc.heroSlides.map((s) => ({
            id: s._id.toString(),
            _id: s._id.toString(),
            title: s.title,
            subtitle: s.subtitle,
            image: s.imageUrl,
            src: s.imageUrl,
            imageUrl: s.imageUrl,
            ctaText: s.ctaLabel,
            ctaLink: s.ctaLink,
            order: s.order,
            status: s.isActive ? "Active" : "Inactive"
          }));
        }

        if (hpDoc.principalMessage && hpDoc.principalMessage.name) {
          principal = {
            sectionTitle: "Principal's Message",
            name: hpDoc.principalMessage.name,
            designation: hpDoc.principalMessage.designation,
            message: hpDoc.principalMessage.message,
            actionLabel: "Read Full Message",
            actionTo: "/about",
            photo: { src: hpDoc.principalMessage.photoUrl || FALLBACK_PRINCIPAL.photo.src },
            photoUrl: hpDoc.principalMessage.photoUrl || FALLBACK_PRINCIPAL.photo.src
          };
        }
      }

      const dbLeaders = await Leadership.find().sort({ order: 1 });
      if (dbLeaders && dbLeaders.length > 0) {
        leadership = dbLeaders.map((l) => ({
          id: l._id.toString(),
          _id: l._id.toString(),
          name: l.name,
          designation: l.designation,
          photo: { src: l.photoUrl },
          photoUrl: l.photoUrl
        }));
      }

      const dbGallery = await Gallery.find().limit(6);
      if (dbGallery && dbGallery.length > 0) {
        gallery = dbGallery.map((g) => ({
          id: g._id.toString(),
          _id: g._id.toString(),
          title: g.title,
          category: g.category,
          src: g.src || g.thumbnail
        }));
      }

      const settings = await WebsiteSettings.findOne();
      if (settings) {
        contact = [
          { id: "address", label: "Address", value: settings.address, icon: "address" },
          { id: "phone", label: "Phone", value: settings.phone, icon: "phone" },
          { id: "email", label: "Email", value: settings.email, icon: "email" },
          { id: "hours", label: "Office Hours", value: settings.workingHours, icon: "hours" }
        ];
      }
    } catch (e) {
      console.warn("DB Query soft warning in Homepage API:", e.message);
    }
  }

  const hpPayload = {
    heroSlides,
    leadership,
    principal,
    recruiters,
    gallery,
    contact
  };

  res.status(200).json({
    success: true,
    data: hpPayload,
    homepage: hpPayload
  });
});

// ==========================================
// HERO SLIDES CONTROLLERS
// ==========================================
export const getHeroSlides = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const hp = await Homepage.findOne();
    if (hp && hp.heroSlides && hp.heroSlides.length > 0) {
      const slides = hp.heroSlides.map((s) => ({
        id: s._id.toString(),
        _id: s._id.toString(),
        title: s.title,
        subtitle: s.subtitle,
        image: s.imageUrl,
        src: s.imageUrl,
        imageUrl: s.imageUrl,
        ctaText: s.ctaLabel,
        ctaLink: s.ctaLink,
        order: s.order
      }));
      return res.status(200).json({ success: true, slides });
    }
  }
  res.status(200).json({ success: true, slides: inMemoryHeroSlides });
});

export const addHeroSlide = asyncHandler(async (req, res) => {
  const { title, subtitle, src, image, imageUrl, imagePublicId, ctaText, ctaLink } = req.body;

  let url = src || image || imageUrl;
  if (!url) {
    throw new ApiError(400, "Image URL is required for hero slide.");
  }

  let finalPublicId = imagePublicId || extractPublicId(url);
  if (url.startsWith("data:")) {
    url = await uploadToCloudinary(url, CLOUDINARY_FOLDERS.HEROES);
    finalPublicId = extractPublicId(url);
  }

  let createdId = `hero-${Date.now()}`;
  const slideObj = {
    id: createdId,
    _id: createdId,
    title: title || "Government Polytechnic Kanpur",
    subtitle: subtitle || "",
    src: url,
    image: url,
    imageUrl: url,
    imagePublicId: finalPublicId,
    ctaText: ctaText || "Learn More",
    ctaLink: ctaLink || "/about"
  };
  inMemoryHeroSlides.push(slideObj);

  if (mongoose.connection.readyState === 1) {
    const hp = await getOrCreateHomepageDoc();
    hp.heroSlides.push({
      title: title || "Government Polytechnic Kanpur",
      subtitle: subtitle || "",
      imageUrl: url,
      imagePublicId: finalPublicId,
      ctaLabel: ctaText || "Learn More",
      ctaLink: ctaLink || "/about"
    });
    await hp.save();
    const newSlide = hp.heroSlides[hp.heroSlides.length - 1];
    createdId = newSlide._id.toString();
    slideObj.id = createdId;
    slideObj._id = createdId;
  }

  res.status(201).json({
    success: true,
    message: "Hero slide added successfully.",
    slide: slideObj
  });
});

export const updateHeroSlide = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, subtitle, src, image, imageUrl, imagePublicId, ctaText, ctaLink } = req.body;

  let url = src || image || imageUrl;
  let finalPublicId = imagePublicId;
  if (url && url.startsWith("data:")) {
    url = await uploadToCloudinary(url, CLOUDINARY_FOLDERS.HEROES);
    finalPublicId = extractPublicId(url);
  }

  let oldImageToClean = "";
  inMemoryHeroSlides = inMemoryHeroSlides.map(s => {
    if (s.id === id || s._id === id) {
      if (url && s.imageUrl && s.imageUrl !== url) {
        oldImageToClean = s.imagePublicId || s.imageUrl;
      }
      return {
        ...s,
        title: title || s.title,
        subtitle: subtitle !== undefined ? subtitle : s.subtitle,
        src: url || s.src,
        image: url || s.image,
        imageUrl: url || s.imageUrl,
        imagePublicId: finalPublicId || s.imagePublicId,
        ctaText: ctaText || s.ctaText,
        ctaLink: ctaLink || s.ctaLink
      };
    }
    return s;
  });

  if (mongoose.connection.readyState === 1) {
    const hp = await Homepage.findOne();
    if (hp) {
      const slide = hp.heroSlides.id(id);
      if (slide) {
        if (title) slide.title = title;
        if (subtitle !== undefined) slide.subtitle = subtitle;
        if (url) {
          if (slide.imageUrl && slide.imageUrl !== url) {
            oldImageToClean = slide.imagePublicId || slide.imageUrl;
          }
          slide.imageUrl = url;
          slide.imagePublicId = finalPublicId || extractPublicId(url);
        }
        if (ctaText) slide.ctaLabel = ctaText;
        if (ctaLink) slide.ctaLink = ctaLink;
        await hp.save();
      }
    }
  }

  // Safely delete old Cloudinary asset after MongoDB update completes
  if (oldImageToClean && oldImageToClean !== url) {
    await deleteFromCloudinary(oldImageToClean);
  }

  res.status(200).json({
    success: true,
    message: "Hero slide updated successfully.",
    slide: { id, src: url, image: url, title, subtitle }
  });
});

export const deleteHeroSlide = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let oldImageToClean = "";
  const existing = inMemoryHeroSlides.find(s => s.id === id || s._id === id);
  if (existing) {
    oldImageToClean = existing.imagePublicId || existing.imageUrl || existing.src;
  }

  inMemoryHeroSlides = inMemoryHeroSlides.filter(s => s.id !== id && s._id !== id);

  if (mongoose.connection.readyState === 1) {
    const hp = await Homepage.findOne();
    if (hp) {
      const slide = hp.heroSlides.id(id);
      if (slide) {
        if (!oldImageToClean) oldImageToClean = slide.imagePublicId || slide.imageUrl;
        hp.heroSlides.pull({ _id: id });
        await hp.save();
      }
    }
  }

  // Delete asset from Cloudinary
  if (oldImageToClean) {
    await deleteFromCloudinary(oldImageToClean);
  }

  res.status(200).json({
    success: true,
    message: "Hero slide deleted successfully.",
    deletedId: id
  });
});

// ==========================================
// LEADERSHIP CONTROLLERS
// ==========================================
export const getLeadership = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const dbLeaders = await Leadership.find().sort({ order: 1 });
    if (dbLeaders && dbLeaders.length > 0) {
      const leaders = dbLeaders.map((l) => ({
        id: l._id.toString(),
        _id: l._id.toString(),
        name: l.name,
        designation: l.designation,
        photo: { src: l.photoUrl },
        photoUrl: l.photoUrl
      }));
      return res.status(200).json({ success: true, leaders });
    }
  }
  res.status(200).json({ success: true, leaders: inMemoryLeadership });
});

export const addLeader = asyncHandler(async (req, res) => {
  const { name, designation, src, photoUrl, photo, photoPublicId } = req.body;

  if (!name || !designation) {
    throw new ApiError(400, "Leader name and designation are required.");
  }

  let url = photoUrl || src || (photo && photo.src) || "";
  let finalPublicId = photoPublicId || extractPublicId(url);
  if (url && url.startsWith("data:")) {
    url = await uploadToCloudinary(url, CLOUDINARY_FOLDERS.LEADERS);
    finalPublicId = extractPublicId(url);
  }

  let createdId = `ldr-${Date.now()}`;
  const leaderObj = {
    id: createdId,
    _id: createdId,
    name,
    designation,
    photo: { src: url },
    photoUrl: url,
    photoPublicId: finalPublicId
  };
  inMemoryLeadership.push(leaderObj);

  if (mongoose.connection.readyState === 1) {
    const newLdr = await Leadership.create({
      name,
      designation,
      photoUrl: url,
      photoPublicId: finalPublicId
    });
    createdId = newLdr._id.toString();
    leaderObj.id = createdId;
    leaderObj._id = createdId;
  }

  res.status(201).json({
    success: true,
    message: "Leader profile added successfully.",
    leader: leaderObj
  });
});

export const updateLeader = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, designation, src, photoUrl, photo, photoPublicId } = req.body;

  let url = photoUrl || src || (photo && photo.src) || "";
  let finalPublicId = photoPublicId;
  if (url && url.startsWith("data:")) {
    url = await uploadToCloudinary(url, CLOUDINARY_FOLDERS.LEADERS);
    finalPublicId = extractPublicId(url);
  }

  let oldPhotoToClean = "";
  inMemoryLeadership = inMemoryLeadership.map(l => {
    if (l.id === id || l._id === id) {
      if (url && l.photoUrl && l.photoUrl !== url) {
        oldPhotoToClean = l.photoPublicId || l.photoUrl;
      }
      return {
        ...l,
        name: name || l.name,
        designation: designation || l.designation,
        photo: { src: url || l.photoUrl || (l.photo && l.photo.src) || "" },
        photoUrl: url || l.photoUrl || (l.photo && l.photo.src) || "",
        photoPublicId: finalPublicId || l.photoPublicId
      };
    }
    return l;
  });

  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
    const ldr = await Leadership.findById(id);
    if (ldr) {
      if (name) ldr.name = name;
      if (designation) ldr.designation = designation;
      if (url) {
        if (ldr.photoUrl && ldr.photoUrl !== url) {
          oldPhotoToClean = ldr.photoPublicId || ldr.photoUrl;
        }
        ldr.photoUrl = url;
        ldr.photoPublicId = finalPublicId || extractPublicId(url);
      }
      await ldr.save();
    }
  }

  // Safely clean up old asset from Cloudinary
  if (oldPhotoToClean && oldPhotoToClean !== url) {
    await deleteFromCloudinary(oldPhotoToClean);
  }

  res.status(200).json({
    success: true,
    message: "Leader profile updated successfully.",
    leader: {
      id,
      name,
      designation,
      photo: { src: url },
      photoUrl: url
    }
  });
});

export const deleteLeader = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let oldPhotoToClean = "";
  const existing = inMemoryLeadership.find(l => l.id === id || l._id === id);
  if (existing) {
    oldPhotoToClean = existing.photoPublicId || existing.photoUrl || (existing.photo && existing.photo.src);
  }

  inMemoryLeadership = inMemoryLeadership.filter(l => l.id !== id && l._id !== id);

  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
    const ldr = await Leadership.findById(id);
    if (ldr) {
      if (!oldPhotoToClean) oldPhotoToClean = ldr.photoPublicId || ldr.photoUrl;
      await ldr.deleteOne();
    }
  }

  if (oldPhotoToClean) {
    await deleteFromCloudinary(oldPhotoToClean);
  }

  res.status(200).json({
    success: true,
    message: "Leader deleted successfully.",
    deletedId: id
  });
});

// ==========================================
// PRINCIPAL MESSAGE CONTROLLERS
// ==========================================
export const getPrincipalMessage = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const hp = await Homepage.findOne();
    if (hp && hp.principalMessage && hp.principalMessage.name) {
      return res.status(200).json({
        success: true,
        principal: {
          sectionTitle: "Principal's Message",
          name: hp.principalMessage.name,
          designation: hp.principalMessage.designation,
          message: hp.principalMessage.message,
          actionLabel: "Read Full Message",
          actionTo: "/about",
          photo: { src: hp.principalMessage.photoUrl },
          photoUrl: hp.principalMessage.photoUrl
        }
      });
    }
  }

  res.status(200).json({ success: true, principal: inMemoryPrincipal });
});

export const updatePrincipalMessage = asyncHandler(async (req, res) => {
  const { sectionTitle, name, designation, message, actionLabel, actionTo, src, photoUrl, photo, photoPublicId } = req.body;

  let url = photoUrl || src || (photo && photo.src) || "";
  let finalPublicId = photoPublicId;
  if (url && url.startsWith("data:")) {
    url = await uploadToCloudinary(url, CLOUDINARY_FOLDERS.LEADERS);
    finalPublicId = extractPublicId(url);
  }

  let oldPhotoToClean = "";
  if (url && inMemoryPrincipal.photoUrl && inMemoryPrincipal.photoUrl !== url) {
    oldPhotoToClean = inMemoryPrincipal.photoPublicId || inMemoryPrincipal.photoUrl;
  }

  inMemoryPrincipal = {
    sectionTitle: sectionTitle || inMemoryPrincipal.sectionTitle,
    name: name || inMemoryPrincipal.name,
    designation: designation || inMemoryPrincipal.designation,
    message: message || inMemoryPrincipal.message,
    actionLabel: actionLabel || inMemoryPrincipal.actionLabel,
    actionTo: actionTo || inMemoryPrincipal.actionTo,
    photo: { src: url || (inMemoryPrincipal.photo && inMemoryPrincipal.photo.src) || "" },
    photoUrl: url || inMemoryPrincipal.photoUrl || (inMemoryPrincipal.photo && inMemoryPrincipal.photo.src) || "",
    photoPublicId: finalPublicId || inMemoryPrincipal.photoPublicId
  };

  if (mongoose.connection.readyState === 1) {
    const hp = await getOrCreateHomepageDoc();
    if (url && hp.principalMessage?.photoUrl && hp.principalMessage.photoUrl !== url) {
      oldPhotoToClean = hp.principalMessage.photoPublicId || hp.principalMessage.photoUrl;
    }
    hp.principalMessage = {
      name: name || hp.principalMessage.name,
      designation: designation || hp.principalMessage.designation,
      message: message || hp.principalMessage.message,
      photoUrl: url || hp.principalMessage.photoUrl,
      photoPublicId: finalPublicId || extractPublicId(url)
    };
    await hp.save();
  }

  if (oldPhotoToClean && oldPhotoToClean !== url) {
    await deleteFromCloudinary(oldPhotoToClean);
  }

  res.status(200).json({
    success: true,
    message: "Principal message updated successfully.",
    principal: inMemoryPrincipal
  });
});

// ==========================================
// RECRUITERS CONTROLLERS
// ==========================================
export const getRecruiters = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const placementDoc = await Placement.findOne();
    if (placementDoc && placementDoc.topRecruiters && placementDoc.topRecruiters.length > 0) {
      const recruiters = placementDoc.topRecruiters.map((r) => ({
        id: r._id.toString(),
        _id: r._id.toString(),
        name: r.name,
        logo: r.logoUrl,
        logoUrl: r.logoUrl
      }));
      return res.status(200).json({ success: true, recruiters });
    }
  }

  res.status(200).json({ success: true, recruiters: inMemoryRecruiters });
});

export const addRecruiter = asyncHandler(async (req, res) => {
  const { name, logo, logoUrl, logoPublicId } = req.body;

  if (!name) {
    throw new ApiError(400, "Recruiter company name is required.");
  }

  let url = logo || logoUrl || "";
  let finalPublicId = logoPublicId || extractPublicId(url);
  if (url && url.startsWith("data:")) {
    url = await uploadToCloudinary(url, CLOUDINARY_FOLDERS.RECRUITERS);
    finalPublicId = extractPublicId(url);
  }
  let createdId = `rec-${Date.now()}`;
  const recruiterObj = {
    id: createdId,
    _id: createdId,
    name,
    logo: url,
    logoUrl: url,
    logoPublicId: finalPublicId
  };
  inMemoryRecruiters.push(recruiterObj);

  if (mongoose.connection.readyState === 1) {
    let placementDoc = await Placement.findOne();
    if (!placementDoc) {
      placementDoc = await Placement.create({ academicYear: "2024-2025" });
    }

    placementDoc.topRecruiters.push({ name, logoUrl: url, logoPublicId: finalPublicId });
    await placementDoc.save();
    const last = placementDoc.topRecruiters[placementDoc.topRecruiters.length - 1];
    createdId = last._id.toString();
    recruiterObj.id = createdId;
    recruiterObj._id = createdId;
  }

  res.status(201).json({
    success: true,
    message: "Recruiter added successfully.",
    recruiter: recruiterObj
  });
});

export const updateRecruiter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, logo, logoUrl, logoPublicId } = req.body;

  let url = logo || logoUrl || "";
  let finalPublicId = logoPublicId;
  if (url && url.startsWith("data:")) {
    url = await uploadToCloudinary(url, CLOUDINARY_FOLDERS.RECRUITERS);
    finalPublicId = extractPublicId(url);
  }

  let oldLogoToClean = "";
  inMemoryRecruiters = inMemoryRecruiters.map(r => {
    if (r.id === id || r._id === id) {
      if (url && r.logoUrl && r.logoUrl !== url) {
        oldLogoToClean = r.logoPublicId || r.logoUrl;
      }
      return {
        ...r,
        name: name || r.name,
        logo: url || r.logo,
        logoUrl: url || r.logoUrl,
        logoPublicId: finalPublicId || r.logoPublicId
      };
    }
    return r;
  });

  if (mongoose.connection.readyState === 1) {
    const placementDoc = await Placement.findOne();
    if (placementDoc) {
      const rec = placementDoc.topRecruiters.id(id);
      if (rec) {
        if (name) rec.name = name;
        if (url) {
          if (rec.logoUrl && rec.logoUrl !== url) {
            oldLogoToClean = rec.logoPublicId || rec.logoUrl;
          }
          rec.logoUrl = url;
          rec.logoPublicId = finalPublicId || extractPublicId(url);
        }
        await placementDoc.save();
      }
    }
  }

  if (oldLogoToClean && oldLogoToClean !== url) {
    await deleteFromCloudinary(oldLogoToClean);
  }

  res.status(200).json({
    success: true,
    message: "Recruiter updated successfully.",
    recruiter: { id, name, logo: url, logoUrl: url }
  });
});

export const deleteRecruiter = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let oldLogoToClean = "";
  const existing = inMemoryRecruiters.find(r => r.id === id || r._id === id);
  if (existing) {
    oldLogoToClean = existing.logoPublicId || existing.logoUrl || existing.logo;
  }

  inMemoryRecruiters = inMemoryRecruiters.filter(r => r.id !== id && r._id !== id);

  if (mongoose.connection.readyState === 1) {
    const placementDoc = await Placement.findOne();
    if (placementDoc) {
      const rec = placementDoc.topRecruiters.id(id);
      if (rec) {
        if (!oldLogoToClean) oldLogoToClean = rec.logoPublicId || rec.logoUrl || rec.logo;
        placementDoc.topRecruiters.pull({ _id: id });
        await placementDoc.save();
      }
    }
  }

  if (oldLogoToClean) {
    await deleteFromCloudinary(oldLogoToClean);
  }

  res.status(200).json({
    success: true,
    message: "Recruiter deleted successfully.",
    deletedId: id
  });
});

// ==========================================
// GALLERY PREVIEW CONTROLLERS
// ==========================================
export const getGalleryPreview = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const dbGallery = await Gallery.find().limit(6);
    if (dbGallery && dbGallery.length > 0) {
      const gallery = dbGallery.map((g) => ({
        id: g._id.toString(),
        _id: g._id.toString(),
        title: g.title,
        category: g.category,
        src: g.src || g.thumbnail
      }));
      return res.status(200).json({ success: true, gallery });
    }
  }

  res.status(200).json({ success: true, gallery: inMemoryGallery });
});

export const addGalleryPreview = asyncHandler(async (req, res) => {
  const { title, category, src } = req.body;

  if (!title || !src) {
    throw new ApiError(400, "Title and Image URL are required.");
  }

  let finalSrc = src;
  if (finalSrc.startsWith("data:")) {
    finalSrc = await uploadToCloudinary(finalSrc, CLOUDINARY_FOLDERS.GALLERY);
  }

  let createdId = `gal-${Date.now()}`;
  const galItem = {
    id: createdId,
    _id: createdId,
    title,
    category: category || "Campus",
    src: finalSrc
  };
  inMemoryGallery.push(galItem);

  if (mongoose.connection.readyState === 1) {
    const newGal = await Gallery.create({
      title,
      category: category || "Campus",
      src: finalSrc,
      thumbnail: finalSrc,
      public_id: extractPublicId(finalSrc)
    });
    createdId = newGal._id.toString();
    galItem.id = createdId;
    galItem._id = createdId;
  }

  res.status(201).json({
    success: true,
    message: "Gallery image added successfully.",
    galleryItem: galItem
  });
});

export const updateGalleryPreview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, category, src } = req.body;

  let finalSrc = src;
  if (finalSrc && finalSrc.startsWith("data:")) {
    finalSrc = await uploadToCloudinary(finalSrc, CLOUDINARY_FOLDERS.GALLERY);
  }

  let oldSrcToClean = "";
  inMemoryGallery = inMemoryGallery.map(g => {
    if (g.id === id || g._id === id) {
      if (finalSrc && g.src && g.src !== finalSrc) {
        oldSrcToClean = g.src;
      }
      return {
        ...g,
        title: title || g.title,
        category: category || g.category,
        src: finalSrc || g.src
      };
    }
    return g;
  });

  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
    const gal = await Gallery.findById(id);
    if (gal) {
      if (title) gal.title = title;
      if (category) gal.category = category;
      if (finalSrc) {
        if (gal.src && gal.src !== finalSrc) {
          oldSrcToClean = gal.public_id || gal.src;
        }
        gal.src = finalSrc;
        gal.thumbnail = finalSrc;
        gal.public_id = extractPublicId(finalSrc);
      }
      await gal.save();
    }
  }

  if (oldSrcToClean && oldSrcToClean !== finalSrc) {
    await deleteFromCloudinary(oldSrcToClean);
  }

  res.status(200).json({
    success: true,
    message: "Gallery image updated successfully.",
    galleryItem: { id, title, category, src: finalSrc }
  });
});

export const deleteGalleryPreview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let oldSrcToClean = "";
  const existing = inMemoryGallery.find(g => g.id === id || g._id === id);
  if (existing) {
    oldSrcToClean = existing.src;
  }

  inMemoryGallery = inMemoryGallery.filter(g => g.id !== id && g._id !== id);

  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
    const gal = await Gallery.findById(id);
    if (gal) {
      if (!oldSrcToClean) oldSrcToClean = gal.public_id || gal.src;
      await gal.deleteOne();
    }
  }

  if (oldSrcToClean) {
    await deleteFromCloudinary(oldSrcToClean);
  }

  res.status(200).json({
    success: true,
    message: "Gallery image deleted successfully.",
    deletedId: id
  });
});

// ==========================================
// CONTACT INFO CONTROLLERS
// ==========================================
export const getContactInfo = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const settings = await WebsiteSettings.findOne();
    if (settings) {
      const contact = [
        { id: "address", label: "Address", value: settings.address, icon: "address" },
        { id: "phone", label: "Phone", value: settings.phone, icon: "phone" },
        { id: "email", label: "Email", value: settings.email, icon: "email" },
        { id: "hours", label: "Office Hours", value: settings.workingHours, icon: "hours" }
      ];
      return res.status(200).json({ success: true, contact });
    }
  }

  res.status(200).json({ success: true, contact: inMemoryContact });
});

export const updateContactInfo = asyncHandler(async (req, res) => {
  const { items } = req.body;

  if (Array.isArray(items)) {
    inMemoryContact = inMemoryContact.map(c => {
      const match = items.find(it => it.id === c.id);
      return match ? { ...c, value: match.value } : c;
    });
  }

  if (mongoose.connection.readyState === 1) {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create({});
    }

    if (Array.isArray(items)) {
      items.forEach((item) => {
        if (item.id === "address") settings.address = item.value;
        if (item.id === "phone") settings.phone = item.value;
        if (item.id === "email") settings.email = item.value;
        if (item.id === "hours") settings.workingHours = item.value;
      });
      await settings.save();
    }
  }

  res.status(200).json({
    success: true,
    message: "Contact information updated successfully."
  });
});
