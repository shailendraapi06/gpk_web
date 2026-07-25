export function HodMessageSection({ hod }) {
  return (
    <section className="department-detail-section" aria-labelledby="department-hod-title">
      <div className="department-detail-section__heading">
        <p className="department-detail-section__eyebrow">Leadership</p>
        <h2 id="department-hod-title" className="department-detail-section__title">
          HOD&apos;s Message
        </h2>
      </div>

      <div className="department-hod surface">
        <div className="department-hod__media">
          <img src={hod.photo} alt={hod.name} loading="lazy" />
        </div>

        <div className="department-hod__content">
          <h3 className="department-hod__name">{hod.name}</h3>
          <p className="department-hod__designation">{hod.designation}</p>
          <p className="department-hod__message">{hod.message}</p>
        </div>
      </div>
    </section>
  );
}
