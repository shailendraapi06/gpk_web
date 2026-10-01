export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
  }
}

export const notFoundHandler = (req, res, next) => {
  if (req.originalUrl.startsWith("/api")) {
    const error = new ApiError(404, `API Route Not Found - ${req.originalUrl}`);
    next(error);
  } else {
    next();
  }
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || res.statusCode || 500;
  if (statusCode === 200) statusCode = 500;

  let message = err.message || "Internal Server Error";

  // Mongoose validation or duplicate key errors
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid resource ID format: ${err.value}`;
  } else if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0];
    message = `Duplicate field value entered for ${field}. Please use another value.`;
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors).map((val) => val.message).join(", ");
  } else if (
    err.name === "MongooseError" ||
    err.name === "MongoNetworkError" ||
    err.name === "MongoServerSelectionError" ||
    (err.message && err.message.includes("buffering timed out"))
  ) {
    console.warn("[AI Studio] Database offline error caught:", err.message);
    if (req.method === "GET") {
      return res.status(200).json({
        success: true,
        data: req.path.endsWith("s") || req.path.endsWith("s/") ? [] : {},
        message: "Database offline, returning fallback response"
      });
    }
    return res.status(503).json({ success: false, message: "Service temporarily unavailable (database offline)" });
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
};
