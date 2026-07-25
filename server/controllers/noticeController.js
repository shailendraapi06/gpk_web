import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";
import Notice from "../models/Notice.js";
import { uploadFileToCloudinary } from "../utils/cloudinary.js";

// Initial seed / fallback notices
const DEFAULT_NOTICES = [
  {
    _id: "notice-1",
    id: "notice-1",
    title: "Admission Counseling Schedule Released",
    description: "Updated counseling rounds and reporting instructions for incoming diploma students.",
    publishDate: "12 Jul 2026",
    date: "12 Jul 2026",
    isNewNotice: true,
    isNew: true,
    category: "Admissions",
    link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    actionLabel: "View PDF",
    actionHref: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    _id: "notice-2",
    id: "notice-2",
    title: "Semester Registration Notice",
    description: "Registration dates, document checklist, and fee submission instructions for all departments.",
    publishDate: "10 Jul 2026",
    date: "10 Jul 2026",
    isNewNotice: true,
    isNew: true,
    category: "Academic",
    link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    actionLabel: "View PDF",
    actionHref: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    _id: "notice-3",
    id: "notice-3",
    title: "Academic Calendar Published",
    description: "Session timeline covering commencement dates, holidays, examinations, and internal assessments.",
    publishDate: "06 Jul 2026",
    date: "06 Jul 2026",
    isNewNotice: false,
    isNew: false,
    category: "Academic",
    link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    actionLabel: "View PDF",
    actionHref: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  }
];

// @desc    Get all notices
// @route   GET /api/notices
// @access  Public
export const getNotices = asyncHandler(async (req, res) => {
  const { category, search, limit } = req.query;

  if (mongoose.connection.readyState === 1) {
    let query = {};

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    let noticesQuery = Notice.find(query).sort({ createdAt: -1 });

    if (limit) {
      noticesQuery = noticesQuery.limit(Number(limit));
    }

    const dbNotices = await noticesQuery;

    if (dbNotices && dbNotices.length > 0) {
      const formatted = dbNotices.map((n) => ({
        id: n._id.toString(),
        _id: n._id.toString(),
        title: n.title,
        description: n.description || "",
        publishDate: n.date || "Today",
        date: n.date || "Today",
        isNew: n.isNewNotice,
        isNewNotice: n.isNewNotice,
        category: n.category,
        link: n.link || n.pdfUrl || "#",
        actionLabel: "View PDF",
        actionHref: n.pdfUrl || n.link || "#",
        pdfUrl: n.pdfUrl || ""
      }));

      return res.status(200).json({
        success: true,
        count: formatted.length,
        notices: formatted
      });
    }
  }

  // Fallback response if DB offline or empty
  let notices = [...DEFAULT_NOTICES];
  if (search) {
    notices = notices.filter(
      (n) =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.status(200).json({
    success: true,
    count: notices.length,
    notices
  });
});

// @desc    Get single notice by ID
// @route   GET /api/notices/:id
// @access  Public
export const getNoticeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
    const notice = await Notice.findById(id);
    if (notice) {
      return res.status(200).json({
        success: true,
        notice: {
          id: notice._id.toString(),
          _id: notice._id.toString(),
          title: notice.title,
          description: notice.description || "",
          publishDate: notice.date,
          date: notice.date,
          isNew: notice.isNewNotice,
          category: notice.category,
          pdfUrl: notice.pdfUrl,
          link: notice.link
        }
      });
    }
  }

  const fallback = DEFAULT_NOTICES.find((n) => n.id === id || n._id === id);
  if (!fallback) {
    throw new ApiError(404, "Notice not found.");
  }

  res.status(200).json({
    success: true,
    notice: fallback
  });
});

// @desc    Create new notice
// @route   POST /api/notices
// @access  Private (Admin)
export const createNotice = asyncHandler(async (req, res) => {
  const { title, description, category, date, publishDate, isNew, isNewNotice, pdfUrl, actionHref, link } = req.body;

  if (!title) {
    throw new ApiError(400, "Notice title is required.");
  }

  let finalPdfUrl = pdfUrl || actionHref || "";
  if (finalPdfUrl && finalPdfUrl.startsWith("data:")) {
    const uploadRes = await uploadFileToCloudinary(finalPdfUrl, "gpk_notices");
    finalPdfUrl = uploadRes.url;
  }

  const noticeData = {
    title,
    category: category || "General",
    date: date || publishDate || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    isNewNotice: isNewNotice !== undefined ? isNewNotice : isNew !== undefined ? isNew : true,
    link: link || finalPdfUrl || "#",
    pdfUrl: finalPdfUrl
  };

  let newNotice = null;

  if (mongoose.connection.readyState === 1) {
    newNotice = await Notice.create(noticeData);
  }

  const createdId = newNotice ? newNotice._id.toString() : `notice-${Date.now()}`;

  res.status(201).json({
    success: true,
    message: "Notice published successfully.",
    notice: {
      id: createdId,
      _id: createdId,
      title,
      description: description || "",
      publishDate: noticeData.date,
      date: noticeData.date,
      isNew: noticeData.isNewNotice,
      isNewNotice: noticeData.isNewNotice,
      category: noticeData.category,
      link: noticeData.link,
      actionLabel: "View PDF",
      actionHref: noticeData.pdfUrl || noticeData.link,
      pdfUrl: noticeData.pdfUrl
    }
  });
});

// @desc    Update notice
// @route   PUT /api/notices/:id
// @access  Private (Admin)
export const updateNotice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, category, date, publishDate, isNew, isNewNotice, pdfUrl, actionHref, link } = req.body;

  let finalPdfUrl = pdfUrl || actionHref || "";
  if (finalPdfUrl && finalPdfUrl.startsWith("data:")) {
    const uploadRes = await uploadFileToCloudinary(finalPdfUrl, "gpk_notices");
    finalPdfUrl = uploadRes.url;
  }

  let updatedNotice = null;

  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
    const notice = await Notice.findById(id);
    if (notice) {
      if (title) notice.title = title;
      if (category) notice.category = category;
      if (date || publishDate) notice.date = date || publishDate;
      if (isNewNotice !== undefined || isNew !== undefined) {
        notice.isNewNotice = isNewNotice !== undefined ? isNewNotice : isNew;
      }
      if (link || actionHref) notice.link = link || actionHref;
      if (finalPdfUrl) notice.pdfUrl = finalPdfUrl;

      updatedNotice = await notice.save();
    }
  }

  res.status(200).json({
    success: true,
    message: "Notice updated successfully.",
    notice: {
      id: updatedNotice ? updatedNotice._id.toString() : id,
      title: title || "Updated Notice",
      description: description || "",
      publishDate: date || publishDate || "Today",
      date: date || publishDate || "Today",
      isNew: isNewNotice !== undefined ? isNewNotice : isNew,
      category: category || "General",
      actionLabel: "View PDF",
      actionHref: finalPdfUrl || link || "#"
    }
  });
});

// @desc    Delete notice
// @route   DELETE /api/notices/:id
// @access  Private (Admin)
export const deleteNotice = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
    await Notice.findByIdAndDelete(id);
  }

  res.status(200).json({
    success: true,
    message: "Notice deleted successfully.",
    deletedId: id
  });
});
