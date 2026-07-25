import heroCampusOne from "../assets/home/hero-campus-1.jpg";
import heroCampusTwo from "../assets/home/hero-campus-2.jfif";
import heroCampusThree from "../assets/home/hero-campus-3.jpeg";
import galleryCampusImage from "../assets/home/gallery-campus.svg";
import galleryFacilitiesImage from "../assets/home/gallery-facilities.svg";
import galleryLabsImage from "../assets/home/gallery-labs.svg";
import gallerySportsImage from "../assets/home/gallery-sports.svg";
import galleryWorkshopsImage from "../assets/home/gallery-workshops.svg";

export const facilitiesPageContent = {
  eyebrow: "Campus Facilities",
  title: "Campus Facilities at Government Polytechnic Kanpur",
  introduction:
    "The campus environment is designed to support academic focus, practical learning, digital access, student wellbeing, and a disciplined technical education experience."
};

export const facilitiesOverview = [
  {
    id: "overview-1",
    icon: "library",
    title: "Academic Resources",
    description:
      "Library, reading support, and learning materials that strengthen classroom and self-study outcomes."
  },
  {
    id: "overview-2",
    icon: "labs",
    title: "Practical Infrastructure",
    description:
      "Well-structured laboratories and workshops for applied technical education across departments."
  },
  {
    id: "overview-3",
    icon: "digital",
    title: "Digital Learning",
    description:
      "Smart classrooms, connected systems, and learning-friendly digital teaching support."
  },
  {
    id: "overview-4",
    icon: "campus",
    title: "Student Amenities",
    description:
      "Campus spaces that support comfort, discipline, recreation, safety, and everyday student needs."
  }
];

export const librarySection = {
  title: "Library",
  image: galleryFacilitiesImage,
  imageAlt: "Library and academic study environment",
  description: [
    "The library provides access to technical books, reference materials, academic resources, and quiet reading areas for individual study and course support.",
    "It is intended to strengthen conceptual understanding, self-learning habits, and preparation for examinations, projects, and professional growth."
  ]
};

export const computerLabsSection = {
  title: "Computer Labs",
  image: galleryLabsImage,
  imageAlt: "Computer laboratory and digital learning environment",
  description: [
    "Computer labs support software practice, digital coursework, programming exposure, and access to structured technical learning in computer-related disciplines.",
    "The environment is designed for guided sessions, supervised practice, and development of practical skills relevant to modern technical education."
  ]
};

export const workshopLabsSection = {
  title: "Workshops & Practical Labs",
  image: galleryWorkshopsImage,
  imageAlt: "Workshop and practical technical training area",
  description:
    "Workshops and practical labs help students translate theory into application through tool handling, guided processes, experimentation, and structured technical exercises."
};

export const smartClassroomsSection = {
  title: "Smart Classrooms & Digital Learning",
  items: [
    {
      id: "smart-1",
      title: "Presentation-Ready Teaching",
      description:
        "Classrooms are aligned for clearer academic delivery through digital presentation support and improved instructional engagement."
    },
    {
      id: "smart-2",
      title: "Hybrid Learning Support",
      description:
        "Digital tools make it easier to organize content, improve classroom communication, and support evolving teaching methods."
    },
    {
      id: "smart-3",
      title: "Technology-Enabled Academic Culture",
      description:
        "Learning spaces continue to evolve toward better usability, access, and discipline-focused teaching support."
    }
  ]
};

export const sportsRecreationSection = {
  title: "Sports & Recreation",
  image: gallerySportsImage,
  imageAlt: "Sports and recreation activities",
  description:
    "Sports and recreational spaces contribute to student fitness, teamwork, discipline, and balanced campus life alongside academic and technical development."
};

export const amenitiesSection = {
  title: "Hostel, Cafeteria & Campus Amenities",
  items: [
    {
      id: "amenity-1",
      title: "Hostel Support",
      description:
        "Student accommodation support contributes to accessibility and a structured residential academic experience where applicable."
    },
    {
      id: "amenity-2",
      title: "Cafeteria",
      description:
        "Campus refreshment and meal spaces support daily student routines in a convenient institutional environment."
    },
    {
      id: "amenity-3",
      title: "Common Student Utilities",
      description:
        "Essential amenities help maintain comfort, usability, and a disciplined campus routine for students and visitors."
    }
  ]
};

export const safetyWifiSection = {
  title: "Campus Safety & Wi-Fi",
  items: [
    {
      id: "safety-1",
      icon: "safety",
      title: "Safe Campus Environment",
      description:
        "The campus emphasizes supervision, discipline, and student wellbeing through institutional safety practices."
    },
    {
      id: "safety-2",
      icon: "wifi",
      title: "Connected Learning Support",
      description:
        "Wi-Fi and digital access support academic communication, classroom resources, and technology-enabled learning."
    }
  ]
};

export const facilitiesGalleryStrip = {
  title: "Campus Gallery Strip",
  actionLabel: "View Full Gallery",
  actionTo: "/gallery",
  items: [
    {
      id: "gallery-strip-1",
      image: heroCampusThree,
      imageAlt: "Government Polytechnic Kanpur main campus view"
    },
    {
      id: "gallery-strip-2",
      image: heroCampusOne,
      imageAlt: "Seminar and academic activity space"
    },
    {
      id: "gallery-strip-3",
      image: heroCampusTwo,
      imageAlt: "Campus front area"
    },
    {
      id: "gallery-strip-4",
      image: galleryCampusImage,
      imageAlt: "Campus life illustration placeholder"
    }
  ]
};
