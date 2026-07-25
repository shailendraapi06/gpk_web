import mongoose from "mongoose";
import User from "../models/User.js";

export const ensureSingleAdmin = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return;
    }

    const adminEmail = "admin@gpk.ac.in";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      await User.create({
        name: "GPK Administrator",
        email: adminEmail,
        password: "admin123", // Will be automatically hashed by User model pre-save hook
        role: "admin",
        avatar: ""
      });
      console.log("👤 Default Single Admin Account Created (admin@gpk.ac.in / admin123)");
    } else {
      console.log("👤 Single Admin Account Verified (admin@gpk.ac.in)");
    }
  } catch (error) {
    console.error("⚠️ Failed to ensure single admin account:", error.message);
  }
};
