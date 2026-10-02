import multer from "multer";
import { ApiError } from "./errorHandler.js";

// Memory storage keeps file buffers in memory for direct streaming to Cloudinary
const storage = multer.memoryStorage();

// Allowed MIME types
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml"
];

const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  ...ALLOWED_IMAGE_TYPES
];

// File filter function
const createFileFilter = (allowedTypes) => (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        400,
        `Invalid file type: ${file.mimetype}. Allowed formats: JPG, PNG, WEBP, GIF, SVG, PDF.`
      ),
      false
    );
  }
};

// 5MB limit for images
export const uploadImage = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  },
  fileFilter: createFileFilter(ALLOWED_IMAGE_TYPES)
});

// 10MB limit for documents / general files
export const uploadDocument = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB
  },
  fileFilter: createFileFilter(ALLOWED_DOCUMENT_TYPES)
});

// Generic middleware wrapper that catches Multer errors and passes to errorHandler
export const handleUpload = (multerMiddleware) => (req, res, next) => {
  multerMiddleware(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return next(new ApiError(400, "File is too large. Maximum allowed size is 5MB for images and 10MB for documents."));
        }
        return next(new ApiError(400, `Upload error: ${err.message}`));
      }
      return next(err);
    }
    next();
  });
};
