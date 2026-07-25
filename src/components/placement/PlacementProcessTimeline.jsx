export function PlacementProcessTimeline({ steps }) {
  return (
    <section className="placement-page-section" aria-labelledby="placement-process-title">
      <div className="placement-page-section__header">
        <p className="placement-page-section__eyebrow">How It Works</p>
        <h2 id="placement-process-title" className="placement-page-section__title">
          Placement Process
        </h2>
      </div>

      <ol className="placement-process" aria-label="Placement process timeline">
        {steps.map((item, index) => (
          <li key={item.step} className="placement-process__item">
            <div className="placement-process__marker" aria-hidden="true">
              {index + 1}
            </div>
            <div className="placement-process__content">
              <h3>{item.step}</h3>
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
