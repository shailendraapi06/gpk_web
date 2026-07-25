export function AtAGlanceSection({ highlights }) {
  return (
    <section className="about-page-section" aria-labelledby="about-glance-title">
      <div className="about-section__header">
        <p className="about-section__eyebrow">At a Glance</p>
        <h2 id="about-glance-title" className="about-section__title">
          Key Institutional Highlights
        </h2>
      </div>

      <div className="about-glance" role="list" aria-label="College highlights">
        {highlights.map((item) => (
          <div key={item.label} className="about-glance__item" role="listitem">
            <span className="about-glance__value">{item.value}</span>
            <span className="about-glance__label">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
