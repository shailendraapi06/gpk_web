import facultyPlaceholder from "../assets/departments/faculty-placeholder.svg";
import overviewImage from "../assets/home/hero-campus-1.jpg";
import recruiterLogoOne from "../assets/departments/recruiter-logo-1.svg";
import recruiterLogoTwo from "../assets/departments/recruiter-logo-2.svg";
import recruiterLogoThree from "../assets/departments/recruiter-logo-3.svg";
import recruiterLogoFour from "../assets/departments/recruiter-logo-4.svg";
import recruiterLogoFive from "../assets/departments/recruiter-logo-5.svg";
import recruiterLogoSix from "../assets/departments/recruiter-logo-6.svg";

const profilePdfUrl =
  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

export const placementPageContent = {
  eyebrow: "Training & Placement",
  title: "Training & Placement Cell",
  introduction:
    "The Training & Placement Cell of Government Polytechnic Kanpur supports students through industry readiness, campus engagement, placement coordination, and skill-building initiatives aligned with technical education outcomes."
};

export const placementOverview = {
  title: "Placement Cell Overview",
  description: [
    "The placement cell works as a bridge between the institute, industry, and students by coordinating training activities, pre-placement support, and campus recruitment opportunities.",
    "With a focus on employability, communication, discipline, and technical preparedness, the cell helps students become industry-ready for internships, drives, and professional growth."
  ],
  image: overviewImage,
  imageAlt: "Government Polytechnic Kanpur academic campus"
};

export const placementOfficer = {
  name: "Prof. Amit Kumar",
  designation: "Training & Placement Officer",
  photo: facultyPlaceholder,
  message:
    "Our objective is to equip students with practical confidence, workplace readiness, and professional discipline so they can participate effectively in training programs, internship opportunities, and placement drives.",
  contact: {
    email: "tpo@gpk.ac.in",
    phone: "+91 512 258 0188",
    officeHours: "Monday to Saturday, 10:00 AM to 5:00 PM"
  },
  profileUrl: profilePdfUrl
};

export const placementProcess = [
  {
    step: "Registration",
    description:
      "Students register with the placement cell and complete profile information, academic details, and interest areas."
  },
  {
    step: "Pre-Placement Training",
    description:
      "Skill development sessions, resume support, aptitude practice, and interview readiness are conducted."
  },
  {
    step: "Company Outreach",
    description:
      "The cell coordinates with recruiters and shares hiring criteria, schedules, and participation guidelines."
  },
  {
    step: "Shortlisting",
    description:
      "Eligible candidates are shortlisted according to company requirements, academic rules, and application status."
  },
  {
    step: "Assessment & Interview",
    description:
      "Students appear in written tests, technical rounds, HR interviews, and selection activities."
  },
  {
    step: "Offer & Follow-Up",
    description:
      "Selected candidates receive updates on offers, joining procedures, and post-selection coordination."
  }
];

export const recruiters = [
  { name: "Tech Axis", logo: recruiterLogoOne },
  { name: "BuildCraft India", logo: recruiterLogoTwo },
  { name: "Prime Electro", logo: recruiterLogoThree },
  { name: "AutoMotion Works", logo: recruiterLogoFour },
  { name: "ProcessNova", logo: recruiterLogoFive },
  { name: "Campus Connect Labs", logo: recruiterLogoSix },
  { name: "Infra Grid Systems", logo: recruiterLogoOne },
  { name: "SkillForge Industries", logo: recruiterLogoTwo }
];

export const trainingPrograms = [
  {
    id: "training-1",
    icon: "communication",
    title: "Communication Skills",
    description:
      "Focused sessions on speaking, writing, interviews, and professional presentation."
  },
  {
    id: "training-2",
    icon: "aptitude",
    title: "Aptitude Preparation",
    description:
      "Practice modules for quantitative aptitude, reasoning, and placement assessments."
  },
  {
    id: "training-3",
    icon: "industry",
    title: "Industry Interaction",
    description:
      "Guest talks, industrial visits, and recruiter interactions to improve exposure."
  },
  {
    id: "training-4",
    icon: "resume",
    title: "Resume & Interview Support",
    description:
      "Guided support for resume drafting, mock interviews, and professional readiness."
  }
];

export const placementNotices = [
  {
    id: "notice-1",
    date: "2026-07-10",
    title: "Campus recruitment registration for final year diploma students",
    actionLabel: "View",
    actionUrl: profilePdfUrl
  },
  {
    id: "notice-2",
    date: "2026-07-04",
    title: "Aptitude and interview preparation workshop schedule",
    actionLabel: "View",
    actionUrl: profilePdfUrl
  },
  {
    id: "notice-3",
    date: "2026-06-28",
    title: "Internship orientation notice for pre-final year students",
    actionLabel: "View",
    actionUrl: profilePdfUrl
  }
];

export const placementDrives = [
  {
    id: "drive-1",
    company: "Tech Axis",
    date: "2026-07-22",
    eligibility: "CSE / IT / AIML, 60% and above",
    status: "Applications Open",
    actionLabel: "Apply",
    actionUrl: profilePdfUrl
  },
  {
    id: "drive-2",
    company: "BuildCraft India",
    date: "2026-07-27",
    eligibility: "Civil / Mechanical, 55% and above",
    status: "Upcoming",
    actionLabel: "View",
    actionUrl: profilePdfUrl
  },
  {
    id: "drive-3",
    company: "Prime Electro",
    date: "2026-08-02",
    eligibility: "Electrical / Electronics, 60% and above",
    status: "Registration Soon",
    actionLabel: "View",
    actionUrl: profilePdfUrl
  },
  {
    id: "drive-4",
    company: "AutoMotion Works",
    date: "2026-08-08",
    eligibility: "Automobile / Mechanical, 50% and above",
    status: "Shortlisting",
    actionLabel: "View",
    actionUrl: profilePdfUrl
  }
];
