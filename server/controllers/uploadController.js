import asyncHandler from "../middleware/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";
import {
  uploadBufferToCloudinary,
  uploadFileToCloudinary,
  deleteFromCloudinary,
  CLOUDINARY_FOLDERS
} from "../utils/cloudinary.js";

// @desc    Upload single file (multipart/form-data or string) to Cloudinary
// @route   POST /api/upload
// @access  Public / Admin
export const uploadSingleFile = asyncHandler(async (req, res) => {
  const folder = req.body.folder || CLOUDINARY_FOLDERS.GENERAL;
  let result = null;

  // Case 1: multipart/form-data upload via Multer (buffer)
  if (req.file) {
    result = await uploadBufferToCloudinary(req.file.buffer, folder, {
      mimetype: req.file.mimetype,
      originalname: req.file.originalname
    });
  } else {
    // Case 2: String / Base64 / URL in request body (fallback / migration)
    const { file, fileData, image, pdf, logo } = req.body;
    const fileToUpload = file || fileData || image || pdf || logo;

    if (!fileToUpload) {
      throw new ApiError(400, "No image or file provided. Please provide a file via multipart/form-data.");
    }

    result = await uploadFileToCloudinary(fileToUpload, folder);
  }

  res.status(200).json({
    success: true,
    message: "File uploaded successfully to Cloudinary.",
    url: result.url,
    public_id: result.public_id || "",
    data: {
      url: result.url,
      public_id: result.public_id || "",
      format: result.format || "",
      resource_type: result.resource_type || "auto",
      bytes: result.bytes || 0
    }
  });
});

// @desc    Upload multiple files to Cloudinary
// @route   POST /api/upload/multiple
// @access  Public / Admin
export const uploadMultipleFiles = asyncHandler(async (req, res) => {
  const folder = req.body.folder || CLOUDINARY_FOLDERS.GENERAL;
  const results = [];

  // Case 1: Multer files
  if (req.files && req.files.length > 0) {
    for (const f of req.files) {
      const resItem = await uploadBufferToCloudinary(f.buffer, folder, {
        mimetype: f.mimetype,
        originalname: f.originalname
      });
      results.push(resItem);
    }
  } else if (req.body.files && Array.isArray(req.body.files)) {
    // Case 2: Array of file strings
    for (const f of req.body.files) {
      const resItem = await uploadFileToCloudinary(f, folder);
      results.push(resItem);
    }
  } else {
    throw new ApiError(400, "Files are required for multiple upload.");
  }

  res.status(200).json({
    success: true,
    count: results.length,
    data: results.map((item, idx) => ({
      url: item.url,
      public_id: item.public_id || "",
      format: item.format || "",
      bytes: item.bytes || 0,
      filename: `file_${idx + 1}`
    }))
  });
});

// @desc    Delete file from Cloudinary by public_id or URL
// @route   DELETE /api/upload
// @access  Private (Admin)
export const deleteFile = asyncHandler(async (req, res) => {
  const { public_id, url, resourceType = "image" } = req.body;
  const target = public_id || url || req.query.public_id || req.query.url;

  if (!target) {
    throw new ApiError(400, "public_id or url is required to delete file.");
  }

  await deleteFromCloudinary(target, resourceType);

  res.status(200).json({
    success: true,
    message: "File deleted successfully from Cloudinary.",
    target
  });
});
