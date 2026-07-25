import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary if env vars exist
if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
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

  // If Cloudinary is configured and string is base64 / data URI
  const isCloudinaryConfigured =
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET;

  if (isCloudinaryConfigured && typeof fileStr === "string" && fileStr.startsWith("data:")) {
    try {
      const isPdf = fileStr.startsWith("data:application/pdf");
      const resourceType = isPdf ? "raw" : "auto";

      const result = await cloudinary.uploader.upload(fileStr, {
        folder,
        resource_type: resourceType
      });

      return {
        url: result.secure_url || result.url,
        public_id: result.public_id,
        format: result.format || (isPdf ? "pdf" : "png"),
        resource_type: result.resource_type,
        bytes: result.bytes
      };
    } catch (error) {
      console.error("Cloudinary upload failed:", error.message);
      return { url: fileStr, public_id: "" };
    }
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

