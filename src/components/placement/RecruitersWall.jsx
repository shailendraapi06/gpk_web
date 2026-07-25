export function RecruitersWall({ recruiters }) {
  return (
    <section className="placement-page-section" aria-labelledby="placement-recruiters-title">
      <div className="placement-page-section__header">
        <p className="placement-page-section__eyebrow">Industry Connect</p>
        <h2 id="placement-recruiters-title" className="placement-page-section__title">
          Our Recruiters
        </h2>
      </div>

      <div className="placement-recruiters" role="list" aria-label="Recruiter logos">
        {recruiters.map((recruiter) => (
          <div key={recruiter.name} className="placement-recruiters__item surface" role="listitem">
            <img src={recruiter.logo} alt={recruiter.name} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
