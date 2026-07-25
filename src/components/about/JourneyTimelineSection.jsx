export function JourneyTimelineSection({ journey }) {
  return (
    <section className="about-page-section" aria-labelledby="about-journey-title">
      <div className="about-section__header">
        <p className="about-section__eyebrow">Growth Story</p>
        <h2 id="about-journey-title" className="about-section__title">
          Our Journey
        </h2>
      </div>

      <ol className="about-journey" aria-label="College journey timeline">
        {journey.map((item) => (
          <li key={item.year} className="about-journey__item">
            <div className="about-journey__year">{item.year}</div>
            <div className="about-journey__content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
