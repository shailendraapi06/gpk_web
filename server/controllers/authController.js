import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Default admin fallback credentials
const DEFAULT_ADMIN_EMAIL = "admin@gpk.ac.in";
let fallbackAdminPass = "admin123";
let fallbackResetStore = null; // { code, expire }

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
    if (password === fallbackAdminPass) {
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

// @desc    Forgot Password - Request 6-digit Reset Code
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Please enter your registered admin email address.");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
  const expireTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  let userFound = false;

  if (mongoose.connection.readyState === 1) {
    const user = await User.findOne({ email: normalizedEmail });
    if (user) {
      // Store hashed or plain code for verification within expiry
      const salt = await bcrypt.genSalt(10);
      user.resetPasswordToken = await bcrypt.hash(resetCode, salt);
      user.resetPasswordExpire = expireTime;
      await user.save();
      userFound = true;
    }
  }

  // Fallback support if DB offline or fallback admin
  if (!userFound && normalizedEmail === DEFAULT_ADMIN_EMAIL) {
    fallbackResetStore = {
      code: resetCode,
      expire: expireTime.getTime()
    };
    userFound = true;
  }

  if (!userFound) {
    throw new ApiError(404, `No admin account found matching email "${email}".`);
  }

  res.status(200).json({
    success: true,
    message: `Password reset verification code generated for ${normalizedEmail}. Valid for 15 minutes.`,
    email: normalizedEmail,
    resetCode: resetCode // Returned directly for immediate verification and zero-lockout
  });
});

// @desc    Reset Password using 6-digit verification code
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, resetCode, newPassword } = req.body;

  if (!email || !resetCode || !newPassword) {
    throw new ApiError(400, "Please provide email, verification code, and your new password.");
  }

  if (newPassword.length < 6) {
    throw new ApiError(400, "New password must be at least 6 characters long.");
  }

  const normalizedEmail = email.trim().toLowerCase();
  let resetSuccess = false;

  // Attempt database reset if MongoDB is connected
  if (mongoose.connection.readyState === 1) {
    const user = await User.findOne({
      email: normalizedEmail,
      resetPasswordExpire: { $gt: Date.now() }
    }).select("+password +resetPasswordToken +resetPasswordExpire");

    if (user && user.resetPasswordToken) {
      const isCodeValid = await bcrypt.compare(resetCode.trim(), user.resetPasswordToken);
      if (isCodeValid) {
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        resetSuccess = true;
      }
    }
  }

  // Fallback check
  if (!resetSuccess && normalizedEmail === DEFAULT_ADMIN_EMAIL && fallbackResetStore) {
    if (Date.now() <= fallbackResetStore.expire && fallbackResetStore.code === resetCode.trim()) {
      fallbackAdminPass = newPassword;
      fallbackResetStore = null;
      resetSuccess = true;
    }
  }

  if (!resetSuccess) {
    throw new ApiError(400, "Invalid or expired verification code. Please request a new code.");
  }

  res.status(200).json({
    success: true,
    message: "Password has been reset successfully! You can now log in with your new password."
  });
});

// @desc    Update Password for authenticated admin
// @route   PUT /api/auth/update-password
// @access  Private (Admin)
export const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Current password and new password are required.");
  }

  if (newPassword.length < 6) {
    throw new ApiError(400, "New password must be at least 6 characters long.");
  }

  let updated = false;

  if (mongoose.connection.readyState === 1 && req.user && req.user._id) {
    const user = await User.findById(req.user._id).select("+password");
    if (user) {
      const isMatched = await user.matchPassword(currentPassword);
      if (!isMatched) {
        throw new ApiError(400, "Current password does not match.");
      }
      user.password = newPassword;
      await user.save();
      updated = true;
    }
  }

  if (!updated && req.user?.email === DEFAULT_ADMIN_EMAIL) {
    if (currentPassword !== fallbackAdminPass) {
      throw new ApiError(400, "Current password does not match.");
    }
    fallbackAdminPass = newPassword;
    updated = true;
  }

  if (!updated) {
    throw new ApiError(400, "Could not update password. Please check your credentials.");
  }

  res.status(200).json({
    success: true,
    message: "Password updated successfully."
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
