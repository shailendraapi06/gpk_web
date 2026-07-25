export function RecruiterGrid({ recruiters }) {
  return (
    <section className="recruiter-grid surface" aria-labelledby="recruiter-grid-title">
      <div className="recruiter-grid__header">
        <h3 id="recruiter-grid-title" className="recruiter-grid__title">
          Recruiter Network
        </h3>
      </div>

      <div className="recruiter-grid__list" role="list" aria-label="Recruiter logos">
        {recruiters.map((recruiter) => (
          <div key={recruiter.id} role="listitem" className="recruiter-grid__item">
            <div className="recruiter-grid__logo" aria-label={recruiter.name}>
              <span className="recruiter-grid__mark" aria-hidden="true">
                {recruiter.shortLabel}
              </span>
              <span className="recruiter-grid__name">{recruiter.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
