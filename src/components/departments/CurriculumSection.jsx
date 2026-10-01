import { useState } from "react";

function CurriculumAccordionItem({ item, isOpen, onToggle }) {
  const panelId = `${item.id || "sem"}-panel`;
  const links = Array.isArray(item.links) ? item.links : [];

  return (
    <div className="department-curriculum__item surface">
      <button
        type="button"
        className="department-curriculum__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span>{item.label}</span>
        <span className="department-curriculum__indicator" aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div id={panelId} className={`department-curriculum__panel${isOpen ? " is-open" : ""}`}>
        <p className="department-curriculum__overview">{item.overview}</p>
        {links.length > 0 && (
          <div className="department-curriculum__links">
            {links.map((link, idx) => (
              <a key={link.label || idx} href={link.url || "#"} target="_blank" rel="noreferrer">
                {link.label || "Document Link"}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function CurriculumSection({ curriculum }) {
  if (!curriculum) return null;
  const semesters = Array.isArray(curriculum.semesters) ? curriculum.semesters : [];
  const [openSemester, setOpenSemester] = useState(semesters[0]?.id ?? null);

  return (
    <section className="department-detail-section" aria-labelledby="department-curriculum-title">
      <div className="department-detail-section__heading">
        <p className="department-detail-section__eyebrow">Academics</p>
        <h2 id="department-curriculum-title" className="department-detail-section__title">
          {curriculum.heading || "Curriculum & Syllabus"}
        </h2>
        {curriculum.description && (
          <p className="department-detail-section__description">{curriculum.description}</p>
        )}
      </div>

      <div className="department-curriculum">
        {semesters.map((semester) => (
          <CurriculumAccordionItem
            key={semester.id || semester.label}
            item={semester}
            isOpen={openSemester === semester.id}
            onToggle={() =>
              setOpenSemester((current) => (current === semester.id ? null : semester.id))
            }
          />
        ))}
      </div>
    </section>
  );
}
