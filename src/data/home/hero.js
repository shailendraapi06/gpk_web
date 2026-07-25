import heroCampus1Image from "../../assets/home/hero-campus-1.jpg";
import heroCampus2Image from "../../assets/home/hero-campus-2.jfif";
import heroCampus3Image from "../../assets/home/hero-campus-3.jpeg";

export const heroContent = {
  title: "Government Polytechnic Kanpur",
  tagline:
    "Career-focused technical education with academic discipline, practical learning, and student-centered growth.",
  ctaButtons: [
    { label: "Admissions Open", to: "/admissions", variant: "primary" },
    { label: "Download Prospectus", to: "/admissions#prospectus", variant: "secondary" }
  ],
  badges: [
    { label: "AICTE Approved" },
    { label: "Affiliated to BTEUP" },
    // { label: "Placements" },
    { label: "Government Institute" }
  ],
  slides: [
    {
      id: "hero-campus-2",
      src: heroCampus2Image,
      alt: "Front view of Government Polytechnic Kanpur campus"
    },
    {
      id: "hero-campus-1",
      src: heroCampus1Image,
      alt: "Auditorium gathering at Government Polytechnic Kanpur"
    },
    {
      id: "hero-campus-3",
      src: heroCampus3Image,
      alt: "Faculty group at Government Polytechnic Kanpur"
    }
  ]
};
