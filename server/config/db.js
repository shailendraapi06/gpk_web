import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : "";

  if (!uri || (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://"))) {
    console.warn("⚠️ MONGODB_URI is invalid or missing scheme (expected mongodb:// or mongodb+srv://). Skipping initial connection.");
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000
    });
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host} / ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Atlas Connection Error: ${error.message}`);
  }
};

export default connectDB;
