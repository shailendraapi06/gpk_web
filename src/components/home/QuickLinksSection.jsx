import { quickLinks } from "../../data/home/quickLinks";
import { Container } from "../layout/Container";
import { Section } from "../../layouts/Section";
import { QuickLinkCard } from "./QuickLinkCard";

export function QuickLinksSection() {
  return (
    <Section className="home-section quick-links-section" aria-labelledby="quick-access-title">
      <Container>
        <div className="home-section__inner">
          <header className="home-section__header quick-links-section__header">
            <h2 id="quick-access-title" className="home-section__title">
              Quick Access
            </h2>
            <p className="quick-links-section__intro">
              Reach essential student and academic services from one accessible place.
            </p>
          </header>

          <div className="quick-links-grid" role="list" aria-label="Quick access services">
            {quickLinks.map((link) => (
              <div key={link.title} role="listitem">
                <QuickLinkCard {...link} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
