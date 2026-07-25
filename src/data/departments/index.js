import facultyPlaceholder from "../../assets/departments/faculty-placeholder.svg";
import hodPlaceholder from "../../assets/departments/hod-placeholder.svg";
import galleryImageOne from "../../assets/departments/department-gallery-1.svg";
import galleryImageTwo from "../../assets/departments/department-gallery-2.svg";
import galleryImageThree from "../../assets/departments/department-gallery-3.svg";
import galleryImageFour from "../../assets/departments/department-gallery-4.svg";
import recruiterLogoOne from "../../assets/departments/recruiter-logo-1.svg";
import recruiterLogoTwo from "../../assets/departments/recruiter-logo-2.svg";
import recruiterLogoThree from "../../assets/departments/recruiter-logo-3.svg";
import recruiterLogoFour from "../../assets/departments/recruiter-logo-4.svg";
import recruiterLogoFive from "../../assets/departments/recruiter-logo-5.svg";
import recruiterLogoSix from "../../assets/departments/recruiter-logo-6.svg";

export const departmentsPageContent = {
  title: "Departments",
  introduction:
    "Explore the academic departments of Government Polytechnic Kanpur, each focused on practical technical education, industry relevance, and student growth."
};

const facultyProfileUrl =
  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

const baseRecruiters = [
  { name: "Tech Axis", logo: recruiterLogoOne },
  { name: "BuildCraft India", logo: recruiterLogoTwo },
  { name: "Prime Electro", logo: recruiterLogoThree },
  { name: "AutoMotion Works", logo: recruiterLogoFour },
  { name: "ProcessNova", logo: recruiterLogoFive },
  { name: "Campus Connect Labs", logo: recruiterLogoSix }
];

const baseGallery = [
  {
    id: "gallery-1",
    title: "Academic Block",
    category: "Campus",
    image: galleryImageOne
  },
  {
    id: "gallery-2",
    title: "Laboratory Practice",
    category: "Laboratories",
    image: galleryImageTwo
  },
  {
    id: "gallery-3",
    title: "Student Workshop",
    category: "Workshops",
    image: galleryImageThree
  },
  {
    id: "gallery-4",
    title: "Seminar Session",
    category: "Events",
    image: galleryImageFour
  },
  {
    id: "gallery-5",
    title: "Project Display",
    category: "Exhibitions",
    image: galleryImageOne
  },
  {
    id: "gallery-6",
    title: "Industry Interaction",
    category: "Department Activities",
    image: galleryImageThree
  }
];

const createSemesterLinks = (departmentName, semesterLabel) => [
  {
    label: `${semesterLabel} Syllabus`,
    url: facultyProfileUrl
  },
  {
    label: `${departmentName} Lab Manual`,
    url: facultyProfileUrl
  }
];

const createFacultyMembers = (hodName) => [
  {
    id: "faculty-1",
    name: hodName,
    designation: "Head of Department",
    qualification: "M.Tech., Ph.D.",
    photo: hodPlaceholder,
    profileUrl: facultyProfileUrl
  },
  {
    id: "faculty-2",
    name: "Prof. Priya Srivastava",
    designation: "Lecturer",
    qualification: "M.Tech., NET",
    photo: facultyPlaceholder,
    profileUrl: facultyProfileUrl
  },
  {
    id: "faculty-3",
    name: "Prof. Amit Kumar",
    designation: "Lecturer",
    qualification: "M.E., B.Tech.",
    photo: facultyPlaceholder,
    profileUrl: facultyProfileUrl
  },
  {
    id: "faculty-4",
    name: "Prof. Neelam Verma",
    designation: "Workshop / Lab Incharge",
    qualification: "M.Tech., B.Tech.",
    photo: facultyPlaceholder,
    profileUrl: facultyProfileUrl
  }
];

const createPlacementTrack = (departmentName) => [
  {
    year: "01",
    title: "Foundation and Orientation",
    description: `${departmentName} students are introduced to communication skills, department practices, and career pathways from the first academic year.`
  },
  {
    year: "02",
    title: "Industry Exposure",
    description:
      "Industrial visits, technical talks, and supervised mini-projects help learners connect classroom knowledge with real workflows."
  },
  {
    year: "03",
    title: "Placement Preparation",
    description:
      "Resume building, mock interviews, aptitude support, and recruiter outreach are aligned with final-year student readiness."
  }
];

const createDepartmentDetail = (department) => ({
  ...department,
  introduction: `${department.name} at Government Polytechnic Kanpur combines academic discipline, practical exposure, and industry-aligned training for diploma learners.`,
  about: {
    heading: "About the Department",
    summary: [
      `${department.name} focuses on building strong conceptual understanding alongside practical skills required in technical education and applied industry environments.`,
      "The department structure is designed to support laboratory learning, project work, student mentoring, and progressive exposure to emerging tools and practices."
    ],
    focusAreas: [
      "Practice-oriented teaching and laboratory sessions",
      "Curriculum aligned with diploma-level technical competencies",
      "Faculty mentoring, discipline, and academic support",
      "Preparation for higher studies, internships, and placement opportunities"
    ]
  },
  hod: {
    name: department.hodName,
    designation: `Head of Department, ${department.name}`,
    photo: hodPlaceholder,
    message:
      "Our department is committed to nurturing technically competent, disciplined, and socially responsible students through a balanced approach of theory, practice, and continuous mentoring."
  },
  faculty: createFacultyMembers(department.hodName),
  curriculum: {
    heading: "Curriculum & Syllabus",
    description:
      "Semester-wise curriculum resources are structured so the department can easily connect official syllabus PDFs, lab manuals, and academic documents from future backend sources.",
    semesters: [
      {
        id: "semester-1",
        label: "Semester 1",
        overview:
          "Foundation subjects, workshop exposure, communication practice, and core technical basics.",
        links: createSemesterLinks(department.name, "Semester 1")
      },
      {
        id: "semester-2",
        label: "Semester 2",
        overview:
          "Applied theory, introductory labs, subject tutorials, and guided practice assignments.",
        links: createSemesterLinks(department.name, "Semester 2")
      },
      {
        id: "semester-3",
        label: "Semester 3",
        overview:
          "Core department modules, domain-specific lab work, and skill-based evaluation activities.",
        links: createSemesterLinks(department.name, "Semester 3")
      },
      {
        id: "semester-4",
        label: "Semester 4",
        overview:
          "Advanced technical topics, project planning, design exercises, and practical records.",
        links: createSemesterLinks(department.name, "Semester 4")
      },
      {
        id: "semester-5",
        label: "Semester 5",
        overview:
          "Industry-facing subjects, major practicals, seminars, and placement preparation support.",
        links: createSemesterLinks(department.name, "Semester 5")
      },
      {
        id: "semester-6",
        label: "Semester 6",
        overview:
          "Final project, industrial training documentation, revision support, and exit readiness.",
        links: createSemesterLinks(department.name, "Semester 6")
      }
    ]
  },
  placement: {
    heading: "Training & Placement",
    description:
      "The department works with the institute placement ecosystem to improve employability through mentoring, internship exposure, industry interaction, and interview preparation.",
    supportPoints: [
      "Resume and interview preparation",
      "Technical aptitude and domain guidance",
      "Internship coordination and industry visits",
      "Recruiter engagement through the Training & Placement Cell"
    ],
    timeline: createPlacementTrack(department.name),
    recruiters: baseRecruiters
  },
  gallery: {
    heading: "Department Gallery",
    description:
      "A flexible gallery block for labs, workshops, seminars, student projects, and campus-level department activities.",
    items: baseGallery
  }
});

export const departments = [
  {
    slug: "computer-science-engineering",
    name: "Computer Science & Engineering",
    description:
      "Build strong foundations in programming, software development, data structures, and modern computing practices.",
    hodName: "Dr. Anil Kumar",
    icon: "computer"
  },
  {
    slug: "information-technology",
    name: "Information Technology",
    description:
      "Develop digital systems knowledge with a focus on applications, networking, and information-driven solutions.",
    hodName: "Prof. Ritu Singh",
    icon: "network"
  },
  {
    slug: "artificial-intelligence-machine-learning",
    name: "Artificial Intelligence & Machine Learning",
    description:
      "Learn intelligent systems, data modelling, and algorithmic thinking for future-ready technical careers.",
    hodName: "Dr. Vivek Sharma",
    icon: "ai"
  },
  {
    slug: "civil-engineering",
    name: "Civil Engineering",
    description:
      "Study structures, surveying, construction methods, and infrastructure planning through practical exposure.",
    hodName: "Prof. S. K. Verma",
    icon: "civil"
  },
  {
    slug: "mechanical-engineering",
    name: "Mechanical Engineering",
    description:
      "Gain applied knowledge in design, manufacturing, thermal systems, and workshop-oriented learning.",
    hodName: "Prof. Rajesh Tiwari",
    icon: "mechanical"
  },
  {
    slug: "electrical-engineering",
    name: "Electrical Engineering",
    description:
      "Understand electrical systems, power applications, machines, and industry-focused technical practices.",
    hodName: "Dr. P. K. Mishra",
    icon: "electrical"
  },
  {
    slug: "electronics-engineering",
    name: "Electronics Engineering",
    description:
      "Build expertise in electronic devices, circuit systems, and practical hardware-based applications.",
    hodName: "Prof. Nidhi Agrawal",
    icon: "electronics"
  },
  {
    slug: "electronics-communication-engineering",
    name: "Electronics & Communication Engineering",
    description:
      "Explore communication systems, signal processing, and modern electronics with technical depth.",
    hodName: "Dr. Manoj Srivastava",
    icon: "communication"
  },
  {
    slug: "automobile-engineering",
    name: "Automobile Engineering",
    description:
      "Learn vehicle systems, maintenance concepts, and automotive technologies through hands-on study.",
    hodName: "Prof. Imran Khan",
    icon: "automobile"
  },
  {
    slug: "chemical-engineering",
    name: "Chemical Engineering",
    description:
      "Study process engineering, industrial chemistry, and production systems used across key sectors.",
    hodName: "Dr. Neha Saxena",
    icon: "chemical"
  },
  {
    slug: "plastic-technology",
    name: "Plastic Technology",
    description:
      "Understand polymer materials, manufacturing methods, and industrial applications in plastic processing.",
    hodName: "Prof. D. P. Yadav",
    icon: "plastic"
  },
  {
    slug: "production-engineering",
    name: "Production Engineering",
    description:
      "Focus on manufacturing efficiency, industrial systems, quality practices, and production planning.",
    hodName: "Prof. Ashok Gupta",
    icon: "production"
  },
  {
    slug: "textile-technology",
    name: "Textile Technology",
    description:
      "Gain technical knowledge in fabric processes, production workflows, and textile-based applications.",
    hodName: "Prof. Kavita Sinha",
    icon: "textile"
  },
  {
    slug: "interior-design",
    name: "Interior Design",
    description:
      "Combine creativity and technical planning in spatial design, materials, and functional aesthetics.",
    hodName: "Prof. Shweta Kapoor",
    icon: "design"
  },
  {
    slug: "pharmacy",
    name: "Pharmacy",
    description:
      "Learn pharmaceutical fundamentals, formulation practices, and healthcare-oriented technical knowledge.",
    hodName: "Dr. R. P. Singh",
    icon: "pharmacy"
  }
];

export const departmentDetails = departments.map(createDepartmentDetail);

export function getDepartmentBySlug(slug) {
  return departmentDetails.find((department) => department.slug === slug);
}
