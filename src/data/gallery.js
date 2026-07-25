import galleryCampusImage from "../assets/home/gallery-campus.svg";
import galleryEventsImage from "../assets/home/gallery-events.svg";
import galleryFacilitiesImage from "../assets/home/gallery-facilities.svg";
import galleryLabsImage from "../assets/home/gallery-labs.svg";
import gallerySportsImage from "../assets/home/gallery-sports.svg";
import galleryWorkshopsImage from "../assets/home/gallery-workshops.svg";
import heroCampusOne from "../assets/home/hero-campus-1.jpg";
import heroCampusTwo from "../assets/home/hero-campus-2.jfif";
import heroCampusThree from "../assets/home/hero-campus-3.jpeg";

export const galleryPageContent = {
  eyebrow: "Gallery",
  title: "Campus Life Gallery",
  introduction:
    "Explore the academic environment, student activities, laboratories, workshops, events, and campus moments of Government Polytechnic Kanpur through a visually rich mixed-media gallery."
};

export const galleryCategories = [
  "All",
  "Campus",
  "Events",
  "Workshops",
  "Seminars",
  "Sports",
  "Laboratories",
  "Industrial Visits"
];

export const galleryItems = [
  {
    id: "gallery-1",
    title: "Main Academic Block",
    category: "Campus",
    type: "photo",
    thumbnail: heroCampusThree,
    src: heroCampusThree,
    featured: true
  },
  {
    id: "gallery-2",
    title: "Seminar Hall Session",
    category: "Seminars",
    type: "photo",
    thumbnail: heroCampusOne,
    src: heroCampusOne,
    featured: true
  },
  {
    id: "gallery-3",
    title: "Campus Orientation Highlights",
    category: "Events",
    type: "video",
    thumbnail: galleryEventsImage,
    embedUrl: "https://www.youtube-nocookie.com/embed/ysz5S6PUM-U",
    featured: true
  },
  {
    id: "gallery-4",
    title: "Workshop Practice Lab",
    category: "Workshops",
    type: "photo",
    thumbnail: galleryWorkshopsImage,
    src: galleryWorkshopsImage
  },
  {
    id: "gallery-5",
    title: "Computer Laboratory Session",
    category: "Laboratories",
    type: "photo",
    thumbnail: galleryLabsImage,
    src: galleryLabsImage
  },
  {
    id: "gallery-6",
    title: "Sports Meet Moments",
    category: "Sports",
    type: "photo",
    thumbnail: gallerySportsImage,
    src: gallerySportsImage
  },
  {
    id: "gallery-7",
    title: "Industry Exposure Visit",
    category: "Industrial Visits",
    type: "video",
    thumbnail: galleryFacilitiesImage,
    embedUrl: "https://www.youtube-nocookie.com/embed/jNQXAC9IVRw"
  },
  {
    id: "gallery-8",
    title: "Student Event Stage Setup",
    category: "Events",
    type: "photo",
    thumbnail: galleryEventsImage,
    src: galleryEventsImage
  },
  {
    id: "gallery-9",
    title: "Campus Front View",
    category: "Campus",
    type: "photo",
    thumbnail: heroCampusTwo,
    src: heroCampusTwo
  },
  {
    id: "gallery-10",
    title: "Laboratory Infrastructure",
    category: "Laboratories",
    type: "photo",
    thumbnail: galleryFacilitiesImage,
    src: galleryFacilitiesImage
  },
  {
    id: "gallery-11",
    title: "Technical Workshop Demonstration",
    category: "Workshops",
    type: "photo",
    thumbnail: galleryWorkshopsImage,
    src: galleryWorkshopsImage
  },
  {
    id: "gallery-12",
    title: "Faculty Seminar Interaction",
    category: "Seminars",
    type: "photo",
    thumbnail: heroCampusOne,
    src: heroCampusOne
  }
];
