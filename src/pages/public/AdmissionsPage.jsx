import React, { useState, useEffect } from "react";
import { Container } from "../../components/layout/Container";
import {
  AdmissionsTable,
  Checklist,
  FaqAccordion,
  ProcessTimeline
} from "../../components/admissions";
import {
  admissionFaqs as defaultFaqs,
  admissionProcess as defaultProcess,
  admissionsPageContent as defaultContent,
  coursesOffered as defaultCourses,
  eligibilityCriteria as defaultEligibility,
  feeStructure as defaultFeeStructure,
  importantLinks as defaultImportantLinks,
  requiredDocuments as defaultDocuments,
  scholarshipContent as defaultScholarship
} from "../../data/admissions";
import { Section } from "../../layouts/Section";
import { apiRequest } from "../../services/api/client";

const courseColumns = [
  { key: "course", label: "Course" },
  { key: "duration", label: "Duration" },
  { key: "intake", label: "Intake" }
];

const feeColumns = [
  { key: "category", label: "Fee Head" },
  { key: "amount", label: "Amount" },
  { key: "notes", label: "Notes" }
];

export function AdmissionsPage() {
  const [data, setData] = useState({
    pageContent: defaultContent,
    courses: defaultCourses,
    eligibility: defaultEligibility,
    documents: defaultDocuments,
    process: defaultProcess,
    fees: defaultFeeStructure,
    scholarship: defaultScholarship,
    importantLinks: defaultImportantLinks,
    faqs: defaultFaqs
  });

  useEffect(() => {
    async function fetchAdmissions() {
      try {
        const res = await apiRequest("/admissions");
        if (res && res.admissions) {
          const adm = res.admissions;
          setData({
            pageContent: {
              eyebrow: adm.eyebrow || defaultContent.eyebrow,
              title: adm.title || defaultContent.title,
              introduction: adm.introduction || defaultContent.introduction,
              officialLink: {
                label: "Visit Official JEECUP Admission Portal",
                url: adm.officialJeecupLink || defaultContent.officialLink.url
              }
            },
            courses: (adm.coursesOffered && adm.coursesOffered.length > 0) ? adm.coursesOffered : defaultCourses,
            eligibility: (adm.eligibilityCriteria && adm.eligibilityCriteria.length > 0) ? adm.eligibilityCriteria : defaultEligibility,
            documents: (adm.requiredDocuments && adm.requiredDocuments.length > 0) ? adm.requiredDocuments : defaultDocuments,
            process: (adm.admissionProcess && adm.admissionProcess.length > 0) ? adm.admissionProcess : defaultProcess,
            fees: (adm.feeStructure && adm.feeStructure.length > 0) ? adm.feeStructure : defaultFeeStructure,
            scholarship: adm.scholarshipContent || defaultScholarship,
            importantLinks: (adm.importantLinks && adm.importantLinks.length > 0) ? adm.importantLinks : defaultImportantLinks,
            faqs: (adm.faqs && adm.faqs.length > 0) ? adm.faqs : defaultFaqs
          });
        }
      } catch (err) {
        console.warn("Could not load admissions data from API:", err);
      }
    }
    fetchAdmissions();
  }, []);

  return (
    <Section className="admissions-page" aria-labelledby="admissions-page-title">
      <Container>
        <div className="admissions-page__header">
          <div className="admissions-page__intro-block">
            <p className="admissions-page__eyebrow">{data.pageContent.eyebrow}</p>
            <h1 id="admissions-page-title" className="admissions-page__title">
              {data.pageContent.title}
            </h1>
            <p className="admissions-page__intro">{data.pageContent.introduction}</p>
          </div>

          <a
            className="admissions-page__primary-link"
            href={data.pageContent.officialLink.url}
            target="_blank"
            rel="noreferrer"
          >
            {data.pageContent.officialLink.label}
          </a>
        </div>

        <div className="admissions-page__content">
          <section className="admissions-section" aria-labelledby="admissions-courses-title">
            <div className="admissions-section__heading">
              <h2 id="admissions-courses-title">Courses Offered</h2>
            </div>
            <AdmissionsTable
              caption="Courses offered"
              columns={courseColumns}
              rows={data.courses}
            />
          </section>

          <div className="admissions-page__split">
            <section className="admissions-section" aria-labelledby="admissions-eligibility-title">
              <div className="admissions-section__heading">
                <h2 id="admissions-eligibility-title">Eligibility Criteria</h2>
              </div>
              <Checklist items={data.eligibility} />
            </section>

            <section className="admissions-section" aria-labelledby="admissions-documents-title">
              <div className="admissions-section__heading">
                <h2 id="admissions-documents-title">Required Documents</h2>
              </div>
              <Checklist items={data.documents} columns={2} />
            </section>
          </div>

          <section className="admissions-section" aria-labelledby="admissions-process-title">
            <div className="admissions-section__heading">
              <h2 id="admissions-process-title">Admission Process</h2>
            </div>
            <ProcessTimeline steps={data.process} />
          </section>

          <div className="admissions-page__split admissions-page__split--wide-right">
            <section className="admissions-section" aria-labelledby="admissions-fee-title">
              <div className="admissions-section__heading">
                <h2 id="admissions-fee-title">Fee Structure</h2>
              </div>
              <AdmissionsTable
                caption="Fee structure"
                columns={feeColumns}
                rows={data.fees}
              />
            </section>

            <section className="admissions-section" aria-labelledby="admissions-scholarship-title">
              <div className="admissions-section__heading">
                <h2 id="admissions-scholarship-title">{data.scholarship.title}</h2>
              </div>
              <div className="admissions-section__content">
                <p>{data.scholarship.description}</p>
                <a
                  className="admissions-page__secondary-link"
                  href={data.scholarship.link.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {data.scholarship.link.label}
                </a>
              </div>
            </section>
          </div>

          <div className="admissions-page__split admissions-page__split--wide-right">
            <section className="admissions-section" aria-labelledby="admissions-links-title">
              <div className="admissions-section__heading">
                <h2 id="admissions-links-title">Important Links</h2>
              </div>
              <div className="admissions-links" role="list" aria-label="Important admission links">
                {data.importantLinks.map((link) => (
                  <a
                    key={link.label}
                    className="admissions-links__item"
                    href={link.url}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    role="listitem"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </section>

            <section className="admissions-section" aria-labelledby="admissions-faq-title">
              <div className="admissions-section__heading">
                <h2 id="admissions-faq-title">FAQs</h2>
              </div>
              <FaqAccordion items={data.faqs} />
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
}

