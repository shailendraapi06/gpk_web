function RecruiterGrid({ recruiters }) {
  return (
    <div className="department-placement__recruiters" aria-label="Recruiter logos">
      {recruiters.map((recruiter) => (
        <div key={recruiter.name} className="department-placement__recruiter surface">
          <img src={recruiter.logo} alt={recruiter.name} loading="lazy" />
        </div>
      ))}
    </div>
  );
}

export function PlacementSection({ placement }) {
  return (
    <section className="department-detail-section" aria-labelledby="department-placement-title">
      <div className="department-detail-section__heading">
        <p className="department-detail-section__eyebrow">Career Readiness</p>
        <h2 id="department-placement-title" className="department-detail-section__title">
          {placement.heading}
        </h2>
        <p className="department-detail-section__description">{placement.description}</p>
      </div>

      <div className="department-placement">
        <div className="department-placement__timeline">
          {placement.timeline.map((item) => (
            <article key={item.year} className="department-placement__step">
              <div className="department-placement__step-marker">{item.year}</div>
              <div className="department-placement__step-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="department-placement__aside">
          <div className="department-placement__support surface">
            <h3>Placement Support</h3>
            <ul>
              {placement.supportPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <RecruiterGrid recruiters={placement.recruiters} />
        </div>
      </div>
    </section>
  );
}
