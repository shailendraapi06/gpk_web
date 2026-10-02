import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer as createViteServer } from "vite";
import connectDB from "./server/config/db.js";
import { ensureSingleAdmin } from "./server/config/seedAdmin.js";
import apiRoutes from "./server/routes/api.js";
import { errorHandler, notFoundHandler } from "./server/middleware/errorHandler.js";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Initialize MongoDB Atlas connection & seed single admin
  await connectDB();
  await ensureSingleAdmin();

  // Core Middlewares
  const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.trim() : "";
  const corsOrigin = (!clientUrl || clientUrl === "*" || !clientUrl.startsWith("http")) ? true : clientUrl;

  app.use(cors({
    origin: corsOrigin,
    credentials: true
  }));
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  app.use(cookieParser());

  // Mount API Router FIRST
  app.use("/api", apiRoutes);

  // Vite Middleware for development vs Static file serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Handle 404 for unmatched API routes and error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 GPK Website Backend & Frontend running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
