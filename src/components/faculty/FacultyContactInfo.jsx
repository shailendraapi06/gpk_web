export function FacultyContactInfo({ contactInfo }) {
  return (
    <section className="faculty-contact" aria-labelledby="faculty-contact-title">
      <div className="faculty-contact__content">
        <h2 id="faculty-contact-title">{contactInfo.title}</h2>
        <p>{contactInfo.description}</p>
      </div>

      <dl className="faculty-contact__list">
        {contactInfo.items.map((item) => (
          <div key={item.label} className="faculty-contact__item">
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
