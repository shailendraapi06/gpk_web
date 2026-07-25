import React, { useState, useEffect } from "react";
import { Container } from "../../components/layout/Container";
import {
  PlacementDrivesSection,
  PlacementNoticesSection,
  PlacementOfficerSection,
  PlacementOverviewSection,
  PlacementProcessTimeline,
  RecruitersWall,
  TrainingProgramsSection
} from "../../components/placement";
import {
  placementDrives as defaultDrives,
  placementNotices as defaultNotices,
  placementOfficer as defaultOfficer,
  placementOverview as defaultOverview,
  placementPageContent as defaultPageContent,
  placementProcess as defaultProcess,
  recruiters as defaultRecruiters,
  trainingPrograms as defaultTraining
} from "../../data/placement";
import { Section } from "../../layouts/Section";
import { apiRequest } from "../../services/api/client";

export function PlacementPage() {
  const [data, setData] = useState({
    pageContent: defaultPageContent,
    overview: defaultOverview,
    officer: defaultOfficer,
    process: defaultProcess,
    recruiters: defaultRecruiters,
    training: defaultTraining,
    notices: defaultNotices,
    drives: defaultDrives
  });

  useEffect(() => {
    async function fetchPlacementData() {
      try {
        const res = await apiRequest("/placements");
        if (res && res.placement) {
          const p = res.placement;
          
          // Ensure description is an array for Overview Section
          let overviewDesc = defaultOverview.description;
          if (p.placementOverview?.description) {
            overviewDesc = Array.isArray(p.placementOverview.description)
              ? p.placementOverview.description
              : [p.placementOverview.description];
          }

          // Format officer photo
          let officerPhoto = p.placementOfficer?.photo || defaultOfficer.photo;
          if (typeof officerPhoto === "object" && officerPhoto?.src) {
            officerPhoto = officerPhoto.src;
          }

          setData({
            pageContent: p.pageContent || defaultPageContent,
            overview: {
              title: p.placementOverview?.title || defaultOverview.title,
              description: overviewDesc,
              image: p.placementOverview?.image || defaultOverview.image,
              imageAlt: p.placementOverview?.imageAlt || defaultOverview.imageAlt
            },
            officer: {
              name: p.placementOfficer?.name || defaultOfficer.name,
              designation: p.placementOfficer?.designation || defaultOfficer.designation,
              photo: officerPhoto,
              message: p.placementOfficer?.message || defaultOfficer.message,
              contact: {
                email: p.placementOfficer?.contact?.email || defaultOfficer.contact.email,
                phone: p.placementOfficer?.contact?.phone || defaultOfficer.contact.phone,
                officeHours: p.placementOfficer?.contact?.officeHours || defaultOfficer.contact.officeHours
              },
              profileUrl: p.placementOfficer?.profileUrl || defaultOfficer.profileUrl
            },
            process: (p.placementProcess && p.placementProcess.length > 0) ? p.placementProcess : defaultProcess,
            recruiters: (p.recruiters && p.recruiters.length > 0) ? p.recruiters : defaultRecruiters,
            training: (p.trainingPrograms && p.trainingPrograms.length > 0) ? p.trainingPrograms : defaultTraining,
            notices: (p.placementNotices && p.placementNotices.length > 0) ? p.placementNotices : defaultNotices,
            drives: (p.placementDrives && p.placementDrives.length > 0) ? p.placementDrives : defaultDrives
          });
        }
      } catch (err) {
        console.warn("Could not load placement data from API:", err);
      }
    }
    fetchPlacementData();
  }, []);

  return (
    <Section className="placement-page" aria-labelledby="placement-page-title">
      <Container>
        <div className="placement-page__header">
          <p className="placement-page__eyebrow">{data.pageContent.eyebrow}</p>
          <h1 id="placement-page-title" className="placement-page__title">
            {data.pageContent.title}
          </h1>
          <p className="placement-page__intro">{data.pageContent.introduction}</p>
        </div>

        <div className="placement-page__content">
          <PlacementOverviewSection overview={data.overview} />
          <PlacementOfficerSection officer={data.officer} />
          <PlacementProcessTimeline steps={data.process} />
          <RecruitersWall recruiters={data.recruiters} />
          <TrainingProgramsSection programs={data.training} />
          <PlacementNoticesSection notices={data.notices} />
          <PlacementDrivesSection drives={data.drives} />
        </div>
      </Container>
    </Section>
  );
}

