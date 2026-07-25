import { Container } from "../../components/layout/Container";
import {
  CompactFeatureGridSection,
  FacilitiesOverviewSection,
  FeatureSplitSection,
  FullWidthImageSection,
  GalleryStripSection,
  ImageFocusSection,
  ModernFeatureSection,
  SafetyWifiSection
} from "../../components/facilities";
import {
  amenitiesSection,
  computerLabsSection,
  facilitiesGalleryStrip,
  facilitiesOverview,
  facilitiesPageContent,
  librarySection,
  safetyWifiSection,
  smartClassroomsSection,
  sportsRecreationSection,
  workshopLabsSection
} from "../../data/facilities";
import { Section } from "../../layouts/Section";

export function FacilitiesPage() {
  return (
    <Section className="facilities-page" aria-labelledby="facilities-page-title">
      <Container>
        <div className="facilities-page__header">
          <p className="facilities-page__eyebrow">{facilitiesPageContent.eyebrow}</p>
          <h1 id="facilities-page-title" className="facilities-page__title">
            {facilitiesPageContent.title}
          </h1>
          <p className="facilities-page__intro">{facilitiesPageContent.introduction}</p>
        </div>

        <div className="facilities-page__content">
          <FacilitiesOverviewSection items={facilitiesOverview} />
          <FeatureSplitSection eyebrow="Library" {...librarySection} />
          <FeatureSplitSection eyebrow="Digital Practice" reverse {...computerLabsSection} />
          <ImageFocusSection eyebrow="Practical Learning" {...workshopLabsSection} />
          <ModernFeatureSection eyebrow="Smart Learning" {...smartClassroomsSection} />
          <FullWidthImageSection eyebrow="Student Life" {...sportsRecreationSection} />
          <CompactFeatureGridSection eyebrow="Campus Amenities" {...amenitiesSection} />
          <SafetyWifiSection {...safetyWifiSection} />
          <GalleryStripSection section={facilitiesGalleryStrip} />
        </div>
      </Container>
    </Section>
  );
}
