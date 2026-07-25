import { NavLink } from "react-router-dom";
import { departments, departmentsSectionContent } from "../../data/home/departments";
import { Container } from "../layout/Container";
import { Section } from "../../layouts/Section";
import { DepartmentCard } from "./DepartmentCard";

export function DepartmentSection() {
  return (
    <Section className="home-section department-section" aria-labelledby="departments-showcase-title">
      <Container>
        <div className="department-section__inner">
          <header className="department-section__header">
            <p className="department-section__eyebrow">Academic Departments</p>
            <h2 id="departments-showcase-title" className="department-section__title">
              {departmentsSectionContent.title}
            </h2>
            <p className="department-section__subtitle">{departmentsSectionContent.subtitle}</p>
            <NavLink className="department-section__action" to={departmentsSectionContent.actionTo}>
              {departmentsSectionContent.actionLabel}
            </NavLink>
          </header>

          <div className="department-grid" role="list" aria-label="Academic departments">
            {departments.map((department) => (
              <div key={department.id} role="listitem">
                <DepartmentCard {...department} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
