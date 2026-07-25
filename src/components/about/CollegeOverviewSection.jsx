export function CollegeOverviewSection({ overview }) {
  return (
    <section className="about-page-section" aria-labelledby="about-overview-title">
      <div className="about-overview surface">
        <div className="about-overview__media">
          <img src={overview.image} alt={overview.imageAlt} loading="lazy" />
        </div>

        <div className="about-overview__content">
          <p className="about-section__eyebrow">Overview</p>
          <h2 id="about-overview-title" className="about-section__title">
            {overview.title}
          </h2>
          <div className="about-overview__copy">
            {overview.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
