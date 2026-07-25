import { Container } from "../layout/Container";
import { Section } from "../../layouts/Section";

export function HomeSectionShell({ title, sectionId, children }) {
  const headingId = `${sectionId}-title`;

  return (
    <Section className="home-section" aria-labelledby={headingId}>
      <Container>
        <div className="home-section__inner surface">
          <header className="home-section__header">
            <h2 id={headingId} className="home-section__title">
              {title}
            </h2>
          </header>
          <div className="home-section__placeholder" aria-hidden="true">
            {children}
          </div>
        </div>
      </Container>
    </Section>
  );
}
