import express from "express";
import {
  getDepartments,
  getDepartmentBySlug,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from "../controllers/departmentController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getDepartments)
  .post(protectAdmin, createDepartment);

router.route("/:slug")
  .get(getDepartmentBySlug)
  .put(protectAdmin, updateDepartment)
  .delete(protectAdmin, deleteDepartment);

export default router;
