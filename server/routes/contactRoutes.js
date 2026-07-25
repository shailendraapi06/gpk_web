import express from "express";
import {
  createContactMessage,
  getContactMessages,
  getContactMessageById,
  updateContactMessageStatus,
  deleteContactMessage
} from "../controllers/contactController.js";

const router = express.Router();

// Public route to submit message
router.post("/", createContactMessage);

// Admin routes
router.get("/", getContactMessages);
router.get("/:id", getContactMessageById);
router.put("/:id/status", updateContactMessageStatus);
router.delete("/:id", deleteContactMessage);

export default router;
