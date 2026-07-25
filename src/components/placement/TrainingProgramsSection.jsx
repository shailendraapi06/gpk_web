function TrainingProgramIcon({ icon }) {
  const icons = {
    communication: (
      <path d="M6 8.5C6 7.4 6.9 6.5 8 6.5H16C17.1 6.5 18 7.4 18 8.5V13.5C18 14.6 17.1 15.5 16 15.5H12.8L10 18V15.5H8C6.9 15.5 6 14.6 6 13.5V8.5ZM9 10.5H15M9 12.8H13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    aptitude: (
      <path d="M7 18.5V13.5M12 18.5V8.5M17 18.5V10.5M5 18.5H19M6 9.5L10 6.5L13 9L18 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    industry: (
      <path d="M5.5 18.5H18.5M7 18.5V8.5L12 5.5L17 8.5V18.5M9.5 10.5H14.5M9.5 13.5H14.5M10.5 18.5V15.5H13.5V18.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    resume: (
      <path d="M8 5.5H14L17 8.5V18.5H8C6.9 18.5 6 17.6 6 16.5V7.5C6 6.4 6.9 5.5 8 5.5ZM13.5 5.8V8.8H16.5M9 11H14M9 13.5H14M9 16H12.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    )
  };

  return (
    <span className="training-program__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">{icons[icon] || icons.communication}</svg>
    </span>
  );
}

export function TrainingProgramsSection({ programs }) {
  return (
    <section className="placement-page-section" aria-labelledby="placement-training-title">
      <div className="placement-page-section__header">
        <p className="placement-page-section__eyebrow">Skill Development</p>
        <h2 id="placement-training-title" className="placement-page-section__title">
          Training Programs
        </h2>
      </div>

      <div className="training-programs" role="list" aria-label="Training programs">
        {programs.map((program) => (
          <article key={program.id} className="training-program" role="listitem">
            <TrainingProgramIcon icon={program.icon} />
            <div className="training-program__content">
              <h3>{program.title}</h3>
              <p>{program.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
