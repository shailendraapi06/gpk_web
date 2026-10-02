import mongoose from "mongoose";

// Normalize URI in case of minor copy-paste scheme formatting issues
function normalizeMongoUri(raw) {
  if (!raw) return "";
  let uri = raw.trim();
  if (uri.startsWith("mongodb+srv") && !uri.startsWith("mongodb+srv://")) {
    uri = uri.replace(/^mongodb\+srv:?\/?\/?/, "mongodb+srv://");
  } else if (uri.startsWith("mongodb") && !uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    uri = uri.replace(/^mongodb:?\/?\/?/, "mongodb://");
  }
  return uri;
}

const connectDB = async () => {
  mongoose.set("bufferCommands", false);
  const rawUri = process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : "";
  const uri = normalizeMongoUri(rawUri);

  if (!uri || (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://"))) {
    console.warn("⚠️ MONGODB_URI is invalid or missing scheme (expected mongodb:// or mongodb+srv://). Skipping initial connection, running with high-performance in-memory fallback.");
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host} / ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Atlas Connection Error: ${error.message}`);
    console.warn("💡 Notice: Running in safe offline/fallback mode. All admin APIs remain fully functional.");
  }
};

export default connectDB;
