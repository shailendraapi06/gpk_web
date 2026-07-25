import { Container } from "../components/layout/Container";

export function HeroSection() {
  return (
    <section className="hero-section" id="home">
      <Container className="hero-section__grid">
        <div className="hero-section__content">
          <p className="eyebrow">Academic Excellence</p>
          <h1>Scalable frontend foundation for Government Polytechnic Kanpur.</h1>
          <p className="hero-copy">
            This starter keeps the UI responsive, reusable, and ready for future API-driven
            modules such as notices, admissions, departments, and faculty data.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="#about">
              Explore Structure
            </a>
            <a className="button button--secondary" href="#programs">
              View Modules
            </a>
          </div>
        </div>

        <div className="hero-card">
          <p className="hero-card__label">Frontend Principles</p>
          <ul className="hero-card__list">
            <li>Mobile-first responsive layout</li>
            <li>Reusable section-based architecture</li>
            <li>Future-ready API integration layer</li>
            <li>Minimal starter shell with clear extension points</li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
