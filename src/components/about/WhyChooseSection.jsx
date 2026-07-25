function WhyChooseIcon({ icon }) {
  const icons = {
    faculty: (
      <path d="M12 7.5C13.9 7.5 15.5 5.9 15.5 4C15.5 2.1 13.9 0.5 12 0.5C10.1 0.5 8.5 2.1 8.5 4C8.5 5.9 10.1 7.5 12 7.5ZM5.5 20V17.8C5.5 14.9 8.2 12.5 12 12.5C15.8 12.5 18.5 14.9 18.5 17.8V20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    ),
    practice: (
      <path d="M4.5 18.5H19.5M7 18.5V10.5M12 18.5V6.5M17 18.5V12.5M5 8.5L9 5.5L12 9L19 4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    ),
    campus: (
      <path d="M4.5 18.5H19.5M7 18.5V8.5L12 5.5L17 8.5V18.5M9.5 18.5V13.5H14.5V18.5M9.5 10.5H14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    ),
    placement: (
      <path d="M4 18H20M6 18V10M12 18V6M18 18V12M4 8L8.5 4L12.5 8L20 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    )
  };

  return (
    <span className="why-choose__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">{icons[icon] || icons.faculty}</svg>
    </span>
  );
}

export function WhyChooseSection({ features }) {
  return (
    <section className="about-page-section" aria-labelledby="about-why-choose-title">
      <div className="about-section__header">
        <p className="about-section__eyebrow">Why Choose Us</p>
        <h2 id="about-why-choose-title" className="about-section__title">
          Why Government Polytechnic Kanpur?
        </h2>
      </div>

      <div className="why-choose-list" role="list" aria-label="Why choose Government Polytechnic Kanpur">
        {features.map((feature) => (
          <article key={feature.id} className="why-choose__item" role="listitem">
            <WhyChooseIcon icon={feature.icon} />
            <div className="why-choose__content">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
