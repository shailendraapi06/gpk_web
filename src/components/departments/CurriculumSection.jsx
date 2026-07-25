import { useState } from "react";

function CurriculumAccordionItem({ item, isOpen, onToggle }) {
  const panelId = `${item.id}-panel`;

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
        <div className="department-curriculum__links">
          {item.links.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CurriculumSection({ curriculum }) {
  const [openSemester, setOpenSemester] = useState(curriculum.semesters[0]?.id ?? null);

  return (
    <section className="department-detail-section" aria-labelledby="department-curriculum-title">
      <div className="department-detail-section__heading">
        <p className="department-detail-section__eyebrow">Academics</p>
        <h2 id="department-curriculum-title" className="department-detail-section__title">
          {curriculum.heading}
        </h2>
        <p className="department-detail-section__description">{curriculum.description}</p>
      </div>

      <div className="department-curriculum">
        {curriculum.semesters.map((semester) => (
          <CurriculumAccordionItem
            key={semester.id}
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
