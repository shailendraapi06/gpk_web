export function FacultyProfileCard({ faculty }) {
  return (
    <article className="department-faculty-card surface">
      <div className="department-faculty-card__image">
        <img src={faculty.photo} alt={faculty.name} loading="lazy" />
      </div>

      <div className="department-faculty-card__content">
        <h3 className="department-faculty-card__name">{faculty.name}</h3>
        <p className="department-faculty-card__designation">{faculty.designation}</p>
        <p className="department-faculty-card__qualification">{faculty.qualification}</p>
      </div>

      <a
        className="department-faculty-card__action"
        href={faculty.profileUrl}
        target="_blank"
        rel="noreferrer"
      >
        View Profile
      </a>
    </article>
  );
}
