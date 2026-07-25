import { FacultyProfileCard } from "./FacultyProfileCard";

export function FacultyDirectory({ faculty }) {
  if (!faculty.length) {
    return (
      <div className="faculty-directory faculty-directory--empty surface" role="status">
        <p>No faculty members match the current search or department filter.</p>
      </div>
    );
  }

  return (
    <div className="faculty-directory" role="list" aria-label="Faculty directory">
      {faculty.map((member) => (
        <div key={member.id} role="listitem">
          <FacultyProfileCard faculty={member} />
        </div>
      ))}
    </div>
  );
}
