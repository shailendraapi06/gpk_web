function SafetyWifiIcon({ icon }) {
  const icons = {
    safety: (
      <path d="M12 3L19 6V11.2C19 15.1 16.2 18.7 12 20C7.8 18.7 5 15.1 5 11.2V6L12 3ZM9.5 11.5L11.2 13.2L14.8 9.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    wifi: (
      <path d="M5 9.5C9.1 6.2 14.9 6.2 19 9.5M7.8 12.3C10.3 10.4 13.7 10.4 16.2 12.3M10.7 15.2C11.5 14.6 12.5 14.6 13.3 15.2M12 18H12.01" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    )
  };

  return (
    <span className="safety-wifi__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">{icons[icon] || icons.safety}</svg>
    </span>
  );
}

export function SafetyWifiSection({ title, items }) {
  return (
    <section className="facilities-page-section" aria-labelledby={`facilities-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`}>
      <div className="facilities-section__header">
        <p className="facilities-section__eyebrow">Campus Safety & Connectivity</p>
        <h2
          id={`facilities-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`}
          className="facilities-section__title"
        >
          {title}
        </h2>
      </div>

      <div className="safety-wifi" role="list" aria-label={title}>
        {items.map((item) => (
          <article key={item.id} className="safety-wifi__item" role="listitem">
            <SafetyWifiIcon icon={item.icon} />
            <div className="safety-wifi__content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
