import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Get API & DB status
// @route   GET /api/health
// @access  Public
export const getHealthStatus = asyncHandler(async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting"
  };

  res.status(200).json({
    success: true,
    message: "GPK Website Backend Foundation Operational",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
    database: {
      status: states[dbState] || "Unknown",
      isConnected: dbState === 1
    },
    version: "1.0.0"
  });
});
