import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Default admin fallback credentials
const DEFAULT_ADMIN_EMAIL = "admin@gpk.ac.in";
const DEFAULT_ADMIN_PASS = "admin123";

// @desc    Auth single admin & get token
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide email and password.");
  }

  const normalizedEmail = email.trim().toLowerCase();

  let user = null;
  let isPasswordMatched = false;

  // Attempt database authentication first if MongoDB is connected
  if (mongoose.connection.readyState === 1) {
    user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (user) {
      isPasswordMatched = await user.matchPassword(password);
    }
  }

  // Fallback check if user not found in DB or DB offline
  if (!user && normalizedEmail === DEFAULT_ADMIN_EMAIL) {
    if (password === DEFAULT_ADMIN_PASS) {
      isPasswordMatched = true;
      user = {
        _id: "650000000000000000000001",
        id: "650000000000000000000001",
        name: "GPK Administrator",
        email: DEFAULT_ADMIN_EMAIL,
        role: "admin"
      };
    }
  }

  if (!user || !isPasswordMatched) {
    throw new ApiError(401, "Invalid email or password.");
  }

  // Generate JWT token and set cookie
  const token = generateToken(res, user._id || user.id, user.role || "admin");

  res.status(200).json({
    success: true,
    message: "Admin login successful.",
    token,
    user: {
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role || "admin",
      avatar: user.avatar || ""
    }
  });
});

// @desc    Get current logged in admin profile
// @route   GET /api/auth/me
// @access  Private (Admin)
export const getAdminProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id || req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role || "admin",
      avatar: req.user.avatar || ""
    }
  });
});

// @desc    Logout admin & clear token cookie
// @route   POST /api/auth/logout
// @access  Private (Admin)
export const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({
    success: true,
    message: "Admin logged out successfully."
  });
});
