import campusImage from "../../assets/home/gallery-campus.svg";
import labsImage from "../../assets/home/gallery-labs.svg";
import eventsImage from "../../assets/home/gallery-events.svg";
import workshopsImage from "../../assets/home/gallery-workshops.svg";
import sportsImage from "../../assets/home/gallery-sports.svg";
import facilitiesImage from "../../assets/home/gallery-facilities.svg";

export const gallerySectionContent = {
  title: "Campus Gallery",
  subtitle:
    "A quick visual glimpse into the academic environment, student activities, and campus experiences at Government Polytechnic Kanpur.",
  actionLabel: "View Full Gallery",
  actionTo: "/gallery"
};

export const galleryItems = [
  {
    id: "campus",
    title: "Main Campus",
    category: "Campus",
    src: campusImage,
    alt: "Illustrated placeholder of the main academic campus"
  },
  {
    id: "labs",
    title: "Technical Laboratories",
    category: "Labs",
    src: labsImage,
    alt: "Illustrated placeholder of institutional laboratories"
  },
  {
    id: "events",
    title: "Institutional Events",
    category: "Events",
    src: eventsImage,
    alt: "Illustrated placeholder of campus events"
  },
  {
    id: "workshops",
    title: "Workshop Training",
    category: "Workshops",
    src: workshopsImage,
    alt: "Illustrated placeholder of technical workshops"
  },
  {
    id: "sports",
    title: "Sports Activities",
    category: "Sports",
    src: sportsImage,
    alt: "Illustrated placeholder of sports activities"
  },
  {
    id: "facilities",
    title: "Campus Facilities",
    category: "Campus",
    src: facilitiesImage,
    alt: "Illustrated placeholder of campus facilities"
  }
];
