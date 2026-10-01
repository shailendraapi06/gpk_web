function RecruiterGrid({ recruiters }) {
  const list = Array.isArray(recruiters) ? recruiters : [];
  if (list.length === 0) return null;

  return (
    <div className="department-placement__recruiters" aria-label="Recruiter logos">
      {list.map((recruiter, idx) => (
        <div key={recruiter.name || idx} className="department-placement__recruiter surface">
          <img src={recruiter.logo || recruiter.logoUrl} alt={recruiter.name || "Recruiter Logo"} loading="lazy" />
        </div>
      ))}
    </div>
  );
}

export function PlacementSection({ placement }) {
  if (!placement) return null;

  const timeline = Array.isArray(placement.timeline) ? placement.timeline : [];
  const supportPoints = Array.isArray(placement.supportPoints) ? placement.supportPoints : [];
  const recruiters = Array.isArray(placement.recruiters) ? placement.recruiters : [];

  return (
    <section className="department-detail-section" aria-labelledby="department-placement-title">
      <div className="department-detail-section__heading">
        <p className="department-detail-section__eyebrow">Career Readiness</p>
        <h2 id="department-placement-title" className="department-detail-section__title">
          {placement.heading || "Training & Placement"}
        </h2>
        {placement.description && (
          <p className="department-detail-section__description">{placement.description}</p>
        )}
      </div>

      <div className="department-placement">
        {timeline.length > 0 && (
          <div className="department-placement__timeline">
            {timeline.map((item, idx) => (
              <article key={item.year || idx} className="department-placement__step">
                <div className="department-placement__step-marker">{item.year || idx + 1}</div>
                <div className="department-placement__step-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="department-placement__aside">
          {supportPoints.length > 0 && (
            <div className="department-placement__support surface">
              <h3>Placement Support</h3>
              <ul>
                {supportPoints.map((item, idx) => (
                  <li key={typeof item === "string" ? item : idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <RecruiterGrid recruiters={recruiters} />
        </div>
      </div>
    </section>
  );
}
