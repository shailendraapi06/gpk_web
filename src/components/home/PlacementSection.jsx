import { NavLink } from "react-router-dom";
import { placementHighlights, placementSectionContent } from "../../data/home/placementHighlights";
import { recruiters } from "../../data/home/recruiters";
import { Container } from "../layout/Container";
import { Section } from "../../layouts/Section";
import { PlacementCard } from "./PlacementCard";
import { RecruiterGrid } from "./RecruiterGrid";

export function PlacementSection() {
  return (
    <Section className="home-section placement-section" aria-labelledby="placement-section-title">
      <Container>
        <div className="placement-section__inner">
          <header className="placement-section__header">
            <div>
              <p className="placement-section__eyebrow">Career Development</p>
              <h2 id="placement-section-title" className="placement-section__title">
                {placementSectionContent.title}
              </h2>
              <p className="placement-section__subtitle">{placementSectionContent.subtitle}</p>
            </div>
            <NavLink className="placement-section__action" to={placementSectionContent.actionTo}>
              {placementSectionContent.actionLabel}
            </NavLink>
          </header>

          <div className="placement-section__grid">
            <div className="placement-section__cards" role="list" aria-label="Placement highlights">
              {placementHighlights.map((highlight) => (
                <div key={highlight.id} role="listitem">
                  <PlacementCard {...highlight} />
                </div>
              ))}
            </div>

            <RecruiterGrid recruiters={recruiters} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
