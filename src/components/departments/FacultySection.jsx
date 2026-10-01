import { FacultyProfileCard } from "./FacultyProfileCard";

export function FacultySection({ faculty }) {
  const list = Array.isArray(faculty) ? faculty : [];
  if (list.length === 0) return null;

  return (
    <section className="department-detail-section" aria-labelledby="department-faculty-title">
      <div className="department-detail-section__heading">
        <p className="department-detail-section__eyebrow">Faculty Team</p>
        <h2 id="department-faculty-title" className="department-detail-section__title">
          Faculty Members
        </h2>
      </div>

      <div className="department-faculty-grid" role="list" aria-label="Department faculty profiles">
        {list.map((member, idx) => (
          <div key={member.id || member._id || idx} role="listitem">
            <FacultyProfileCard faculty={member} />
          </div>
        ))}
      </div>
    </section>
  );
}
