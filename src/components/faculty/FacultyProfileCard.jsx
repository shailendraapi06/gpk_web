export function FacultyProfileCard({ faculty }) {
  return (
    <article className="faculty-card surface">
      <div className="faculty-card__image">
        <img src={faculty.photo} alt={faculty.name} loading="lazy" />
      </div>

      <div className="faculty-card__content">
        <h3 className="faculty-card__name">{faculty.name}</h3>
        <p className="faculty-card__designation">{faculty.designation}</p>
        <dl className="faculty-card__meta">
          <div>
            <dt>Department</dt>
            <dd>{faculty.department}</dd>
          </div>
          <div>
            <dt>Qualification</dt>
            <dd>{faculty.qualification}</dd>
          </div>
          <div>
            <dt>Experience</dt>
            <dd>{faculty.experience}</dd>
          </div>
          <div>
            <dt>Official Email</dt>
            <dd>
              <a href={`mailto:${faculty.email}`}>{faculty.email}</a>
            </dd>
          </div>
        </dl>
      </div>

      <a
        className="faculty-card__action"
        href={faculty.profileUrl}
        target="_blank"
        rel="noreferrer"
      >
        View Profile
      </a>
    </article>
  );
}
