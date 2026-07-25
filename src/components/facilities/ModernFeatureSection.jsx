export function ModernFeatureSection({ title, eyebrow, items }) {
  return (
    <section className="facilities-page-section" aria-labelledby={`facilities-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`}>
      <div className="facilities-section__header">
        <p className="facilities-section__eyebrow">{eyebrow}</p>
        <h2
          id={`facilities-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`}
          className="facilities-section__title"
        >
          {title}
        </h2>
      </div>

      <div className="modern-feature-list" role="list" aria-label={title}>
        {items.map((item) => (
          <article key={item.id} className="modern-feature-list__item" role="listitem">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
