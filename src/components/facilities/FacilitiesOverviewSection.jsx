function FacilitiesOverviewIcon({ icon }) {
  const icons = {
    library: (
      <path d="M6 5.5H17C18.1 5.5 19 6.4 19 7.5V18.5H8C6.9 18.5 6 17.6 6 16.5V5.5ZM8.5 8.5H15.5M8.5 11.5H15.5M8.5 14.5H13.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    labs: (
      <path d="M10 4V9.5L5.5 17C5 17.8 5.6 19 6.6 19H17.4C18.4 19 19 17.8 18.5 17L14 9.5V4M9 9H15M9.5 13.5H14.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    digital: (
      <path d="M5 7.5C5 6.4 5.9 5.5 7 5.5H17C18.1 5.5 19 6.4 19 7.5V14.5C19 15.6 18.1 16.5 17 16.5H13.5L14.5 19H9.5L10.5 16.5H7C5.9 16.5 5 15.6 5 14.5V7.5ZM8 9.5H16M8 12.5H12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    campus: (
      <path d="M4.5 18.5H19.5M7 18.5V8.5L12 5.5L17 8.5V18.5M9.5 18.5V13.5H14.5V18.5M9.5 10.5H14.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    )
  };

  return (
    <span className="facilities-overview__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">{icons[icon] || icons.campus}</svg>
    </span>
  );
}

export function FacilitiesOverviewSection({ items }) {
  return (
    <section className="facilities-page-section" aria-labelledby="facilities-overview-title">
      <div className="facilities-section__header">
        <p className="facilities-section__eyebrow">Facilities Overview</p>
        <h2 id="facilities-overview-title" className="facilities-section__title">
          Learning Environment at a Glance
        </h2>
      </div>

      <div className="facilities-overview" role="list" aria-label="Campus facilities overview">
        {items.map((item) => (
          <article key={item.id} className="facilities-overview__item" role="listitem">
            <FacilitiesOverviewIcon icon={item.icon} />
            <div className="facilities-overview__content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
