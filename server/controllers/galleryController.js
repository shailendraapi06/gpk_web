import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";
import Gallery from "../models/Gallery.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

const DEFAULT_GALLERY_ITEMS = [
  {
    title: "Main Academic Block",
    category: "Campus",
    type: "photo",
    thumbnail: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop",
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    order: 1
  },
  {
    title: "Seminar Hall Session",
    category: "Seminars",
    type: "photo",
    thumbnail: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop",
    src: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    order: 2
  },
  {
    title: "Campus Orientation Highlights",
    category: "Events",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
    embedUrl: "https://www.youtube-nocookie.com/embed/ysz5S6PUM-U",
    featured: true,
    order: 3
  },
  {
    title: "Workshop Practice Lab",
    category: "Workshops",
    type: "photo",
    thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
    src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    order: 4
  },
  {
    title: "Computer Laboratory Session",
    category: "Laboratories",
    type: "photo",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    order: 5
  },
  {
    title: "Sports Meet Moments",
    category: "Sports",
    type: "photo",
    thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop",
    src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    order: 6
  },
  {
    title: "Industry Exposure Visit",
    category: "Industrial Visits",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
    embedUrl: "https://www.youtube-nocookie.com/embed/jNQXAC9IVRw",
    featured: false,
    order: 7
  },
  {
    title: "Student Event Stage Setup",
    category: "Events",
    type: "photo",
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    order: 8
  },
  {
    title: "Campus Front View",
    category: "Campus",
    type: "photo",
    thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    order: 9
  }
];

let inMemoryGalleryItems = DEFAULT_GALLERY_ITEMS.map((item, idx) => ({
  ...item,
  id: `gallery-${idx + 1}`,
  _id: `gallery-${idx + 1}`
}));

const formatItem = (item) => ({
  id: item._id ? item._id.toString() : item.id || `gallery-${Math.random()}`,
  _id: item._id ? item._id.toString() : undefined,
  title: item.title,
  category: item.category,
  type: item.type || "photo",
  thumbnail: item.thumbnail || item.src || "",
  src: item.src || "",
  embedUrl: item.embedUrl || "",
  description: item.description || "",
  featured: Boolean(item.featured),
  createdAt: item.createdAt || new Date()
});

// @desc    Get all gallery items with optional category/featured filter
// @route   GET /api/gallery
// @access  Public
export const getGalleryItems = asyncHandler(async (req, res) => {
  const { category, featured, type } = req.query;

  if (mongoose.connection.readyState === 1) {
    let count = await Gallery.countDocuments();
    if (count === 0) {
      try {
        await Gallery.insertMany(DEFAULT_GALLERY_ITEMS);
      } catch (err) {
        console.warn("Could not seed default gallery items:", err.message);
      }
    }

    const filter = {};
    if (category && category !== "All") {
      filter.category = category;
    }
    if (featured === "true") {
      filter.featured = true;
    }
    if (type) {
      filter.type = type;
    }

    const items = await Gallery.find(filter).sort({ order: 1, createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: items.length,
      items: items.map(formatItem)
    });
  }

  // Fallback to in-memory filter
  let fallback = [...inMemoryGalleryItems];
  if (category && category !== "All") {
    fallback = fallback.filter(i => i.category === category);
  }
  if (featured === "true") {
    fallback = fallback.filter(i => i.featured);
  }
  if (type) {
    fallback = fallback.filter(i => i.type === type);
  }

  res.status(200).json({
    success: true,
    count: fallback.length,
    items: fallback
  });
});

// @desc    Get single gallery item by ID
// @route   GET /api/gallery/:id
// @access  Public
export const getGalleryItemById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
    const item = await Gallery.findById(id);
    if (!item) {
      throw new ApiError(404, "Gallery item not found.");
    }
    return res.status(200).json({
      success: true,
      item: formatItem(item)
    });
  }

  const fallback = inMemoryGalleryItems.find(i => i.id === id || i._id === id);
  if (fallback) {
    return res.status(200).json({
      success: true,
      item: formatItem(fallback)
    });
  }

  throw new ApiError(404, "Gallery item not found.");
});

// @desc    Create new gallery item (with Cloudinary upload support)
// @route   POST /api/gallery
// @access  Private (Admin)
export const createGalleryItem = asyncHandler(async (req, res) => {
  const { title, category, type = "photo", src, thumbnail, embedUrl, description, featured } = req.body;

  if (!title || !title.trim()) {
    throw new ApiError(400, "Gallery title is required.");
  }
  if (!category || !category.trim()) {
    throw new ApiError(400, "Category is required.");
  }

  let finalSrc = src || "";
  let finalThumbnail = thumbnail || "";

  // Handle Cloudinary upload for base64 or file uploads
  if (finalSrc) {
    finalSrc = await uploadToCloudinary(finalSrc, "gpk_gallery");
  }
  if (finalThumbnail) {
    finalThumbnail = await uploadToCloudinary(finalThumbnail, "gpk_gallery");
  } else if (type === "photo" && finalSrc) {
    finalThumbnail = finalSrc;
  }

  let createdItem = null;
  if (mongoose.connection.readyState === 1) {
    createdItem = await Gallery.create({
      title: title.trim(),
      category: category.trim(),
      type,
      src: finalSrc,
      thumbnail: finalThumbnail,
      embedUrl: embedUrl || "",
      description: description || "",
      featured: Boolean(featured)
    });
  }

  const createdId = createdItem ? createdItem._id.toString() : `gallery-${Date.now()}`;
  const galObj = {
    id: createdId,
    _id: createdId,
    title: title.trim(),
    category: category.trim(),
    type,
    src: finalSrc,
    thumbnail: finalThumbnail,
    embedUrl: embedUrl || "",
    description: description || "",
    featured: Boolean(featured)
  };

  inMemoryGalleryItems.unshift(galObj);

  res.status(201).json({
    success: true,
    message: "Gallery asset created successfully.",
    item: galObj
  });
});

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Private (Admin)
export const updateGalleryItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, category, type, src, thumbnail, embedUrl, description, featured } = req.body;

  let finalSrc = src;
  let finalThumbnail = thumbnail;

  if (finalSrc) {
    finalSrc = await uploadToCloudinary(finalSrc, "gpk_gallery");
  }
  if (finalThumbnail) {
    finalThumbnail = await uploadToCloudinary(finalThumbnail, "gpk_gallery");
  } else if (type === "photo" && finalSrc) {
    finalThumbnail = finalSrc;
  }

  let updatedItem = null;

  inMemoryGalleryItems = inMemoryGalleryItems.map(item => {
    if (item.id === id || item._id === id) {
      return {
        ...item,
        title: title !== undefined ? title.trim() : item.title,
        category: category !== undefined ? category.trim() : item.category,
        type: type !== undefined ? type : item.type,
        src: finalSrc !== undefined ? finalSrc : item.src,
        thumbnail: finalThumbnail !== undefined ? finalThumbnail : item.thumbnail,
        embedUrl: embedUrl !== undefined ? embedUrl : item.embedUrl,
        description: description !== undefined ? description : item.description,
        featured: featured !== undefined ? Boolean(featured) : item.featured
      };
    }
    return item;
  });

  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
    const item = await Gallery.findById(id);
    if (!item) {
      throw new ApiError(404, "Gallery asset not found.");
    }

    if (title !== undefined) item.title = title.trim();
    if (category !== undefined) item.category = category.trim();
    if (type !== undefined) item.type = type;
    if (finalSrc !== undefined) item.src = finalSrc;
    if (finalThumbnail !== undefined) item.thumbnail = finalThumbnail;
    if (embedUrl !== undefined) item.embedUrl = embedUrl;
    if (description !== undefined) item.description = description;
    if (featured !== undefined) item.featured = Boolean(featured);

    updatedItem = await item.save();
  }

  res.status(200).json({
    success: true,
    message: "Gallery asset updated successfully.",
    item: updatedItem ? formatItem(updatedItem) : {
      id,
      title,
      category,
      type,
      src: finalSrc,
      thumbnail: finalThumbnail,
      embedUrl,
      description,
      featured
    }
  });
});

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private (Admin)
export const deleteGalleryItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  inMemoryGalleryItems = inMemoryGalleryItems.filter(i => i.id !== id && i._id !== id);

  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
    const item = await Gallery.findById(id);
    if (item) {
      if (item.src) await deleteFromCloudinary(item.src);
      if (item.thumbnail && item.thumbnail !== item.src) await deleteFromCloudinary(item.thumbnail);
      await item.deleteOne();
    }
  }

  res.status(200).json({
    success: true,
    message: "Gallery item deleted successfully.",
    id
  });
});

// @desc    Upload image directly to Cloudinary
// @route   POST /api/gallery/upload
// @access  Private (Admin)
export const uploadGalleryImage = asyncHandler(async (req, res) => {
  const { imageStr, folder = "gpk_gallery" } = req.body;

  if (!imageStr) {
    throw new ApiError(400, "Image data string or base64 is required.");
  }

  const uploadedUrl = await uploadToCloudinary(imageStr, folder);

  res.status(200).json({
    success: true,
    message: "Image uploaded successfully.",
    url: uploadedUrl
  });
});
