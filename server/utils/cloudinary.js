import { v2 as cloudinary } from "cloudinary";

// Clean cloud name in case user copied with leading '@'
export const getCleanCloudName = () => {
  return (process.env.CLOUDINARY_CLOUD_NAME || "").replace(/^@+/, "").trim();
};

// Check if valid credentials exist
export const isCloudinaryConfigured = () => {
  const cloudName = getCleanCloudName();
  const apiKey = (process.env.CLOUDINARY_API_KEY || "").trim();
  const apiSecret = (process.env.CLOUDINARY_API_SECRET || "").trim();

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

// Initialize Cloudinary SDK
if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: getCleanCloudName(),
    api_key: (process.env.CLOUDINARY_API_KEY || "").trim(),
    api_secret: (process.env.CLOUDINARY_API_SECRET || "").trim(),
    secure: true
  });
}

// Canonical Cloudinary folders structure (production-ready)
export const CLOUDINARY_FOLDERS = {
  HEROES: "gpk/heroes",
  LEADERS: "gpk/leaders",
  RECRUITERS: "gpk/recruiters",
  DEPARTMENTS: "gpk/departments",
  FACULTY: "gpk/faculty",
  GALLERY: "gpk/gallery",
  SETTINGS: "gpk/settings",
  BRANDING: "gpk/branding",
  PLACEMENTS: "gpk/placements",
  DOCUMENTS: "gpk/documents",
  GENERAL: "gpk/uploads"
};

/**
 * Extract public_id from a Cloudinary URL
 * Example: https://res.cloudinary.com/demo/image/upload/v12345/gpk/gallery/xyz.jpg -> gpk/gallery/xyz
 */
export const extractPublicId = (urlOrPublicId) => {
  if (!urlOrPublicId || typeof urlOrPublicId !== "string") return "";

  // If it's already a public_id (no http/https)
  if (!urlOrPublicId.startsWith("http://") && !urlOrPublicId.startsWith("https://")) {
    return urlOrPublicId.trim();
  }

  try {
    const url = new URL(urlOrPublicId);
    const pathname = url.pathname; // /cloud_name/image/upload/v12345/gpk/gallery/xyz.jpg
    const uploadIndex = pathname.indexOf("/upload/");
    if (uploadIndex === -1) return "";

    let afterUpload = pathname.substring(uploadIndex + 8); // v12345/gpk/gallery/xyz.jpg or gpk/gallery/xyz.jpg
    // Remove version tag (v\d+/)
    afterUpload = afterUpload.replace(/^v\d+\//, "");
    // Remove file extension
    const dotIndex = afterUpload.lastIndexOf(".");
    return dotIndex !== -1 ? afterUpload.substring(0, dotIndex) : afterUpload;
  } catch (e) {
    return "";
  }
};

/**
 * Upload a Buffer to Cloudinary via upload_stream
 * Uses auto format (f_auto) and auto quality (q_auto) for optimal delivery
 */
export const uploadBufferToCloudinary = async (buffer, folder = CLOUDINARY_FOLDERS.GENERAL, options = {}) => {
  if (!buffer) {
    throw new Error("No buffer provided for upload.");
  }

  if (!isCloudinaryConfigured()) {
    console.warn("[Cloudinary] Cloudinary not configured. Generating fallback placeholder URL.");
    const fallbackId = `${folder.replace(/\//g, "_")}_${Date.now()}`;
    return {
      url: `https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80`,
      public_id: fallbackId,
      format: "jpg",
      bytes: buffer.length
    };
  }

  return new Promise((resolve, reject) => {
    const isPdf = options.mimetype === "application/pdf" || options.resource_type === "raw";
    const resourceType = isPdf ? "raw" : "auto";

    const uploadOptions = {
      folder,
      resource_type: resourceType,
      timeout: 30000,
      transformation: isPdf
        ? undefined
        : [
            { quality: "auto" },
            { fetch_format: "auto" }
          ],
      ...options
    };

    const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) {
        console.error("[Cloudinary] Upload stream error:", error.message);
        return reject(error);
      }
      resolve({
        url: result.secure_url || result.url,
        public_id: result.public_id,
        format: result.format || (isPdf ? "pdf" : "jpg"),
        resource_type: result.resource_type,
        bytes: result.bytes
      });
    });

    stream.on("error", (err) => {
      console.error("[Cloudinary] Stream pipeline error:", err);
      reject(err);
    });

    stream.end(buffer);
  });
};

/**
 * Upload a string (Base64 or external URL) to Cloudinary
 * Useful for data migration scripts and backward compatibility
 */
export const uploadFileToCloudinary = async (fileStr, folder = CLOUDINARY_FOLDERS.GENERAL) => {
  if (!fileStr) {
    return { url: "", public_id: "" };
  }

  // If already a Cloudinary secure URL, keep as is
  if (typeof fileStr === "string" && fileStr.includes("res.cloudinary.com")) {
    return {
      url: fileStr,
      public_id: extractPublicId(fileStr)
    };
  }

  // If standard HTTP URL and not base64
  if (typeof fileStr === "string" && !fileStr.startsWith("data:") && (fileStr.startsWith("http://") || fileStr.startsWith("https://"))) {
    return { url: fileStr, public_id: "" };
  }

  if (isCloudinaryConfigured()) {
    try {
      const isPdf = typeof fileStr === "string" && fileStr.startsWith("data:application/pdf");
      const resourceType = isPdf ? "raw" : "auto";

      const result = await cloudinary.uploader.upload(fileStr, {
        folder,
        resource_type: resourceType,
        transformation: isPdf ? undefined : [{ quality: "auto" }, { fetch_format: "auto" }]
      });

      console.log(`[Cloudinary] Uploaded to ${folder}: ${result.secure_url || result.url}`);
      return {
        url: result.secure_url || result.url,
        public_id: result.public_id,
        format: result.format || (isPdf ? "pdf" : "jpg"),
        resource_type: result.resource_type,
        bytes: result.bytes
      };
    } catch (error) {
      console.error("[Cloudinary] Upload failed:", error.message);
      return { url: fileStr, public_id: "" };
    }
  }

  return { url: fileStr, public_id: "" };
};

/**
 * Backward compatibility wrapper returning URL
 */
export const uploadToCloudinary = async (fileStr, folder = CLOUDINARY_FOLDERS.GENERAL) => {
  const result = await uploadFileToCloudinary(fileStr, folder);
  return result.url;
};

/**
 * Delete asset from Cloudinary using public_id or URL
 */
export const deleteFromCloudinary = async (publicIdOrUrl, resourceType = "image") => {
  if (!publicIdOrUrl || !isCloudinaryConfigured()) return;

  const publicId = extractPublicId(publicIdOrUrl);
  if (!publicId) return;

  try {
    const res = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    console.log(`[Cloudinary] Deleted asset ${publicId}:`, res.result);
    return res;
  } catch (error) {
    console.warn(`[Cloudinary] Could not delete ${publicId}:`, error.message);
  }
};

/**
 * Safe replacement: Uploads new image first, then cleans up the old one
 */
export const safeCloudinaryReplace = async (newUploadFn, oldPublicIdOrUrl, resourceType = "image") => {
  // 1. Upload new image first to ensure no data loss
  const newAsset = await newUploadFn();

  // 2. Only if new upload succeeds and old asset exists, delete old asset
  if (newAsset && newAsset.url && oldPublicIdOrUrl) {
    try {
      await deleteFromCloudinary(oldPublicIdOrUrl, resourceType);
    } catch (e) {
      console.warn("[Cloudinary] Failed to delete old asset after replace:", e.message);
    }
  }

  return newAsset;
};

export default cloudinary;
