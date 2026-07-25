import express from "express";
import {
  getFaculties,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty
} from "../controllers/facultyController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getFaculties)
  .post(protectAdmin, createFaculty);

router.route("/:id")
  .get(getFacultyById)
  .put(protectAdmin, updateFaculty)
  .delete(protectAdmin, deleteFaculty);

export default router;
