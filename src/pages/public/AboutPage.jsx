import { useState, useEffect } from "react";
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
import { apiRequest } from "../../services/api/client";

export function AboutPage() {
  const [highlights, setHighlights] = useState(aboutHighlights);
  const [journey, setJourney] = useState(collegeJourney);
  const [infra, setInfra] = useState(campusInfrastructure);
  const [overview, setOverview] = useState(collegeOverview);
  const [approvals, setApprovals] = useState(approvalsAffiliations);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await apiRequest("/settings");
        if (res && res.settings && res.settings.about) {
          const ab = res.settings.about;
          if (ab.highlights && ab.highlights.length > 0) setHighlights(ab.highlights);
          if (ab.journey && ab.journey.length > 0) setJourney(ab.journey);
          if (ab.infrastructure && ab.infrastructure.length > 0) setInfra(ab.infrastructure);
          if (ab.aboutPageImage) setOverview(prev => ({ ...prev, image: ab.aboutPageImage }));
          if (ab.recognitions && ab.recognitions.length > 0) setApprovals(ab.recognitions);
        }
      } catch (err) {
        console.warn("Could not load about data from settings API:", err);
      }
    }
    fetchAbout();
  }, []);

  return (
    <Section className="about-page" aria-labelledby="about-page-title">
      <Container>
        <div className="about-page__content">
          <AboutIntroSection content={aboutPageContent} />
          <AtAGlanceSection highlights={highlights} />
          <CollegeOverviewSection overview={overview} />
          <JourneyTimelineSection journey={journey} />
          <VisionMissionSection content={visionMission} />
          <InfrastructureSection items={infra} />
          <ApprovalsAffiliationsSection items={approvals} />
          <WhyChooseSection features={whyChooseFeatures} />
        </div>
      </Container>
    </Section>
  );
}
