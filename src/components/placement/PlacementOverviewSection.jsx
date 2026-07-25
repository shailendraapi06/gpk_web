export function PlacementOverviewSection({ overview }) {
  return (
    <section className="placement-page-section" aria-labelledby="placement-overview-title">
      <div className="placement-overview surface">
        <div className="placement-overview__content">
          <p className="placement-page-section__eyebrow">Placement Cell</p>
          <h2 id="placement-overview-title" className="placement-page-section__title">
            {overview.title}
          </h2>
          <div className="placement-overview__copy">
            {overview.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="placement-overview__media">
          <img src={overview.image} alt={overview.imageAlt} loading="lazy" />
        </div>
      </div>
    </section>
  );
}
