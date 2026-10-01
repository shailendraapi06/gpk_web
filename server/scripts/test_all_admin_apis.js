/**
 * Comprehensive API Test Suite for GPK Admin Panel & Backend
 * Tests every single endpoint, method (GET, POST, PUT, DELETE), validation, and update flow.
 */

const BASE_URL = "http://localhost:3000/api";
let token = null;

let passedCount = 0;
let failedCount = 0;
const results = [];

async function test(name, fn) {
  try {
    await fn();
    passedCount++;
    results.push({ name, status: "PASS" });
    console.log(`  ✅ PASS: ${name}`);
  } catch (err) {
    failedCount++;
    results.push({ name, status: "FAIL", error: err.message });
    console.error(`  ❌ FAIL: ${name} -> ${err.message}`);
  }
}

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const config = {
    method: options.method || "GET",
    headers
  };

  if (options.body) {
    config.body = typeof options.body === "string" ? options.body : JSON.stringify(options.body);
  }

  const res = await fetch(url, config);
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

async function runAllTests() {
  console.log("=================================================");
  console.log("🧪 STARTING COMPREHENSIVE ADMIN & API TEST SUITE");
  console.log("=================================================\n");

  // 1. Health API
  console.log("--- 1. Health Check ---");
  await test("GET /health responds with 200 and operational status", async () => {
    const res = await request("/health");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.success === true, "Expected success: true");
  });

  // 2. Auth APIs
  console.log("\n--- 2. Auth & Session Management ---");
  await test("POST /auth/login fails on missing credentials", async () => {
    const res = await request("/auth/login", {
      method: "POST",
      body: { email: "", password: "" }
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
  });

  await test("POST /auth/login fails on invalid credentials", async () => {
    const res = await request("/auth/login", {
      method: "POST",
      body: { email: "admin@gpk.ac.in", password: "wrongpassword123" }
    });
    assert(res.status === 401, `Expected 401, got ${res.status}`);
  });

  await test("POST /auth/login succeeds with valid admin credentials", async () => {
    const res = await request("/auth/login", {
      method: "POST",
      body: { email: "admin@gpk.ac.in", password: "admin123" }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.token, "Expected JWT token in response");
    token = res.data.token;
  });

  await test("GET /auth/me returns current authenticated admin profile", async () => {
    const res = await request("/auth/me");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.user.email === "admin@gpk.ac.in", "Expected email admin@gpk.ac.in");
  });

  await test("POST /auth/forgot-password generates 6-digit OTP code", async () => {
    const res = await request("/auth/forgot-password", {
      method: "POST",
      body: { email: "admin@gpk.ac.in" }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.resetCode, "Expected resetCode in response");
    assert(res.data.resetCode.length === 6, "Expected 6 digit OTP");

    // Test resetting password using this OTP
    const resetRes = await request("/auth/reset-password", {
      method: "POST",
      body: {
        email: "admin@gpk.ac.in",
        resetCode: res.data.resetCode,
        newPassword: "admin123_temp"
      }
    });
    assert(resetRes.status === 200, `Expected 200 on reset-password, got ${resetRes.status}`);

    // Verify login with new temporary password
    const loginTemp = await request("/auth/login", {
      method: "POST",
      body: { email: "admin@gpk.ac.in", password: "admin123_temp" }
    });
    assert(loginTemp.status === 200, "Login with reset password should work");
    token = loginTemp.data.token;

    // Reset back to standard password admin123
    const updateBack = await request("/auth/update-password", {
      method: "PUT",
      body: { currentPassword: "admin123_temp", newPassword: "admin123" }
    });
    assert(updateBack.status === 200, "Password update back should work");

    // Re-login with admin123
    const reLogin = await request("/auth/login", {
      method: "POST",
      body: { email: "admin@gpk.ac.in", password: "admin123" }
    });
    assert(reLogin.status === 200, "Re-login with admin123 should work");
    token = reLogin.data.token;
  });

  // 3. Homepage Aggregation
  console.log("\n--- 3. Public Homepage Data ---");
  await test("GET /homepage returns public consolidated data", async () => {
    const res = await request("/homepage");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.homepage, "Expected homepage object");
    assert(Array.isArray(res.data.homepage.heroSlides), "Expected heroSlides array");
    assert(Array.isArray(res.data.homepage.leadership), "Expected leadership array");
  });

  // 4. Hero Slider Management
  console.log("\n--- 4. Hero Slider CRUD ---");
  let testSlideId = null;
  await test("GET /homepage/hero returns slides", async () => {
    const res = await request("/homepage/hero");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(Array.isArray(res.data.slides), "Expected slides array");
  });

  await test("POST /homepage/hero creates a new slide", async () => {
    const res = await request("/homepage/hero", {
      method: "POST",
      body: {
        title: "Test Academic Excellence Slide",
        subtitle: "Testing slider updates from admin panel",
        src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600",
        ctaText: "Apply Now",
        ctaLink: "/admissions"
      }
    });
    assert(res.status === 201, `Expected 201, got ${res.status}`);
    assert(res.data.slide && res.data.slide.id, "Expected created slide ID");
    testSlideId = res.data.slide.id;
  });

  await test("PUT /homepage/hero/:id updates the slide", async () => {
    assert(testSlideId, "Slide ID is required for update test");
    const res = await request(`/homepage/hero/${testSlideId}`, {
      method: "PUT",
      body: {
        title: "Updated Academic Excellence Slide",
        subtitle: "Updated subtitle text",
        src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800"
      }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await test("DELETE /homepage/hero/:id deletes the slide", async () => {
    assert(testSlideId, "Slide ID is required for delete test");
    const res = await request(`/homepage/hero/${testSlideId}`, {
      method: "DELETE"
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  // 5. Leadership Management
  console.log("\n--- 5. Leadership CRUD ---");
  let testLeaderId = null;
  await test("GET /homepage/leadership returns leaders", async () => {
    const res = await request("/homepage/leadership");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(Array.isArray(res.data.leaders), "Expected leaders array");
  });

  await test("POST /homepage/leadership creates new leader", async () => {
    const res = await request("/homepage/leadership", {
      method: "POST",
      body: {
        name: "Shri Test Dignitary",
        designation: "Advisor to Technical Education",
        photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"
      }
    });
    assert(res.status === 201, `Expected 201, got ${res.status}`);
    assert(res.data.leader && res.data.leader.id, "Expected created leader ID");
    testLeaderId = res.data.leader.id;
  });

  await test("PUT /homepage/leadership/:id updates leader", async () => {
    assert(testLeaderId, "Leader ID is required");
    const res = await request(`/homepage/leadership/${testLeaderId}`, {
      method: "PUT",
      body: {
        name: "Shri Test Dignitary Updated",
        designation: "Senior Advisor"
      }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await test("DELETE /homepage/leadership/:id deletes leader", async () => {
    assert(testLeaderId, "Leader ID is required");
    const res = await request(`/homepage/leadership/${testLeaderId}`, {
      method: "DELETE"
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  // 6. Principal Message
  console.log("\n--- 6. Principal Message ---");
  await test("GET /homepage/principal returns principal message", async () => {
    const res = await request("/homepage/principal");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.principal && res.data.principal.name, "Expected principal name");
  });

  await test("PUT /homepage/principal updates principal message", async () => {
    const res = await request("/homepage/principal", {
      method: "PUT",
      body: {
        name: "Dr. A. K. Sharma",
        designation: "Principal, Government Polytechnic Kanpur",
        message: "Updated test welcome message for student development and innovation."
      }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  // 7. Recruiters on Homepage
  console.log("\n--- 7. Recruiters CRUD ---");
  let testRecruiterId = null;
  await test("GET /homepage/recruiters returns recruiters", async () => {
    const res = await request("/homepage/recruiters");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(Array.isArray(res.data.recruiters), "Expected recruiters array");
  });

  await test("POST /homepage/recruiters creates new recruiter", async () => {
    const res = await request("/homepage/recruiters", {
      method: "POST",
      body: {
        name: "Test Global Tech Ltd",
        logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150"
      }
    });
    assert(res.status === 201, `Expected 201, got ${res.status}`);
    testRecruiterId = res.data.recruiter.id;
  });

  await test("PUT /homepage/recruiters/:id updates recruiter", async () => {
    assert(testRecruiterId, "Recruiter ID required");
    const res = await request(`/homepage/recruiters/${testRecruiterId}`, {
      method: "PUT",
      body: { name: "Test Global Tech International" }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await test("DELETE /homepage/recruiters/:id deletes recruiter", async () => {
    assert(testRecruiterId, "Recruiter ID required");
    const res = await request(`/homepage/recruiters/${testRecruiterId}`, {
      method: "DELETE"
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  // 8. Contact Info
  console.log("\n--- 8. Contact Info Management ---");
  await test("GET /homepage/contact-info returns contact items", async () => {
    const res = await request("/homepage/contact-info");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(Array.isArray(res.data.contact), "Expected contact array");
  });

  await test("PUT /homepage/contact-info updates contact info", async () => {
    const res = await request("/homepage/contact-info", {
      method: "PUT",
      body: {
        items: [
          { id: "phone", value: "+91 512 258 0188" },
          { id: "email", value: "info@gpk.ac.in" }
        ]
      }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  // 9. Notices CRUD
  console.log("\n--- 9. Notices Management CRUD ---");
  let testNoticeId = null;
  await test("GET /notices returns notice list", async () => {
    const res = await request("/notices");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(Array.isArray(res.data.notices), "Expected notices array");
  });

  await test("POST /notices creates a new notice", async () => {
    const res = await request("/notices", {
      method: "POST",
      body: {
        title: "Test Notice: Special Technical Workshop Schedule",
        category: "Academic",
        description: "Registration details and schedule for student workshops.",
        date: "01 Oct 2026",
        isNewNotice: true,
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      }
    });
    assert(res.status === 201, `Expected 201, got ${res.status}`);
    assert(res.data.notice && res.data.notice.id, "Expected created notice ID");
    testNoticeId = res.data.notice.id;
  });

  await test("GET /notices/:id fetches created notice", async () => {
    assert(testNoticeId, "Notice ID required");
    const res = await request(`/notices/${testNoticeId}`);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.notice.title.includes("Technical Workshop"), "Expected notice title match");
  });

  await test("PUT /notices/:id updates notice", async () => {
    assert(testNoticeId, "Notice ID required");
    const res = await request(`/notices/${testNoticeId}`, {
      method: "PUT",
      body: {
        title: "Test Notice: Special Technical Workshop (Updated)",
        category: "Examination"
      }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await test("DELETE /notices/:id deletes notice", async () => {
    assert(testNoticeId, "Notice ID required");
    const res = await request(`/notices/${testNoticeId}`, {
      method: "DELETE"
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  // 10. Departments CRUD
  console.log("\n--- 10. Departments Management CRUD ---");
  let testDeptSlug = "mechanical-engineering-test";
  await test("GET /departments returns departments list", async () => {
    const res = await request("/departments");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(Array.isArray(res.data.departments), "Expected departments array");
  });

  await test("POST /departments creates new department", async () => {
    const res = await request("/departments", {
      method: "POST",
      body: {
        name: "Mechanical Engineering Test",
        code: "MET",
        slug: testDeptSlug,
        shortDescription: "Fundamentals of mechanical engineering and design.",
        description: "Detailed curriculum covering thermodynamics, machinery, CAD design, and workshop practices.",
        intake: 60,
        duration: "3 Years",
        establishedYear: 1965,
        hod: {
          name: "Prof. Test HOD",
          designation: "Head of Department, Mechanical Engineering",
          email: "hod.mech@gpk.ac.in",
          phone: "+91 98765 00000"
        }
      }
    });
    assert(res.status === 201, `Expected 201, got ${res.status}`);
  });

  await test("GET /departments/:slug returns department details", async () => {
    const res = await request(`/departments/${testDeptSlug}`);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.department.name === "Mechanical Engineering Test", "Expected name match");
  });

  await test("PUT /departments/:slug updates department", async () => {
    const res = await request(`/departments/${testDeptSlug}`, {
      method: "PUT",
      body: {
        shortDescription: "Updated short description for mechanical testing department.",
        intake: 75
      }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await test("DELETE /departments/:slug deletes department", async () => {
    const res = await request(`/departments/${testDeptSlug}`, {
      method: "DELETE"
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  // 11. Faculty CRUD
  console.log("\n--- 11. Faculty Management CRUD ---");
  let testFacultyId = null;
  await test("GET /faculties returns faculty list", async () => {
    const res = await request("/faculties");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(Array.isArray(res.data.faculties), "Expected faculties array");
  });

  await test("POST /faculties creates new faculty member", async () => {
    const res = await request("/faculties", {
      method: "POST",
      body: {
        name: "Dr. Test Professor",
        designation: "Assistant Professor",
        departmentName: "Computer Science & Engineering",
        qualification: "Ph.D. in Computer Science",
        experience: "10 Years",
        email: "test.professor@gpk.ac.in",
        phone: "+91 99999 88888",
        photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200"
      }
    });
    assert(res.status === 201, `Expected 201, got ${res.status}`);
    assert(res.data.faculty && res.data.faculty.id, "Expected created faculty ID");
    testFacultyId = res.data.faculty.id;
  });

  await test("GET /faculties/:id returns single faculty member", async () => {
    assert(testFacultyId, "Faculty ID required");
    const res = await request(`/faculties/${testFacultyId}`);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.faculty.name === "Dr. Test Professor", "Expected name match");
  });

  await test("PUT /faculties/:id updates faculty member", async () => {
    assert(testFacultyId, "Faculty ID required");
    const res = await request(`/faculties/${testFacultyId}`, {
      method: "PUT",
      body: {
        designation: "Associate Professor",
        experience: "12 Years"
      }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await test("DELETE /faculties/:id deletes faculty member", async () => {
    assert(testFacultyId, "Faculty ID required");
    const res = await request(`/faculties/${testFacultyId}`, {
      method: "DELETE"
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  // 12. Admissions Management
  console.log("\n--- 12. Admissions Management ---");
  await test("GET /admissions returns admission data", async () => {
    const res = await request("/admissions");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.admissions, "Expected admissions data object");
  });

  await test("PUT /admissions updates whole admission configuration", async () => {
    const res = await request("/admissions", {
      method: "PUT",
      body: {
        academicYear: "2026-2027",
        title: "Admissions at Government Polytechnic Kanpur 2026-27"
      }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await test("PUT /admissions/courses updates courses offered", async () => {
    const res = await request("/admissions/courses", {
      method: "PUT",
      body: {
        courses: [
          { course: "Computer Science & Engineering", duration: "3 Years", intake: "60" },
          { course: "Information Technology", duration: "3 Years", intake: "60" }
        ]
      }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await test("PUT /admissions/eligibility updates eligibility criteria", async () => {
    const res = await request("/admissions/eligibility", {
      method: "PUT",
      body: {
        eligibility: [
          "Passed High School / Class 10 with Math and Science.",
          "Valid rank in JEECUP entrance exam."
        ]
      }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await test("PUT /admissions/documents updates required documents", async () => {
    const res = await request("/admissions/documents", {
      method: "PUT",
      body: {
        documents: [
          "JEECUP Allotment Letter",
          "Class 10 Marksheet",
          "Aadhaar Card"
        ]
      }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await test("PUT /admissions/fees updates fee structure", async () => {
    const res = await request("/admissions/fees", {
      method: "PUT",
      body: {
        fees: [
          { category: "Tuition Fee", amount: "₹ 11,010 / year", notes: "Per state government norms" },
          { category: "Exam Fee", amount: "As per BTEUP", notes: "Per semester" }
        ]
      }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await test("PUT /admissions/prospectus updates prospectus URL", async () => {
    const res = await request("/admissions/prospectus", {
      method: "PUT",
      body: {
        prospectusUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  // 13. Placement Management
  console.log("\n--- 13. Placement Management ---");
  await test("GET /placements returns placement data", async () => {
    const res = await request("/placements");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.placement, "Expected placement object");
  });

  await test("PUT /placements/overview-officer updates cell overview & TPO bio", async () => {
    const res = await request("/placements/overview-officer", {
      method: "PUT",
      body: {
        overview: {
          title: "Training & Placement Cell Overview",
          image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800"
        },
        overviewDesc: ["Our placement cell focuses on high employability and technical aptitude."],
        tpo: {
          name: "Prof. Amit Kumar",
          designation: "Training & Placement Officer, GPK",
          email: "tpo@gpk.ac.in",
          phone: "+91 512 258 0188"
        }
      }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await test("PUT /placements/recruiters updates placement recruiter logos", async () => {
    const res = await request("/placements/recruiters", {
      method: "PUT",
      body: {
        recruiters: [
          { name: "Tech Axis India", logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150" },
          { name: "BuildCraft Infrastructure", logo: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=150" }
        ]
      }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await test("PUT /placements/notices updates placement notices", async () => {
    const res = await request("/placements/notices", {
      method: "PUT",
      body: {
        notices: [
          { title: "Special Placement Drive Notice", date: "2026-10-01", actionUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
        ]
      }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await test("PUT /placements/drives updates recruitment drives", async () => {
    const res = await request("/placements/drives", {
      method: "PUT",
      body: {
        drives: [
          { company: "Tech Axis India", date: "2026-10-15", eligibility: "CSE / IT", status: "Upcoming" }
        ]
      }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  // 14. Gallery Management
  console.log("\n--- 14. Gallery Management CRUD ---");
  let testGalleryId = null;
  await test("GET /gallery returns gallery items", async () => {
    const res = await request("/gallery");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(Array.isArray(res.data.items), "Expected items array");
  });

  await test("POST /gallery creates a new gallery photo item", async () => {
    const res = await request("/gallery", {
      method: "POST",
      body: {
        title: "Test Campus Garden Photo",
        category: "Campus",
        type: "photo",
        src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
        featured: true
      }
    });
    assert(res.status === 201, `Expected 201, got ${res.status}`);
    assert(res.data.item && res.data.item.id, "Expected created gallery item ID");
    testGalleryId = res.data.item.id;
  });

  await test("GET /gallery/:id returns single gallery item", async () => {
    assert(testGalleryId, "Gallery ID required");
    const res = await request(`/gallery/${testGalleryId}`);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await test("PUT /gallery/:id updates gallery item", async () => {
    assert(testGalleryId, "Gallery ID required");
    const res = await request(`/gallery/${testGalleryId}`, {
      method: "PUT",
      body: {
        title: "Test Campus Garden Photo (Updated)",
        featured: false
      }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await test("DELETE /gallery/:id deletes gallery item", async () => {
    assert(testGalleryId, "Gallery ID required");
    const res = await request(`/gallery/${testGalleryId}`, {
      method: "DELETE"
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  // 15. Settings & Branding
  console.log("\n--- 15. Website Settings & Branding ---");
  await test("GET /settings returns website settings", async () => {
    const res = await request("/settings");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.settings, "Expected settings object");
  });

  await test("PUT /settings updates settings (ticker, address, phone)", async () => {
    const res = await request("/settings", {
      method: "PUT",
      body: {
        announcementTicker: "Admissions 2026 registration is currently live. Verify details on portal.",
        phone: "+91 512 258 0188",
        email: "info@gpk.ac.in"
      }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  // 16. Contact Inquiries
  console.log("\n--- 16. Contact Messages & Submissions ---");
  let testMsgId = null;
  await test("POST /contact submits public inquiry", async () => {
    const res = await request("/contact", {
      method: "POST",
      body: {
        name: "Test Inquirer Student",
        email: "test.student@example.com",
        phone: "+91 98765 43210",
        subject: "Diploma Admission Schedule Inquiry",
        message: "When does the second round of JEECUP counseling start?"
      }
    });
    assert(res.status === 201, `Expected 201, got ${res.status}`);
    assert(res.data.data && res.data.data.id, "Expected created message ID");
    testMsgId = res.data.data.id;
  });

  await test("GET /contact returns messages list for admin", async () => {
    const res = await request("/contact");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(Array.isArray(res.data.data), "Expected messages array");
  });

  await test("PUT /contact/:id/status updates inquiry status to read", async () => {
    assert(testMsgId, "Message ID required");
    const res = await request(`/contact/${testMsgId}/status`, {
      method: "PUT",
      body: { status: "read" }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await test("DELETE /contact/:id deletes inquiry", async () => {
    assert(testMsgId, "Message ID required");
    const res = await request(`/contact/${testMsgId}`, {
      method: "DELETE"
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  // 17. Upload Endpoints
  console.log("\n--- 17. Media Upload Endpoints ---");
  await test("POST /upload uploads base64 image gracefully", async () => {
    // 1x1 transparent gif base64
    const sampleImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    const res = await request("/upload", {
      method: "POST",
      body: {
        file: sampleImage,
        folder: "gpk_test"
      }
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.data && res.data.data.url, "Expected upload URL");
  });

  // 18. Logout
  console.log("\n--- 18. Logout ---");
  await test("POST /auth/logout clears session", async () => {
    const res = await request("/auth/logout", {
      method: "POST"
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  console.log("\n=================================================");
  console.log(`📊 TEST SUITE SUMMARY: ${passedCount} PASSED | ${failedCount} FAILED`);
  console.log("=================================================");

  if (failedCount > 0) {
    console.error(`\n❌ ${failedCount} tests failed. Please inspect logs above.`);
    process.exit(1);
  } else {
    console.log("\n🎉 ALL ADMIN APIs AND UPDATES ARE 100% OPERATIONAL!");
    process.exit(0);
  }
}

runAllTests().catch((err) => {
  console.error("Fatal test runner error:", err);
  process.exit(1);
});
