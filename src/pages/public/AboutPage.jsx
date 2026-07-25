import {
  AboutIntroSection,
  ApprovalsAffiliationsSection,
  AtAGlanceSection,
  CollegeOverviewSection,
  InfrastructureSection,
  JourneyTimelineSection,
  VisionMissionSection,
  WhyChooseSection
} from "../../components/about";
import { Container } from "../../components/layout/Container";
import {
  aboutHighlights,
  aboutPageContent,
  approvalsAffiliations,
  campusInfrastructure,
  collegeJourney,
  collegeOverview,
  visionMission,
  whyChooseFeatures
} from "../../data/about";
import { Section } from "../../layouts/Section";

export function AboutPage() {
  return (
    <Section className="about-page" aria-labelledby="about-page-title">
      <Container>
        <div className="about-page__content">
          <AboutIntroSection content={aboutPageContent} />
          <AtAGlanceSection highlights={aboutHighlights} />
          <CollegeOverviewSection overview={collegeOverview} />
          <JourneyTimelineSection journey={collegeJourney} />
          <VisionMissionSection content={visionMission} />
          <InfrastructureSection items={campusInfrastructure} />
          <ApprovalsAffiliationsSection items={approvalsAffiliations} />
          <WhyChooseSection features={whyChooseFeatures} />
        </div>
      </Container>
    </Section>
  );
}
