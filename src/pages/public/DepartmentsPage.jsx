import { useState, useEffect } from "react";
import { Container } from "../../components/layout/Container";
import { DepartmentGrid } from "../../components/departments/DepartmentGrid";
import { departments as fallbackDepartments, departmentsPageContent } from "../../data/departments";
import { Section } from "../../layouts/Section";
import { apiRequest } from "../../services/api/client";

export function DepartmentsPage() {
  const [departmentList, setDepartmentList] = useState(fallbackDepartments);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const res = await apiRequest("/departments");
        if (res && res.departments && res.departments.length > 0) {
          setDepartmentList(res.departments);
        }
      } catch (err) {
        console.warn("Using fallback department list:", err);
      }
    }
    fetchDepartments();
  }, []);

  return (
    <Section className="departments-page" aria-labelledby="departments-page-title">
      <Container>
        <div className="departments-page__header">
          <p className="departments-page__eyebrow">Academic Programs</p>
          <h1 id="departments-page-title" className="departments-page__title">
            {departmentsPageContent.title}
          </h1>
          <p className="departments-page__intro">{departmentsPageContent.introduction}</p>
        </div>

        <DepartmentGrid departments={departmentList} />
      </Container>
    </Section>
  );
}
