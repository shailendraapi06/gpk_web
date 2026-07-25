import express from "express";
import {
  getNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice
} from "../controllers/noticeController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getNotices)
  .post(protectAdmin, createNotice);

router.route("/:id")
  .get(getNoticeById)
  .put(protectAdmin, updateNotice)
  .delete(protectAdmin, deleteNotice);

export default router;
