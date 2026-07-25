import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import asyncHandler from "./asyncHandler.js";
import { ApiError } from "./errorHandler.js";
import User from "../models/User.js";

export const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;

  // Check header Authorization: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers["x-auth-token"]) {
    token = req.headers["x-auth-token"];
  }

  if (!token) {
    throw new ApiError(401, "Not authorized, no token provided.");
  }

  try {
    const secret = process.env.JWT_SECRET || "gpk-website-super-secret-jwt-key-change-in-production-2026";
    const decoded = jwt.verify(token, secret);

    if (decoded.role !== "admin") {
      throw new ApiError(403, "Access denied. Admin privileges required.");
    }

    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(decoded.id).select("-password");
      if (user) {
        req.user = user;
        return next();
      }
    }

    // Fallback if DB user lookup is skipped or unavailable
    req.user = {
      _id: decoded.id || "admin-static-id",
      id: decoded.id || "admin-static-id",
      name: "GPK Administrator",
      email: "admin@gpk.ac.in",
      role: "admin"
    };

    next();
  } catch (error) {
    throw new ApiError(401, error.message || "Not authorized, token failed.");
  }
});
