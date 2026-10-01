import { v2 as cloudinary } from "cloudinary";

// Helper to verify if credentials are truly valid and not placeholders
export const isCloudinaryConfigured = () => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) return false;
  if (
    cloudName === "your_cloud_name" ||
    apiKey === "your_api_key" ||
    apiSecret === "your_api_secret" ||
    apiKey.includes("your_")
  ) {
    return false;
  }
  return true;
};

// Configure Cloudinary if valid env vars exist
if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

/**
 * Upload an image or PDF (base64 or URL) to Cloudinary
 * @param {string} fileStr - base64 data URI string or URL
 * @param {string} folder - folder name in Cloudinary (e.g., "gpk_gallery", "gpk_documents")
 * @returns {Promise<{url: string, public_id: string, format?: string, resource_type?: string, bytes?: number}>}
 */
export const uploadFileToCloudinary = async (fileStr, folder = "gpk_uploads") => {
  if (!fileStr) {
    return { url: "", public_id: "" };
  }

  // If already a standard http/https URL and not base64, return as object
  if (typeof fileStr === "string" && (fileStr.startsWith("http://") || fileStr.startsWith("https://"))) {
    return { url: fileStr, public_id: "" };
  }

  // If Cloudinary is properly configured and string is base64 / data URI
  if (isCloudinaryConfigured() && typeof fileStr === "string" && fileStr.startsWith("data:")) {
    try {
      const isPdf = fileStr.startsWith("data:application/pdf");
      const resourceType = isPdf ? "raw" : "auto";

      const result = await cloudinary.uploader.upload(fileStr, {
        folder,
        resource_type: resourceType
      });

      console.log(`[Cloudinary] Successfully uploaded asset to ${folder}: ${result.secure_url || result.url}`);

      return {
        url: result.secure_url || result.url,
        public_id: result.public_id,
        format: result.format || (isPdf ? "pdf" : "png"),
        resource_type: result.resource_type,
        bytes: result.bytes
      };
    } catch (error) {
      console.error("[Cloudinary] Upload failed:", error.message);
      return { url: fileStr, public_id: "" };
    }
  }

  if (typeof fileStr === "string" && fileStr.startsWith("data:") && !isCloudinaryConfigured()) {
    console.warn("[Cloudinary] Media not uploaded to Cloudinary: Valid Cloudinary credentials not detected in .env. Storing data URI as fallback.");
  }

  return { url: fileStr, public_id: "" };
};

/**
 * Upload image (string backwards compatibility)
 */
export const uploadToCloudinary = async (fileStr, folder = "gpk_uploads") => {
  const result = await uploadFileToCloudinary(fileStr, folder);
  return result.url;
};

/**
 * Delete file from Cloudinary by public_id or URL
 * @param {string} publicIdOrUrl
 * @param {string} resourceType - "image", "raw", "video", or "auto"
 */
export const deleteFromCloudinary = async (publicIdOrUrl, resourceType = "image") => {
  if (!publicIdOrUrl || !process.env.CLOUDINARY_CLOUD_NAME) return;

  try {
    let publicId = publicIdOrUrl;
    if (publicIdOrUrl.startsWith("http://") || publicIdOrUrl.startsWith("https://")) {
      const parts = publicIdOrUrl.split("/");
      const filename = parts[parts.length - 1];
      publicId = filename.split(".")[0];
      // Include folder prefix if present in Cloudinary URL
      const folderIndex = parts.findIndex(p => p.startsWith("gpk_"));
      if (folderIndex !== -1) {
        publicId = parts.slice(folderIndex).join("/").split(".")[0];
      }
    }

    if (publicId) {
      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    }
  } catch (error) {
    console.error("Cloudinary delete failed:", error.message);
  }
};

export default cloudinary;

