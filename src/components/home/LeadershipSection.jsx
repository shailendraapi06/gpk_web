import { leaders, leadershipSectionContent } from "../../data/home/leadership";
import { Container } from "../layout/Container";
import { Section } from "../../layouts/Section";
import { LeadershipCard } from "./LeadershipCard";

export function LeadershipSection() {
  return (
    <Section className="home-section leadership-section" aria-labelledby="leadership-section-title">
      <Container>
        <div className="leadership-section__inner">
          <header className="leadership-section__header">
            <p className="leadership-section__eyebrow">Institutional Leadership</p>
            <h2 id="leadership-section-title" className="leadership-section__title">
              {leadershipSectionContent.title}
            </h2>
            <p className="leadership-section__subtitle">{leadershipSectionContent.subtitle}</p>
          </header>

          <div className="leadership-grid" role="list" aria-label="Leadership members">
            {leaders.map((leader) => (
              <div key={leader.id} role="listitem">
                <LeadershipCard {...leader} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
