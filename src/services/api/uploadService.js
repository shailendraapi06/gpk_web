import { apiRequest } from "./client";

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
 * Upload an image or file using multipart/form-data to the backend API -> Cloudinary
 * @param {File} file - Selected browser File object
 * @param {string} folder - Target Cloudinary folder
 * @returns {Promise<{ url: string, public_id: string }>}
 */
export async function uploadImageToCloudinary(file, folder = CLOUDINARY_FOLDERS.GENERAL) {
  if (!file) {
    throw new Error("No file selected.");
  }

  // Client-side validation: max 5MB for images, 10MB for PDFs
  const isPdf = file.type === "application/pdf";
  const maxBytes = isPdf ? 10 * 1024 * 1024 : 5 * 1024 * 1024;

  if (file.size > maxBytes) {
    throw new Error(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed size is ${isPdf ? "10MB" : "5MB"}.`);
  }

  const formData = new FormData();
  formData.append("image", file);
  formData.append("folder", folder);

  const response = await apiRequest("/upload", {
    method: "POST",
    body: formData
  });

  if (response && response.success) {
    return {
      url: response.url || response.data?.url,
      public_id: response.public_id || response.data?.public_id || ""
    };
  }

  throw new Error(response.message || "Failed to upload file to Cloudinary.");
}

/**
 * Delete asset from Cloudinary via backend API
 * @param {string} publicIdOrUrl - Cloudinary public_id or full URL
 */
export async function deleteCloudinaryAsset(publicIdOrUrl) {
  if (!publicIdOrUrl) return;

  try {
    return await apiRequest("/upload", {
      method: "DELETE",
      body: { public_id: publicIdOrUrl, url: publicIdOrUrl }
    });
  } catch (error) {
    console.warn("Could not delete old asset from Cloudinary:", error);
  }
}
