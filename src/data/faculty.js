import facultyPlaceholder from "../assets/departments/faculty-placeholder.svg";

const facultyProfileUrl =
  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

export const facultyPageContent = {
  eyebrow: "Faculty",
  title: "Faculty Directory",
  introduction:
    "Government Polytechnic Kanpur brings together experienced faculty members across technical and applied disciplines. Use the directory below to quickly browse faculty by department and access profile documents.",
  searchPlaceholder: "Search by name, department or designation",
  filterLabel: "Filter by Department"
};

export const facultyDepartments = [
  "All Departments",
  "Computer Science & Engineering",
  "Information Technology",
  "Artificial Intelligence & Machine Learning",
  "Civil Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Electronics Engineering",
  "Interior Design"
];

export const facultyMembers = [
  {
    id: "faculty-1",
    name: "Dr. Anil Kumar",
    designation: "Head of Department",
    department: "Computer Science & Engineering",
    qualification: "M.Tech., Ph.D.",
    experience: "14 Years",
    email: "anil.kumar@gpk.ac.in",
    photo: facultyPlaceholder,
    profileUrl: facultyProfileUrl
  },
  {
    id: "faculty-2",
    name: "Prof. Ritu Singh",
    designation: "Lecturer",
    department: "Information Technology",
    qualification: "M.Tech., B.Tech.",
    experience: "11 Years",
    email: "ritu.singh@gpk.ac.in",
    photo: facultyPlaceholder,
    profileUrl: facultyProfileUrl
  },
  {
    id: "faculty-3",
    name: "Dr. Vivek Sharma",
    designation: "Lecturer",
    department: "Artificial Intelligence & Machine Learning",
    qualification: "M.Tech., Ph.D.",
    experience: "9 Years",
    email: "vivek.sharma@gpk.ac.in",
    photo: facultyPlaceholder,
    profileUrl: facultyProfileUrl
  },
  {
    id: "faculty-4",
    name: "Prof. S. K. Verma",
    designation: "Head of Department",
    department: "Civil Engineering",
    qualification: "M.E., B.E.",
    experience: "16 Years",
    email: "sk.verma@gpk.ac.in",
    photo: facultyPlaceholder,
    profileUrl: facultyProfileUrl
  },
  {
    id: "faculty-5",
    name: "Prof. Rajesh Tiwari",
    designation: "Lecturer",
    department: "Mechanical Engineering",
    qualification: "M.Tech., B.Tech.",
    experience: "13 Years",
    email: "rajesh.tiwari@gpk.ac.in",
    photo: facultyPlaceholder,
    profileUrl: facultyProfileUrl
  },
  {
    id: "faculty-6",
    name: "Dr. P. K. Mishra",
    designation: "Head of Department",
    department: "Electrical Engineering",
    qualification: "M.Tech., Ph.D.",
    experience: "15 Years",
    email: "pk.mishra@gpk.ac.in",
    photo: facultyPlaceholder,
    profileUrl: facultyProfileUrl
  },
  {
    id: "faculty-7",
    name: "Prof. Nidhi Agrawal",
    designation: "Lecturer",
    department: "Electronics Engineering",
    qualification: "M.Tech., B.Tech.",
    experience: "8 Years",
    email: "nidhi.agrawal@gpk.ac.in",
    photo: facultyPlaceholder,
    profileUrl: facultyProfileUrl
  },
  {
    id: "faculty-8",
    name: "Prof. Shweta Kapoor",
    designation: "Lecturer",
    department: "Interior Design",
    qualification: "M.Des., B.Des.",
    experience: "7 Years",
    email: "shweta.kapoor@gpk.ac.in",
    photo: facultyPlaceholder,
    profileUrl: facultyProfileUrl
  }
];

export const facultyContactInfo = {
  title: "Faculty Contact Information",
  description:
    "For academic communication, students should first connect through the concerned department. Official email should be used for profile-related, academic, or administrative queries.",
  items: [
    {
      label: "Academic Coordination",
      value: "academic.office@gpk.ac.in"
    },
    {
      label: "Faculty Records",
      value: "faculty.records@gpk.ac.in"
    },
    {
      label: "Office Phone",
      value: "+91 512 258 0123"
    },
    {
      label: "Working Hours",
      value: "Monday to Saturday, 10:00 AM to 5:00 PM"
    }
  ]
};
