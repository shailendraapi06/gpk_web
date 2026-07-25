import { DepartmentIcon } from "./DepartmentIcon";

export function DepartmentHeaderSection({ department }) {
  return (
    <section className="department-detail-page__hero surface" aria-labelledby="department-detail-title">
      <div className="department-detail-page__hero-main">
        <p className="department-detail-page__eyebrow">Academic Department</p>
        <h1 id="department-detail-title" className="department-detail-page__title">
          {department.name}
        </h1>
        <p className="department-detail-page__intro">{department.introduction}</p>
      </div>

      <div className="department-detail-page__hero-side" aria-label={`${department.name} highlights`}>
        <DepartmentIcon
          icon={department.icon}
          name={department.name}
          className="department-detail-page__hero-icon"
        />
        <dl className="department-detail-page__meta">
          <div>
            <dt>HOD</dt>
            <dd>{department.hod.name}</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>Practical technical education</dd>
          </div>
          <div>
            <dt>Pathway</dt>
            <dd>Diploma, projects, and placements</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
