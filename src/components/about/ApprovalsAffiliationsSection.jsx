export function ApprovalsAffiliationsSection({ items }) {
  return (
    <section className="about-page-section" aria-labelledby="about-approvals-title">
      <div className="about-section__header">
        <p className="about-section__eyebrow">Approvals & Affiliations</p>
        <h2 id="about-approvals-title" className="about-section__title">
          Institutional Recognition
        </h2>
      </div>

      <div className="about-approvals" role="list" aria-label="Approvals and affiliations">
        {items.map((item) => (
          <article key={item.id} className="about-approvals__item surface" role="listitem">
            <div className="about-approvals__logo">
              <img src={item.logo} alt={item.title} loading="lazy" />
            </div>
            <div className="about-approvals__content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
