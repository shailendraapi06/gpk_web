import { Container } from "../components/layout/Container";

const cards = [
  {
    id: "about",
    title: "Reusable Components",
    description: "Layout and section primitives are separated so future pages can share structure."
  },
  {
    id: "programs",
    title: "API-Friendly Design",
    description: "Static placeholders are content-only and can later be replaced by Node or Express responses."
  },
  {
    id: "contact",
    title: "Production-Ready Base",
    description: "The project starts with a clean Vite setup, simple styling tokens, and scalable directories."
  }
];

export function InfoGridSection() {
  return (
    <section className="info-grid-section">
      <Container>
        <div className="section-heading">
          <p className="eyebrow">Foundation</p>
          <h2>Built for maintainable academic website growth.</h2>
        </div>

        <div className="info-grid">
          {cards.map((card) => (
            <article key={card.id} className="info-card" id={card.id}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
