import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "../../components/layout/Container";
import {
  CurriculumSection,
  DepartmentAboutSection,
  DepartmentGallerySection,
  DepartmentHeaderSection,
  FacultySection,
  HodMessageSection,
  PlacementSection
} from "../../components/departments";
import { getDepartmentBySlug as getFallbackDept } from "../../data/departments";
import { Section } from "../../layouts/Section";
import { apiRequest } from "../../services/api/client";

export function DepartmentDetailPage() {
  const { slug } = useParams();
  const [department, setDepartment] = useState(() => getFallbackDept(slug));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchDepartment() {
      try {
        const res = await apiRequest(`/departments/${slug}`);
        if (isMounted && res && res.department) {
          const fallbackObj = getFallbackDept(slug) || {};
          // Merge API response with fallback defaults for any missing deeply nested structures
          setDepartment({
            ...fallbackObj,
            ...res.department,
            about: { ...fallbackObj.about, ...(res.department.about || {}) },
            hod: { ...fallbackObj.hod, ...(res.department.hod || {}) },
            faculty: (res.department.faculty && res.department.faculty.length > 0) ? res.department.faculty : fallbackObj.faculty,
            curriculum: { ...fallbackObj.curriculum, ...(res.department.curriculum || {}) },
            placement: { ...fallbackObj.placement, ...(res.department.placement || {}) },
            gallery: {
              heading: "Department Gallery",
              description: "A flexible gallery block for labs, workshops, seminars, and activities.",
              items: (res.department.gallery && res.department.gallery.length > 0) ? res.department.gallery : (fallbackObj.gallery?.items || [])
            }
          });
        }
      } catch (err) {
        console.warn("Using local fallback department data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDepartment();
    return () => { isMounted = false; };
  }, [slug]);

  if (!department && !loading) {
    return (
      <Section className="department-detail-page" aria-labelledby="department-detail-title">
        <Container>
          <div className="department-detail-page__shell surface">
            <h1 id="department-detail-title" className="department-detail-page__title">
              Department Not Found
            </h1>
            <p className="department-detail-page__intro">
              The requested department page is not available right now.
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  if (!department) return null;

  return (
    <Section className="department-detail-page" aria-labelledby="department-detail-title">
      <Container>
        <div className="department-detail-page__shell">
          <DepartmentHeaderSection department={department} />
          {department.about && <DepartmentAboutSection about={department.about} />}
          {department.hod && <HodMessageSection hod={department.hod} />}
          {department.faculty && <FacultySection faculty={department.faculty} />}
          {department.curriculum && <CurriculumSection curriculum={department.curriculum} />}
          {department.placement && <PlacementSection placement={department.placement} />}
          {department.gallery && <DepartmentGallerySection gallery={department.gallery} />}
        </div>
      </Container>
    </Section>
  );
}
