const placeholderPdfUrl =
  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

export const admissionsPageContent = {
  eyebrow: "Admissions",
  title: "Admissions at Government Polytechnic Kanpur",
  introduction:
    "Admissions are primarily conducted through the Joint Entrance Examination Council Uttar Pradesh (JEECUP). The process is structured to keep application, counselling, document verification, and final admission clear and student-friendly.",
  officialLink: {
    label: "Visit Official JEECUP Admission Portal",
    url: "https://jeecup.admissions.nic.in/"
  }
};

export const coursesOffered = [
  { course: "Computer Science & Engineering", duration: "3 Years", intake: "60" },
  { course: "Information Technology", duration: "3 Years", intake: "60" },
  {
    course: "Artificial Intelligence & Machine Learning",
    duration: "3 Years",
    intake: "60"
  },
  { course: "Civil Engineering", duration: "3 Years", intake: "60" },
  { course: "Mechanical Engineering", duration: "3 Years", intake: "60" },
  { course: "Electrical Engineering", duration: "3 Years", intake: "60" },
  { course: "Electronics Engineering", duration: "3 Years", intake: "60" },
  {
    course: "Electronics & Communication Engineering",
    duration: "3 Years",
    intake: "60"
  },
  { course: "Automobile Engineering", duration: "3 Years", intake: "60" },
  { course: "Chemical Engineering", duration: "3 Years", intake: "60" },
  { course: "Plastic Technology", duration: "3 Years", intake: "60" },
  { course: "Production Engineering", duration: "3 Years", intake: "60" },
  { course: "Textile Technology", duration: "3 Years", intake: "60" },
  { course: "Interior Design", duration: "3 Years", intake: "40" },
  { course: "Pharmacy", duration: "2 Years", intake: "60" }
];

export const eligibilityCriteria = [
  "Candidates should have passed High School / Class 10 or equivalent from a recognized board.",
  "Relevant subject eligibility and JEECUP rules apply according to the selected course.",
  "Admission is based on JEECUP entrance examination and counselling guidelines.",
  "Category-wise reservation and relaxation are applicable as per Government of Uttar Pradesh norms."
];

export const admissionProcess = [
  {
    step: "Registration",
    description:
      "Complete the online application form through the official JEECUP portal within the announced schedule."
  },
  {
    step: "Entrance Exam",
    description:
      "Appear for the JEECUP entrance examination as per the allotted date, time, and exam instructions."
  },
  {
    step: "Counselling",
    description:
      "Participate in online counselling, choice filling, seat allotment, and counselling rounds."
  },
  {
    step: "Document Verification",
    description:
      "Submit and verify academic, identity, and reservation-related documents at the designated stage."
  },
  {
    step: "Fee Payment",
    description:
      "Pay admission and institutional fees within the timelines shared during counselling and reporting."
  },
  {
    step: "Admission",
    description:
      "Complete final institute reporting and admission formalities to confirm your seat."
  }
];

export const requiredDocuments = [
  "JEECUP admit card and rank card",
  "JEECUP counselling / allotment letter",
  "Class 10 marksheet and certificate",
  "Transfer certificate",
  "Character certificate",
  "Domicile certificate",
  "Category certificate, if applicable",
  "Income certificate, if applicable",
  "Aadhaar card or valid photo ID",
  "Passport size photographs"
];

export const feeStructure = [
  {
    category: "Tuition Fee",
    amount: "As per Board / Government norms",
    notes: "Subject to annual revision"
  },
  {
    category: "Admission Fee",
    amount: "At the time of reporting",
    notes: "One-time institutional processing"
  },
  {
    category: "Examination Fee",
    amount: "As notified by the board",
    notes: "Collected semester / yearly as applicable"
  },
  {
    category: "Caution Money",
    amount: "Refundable as per rules",
    notes: "Applicable where notified"
  }
];

export const scholarshipContent = {
  title: "Scholarship Support",
  description:
    "Eligible students can apply for state scholarship schemes through the official Uttar Pradesh scholarship portal, subject to category, income, attendance, and document requirements.",
  link: {
    label: "Open Scholarship Portal",
    url: "http://scholarship.up.nic.in/"
  }
};

export const importantLinks = [
  {
    label: "JEECUP Portal",
    url: "https://jeecup.admissions.nic.in/",
    external: true
  },
  {
    label: "Scholarship Portal",
    url: "http://scholarship.up.nic.in/",
    external: true
  },
  {
    label: "AICTE",
    url: "https://www.aicte-india.org/",
    external: true
  },
  {
    label: "Prospectus",
    url: placeholderPdfUrl,
    external: true
  }
];

export const admissionFaqs = [
  {
    id: "faq-1",
    question: "How can I apply for admission?",
    answer:
      "Applications are generally submitted through the official JEECUP portal. Students should follow the published schedule, complete registration, and appear in counselling."
  },
  {
    id: "faq-2",
    question: "Is admission available without JEECUP?",
    answer:
      "Regular admissions typically follow JEECUP procedures. Any special or lateral entry process should be treated according to official notifications released for that session."
  },
  {
    id: "faq-3",
    question: "Which documents are commonly required during verification?",
    answer:
      "Students usually need marksheets, certificates, allotment documents, identity proof, photographs, and category or income certificates where applicable."
  },
  {
    id: "faq-4",
    question: "Where should students apply for scholarship support?",
    answer:
      "Eligible students should use the official Uttar Pradesh scholarship portal and complete form submission with correct academic and personal details."
  }
];
