export function DepartmentAboutSection({ about }) {
  if (!about) return null;

  const summaryParagraphs = Array.isArray(about.summary)
    ? about.summary
    : typeof about.summary === "string" && about.summary.trim()
    ? about.summary.split("\n").filter(Boolean)
    : [];

  const focusAreas = Array.isArray(about.focusAreas) ? about.focusAreas : [];

  return (
    <section className="department-detail-section" aria-labelledby="department-about-title">
      <div className="department-detail-section__heading">
        <p className="department-detail-section__eyebrow">Overview</p>
        <h2 id="department-about-title" className="department-detail-section__title">
          {about.heading || "About the Department"}
        </h2>
      </div>

      <div className="department-about">
        <div className="department-about__content">
          {summaryParagraphs.length > 0 ? (
            summaryParagraphs.map((paragraph, index) => (
              <p key={`${index}-${paragraph.slice(0, 15)}`}>{paragraph}</p>
            ))
          ) : (
            <p>Welcome to the department at Government Polytechnic Kanpur.</p>
          )}
        </div>

        {focusAreas.length > 0 && (
          <div className="department-about__focus surface">
            <h3 className="department-about__focus-title">Key Focus Areas</h3>
            <ul className="department-about__focus-list">
              {focusAreas.map((item, index) => (
                <li key={`${index}-${item}`}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
