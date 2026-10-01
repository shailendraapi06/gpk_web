import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";
import Department from "../models/Department.js";
import Faculty from "../models/Faculty.js";
import { uploadToCloudinary, uploadFileToCloudinary } from "../utils/cloudinary.js";

// Fallback seed departments data
const DEFAULT_DEPARTMENTS = [
  {
    _id: "dept-1",
    id: "dept-1",
    name: "Computer Science & Engineering",
    code: "CSE",
    slug: "computer-science-engineering",
    shortDescription: "Build strong foundations in programming, software development, data structures, and modern computing practices.",
    description: "Computer Science & Engineering at Government Polytechnic Kanpur combines academic discipline, practical exposure, and industry-aligned training for diploma learners. The department focuses on software development, networks, and advanced programming.",
    establishedYear: 1984,
    intake: 60,
    duration: "3 Years",
    icon: "computer",
    syllabusUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    about: {
      heading: "About the Department",
      summary: "Computer Science & Engineering focuses on building strong conceptual understanding alongside practical skills required in software development and computing.",
      focusAreas: [
        "Practice-oriented teaching and laboratory sessions",
        "Curriculum aligned with diploma-level technical competencies",
        "Faculty mentoring, discipline, and academic support",
        "Preparation for higher studies, internships, and placement opportunities"
      ]
    },
    hod: {
      name: "Dr. Anil Kumar",
      designation: "Head of Department, Computer Science & Engineering",
      email: "anil.kumar@gpk.ac.in",
      phone: "+91 98765 43210",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      message: "Our department is committed to nurturing technically competent, disciplined, and socially responsible students through a balanced approach of theory, practice, and continuous mentoring."
    },
    recruiters: [
      { id: "rec-1", name: "Tech Axis", logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150&auto=format&fit=crop", logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150&auto=format&fit=crop" },
      { id: "rec-2", name: "Prime Electro", logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150&auto=format&fit=crop", logoUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150&auto=format&fit=crop" }
    ],
    gallery: [
      { id: "gal-1", title: "CS Main Programming Lab", category: "Laboratories", image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=300&auto=format&fit=crop", src: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=300&auto=format&fit=crop" }
    ]
  },
  {
    _id: "dept-2",
    id: "dept-2",
    name: "Information Technology",
    code: "IT",
    slug: "information-technology",
    shortDescription: "Develop digital systems knowledge with a focus on applications, networking, and information-driven solutions.",
    description: "Information Technology department delivers detailed education on networking systems, database management, and internet engineering applications.",
    establishedYear: 1998,
    intake: 60,
    duration: "3 Years",
    icon: "network",
    syllabusUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    about: {
      heading: "About the Department",
      summary: "Information Technology department delivers detailed education on networking systems, database management, and internet engineering applications.",
      focusAreas: [
        "Curriculum aligned with industry standards",
        "Advanced network laboratories",
        "Continuous internship preparation support"
      ]
    },
    hod: {
      name: "Prof. Ritu Singh",
      designation: "Head of Department, Information Technology",
      email: "ritu.singh@gpk.ac.in",
      phone: "+91 98765 43211",
      photoUrl: "https://images.unsplash.com/photo-1580894732444-8fecef2271ff?q=80&w=200&auto=format&fit=crop",
      message: "The IT engineering curriculum prepares students for robust web development, cloud computing, and database administration roles."
    },
    recruiters: [
      { id: "rec-3", name: "BuildCraft India", logo: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=150&auto=format&fit=crop", logoUrl: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=150&auto=format&fit=crop" }
    ],
    gallery: [
      { id: "gal-2", title: "IT Networking Systems Laboratory", category: "Laboratories", image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=300&auto=format&fit=crop", src: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=300&auto=format&fit=crop" }
    ]
  },
  {
    _id: "dept-3",
    id: "dept-3",
    name: "Artificial Intelligence & Machine Learning",
    code: "AIML",
    slug: "artificial-intelligence-machine-learning",
    shortDescription: "Learn intelligent systems, data modelling, and algorithmic thinking for future-ready technical careers.",
    description: "AIML department focuses on neural networks, data processing, python programming, and artificial intelligence fundamentals.",
    establishedYear: 2022,
    intake: 30,
    duration: "3 Years",
    icon: "ai",
    syllabusUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    about: {
      heading: "About the Department",
      summary: "AIML focuses on modern machine learning models, python automation, and computer vision techniques.",
      focusAreas: [
        "Python and ML frameworks",
        "Data science and analytics lab",
        "AI project building and mentoring"
      ]
    },
    hod: {
      name: "Dr. Vivek Sharma",
      designation: "Head of Department, AI & ML",
      email: "vivek.sharma@gpk.ac.in",
      phone: "+91 98765 43212",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      message: "AI & ML offers students hands-on immersion into intelligent algorithms and next-generation software tools."
    }
  },
  {
    _id: "dept-4",
    id: "dept-4",
    name: "Civil Engineering",
    code: "CIVIL",
    slug: "civil-engineering",
    shortDescription: "Study structures, surveying, construction methods, and infrastructure planning through practical exposure.",
    description: "Civil Engineering department is one of the oldest departments, equipped with soil mechanics, surveying, and structural testing labs.",
    establishedYear: 1958,
    intake: 120,
    duration: "3 Years",
    icon: "building",
    syllabusUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    about: {
      heading: "About the Department",
      summary: "Civil Engineering prepares technicians for structural design, site supervision, GIS surveying, and material testing.",
      focusAreas: [
        "Advanced surveying equipment",
        "Soil mechanics and concrete lab",
        "Cad and structural drafting"
      ]
    },
    hod: {
      name: "Prof. S. K. Verma",
      designation: "Head of Department, Civil Engineering",
      email: "sk.verma@gpk.ac.in",
      phone: "+91 98765 43213",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      message: "We train infrastructure builders with strong field exposure and practical engineering ethics."
    }
  },
  {
    _id: "dept-5",
    id: "dept-5",
    name: "Mechanical Engineering",
    code: "ME",
    slug: "mechanical-engineering",
    shortDescription: "Gain applied knowledge in design, manufacturing, thermal systems, and workshop-oriented learning.",
    description: "Mechanical Engineering offers extensive workshop machinery, CNC centers, thermal engineering, and CAD/CAM labs.",
    establishedYear: 1958,
    intake: 120,
    duration: "3 Years",
    icon: "cogs",
    syllabusUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    about: {
      heading: "About the Department",
      summary: "Mechanical Engineering focuses on industrial fabrication, thermodynamics, fluid machinery, and automotive mechanics.",
      focusAreas: [
        "Central workshop facilities",
        "AutoCAD and SolidWorks training",
        "Industrial plant visits"
      ]
    },
    hod: {
      name: "Prof. Rajesh Tiwari",
      designation: "Head of Department, Mechanical Engineering",
      email: "rajesh.tiwari@gpk.ac.in",
      phone: "+91 98765 43214",
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      message: "Empowering young mechanics with hands-on machinery practice and design innovation."
    }
  },
  {
    _id: "dept-6",
    id: "dept-6",
    name: "Electrical Engineering",
    code: "EE",
    slug: "electrical-engineering",
    shortDescription: "Understand electrical systems, power applications, machines, and industry-focused technical practices.",
    description: "Electrical Engineering trains students in power distribution, electrical machines, switchgear, and control automation.",
    establishedYear: 1960,
    intake: 60,
    duration: "3 Years",
    icon: "bolt",
    syllabusUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    about: {
      heading: "About the Department",
      summary: "Electrical Engineering combines circuit analysis, power electronics, motor control, and renewable energy.",
      focusAreas: [
        "Electrical machines testing lab",
        "Power electronics and PLC lab",
        "Safety and grid maintenance training"
      ]
    },
    hod: {
      name: "Dr. P. K. Mishra",
      designation: "Head of Department, Electrical Engineering",
      email: "pk.mishra@gpk.ac.in",
      phone: "+91 98765 43215",
      photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
      message: "Focused on high voltage safety, renewable systems, and modern industrial automation."
    }
  }
];

let inMemoryDepartments = JSON.parse(JSON.stringify(DEFAULT_DEPARTMENTS));

// Format DB department for response
const formatDepartment = (dept) => ({
  id: dept._id ? dept._id.toString() : dept.id,
  _id: dept._id ? dept._id.toString() : dept.id,
  name: dept.name,
  code: dept.code || dept.name.split(" ").map(w => w[0]).join("").toUpperCase(),
  slug: dept.slug,
  shortDescription: dept.shortDescription || dept.description || "",
  description: dept.description || dept.shortDescription || "",
  desc: dept.shortDescription || dept.description || "",
  establishedYear: dept.establishedYear || 1960,
  intake: dept.intake || 60,
  duration: dept.duration || "3 Years",
  icon: dept.icon || "computer",
  syllabusUrl: dept.syllabusUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  about: dept.about || {
    heading: "About the Department",
    summary: dept.description || "",
    focusAreas: []
  },
  hod: {
    name: dept.hod?.name || "",
    designation: dept.hod?.designation || `Head of Department, ${dept.name}`,
    email: dept.hod?.email || "",
    phone: dept.hod?.phone || "",
    photo: dept.hod?.photoUrl || "",
    photoUrl: dept.hod?.photoUrl || "",
    message: dept.hod?.message || ""
  },
  hodName: dept.hod?.name || "",
  recruiters: dept.recruiters || [],
  gallery: dept.gallery || [],
  curriculum: dept.curriculum || {
    heading: "Curriculum & Syllabus",
    description: "Semester-wise curriculum and syllabus files.",
    semesters: []
  }
});

// @desc    Get all departments
// @route   GET /api/departments
// @access  Public
export const getDepartments = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    let dbDepts = await Department.find({ isActive: true }).sort({ name: 1 });

    if (!dbDepts || dbDepts.length === 0) {
      // Seed default departments into DB
      try {
        await Department.insertMany(
          DEFAULT_DEPARTMENTS.map(d => ({
            name: d.name,
            code: d.code,
            slug: d.slug,
            shortDescription: d.shortDescription,
            description: d.description,
            establishedYear: d.establishedYear,
            intake: d.intake,
            duration: d.duration,
            icon: d.icon,
            syllabusUrl: d.syllabusUrl,
            about: d.about,
            hod: {
              name: d.hod.name,
              designation: d.hod.designation,
              email: d.hod.email,
              phone: d.hod.phone,
              photoUrl: d.hod.photoUrl,
              message: d.hod.message
            },
            recruiters: d.recruiters,
            gallery: d.gallery
          }))
        );
        dbDepts = await Department.find({ isActive: true }).sort({ name: 1 });
      } catch (err) {
        console.warn("Could not seed default departments:", err.message);
      }
    }

    if (dbDepts && dbDepts.length > 0) {
      const formatted = dbDepts.map(formatDepartment);
      return res.status(200).json({
        success: true,
        count: formatted.length,
        departments: formatted
      });
    }
  }

  // Fallback
  res.status(200).json({
    success: true,
    count: inMemoryDepartments.length,
    departments: inMemoryDepartments.map(formatDepartment)
  });
});

// @desc    Get single department by slug or id
// @route   GET /api/departments/:slug
// @access  Public
export const getDepartmentBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  let deptDoc = null;

  if (mongoose.connection.readyState === 1) {
    if (mongoose.Types.ObjectId.isValid(slug)) {
      deptDoc = await Department.findById(slug);
    }
    if (!deptDoc) {
      deptDoc = await Department.findOne({ slug: slug.toLowerCase() });
    }
  }

  if (deptDoc) {
    // Fetch faculty members belonging to this department
    let facultyMembers = [];
    if (mongoose.connection.readyState === 1) {
      const faculties = await Faculty.find({
        $or: [
          { department: deptDoc._id },
          { departmentName: { $regex: new RegExp(deptDoc.name, "i") } }
        ]
      }).sort({ order: 1, name: 1 });

      facultyMembers = faculties.map(f => ({
        id: f._id.toString(),
        _id: f._id.toString(),
        name: f.name,
        designation: f.designation,
        qualification: f.qualification,
        experience: f.experience,
        email: f.email,
        phone: f.phone,
        photo: f.photo || f.photoUrl || "",
        photoUrl: f.photo || f.photoUrl || "",
        profileUrl: f.profileUrl || f.resumeUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      }));
    }

    const formatted = formatDepartment(deptDoc);
    formatted.faculty = facultyMembers;

    return res.status(200).json({
      success: true,
      department: formatted
    });
  }

  // Fallback lookup
  const fallback = inMemoryDepartments.find(d => d.slug === slug.toLowerCase() || d.id === slug || d._id === slug);
  if (fallback) {
    const formatted = formatDepartment(fallback);
    return res.status(200).json({
      success: true,
      department: formatted
    });
  }

  throw new ApiError(404, `Department '${slug}' not found.`);
});

// @desc    Create a new department
// @route   POST /api/departments
// @access  Private (Admin)
export const createDepartment = asyncHandler(async (req, res) => {
  const { name, code, slug, shortDescription, description, intake, duration, establishedYear, hod, about, syllabusUrl } = req.body;

  if (!name) {
    throw new ApiError(400, "Department name is required.");
  }

  let finalSyllabusUrl = syllabusUrl || "";
  if (finalSyllabusUrl && finalSyllabusUrl.startsWith("data:")) {
    const resFile = await uploadFileToCloudinary(finalSyllabusUrl, "gpk_departments_pdf");
    finalSyllabusUrl = resFile.url;
  }

  let finalHod = hod ? { ...hod } : { name: "", designation: `Head of Department, ${name}` };
  if (finalHod.photoUrl && finalHod.photoUrl.startsWith("data:")) {
    finalHod.photoUrl = await uploadToCloudinary(finalHod.photoUrl, "gpk_faculty");
  }

  const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const generatedCode = code || name.split(" ").map(w => w[0]).join("").toUpperCase();

  let createdDept = null;

  if (mongoose.connection.readyState === 1) {
    createdDept = await Department.create({
      name,
      code: generatedCode,
      slug: generatedSlug,
      shortDescription: shortDescription || description || "",
      description: description || shortDescription || "",
      intake: Number(intake) || 60,
      duration: duration || "3 Years",
      establishedYear: Number(establishedYear) || 1960,
      syllabusUrl: finalSyllabusUrl,
      hod: finalHod,
      about: about || { heading: "About the Department", summary: description || "" }
    });
  }

  const newId = createdDept ? createdDept._id.toString() : `dept-${Date.now()}`;
  const deptObj = {
    id: newId,
    _id: newId,
    name,
    code: generatedCode,
    slug: generatedSlug,
    shortDescription: shortDescription || description || "",
    description: description || shortDescription || "",
    desc: shortDescription || description || "",
    intake: Number(intake) || 60,
    duration: duration || "3 Years",
    establishedYear: Number(establishedYear) || 1960,
    syllabusUrl: finalSyllabusUrl,
    hod: finalHod,
    hodName: finalHod?.name || "",
    about: about || { heading: "About the Department", summary: description || "" }
  };

  inMemoryDepartments.push(deptObj);

  res.status(201).json({
    success: true,
    message: "Department created successfully.",
    department: deptObj
  });
});

// @desc    Update department details
// @route   PUT /api/departments/:slug
// @access  Private (Admin)
export const updateDepartment = asyncHandler(async (req, res) => {
  const id = req.params.slug || req.params.id || "";
  const { name, code, slug, shortDescription, description, intake, duration, establishedYear, hod, about, syllabusUrl, recruiters, gallery, curriculum } = req.body;

  let finalSyllabusUrl = syllabusUrl;
  if (finalSyllabusUrl && finalSyllabusUrl.startsWith("data:")) {
    const resFile = await uploadFileToCloudinary(finalSyllabusUrl, "gpk_departments_pdf");
    finalSyllabusUrl = resFile.url;
  }

  let finalHod = hod ? { ...hod } : undefined;
  if (finalHod && finalHod.photoUrl && finalHod.photoUrl.startsWith("data:")) {
    finalHod.photoUrl = await uploadToCloudinary(finalHod.photoUrl, "gpk_faculty");
  }

  let updatedDept = null;
  const lowerId = id ? id.toLowerCase() : "";

  inMemoryDepartments = inMemoryDepartments.map(d => {
    if (d.id === id || d._id === id || (d.slug && d.slug.toLowerCase() === lowerId)) {
      return {
        ...d,
        name: name || d.name,
        code: code || d.code,
        slug: slug || d.slug,
        shortDescription: shortDescription !== undefined ? shortDescription : d.shortDescription,
        description: description !== undefined ? description : d.description,
        intake: intake !== undefined ? Number(intake) : d.intake,
        duration: duration || d.duration,
        establishedYear: establishedYear !== undefined ? Number(establishedYear) : d.establishedYear,
        syllabusUrl: finalSyllabusUrl !== undefined ? finalSyllabusUrl : d.syllabusUrl,
        hod: finalHod ? { ...d.hod, ...finalHod } : d.hod,
        about: about ? { ...d.about, ...about } : d.about,
        recruiters: recruiters || d.recruiters,
        gallery: gallery || d.gallery,
        curriculum: curriculum || d.curriculum
      };
    }
    return d;
  });

  if (mongoose.connection.readyState === 1) {
    let dept = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      dept = await Department.findById(id);
    }
    if (!dept && lowerId) {
      dept = await Department.findOne({ slug: lowerId });
    }

    if (dept) {
      if (name) dept.name = name;
      if (code) dept.code = code;
      if (slug) dept.slug = slug;
      if (shortDescription !== undefined) dept.shortDescription = shortDescription;
      if (description !== undefined) dept.description = description;
      if (intake !== undefined) dept.intake = Number(intake);
      if (duration !== undefined) dept.duration = duration;
      if (establishedYear !== undefined) dept.establishedYear = Number(establishedYear);
      if (finalSyllabusUrl !== undefined) dept.syllabusUrl = finalSyllabusUrl;
      if (finalHod) dept.hod = { ...dept.hod, ...finalHod };
      if (about) dept.about = { ...dept.about, ...about };
      if (recruiters) dept.recruiters = recruiters;
      if (gallery) dept.gallery = gallery;
      if (curriculum) dept.curriculum = curriculum;

      updatedDept = await dept.save();
    }
  }

  res.status(200).json({
    success: true,
    message: "Department updated successfully.",
    department: updatedDept ? formatDepartment(updatedDept) : { id, ...req.body, syllabusUrl: finalSyllabusUrl, hod: finalHod }
  });
});

// @desc    Delete department
// @route   DELETE /api/departments/:slug
// @access  Private (Admin)
export const deleteDepartment = asyncHandler(async (req, res) => {
  const id = req.params.slug || req.params.id || "";
  const lowerId = id ? id.toLowerCase() : "";

  inMemoryDepartments = inMemoryDepartments.filter(d => d.id !== id && d._id !== id && (d.slug && d.slug.toLowerCase() !== lowerId));

  if (mongoose.connection.readyState === 1) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      await Department.findByIdAndDelete(id);
    } else if (lowerId) {
      await Department.findOneAndDelete({ slug: lowerId });
    }
  }

  res.status(200).json({
    success: true,
    message: "Department deleted successfully.",
    deletedId: id
  });
});
