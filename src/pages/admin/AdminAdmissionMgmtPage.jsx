import React, { useState, useEffect } from "react";
import { PlusIcon, EditIcon, DeleteIcon, DocumentIcon, DownloadIcon } from "../../components/admin/Icons";
import { DeleteConfirmationModal } from "../../components/admin/DeleteConfirmationModal";
import { apiRequest } from "../../services/api/client";

export function AdminAdmissionMgmtPage() {
  const [activeTab, setActiveTab] = useState("courses");
  const [alertInfo, setAlertInfo] = useState({ show: false, text: "", type: "success" });

  const triggerAlert = (text, type = "success") => {
    setAlertInfo({ show: true, text, type });
    setTimeout(() => setAlertInfo({ show: false, text: "", type: "success" }), 3000);
  };

  // --- STATE 1: Courses Offered (course, duration, intake) ---
  const [courses, setCourses] = useState([
    { id: "c-1", course: "Computer Science & Engineering", duration: "3 Years", intake: "60" },
    { id: "c-2", course: "Information Technology", duration: "3 Years", intake: "60" },
    { id: "c-3", course: "Artificial Intelligence & Machine Learning", duration: "3 Years", intake: "60" },
    { id: "c-4", course: "Civil Engineering", duration: "3 Years", intake: "60" },
    { id: "c-5", course: "Mechanical Engineering", duration: "3 Years", intake: "60" }
  ]);
  const [isCourseFormOpen, setIsCourseFormOpen] = useState(false);
  const [isCourseDeleteOpen, setIsCourseDeleteOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [courseFormData, setCourseFormData] = useState({ course: "", duration: "3 Years", intake: "60" });

  // --- STATE 2: Eligibility Criteria (simple array of strings) ---
  const [eligibilityList, setEligibilityList] = useState([
    "Candidates should have passed High School / Class 10 or equivalent from a recognized board.",
    "Relevant subject eligibility and JEECUP rules apply according to the selected course.",
    "Admission is based on JEECUP entrance examination and counselling guidelines.",
    "Category-wise reservation and relaxation are applicable as per Government of Uttar Pradesh norms."
  ]);
  const [newEligText, setNewEligText] = useState("");

  // --- STATE 3: Required Documents (simple array of strings) ---
  const [documentsList, setDocumentsList] = useState([
    "JEECUP admit card and rank card",
    "JEECUP counselling / allotment letter",
    "Class 10 marksheet and certificate",
    "Transfer certificate",
    "Character certificate",
    "Domicile certificate"
  ]);
  const [newDocText, setNewDocText] = useState("");

  // --- STATE 4: Fee Structure (category, amount, notes) ---
  const [fees, setFees] = useState([
    { id: "fee-1", category: "Tuition Fee", amount: "As per Board / Government norms", notes: "Subject to annual revision" },
    { id: "fee-2", category: "Admission Fee", amount: "At the time of reporting", notes: "One-time institutional processing" },
    { id: "fee-3", category: "Examination Fee", amount: "As notified by the board", notes: "Collected semester / yearly as applicable" },
    { id: "fee-4", category: "Caution Money", amount: "Refundable as per rules", notes: "Applicable where notified" }
  ]);
  const [isFeeFormOpen, setIsFeeFormOpen] = useState(false);
  const [currentFee, setCurrentFee] = useState(null);
  const [feeFormData, setFeeFormData] = useState({ category: "", amount: "", notes: "" });

  // --- STATE 5: Prospectus Link (part of importantLinks on site) ---
  const [prospectusUrl, setProspectusUrl] = useState("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");

  useEffect(() => {
    async function fetchAdmissions() {
      try {
        const res = await apiRequest("/admissions");
        if (res && res.admissions) {
          const adm = res.admissions;
          if (adm.coursesOffered && adm.coursesOffered.length > 0) {
            setCourses(adm.coursesOffered);
          }
          if (adm.eligibilityCriteria && adm.eligibilityCriteria.length > 0) {
            setEligibilityList(adm.eligibilityCriteria);
          }
          if (adm.requiredDocuments && adm.requiredDocuments.length > 0) {
            setDocumentsList(adm.requiredDocuments);
          }
          if (adm.feeStructure && adm.feeStructure.length > 0) {
            setFees(adm.feeStructure);
          }
          if (adm.prospectusUrl) {
            setProspectusUrl(adm.prospectusUrl);
          }
        }
      } catch (err) {
        console.warn("Could not load admission settings from API:", err);
      }
    }
    fetchAdmissions();
  }, []);

  // Helper to sync updated courses to backend
  const syncCoursesToBackend = async (newCourses) => {
    try {
      await apiRequest("/admissions/courses", {
        method: "PUT",
        body: JSON.stringify({ courses: newCourses })
      });
    } catch (err) {
      console.warn("API course sync failed, updated locally:", err);
    }
  };

  // Helper to sync eligibility list
  const syncEligibilityToBackend = async (newEligibility) => {
    try {
      await apiRequest("/admissions/eligibility", {
        method: "PUT",
        body: JSON.stringify({ eligibility: newEligibility })
      });
    } catch (err) {
      console.warn("API eligibility sync failed, updated locally:", err);
    }
  };

  // Helper to sync documents list
  const syncDocumentsToBackend = async (newDocs) => {
    try {
      await apiRequest("/admissions/documents", {
        method: "PUT",
        body: JSON.stringify({ documents: newDocs })
      });
    } catch (err) {
      console.warn("API document sync failed, updated locally:", err);
    }
  };

  // Helper to sync fee structure
  const syncFeesToBackend = async (newFees) => {
    try {
      await apiRequest("/admissions/fees", {
        method: "PUT",
        body: JSON.stringify({ fees: newFees })
      });
    } catch (err) {
      console.warn("API fee sync failed, updated locally:", err);
    }
  };

  // ==========================================
  // --- HANDLERS 1: Courses ---
  // ==========================================
  const handleCourseAdd = () => {
    setCurrentCourse(null);
    setCourseFormData({ course: "", duration: "3 Years", intake: "60" });
    setIsCourseFormOpen(true);
  };
  const handleCourseEdit = (crs) => {
    setCurrentCourse(crs);
    setCourseFormData({ course: crs.course, duration: crs.duration, intake: crs.intake });
    setIsCourseFormOpen(true);
  };
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    if (!courseFormData.course) return;

    let updated = [];
    if (currentCourse) {
      updated = courses.map(c => c.id === currentCourse.id ? { ...c, ...courseFormData } : c);
      setCourses(updated);
      triggerAlert("Course updated successfully!");
    } else {
      updated = [...courses, { id: `c-${Date.now()}`, ...courseFormData }];
      setCourses(updated);
      triggerAlert("New Course added successfully!");
    }
    await syncCoursesToBackend(updated);
    setIsCourseFormOpen(false);
  };
  const handleCourseDelete = (crs) => {
    setCourseToDelete(crs);
    setIsCourseDeleteOpen(true);
  };
  const handleCourseConfirmDelete = async () => {
    const updated = courses.filter(c => c.id !== courseToDelete.id);
    setCourses(updated);
    setIsCourseDeleteOpen(false);
    await syncCoursesToBackend(updated);
    triggerAlert("Course deleted successfully!", "error");
  };

  // ==========================================
  // --- HANDLERS 2: Eligibility & Documents ---
  // ==========================================
  const handleAddEligibility = async (e) => {
    e.preventDefault();
    if (!newEligText.trim()) return;
    const updated = [...eligibilityList, newEligText.trim()];
    setEligibilityList(updated);
    setNewEligText("");
    await syncEligibilityToBackend(updated);
    triggerAlert("Eligibility criteria rule added!");
  };
  const handleRemoveEligibility = async (idx) => {
    const updated = eligibilityList.filter((_, i) => i !== idx);
    setEligibilityList(updated);
    await syncEligibilityToBackend(updated);
    triggerAlert("Eligibility criteria rule removed!", "error");
  };

  const handleAddDoc = async (e) => {
    e.preventDefault();
    if (!newDocText.trim()) return;
    const updated = [...documentsList, newDocText.trim()];
    setDocumentsList(updated);
    setNewDocText("");
    await syncDocumentsToBackend(updated);
    triggerAlert("Required document item added!");
  };
  const handleRemoveDoc = async (idx) => {
    const updated = documentsList.filter((_, i) => i !== idx);
    setDocumentsList(updated);
    await syncDocumentsToBackend(updated);
    triggerAlert("Required document item removed!", "error");
  };

  // ==========================================
  // --- HANDLERS 3: Fees ---
  // ==========================================
  const handleFeeEdit = (fee) => {
    setCurrentFee(fee);
    setFeeFormData({ category: fee.category, amount: fee.amount, notes: fee.notes });
    setIsFeeFormOpen(true);
  };
  const handleFeeSubmit = async (e) => {
    e.preventDefault();
    const updated = fees.map(f => f.id === currentFee.id ? { ...f, ...feeFormData } : f);
    setFees(updated);
    setIsFeeFormOpen(false);
    await syncFeesToBackend(updated);
    triggerAlert("Fee structure item saved!");
  };

  // ==========================================
  // --- HANDLERS 4: Prospectus ---
  // ==========================================
  const handleProspectusSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest("/admissions/prospectus", {
        method: "PUT",
        body: JSON.stringify({ prospectusUrl })
      });
      triggerAlert("Prospectus document link saved successfully!");
    } catch (err) {
      console.warn("Prospectus API update failed, saved locally:", err);
      triggerAlert("Prospectus link saved locally!");
    }
  };


  return (
    <div>
      {/* Alert toast */}
      {alertInfo.show && (
        <div className={`admin-badge ${alertInfo.type === "success" ? "admin-badge--success" : "admin-badge--error"}`} style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1100, padding: "0.75rem 1.5rem", boxShadow: "var(--shadow-md)" }}>
          {alertInfo.text}
        </div>
      )}

      <div className="admin-page-header">
        <div className="admin-page-header__info">
          <h1 className="admin-page-header__title">Admissions Page Editor</h1>
          <p className="admin-page-header__desc">Directly manage admissions tables, criteria lists, and PDF prospectus links matching the live site fields.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-settings-tabs">
        <button className={`admin-settings-tab ${activeTab === "courses" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("courses")}>Courses Offered</button>
        <button className={`admin-settings-tab ${activeTab === "eligibility" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("eligibility")}>Eligibility & Documents</button>
        <button className={`admin-settings-tab ${activeTab === "fees" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("fees")}>Fee Structure</button>
        <button className={`admin-settings-tab ${activeTab === "prospectus" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("prospectus")}>Prospectus PDF</button>
      </div>

      {/* ========================== TAB 1: COURSES OFFERED ========================== */}
      {activeTab === "courses" && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ margin: 0, color: "var(--color-primary-900)" }}>Academic Courses</h3>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={handleCourseAdd}>
              <PlusIcon style={{ width: "14px", height: "14px" }} /> Add Course
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Course / Discipline Name</th>
                  <th style={{ width: "120px" }}>Duration</th>
                  <th style={{ width: "120px" }}>Intake Seat Limit</th>
                  <th style={{ width: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((crs) => (
                  <tr key={crs.id}>
                    <td style={{ fontWeight: "bold" }}>{crs.course}</td>
                    <td>{crs.duration}</td>
                    <td style={{ fontWeight: "bold" }}>{crs.intake}</td>
                    <td>
                      <div className="admin-table__actions">
                        <button className="admin-table__action-btn admin-table__action-btn--edit" onClick={() => handleCourseEdit(crs)}><EditIcon /></button>
                        <button className="admin-table__action-btn admin-table__action-btn--delete" onClick={() => handleCourseDelete(crs)}><DeleteIcon /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================== TAB 2: ELIGIBILITY & REQUIRED DOCUMENTS ========================== */}
      {activeTab === "eligibility" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "flex-start" }} className="admin-form-group--row">
          {/* Eligibility Criteria */}
          <div className="admin-card" style={{ margin: 0 }}>
            <h3 className="admin-card__title">Eligibility Rules Checklist</h3>
            <form onSubmit={handleAddEligibility} style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <input type="text" className="admin-input" placeholder="Add eligibility criteria sentence..." value={newEligText} onChange={(e) => setNewEligText(e.target.value)} required />
              <button type="submit" className="admin-btn admin-btn--primary" style={{ padding: "0 1.25rem" }}>Add</button>
            </form>

            <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: 0, listStyle: "none" }}>
              {eligibilityList.map((item, idx) => (
                <li key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", fontSize: "13px" }}>
                  <span style={{ flex: 1, paddingRight: "10px" }}>{item}</span>
                  <button type="button" className="admin-btn admin-btn--danger admin-btn--sm" style={{ padding: "4px" }} onClick={() => handleRemoveEligibility(idx)}>
                    <DeleteIcon style={{ width: "12px", height: "12px" }} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Documents */}
          <div className="admin-card" style={{ margin: 0 }}>
            <h3 className="admin-card__title">Documents Required Checklist</h3>
            <form onSubmit={handleAddDoc} style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <input type="text" className="admin-input" placeholder="Add required document name..." value={newDocText} onChange={(e) => setNewDocText(e.target.value)} required />
              <button type="submit" className="admin-btn admin-btn--primary" style={{ padding: "0 1.25rem" }}>Add</button>
            </form>

            <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: 0, listStyle: "none" }}>
              {documentsList.map((item, idx) => (
                <li key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", fontSize: "13px" }}>
                  <span style={{ flex: 1, paddingRight: "10px" }}>{item}</span>
                  <button type="button" className="admin-btn admin-btn--danger admin-btn--sm" style={{ padding: "4px" }} onClick={() => handleRemoveDoc(idx)}>
                    <DeleteIcon style={{ width: "12px", height: "12px" }} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ========================== TAB 3: FEE STRUCTURE ========================== */}
      {activeTab === "fees" && (
        <div className="admin-card">
          <h3 className="admin-card__title">Tuition & Admission Fees Matrix</h3>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Fee Head / Category</th>
                  <th style={{ width: "180px" }}>Amount Label</th>
                  <th>Notes / Description Details</th>
                  <th style={{ width: "100px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee) => (
                  <tr key={fee.id}>
                    <td style={{ fontWeight: "bold" }}>{fee.category}</td>
                    <td style={{ fontWeight: "bold", color: "var(--color-primary-500)" }}>{fee.amount}</td>
                    <td>{fee.notes}</td>
                    <td>
                      <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => handleFeeEdit(fee)}><EditIcon /> Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================== TAB 4: PROSPECTUS PDF HANDBOOK ========================== */}
      {activeTab === "prospectus" && (
        <form onSubmit={handleProspectusSubmit} className="admin-card" style={{ maxWidth: "600px" }}>
          <h3 className="admin-card__title">Handbook Prospectus Link</h3>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "1.25rem", border: "1px dashed var(--color-neutral-300)", borderRadius: "var(--radius-sm)", backgroundColor: "var(--color-neutral-50)", marginBottom: "1.5rem" }}>
            <DocumentIcon style={{ width: "36px", height: "36px", color: "red" }} />
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>Official Admissions Prospectus</h4>
              <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>Linked in Important Links section of public site</span>
            </div>
            <a href={prospectusUrl} target="_blank" rel="noreferrer" className="admin-btn admin-btn--secondary" style={{ display: "inline-flex" }}>
              <DownloadIcon style={{ width: "14px", height: "14px" }} /> Preview Document
            </a>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Prospectus PDF URL</label>
            <input type="url" className="admin-input" value={prospectusUrl} onChange={(e) => setProspectusUrl(e.target.value)} required />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="admin-btn admin-btn--primary">Save Prospectus Link</button>
          </div>
        </form>
      )}


      {/* ========================================================
          MODALS & FORM DRAWERS
          ======================================================== */}
      
      {/* Course Modal */}
      {isCourseFormOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up" style={{ maxWidth: "450px" }}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentCourse ? "Edit Diploma Course" : "Add Diploma Course"}</h3>
              <span className="admin-modal__close" onClick={() => setIsCourseFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleCourseSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Course / Discipline Name *</label>
                  <input type="text" className="admin-input" value={courseFormData.course} onChange={(e) => setCourseFormData({ ...courseFormData, course: e.target.value })} placeholder="e.g. Computer Science & Engineering" required />
                </div>
                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">Duration *</label>
                    <input type="text" className="admin-input" value={courseFormData.duration} onChange={(e) => setCourseFormData({ ...courseFormData, duration: e.target.value })} placeholder="e.g. 3 Years" required />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Intake Seat Capacity *</label>
                    <input type="text" className="admin-input" value={courseFormData.intake} onChange={(e) => setCourseFormData({ ...courseFormData, intake: e.target.value })} placeholder="e.g. 60" required />
                  </div>
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsCourseFormOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Save Course</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fee structure Edit Modal */}
      {isFeeFormOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up" style={{ maxWidth: "450px" }}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">Edit Fee Head</h3>
              <span className="admin-modal__close" onClick={() => setIsFeeFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleFeeSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Fee Head / Category</label>
                  <input type="text" className="admin-input" value={feeFormData.category} disabled />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Amount / Fee Value Label *</label>
                  <input type="text" className="admin-input" value={feeFormData.amount} onChange={(e) => setFeeFormData({ ...feeFormData, amount: e.target.value })} required />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Notes / Description Details *</label>
                  <textarea className="admin-textarea" value={feeFormData.notes} onChange={(e) => setFeeFormData({ ...feeFormData, notes: e.target.value })} required style={{ minHeight: "60px" }} />
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsFeeFormOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Save Fee</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Warning */}
      <DeleteConfirmationModal isOpen={isCourseDeleteOpen} onClose={() => setIsCourseDeleteOpen(false)} onConfirm={handleCourseConfirmDelete} itemName={courseToDelete?.course || ""} itemType="diploma course" />
    </div>
  );
}
