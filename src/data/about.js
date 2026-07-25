import heroCampusOne from "../assets/home/hero-campus-1.jpg";
import heroCampusThree from "../assets/home/hero-campus-3.jpeg";
import galleryFacilitiesImage from "../assets/home/gallery-facilities.svg";
import galleryLabsImage from "../assets/home/gallery-labs.svg";
import gallerySportsImage from "../assets/home/gallery-sports.svg";
import galleryWorkshopsImage from "../assets/home/gallery-workshops.svg";
import logoImage from "../assets/branding/logo.png";
import recruiterLogoOne from "../assets/departments/recruiter-logo-1.svg";
import recruiterLogoTwo from "../assets/departments/recruiter-logo-2.svg";
import recruiterLogoThree from "../assets/departments/recruiter-logo-3.svg";

export const aboutPageContent = {
  eyebrow: "About College",
  title: "About Government Polytechnic Kanpur",
  introduction:
    "Government Polytechnic Kanpur is committed to delivering disciplined, skill-oriented, and industry-relevant technical education through a strong academic culture, practical training, and student-centered institutional values."
};

export const aboutHighlights = [
  { label: "Established", value: "1958" },
  { label: "Departments", value: "15+" },
  { label: "Faculty", value: "50+" },
  { label: "Students", value: "2000+" }
];

export const collegeOverview = {
  title: "College Overview",
  image: heroCampusThree,
  imageAlt: "Government Polytechnic Kanpur campus building",
  description: [
    "The institute has developed a strong identity in diploma-level technical education by combining foundational knowledge with workshops, laboratories, projects, and professional discipline.",
    "With academic departments across engineering and applied disciplines, the college supports students through faculty mentorship, practical learning, institutional values, and employment readiness.",
    "Its environment is shaped around accessibility, technical competence, continuous improvement, and preparation for both industry opportunities and higher learning pathways."
  ]
};

export const collegeJourney = [
  {
    year: "1958",
    title: "Institute Foundation",
    description:
      "Government Polytechnic Kanpur was established to strengthen technical education and workforce development in Uttar Pradesh."
  },
  {
    year: "1980s",
    title: "Academic Expansion",
    description:
      "The institution expanded its diploma offerings and improved its practical learning infrastructure for core technical disciplines."
  },
  {
    year: "2000s",
    title: "Modernization of Facilities",
    description:
      "Laboratories, workshops, and campus learning resources were gradually modernized to support evolving curriculum standards."
  },
  {
    year: "Today",
    title: "Industry-Ready Education",
    description:
      "The college continues to focus on employability, applied skills, academic discipline, and student development in a modern technical environment."
  }
];

export const visionMission = {
  vision: {
    title: "Vision",
    points: [
      "To be a leading center of diploma-level technical education rooted in quality, discipline, and social responsibility.",
      "To prepare students for professional competence, innovation, and lifelong learning in changing technical fields."
    ]
  },
  mission: {
    title: "Mission",
    points: [
      "To provide accessible and practice-oriented technical education aligned with current industry and academic standards.",
      "To foster student growth through laboratories, workshops, faculty mentoring, and ethical institutional culture.",
      "To support employability, entrepreneurship, and higher learning readiness through continuous skill development."
    ]
  }
};

export const campusInfrastructure = [
  {
    id: "infra-1",
    title: "Library",
    description:
      "The library supports academic development with technical books, reference materials, study resources, and quiet reading spaces for students.",
    image: galleryFacilitiesImage,
    imageAlt: "Library and academic learning resources"
  },
  {
    id: "infra-2",
    title: "Laboratories",
    description:
      "Department laboratories enable applied learning, experimentation, and practical understanding across engineering and technical subjects.",
    image: galleryLabsImage,
    imageAlt: "Technical laboratory environment"
  },
  {
    id: "infra-3",
    title: "Workshops",
    description:
      "Hands-on workshops provide essential exposure to tools, processes, fabrication practices, and discipline-oriented technical exercises.",
    image: galleryWorkshopsImage,
    imageAlt: "Workshop and practical training area"
  },
  {
    id: "infra-4",
    title: "Smart Classrooms",
    description:
      "Classrooms are being aligned with digital teaching support to improve instruction quality, presentation, and interactive academic delivery.",
    image: heroCampusOne,
    imageAlt: "Classroom and seminar learning space"
  },
  {
    id: "infra-5",
    title: "Sports",
    description:
      "Sports and campus activity spaces contribute to student wellbeing, teamwork, discipline, and balanced institutional life.",
    image: gallerySportsImage,
    imageAlt: "Sports and extracurricular activity environment"
  }
];

export const approvalsAffiliations = [
  {
    id: "approval-1",
    title: "Government Polytechnic Kanpur",
    description:
      "Institutional identity representing a long-standing government technical education presence in Kanpur.",
    logo: logoImage
  },
  {
    id: "approval-2",
    title: "Technical Education Framework",
    description:
      "The college functions within state technical education systems and established academic governance structures.",
    logo: recruiterLogoOne
  },
  {
    id: "approval-3",
    title: "Quality & Curriculum Alignment",
    description:
      "Programs are guided by approved curriculum practices, technical education requirements, and institutional quality standards.",
    logo: recruiterLogoTwo
  },
  {
    id: "approval-4",
    title: "Industry and Skills Orientation",
    description:
      "Training, applied learning, and student development efforts remain aligned with employability and technical skill readiness.",
    logo: recruiterLogoThree
  }
];

export const whyChooseFeatures = [
  {
    id: "feature-1",
    icon: "faculty",
    title: "Experienced Faculty",
    description:
      "Students learn under faculty members who combine technical understanding, discipline, and guided academic support."
  },
  {
    id: "feature-2",
    icon: "practice",
    title: "Strong Practical Learning",
    description:
      "The academic structure emphasizes laboratories, workshops, projects, and hands-on technical exposure."
  },
  {
    id: "feature-3",
    icon: "campus",
    title: "Established Institution",
    description:
      "The college carries a long-standing public education identity with a focused and structured academic environment."
  },
  {
    id: "feature-4",
    icon: "placement",
    title: "Career Readiness",
    description:
      "Training support, communication development, and placement-oriented preparation help students move toward industry opportunities."
  }
];
