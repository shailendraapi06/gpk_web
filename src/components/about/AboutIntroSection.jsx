export function AboutIntroSection({ content }) {
  return (
    <section className="about-page-section about-intro" aria-labelledby="about-page-title">
      <p className="about-page__eyebrow">{content.eyebrow}</p>
      <h1 id="about-page-title" className="about-page__title">
        {content.title}
      </h1>
      <p className="about-page__intro">{content.introduction}</p>
    </section>
  );
}
