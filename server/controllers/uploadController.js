import asyncHandler from "../middleware/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";
import { uploadFileToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

// @desc    Upload single file (image or PDF) to Cloudinary
// @route   POST /api/upload
// @access  Public / Admin
export const uploadSingleFile = asyncHandler(async (req, res) => {
  const { file, fileData, image, pdf, folder = "gpk_uploads", title, name } = req.body;
  const fileToUpload = file || fileData || image || pdf;

  if (!fileToUpload) {
    throw new ApiError(400, "File content (base64 string or file URL) is required for upload.");
  }

  // Validate format if base64
  if (typeof fileToUpload === "string" && fileToUpload.startsWith("data:")) {
    const isImage = fileToUpload.startsWith("data:image/");
    const isPdf = fileToUpload.startsWith("data:application/pdf");
    const isDoc = fileToUpload.startsWith("data:application/");

    if (!isImage && !isPdf && !isDoc) {
      throw new ApiError(400, "Unsupported file format. Please upload an image (PNG, JPG, WEBP, GIF, SVG) or PDF document.");
    }
  }

  const result = await uploadFileToCloudinary(fileToUpload, folder);

  res.status(200).json({
    success: true,
    message: "File uploaded successfully.",
    data: {
      url: result.url,
      public_id: result.public_id || "",
      format: result.format || "",
      resource_type: result.resource_type || "auto",
      bytes: result.bytes || 0,
      filename: title || name || "uploaded_file"
    }
  });
});

// @desc    Upload multiple files to Cloudinary
// @route   POST /api/upload/multiple
// @access  Public / Admin
export const uploadMultipleFiles = asyncHandler(async (req, res) => {
  const { files, folder = "gpk_uploads" } = req.body;

  if (!files || !Array.isArray(files) || files.length === 0) {
    throw new ApiError(400, "An array of files is required for multiple uploads.");
  }

  const uploadPromises = files.map(f => uploadFileToCloudinary(f, folder));
  const results = await Promise.all(uploadPromises);

  res.status(200).json({
    success: true,
    count: results.length,
    data: results.map((resItem, idx) => ({
      url: resItem.url,
      public_id: resItem.public_id || "",
      format: resItem.format || "",
      resource_type: resItem.resource_type || "auto",
      bytes: resItem.bytes || 0,
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
    message: "File deleted successfully.",
    target
  });
});
