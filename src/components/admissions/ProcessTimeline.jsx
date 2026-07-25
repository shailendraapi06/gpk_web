export function ProcessTimeline({ steps }) {
  return (
    <ol className="admissions-process" aria-label="Admission process timeline">
      {steps.map((item, index) => (
        <li key={item.step} className="admissions-process__item">
          <div className="admissions-process__marker" aria-hidden="true">
            {index + 1}
          </div>
          <div className="admissions-process__content">
            <h3>{item.step}</h3>
            <p>{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
