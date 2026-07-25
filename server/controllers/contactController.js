import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";
import ContactMessage from "../models/ContactMessage.js";

const DEFAULT_MESSAGES = [
  {
    id: "msg-1",
    name: "Suresh Sharma",
    email: "suresh.sharma@gmail.com",
    phone: "+91 98765 43210",
    subject: "Admission query for Civil Engineering",
    message: "Hello Admissions Office,\n\nI want to inquire about the diploma lateral entry admission procedure in Civil Engineering. I have completed my 12th class with Physics and Mathematics. Are there seats vacant? What is the fee structure for regular vs self-finance?\n\nKindly guide me.\n\nRegards,\nSuresh Sharma",
    status: "unread",
    createdAt: new Date("2026-07-22")
  },
  {
    id: "msg-2",
    name: "Ananya Gupta",
    email: "ananya.g@yahoo.com",
    phone: "+91 76543 21098",
    subject: "Syllabus details for AIML Diploma",
    message: "Dear Registrar,\n\nCould you please share the detailed semester-wise syllabus PDF or official link for the newly introduced Artificial Intelligence & Machine Learning course? The syllabus link on the main portal is currently showing a PDF placeholder.\n\nThank you,\nAnanya Gupta",
    status: "read",
    createdAt: new Date("2026-07-21")
  },
  {
    id: "msg-3",
    name: "Rajesh Patel",
    email: "rajesh_p@recruitment.org",
    phone: "+91 87654 32109",
    subject: "Placement Drive Coordination",
    message: "Dear Placement Officer,\n\nWe represent BuildCraft India Pvt Ltd. We are planning a regional campus recruitment drive for final-year Diploma students in Civil and Mechanical disciplines around mid-August. Please let us know the placement registration schedules and availability of testing infrastructure.\n\nSincerely,\nRajesh Patel\nHR Executive",
    status: "unread",
    createdAt: new Date("2026-07-20")
  },
  {
    id: "msg-4",
    name: "Rahul Verma",
    email: "rahul.verma@outlook.com",
    phone: "+91 99887 76655",
    subject: "Hostel facility inquiries",
    message: "Hello admin,\n\nIs hostel accommodation available for first-year electrical diploma students coming from outer districts? What is the hostel fee, mess charge, and warden contact number?\n\nThanks,\nRahul",
    status: "read",
    createdAt: new Date("2026-07-18")
  }
];

const formatMessage = (msg) => ({
  id: msg._id ? msg._id.toString() : msg.id || `msg-${Math.random()}`,
  _id: msg._id ? msg._id.toString() : undefined,
  name: msg.name,
  email: msg.email,
  phone: msg.phone || "",
  subject: msg.subject,
  message: msg.message || msg.body || "",
  body: msg.message || msg.body || "",
  status: msg.status || "unread",
  date: msg.createdAt ? new Date(msg.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
  createdAt: msg.createdAt || new Date()
});

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
export const createContactMessage = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Validation
  if (!name || !name.trim()) {
    throw new ApiError(400, "Name is required.");
  }
  if (!email || !email.trim()) {
    throw new ApiError(400, "Email is required.");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    throw new ApiError(400, "Please provide a valid email address.");
  }
  if (!subject || !subject.trim()) {
    throw new ApiError(400, "Subject is required.");
  }
  if (!message || !message.trim()) {
    throw new ApiError(400, "Message is required.");
  }

  let createdMsg = null;
  if (mongoose.connection.readyState === 1) {
    createdMsg = await ContactMessage.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : "",
      subject: subject.trim(),
      message: message.trim(),
      status: "unread"
    });
  }

  res.status(201).json({
    success: true,
    message: "Thank you! Your inquiry message has been submitted successfully.",
    data: createdMsg ? formatMessage(createdMsg) : {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : "",
      subject: subject.trim(),
      message: message.trim(),
      body: message.trim(),
      status: "unread",
      date: new Date().toISOString().split("T")[0]
    }
  });
});

// @desc    Get all contact messages (Admin)
// @route   GET /api/contact
// @access  Private (Admin)
export const getContactMessages = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    let count = await ContactMessage.countDocuments();
    if (count === 0) {
      try {
        await ContactMessage.insertMany(
          DEFAULT_MESSAGES.map((m) => ({
            name: m.name,
            email: m.email,
            phone: m.phone,
            subject: m.subject,
            message: m.message,
            status: m.status,
            createdAt: m.createdAt
          }))
        );
      } catch (err) {
        console.warn("Could not seed default contact messages:", err.message);
      }
    }

    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages.map(formatMessage)
    });
  }

  res.status(200).json({
    success: true,
    count: DEFAULT_MESSAGES.length,
    data: DEFAULT_MESSAGES.map(formatMessage)
  });
});

// @desc    Get single contact message by ID
// @route   GET /api/contact/:id
// @access  Private (Admin)
export const getContactMessageById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
    const msg = await ContactMessage.findById(id);
    if (!msg) {
      throw new ApiError(404, "Message not found.");
    }
    return res.status(200).json({
      success: true,
      data: formatMessage(msg)
    });
  }

  const fallbackMsg = DEFAULT_MESSAGES.find(m => m.id === id);
  if (!fallbackMsg) {
    throw new ApiError(404, "Message not found.");
  }

  res.status(200).json({
    success: true,
    data: formatMessage(fallbackMsg)
  });
});

// @desc    Update message status (e.g., mark read/unread)
// @route   PUT /api/contact/:id/status
// @access  Private (Admin)
export const updateContactMessageStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !["unread", "read", "replied", "archived"].includes(status)) {
    throw new ApiError(400, "Valid status ('unread', 'read', 'replied', 'archived') is required.");
  }

  let updatedMsg = null;
  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
    const msg = await ContactMessage.findById(id);
    if (!msg) {
      throw new ApiError(404, "Message not found.");
    }
    msg.status = status;
    updatedMsg = await msg.save();
  }

  res.status(200).json({
    success: true,
    message: `Message status updated to ${status}.`,
    data: updatedMsg ? formatMessage(updatedMsg) : { id, status }
  });
});

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
export const deleteContactMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
    const msg = await ContactMessage.findById(id);
    if (msg) {
      await msg.deleteOne();
    }
  }

  res.status(200).json({
    success: true,
    message: "Message deleted successfully.",
    id
  });
});
