import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";
import Faculty from "../models/Faculty.js";
import Department from "../models/Department.js";
import { uploadToCloudinary, uploadFileToCloudinary } from "../utils/cloudinary.js";

const DEFAULT_FACULTIES = [
  {
    _id: "fac-1",
    id: "fac-1",
    name: "Dr. Anil Kumar",
    designation: "Head of Department",
    departmentName: "Computer Science & Engineering",
    qualification: "M.Tech., Ph.D.",
    experience: "14 Years",
    email: "anil.kumar@gpk.ac.in",
    phone: "+91 98765 43210",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    profileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    _id: "fac-2",
    id: "fac-2",
    name: "Prof. Ritu Singh",
    designation: "Lecturer",
    departmentName: "Information Technology",
    qualification: "M.Tech., B.Tech.",
    experience: "11 Years",
    email: "ritu.singh@gpk.ac.in",
    phone: "+91 98765 43211",
    photo: "https://images.unsplash.com/photo-1580894732444-8fecef2271ff?q=80&w=200&auto=format&fit=crop",
    photoUrl: "https://images.unsplash.com/photo-1580894732444-8fecef2271ff?q=80&w=200&auto=format&fit=crop",
    profileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    _id: "fac-3",
    id: "fac-3",
    name: "Dr. Vivek Sharma",
    designation: "Lecturer",
    departmentName: "Artificial Intelligence & Machine Learning",
    qualification: "M.Tech., Ph.D.",
    experience: "9 Years",
    email: "vivek.sharma@gpk.ac.in",
    phone: "+91 98765 43212",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    profileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    _id: "fac-4",
    id: "fac-4",
    name: "Prof. S. K. Verma",
    designation: "Head of Department",
    departmentName: "Civil Engineering",
    qualification: "M.E., B.E.",
    experience: "16 Years",
    email: "sk.verma@gpk.ac.in",
    phone: "+91 98765 43213",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    profileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    _id: "fac-5",
    id: "fac-5",
    name: "Prof. Rajesh Tiwari",
    designation: "Lecturer",
    departmentName: "Mechanical Engineering",
    qualification: "M.Tech., B.Tech.",
    experience: "13 Years",
    email: "rajesh.tiwari@gpk.ac.in",
    phone: "+91 98765 43214",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    profileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  }
];

let inMemoryFaculties = JSON.parse(JSON.stringify(DEFAULT_FACULTIES));

const formatFaculty = (f) => ({
  id: f._id ? f._id.toString() : f.id,
  _id: f._id ? f._id.toString() : f.id,
  name: f.name,
  designation: f.designation,
  department: f.departmentName || f.department?.name || "Computer Science & Engineering",
  departmentName: f.departmentName || f.department?.name || "Computer Science & Engineering",
  qualification: f.qualification || "",
  experience: f.experience || "0 Years",
  email: f.email || "",
  phone: f.phone || "",
  photo: f.photo || f.photoUrl || "",
  photoUrl: f.photo || f.photoUrl || "",
  profileUrl: f.profileUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
});

// @desc    Get all faculty members
// @route   GET /api/faculties
// @access  Public
export const getFaculties = asyncHandler(async (req, res) => {
  const { department, search } = req.query;

  if (mongoose.connection.readyState === 1) {
    let query = { isActive: true };

    if (department && department !== "All") {
      query.departmentName = { $regex: department, $options: "i" };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { designation: { $regex: search, $options: "i" } },
        { departmentName: { $regex: search, $options: "i" } }
      ];
    }

    let dbFaculties = await Faculty.find(query).sort({ order: 1, createdAt: -1 });

    if (!dbFaculties || dbFaculties.length === 0) {
      // Try seeding initial default faculties if empty
      try {
        await Faculty.insertMany(
          DEFAULT_FACULTIES.map(f => ({
            name: f.name,
            designation: f.designation,
            departmentName: f.departmentName,
            qualification: f.qualification,
            experience: f.experience,
            email: f.email,
            phone: f.phone,
            photo: f.photo,
            profileUrl: f.profileUrl
          }))
        );
        dbFaculties = await Faculty.find(query).sort({ order: 1, createdAt: -1 });
      } catch (e) {
        console.warn("Could not seed initial faculty members:", e.message);
      }
    }

    if (dbFaculties && dbFaculties.length > 0) {
      const formatted = dbFaculties.map(formatFaculty);
      return res.status(200).json({
        success: true,
        count: formatted.length,
        faculties: formatted
      });
    }
  }

  // Fallback response
  let facultiesList = inMemoryFaculties.map(formatFaculty);

  if (department && department !== "All") {
    facultiesList = facultiesList.filter(f => f.departmentName.toLowerCase().includes(department.toLowerCase()));
  }

  if (search) {
    facultiesList = facultiesList.filter(
      f =>
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.designation.toLowerCase().includes(search.toLowerCase()) ||
        f.departmentName.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.status(200).json({
    success: true,
    count: facultiesList.length,
    faculties: facultiesList
  });
});

// @desc    Get single faculty by ID
// @route   GET /api/faculties/:id
// @access  Public
export const getFacultyById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
    const f = await Faculty.findById(id);
    if (f) {
      return res.status(200).json({
        success: true,
        faculty: formatFaculty(f)
      });
    }
  }

  const fallback = inMemoryFaculties.find(f => f.id === id || f._id === id);
  if (fallback) {
    return res.status(200).json({
      success: true,
      faculty: formatFaculty(fallback)
    });
  }

  throw new ApiError(404, "Faculty member not found.");
});

// @desc    Create new faculty member
// @route   POST /api/faculties
// @access  Private (Admin)
export const createFaculty = asyncHandler(async (req, res) => {
  const { name, designation, department, departmentName, qualification, experience, email, phone, photo, photoUrl, profileUrl } = req.body;

  if (!name || !designation) {
    throw new ApiError(400, "Faculty name and designation are required.");
  }

  const deptName = departmentName || department || "Computer Science & Engineering";
  let imgUrl = photo || photoUrl || "";
  let cvUrl = profileUrl || "";

  if (imgUrl && imgUrl.startsWith("data:")) {
    imgUrl = await uploadToCloudinary(imgUrl, "gpk_faculty");
  }

  if (cvUrl && cvUrl.startsWith("data:")) {
    const resFile = await uploadFileToCloudinary(cvUrl, "gpk_faculty_docs");
    cvUrl = resFile.url;
  }

  let createdId = `fac-${Date.now()}`;

  if (mongoose.connection.readyState === 1) {
    // Optionally link Department ID
    let deptDoc = await Department.findOne({ name: { $regex: new RegExp(deptName, "i") } });

    const newFaculty = await Faculty.create({
      name,
      designation,
      department: deptDoc ? deptDoc._id : undefined,
      departmentName: deptName,
      qualification: qualification || "B.Tech.",
      experience: experience || "0 Years",
      email: email || `${name.toLowerCase().replace(/[^a-z0-9]/g, ".")}@gpk.ac.in`,
      phone: phone || "",
      photo: imgUrl,
      profileUrl: cvUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    });

    createdId = newFaculty._id.toString();
  }

  const facObj = {
    id: createdId,
    _id: createdId,
    name,
    designation,
    department: deptName,
    departmentName: deptName,
    qualification: qualification || "B.Tech.",
    experience: experience || "0 Years",
    email: email || `${name.toLowerCase().replace(/[^a-z0-9]/g, ".")}@gpk.ac.in`,
    phone: phone || "",
    photo: imgUrl,
    photoUrl: imgUrl,
    profileUrl: cvUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  };

  inMemoryFaculties.unshift(facObj);

  res.status(201).json({
    success: true,
    message: "Faculty member added successfully.",
    faculty: facObj
  });
});

// @desc    Update faculty member
// @route   PUT /api/faculties/:id
// @access  Private (Admin)
export const updateFaculty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, designation, department, departmentName, qualification, experience, email, phone, photo, photoUrl, profileUrl } = req.body;

  const deptName = departmentName || department;
  let imgUrl = photo || photoUrl;
  let cvUrl = profileUrl;

  if (imgUrl && imgUrl.startsWith("data:")) {
    imgUrl = await uploadToCloudinary(imgUrl, "gpk_faculty");
  }

  if (cvUrl && cvUrl.startsWith("data:")) {
    const resFile = await uploadFileToCloudinary(cvUrl, "gpk_faculty_docs");
    cvUrl = resFile.url;
  }

  let updatedFac = null;

  inMemoryFaculties = inMemoryFaculties.map(f => {
    if (f.id === id || f._id === id) {
      return {
        ...f,
        name: name || f.name,
        designation: designation || f.designation,
        department: deptName || f.department || f.departmentName,
        departmentName: deptName || f.departmentName,
        qualification: qualification !== undefined ? qualification : f.qualification,
        experience: experience !== undefined ? experience : f.experience,
        email: email || f.email,
        phone: phone !== undefined ? phone : f.phone,
        photo: imgUrl !== undefined ? imgUrl : f.photo,
        photoUrl: imgUrl !== undefined ? imgUrl : f.photoUrl,
        profileUrl: cvUrl !== undefined ? cvUrl : f.profileUrl
      };
    }
    return f;
  });

  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
    const f = await Faculty.findById(id);
    if (f) {
      if (name) f.name = name;
      if (designation) f.designation = designation;
      if (deptName) f.departmentName = deptName;
      if (qualification) f.qualification = qualification;
      if (experience !== undefined) f.experience = experience;
      if (email) f.email = email;
      if (phone !== undefined) f.phone = phone;
      if (imgUrl !== undefined) f.photo = imgUrl;
      if (cvUrl !== undefined) f.profileUrl = cvUrl;

      updatedFac = await f.save();
    }
  }

  res.status(200).json({
    success: true,
    message: "Faculty member updated successfully.",
    faculty: updatedFac ? formatFaculty(updatedFac) : { id, ...req.body, photo: imgUrl, profileUrl: cvUrl }
  });
});

// @desc    Delete faculty member
// @route   DELETE /api/faculties/:id
// @access  Private (Admin)
export const deleteFaculty = asyncHandler(async (req, res) => {
  const { id } = req.params;

  inMemoryFaculties = inMemoryFaculties.filter(f => f.id !== id && f._id !== id);

  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
    await Faculty.findByIdAndDelete(id);
  }

  res.status(200).json({
    success: true,
    message: "Faculty member deleted successfully.",
    deletedId: id
  });
});
