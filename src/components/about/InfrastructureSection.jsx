export function InfrastructureSection({ items }) {
  return (
    <section className="about-page-section" aria-labelledby="about-infrastructure-title">
      <div className="about-section__header">
        <p className="about-section__eyebrow">Campus Infrastructure</p>
        <h2 id="about-infrastructure-title" className="about-section__title">
          Learning Spaces and Facilities
        </h2>
      </div>

      <div className="infrastructure-list">
        {items.map((item, index) => (
          <article
            key={item.id}
            className={`infrastructure-item${index % 2 === 1 ? " infrastructure-item--reverse" : ""}`}
          >
            <div className="infrastructure-item__media">
              <img src={item.image} alt={item.imageAlt} loading="lazy" />
            </div>

            <div className="infrastructure-item__content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
