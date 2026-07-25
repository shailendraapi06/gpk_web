import React, { useState, useEffect } from "react";
import { PlusIcon, EditIcon, DeleteIcon, DocumentIcon, DownloadIcon } from "../../components/admin/Icons";
import { DeleteConfirmationModal } from "../../components/admin/DeleteConfirmationModal";
import { apiRequest } from "../../services/api/client";

export function AdminPlacementPage() {
  const [activeTab, setActiveTab] = useState("tpo");
  const [alertInfo, setAlertInfo] = useState({ show: false, text: "", type: "success" });

  const triggerAlert = (text, type = "success") => {
    setAlertInfo({ show: true, text, type });
    setTimeout(() => setAlertInfo({ show: false, text: "", type: "success" }), 3000);
  };

  // --- STATE 1: Placement Cell Overview (title, description, image, imageAlt) ---
  const [overview, setOverview] = useState({
    title: "Placement Cell Overview",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Training and placement office discussion"
  });
  const [overviewDesc, setOverviewDesc] = useState("The Training and Placement Cell coordinates employment searches, industry networking, recruitment campaigns, and student pre-placement orientation. The cell helps students connect core technical capabilities with recruiters.");

  // --- STATE 2: TPO Leadership (name, designation, photo: {src}, contact: {email, phone, officeHours}, profileUrl) ---
  const [tpo, setTpo] = useState({
    name: "Prof. Amit Kumar",
    designation: "Training & Placement Officer, GPK",
    photo: { src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" },
    email: "tpo@gpk.ac.in",
    phone: "+91 512 258 0188",
    officeHours: "Monday to Saturday, 10:00 AM to 5:00 PM",
    profileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  });

  // --- STATE 3: Recruiter network (name, logo) ---
  const [recruiters, setRecruiters] = useState([
    { id: "rec-1", name: "Tech Axis", logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150&auto=format&fit=crop" },
    { id: "rec-2", name: "BuildCraft India", logo: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=150&auto=format&fit=crop" },
    { id: "rec-3", name: "Prime Electro", logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150&auto=format&fit=crop" }
  ]);
  const [isRecFormOpen, setIsRecFormOpen] = useState(false);
  const [isRecDeleteOpen, setIsRecDeleteOpen] = useState(false);
  const [currentRecruiter, setCurrentRecruiter] = useState(null);
  const [recruiterToDelete, setRecruiterToDelete] = useState(null);
  const [recruiterFormData, setRecruiterFormData] = useState({ name: "", logo: "" });

  // --- STATE 4: Placement Notices (id, date, title, actionLabel, actionUrl) ---
  const [notices, setNotices] = useState([
    { id: "pn-1", date: "10 Jul 2026", title: "Campus recruitment registration for final year diploma students", actionLabel: "View PDF", actionUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: "pn-2", date: "04 Jul 2026", title: "Aptitude and interview preparation workshop schedule", actionLabel: "View PDF", actionUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
  ]);
  const [isNoticeFormOpen, setIsNoticeFormOpen] = useState(false);
  const [isNoticeDeleteOpen, setIsNoticeDeleteOpen] = useState(false);
  const [currentNotice, setCurrentNotice] = useState(null);
  const [noticeToDelete, setNoticeToDelete] = useState(null);
  const [noticeFormData, setNoticeFormData] = useState({ date: "", title: "", actionLabel: "View PDF", actionUrl: "" });

  // --- STATE 5: Placement Drives (id, company, date, eligibility, status, actionLabel, actionUrl) ---
  const [drives, setDrives] = useState([
    { id: "drv-1", company: "Tech Axis", date: "2026-07-22", eligibility: "CSE / IT / AIML, 60% and above", status: "Applications Open", actionLabel: "Apply", actionUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: "drv-2", company: "BuildCraft India", date: "2026-07-27", eligibility: "Civil / Mechanical, 55% and above", status: "Upcoming", actionLabel: "Register", actionUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: "drv-3", company: "Prime Electro", date: "2026-08-02", eligibility: "Electrical / Electronics, 60% and above", status: "Registration Soon", actionLabel: "Details", actionUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
  ]);
  const [isDriveFormOpen, setIsDriveFormOpen] = useState(false);
  const [isDriveDeleteOpen, setIsDriveDeleteOpen] = useState(false);
  const [currentDrive, setCurrentDrive] = useState(null);
  const [driveToDelete, setDriveToDelete] = useState(null);
  const [driveFormData, setDriveFormData] = useState({ company: "", date: "", eligibility: "", status: "Upcoming", actionLabel: "Apply", actionUrl: "" });

  // Fetch initial data on mount
  useEffect(() => {
    async function fetchPlacementData() {
      try {
        const res = await apiRequest("/placements");
        if (res && res.placement) {
          const p = res.placement;
          if (p.placementOverview) {
            setOverview({
              title: p.placementOverview.title || "Placement Cell Overview",
              image: p.placementOverview.image || "",
              imageAlt: p.placementOverview.imageAlt || "Training and placement office discussion"
            });
            if (p.placementOverview.description) {
              const descStr = Array.isArray(p.placementOverview.description)
                ? p.placementOverview.description.join("\n\n")
                : p.placementOverview.description;
              setOverviewDesc(descStr);
            }
          }
          if (p.placementOfficer) {
            let photoSrc = p.placementOfficer.photo;
            if (typeof photoSrc === "object" && photoSrc?.src) photoSrc = photoSrc.src;
            setTpo({
              name: p.placementOfficer.name || "Prof. Amit Kumar",
              designation: p.placementOfficer.designation || "Training & Placement Officer, GPK",
              photo: { src: photoSrc || "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" },
              email: p.placementOfficer.contact?.email || p.placementOfficer.email || "tpo@gpk.ac.in",
              phone: p.placementOfficer.contact?.phone || p.placementOfficer.phone || "+91 512 258 0188",
              officeHours: p.placementOfficer.contact?.officeHours || p.placementOfficer.officeHours || "Monday to Saturday, 10:00 AM to 5:00 PM",
              profileUrl: p.placementOfficer.profileUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            });
          }
          if (p.recruiters && p.recruiters.length > 0) {
            setRecruiters(p.recruiters);
          }
          if (p.placementNotices && p.placementNotices.length > 0) {
            setNotices(p.placementNotices);
          }
          if (p.placementDrives && p.placementDrives.length > 0) {
            setDrives(p.placementDrives);
          }
        }
      } catch (err) {
        console.warn("Could not fetch placement settings from API:", err);
      }
    }
    fetchPlacementData();
  }, []);

  // Helper sync calls
  const syncOverviewAndTpoToBackend = async (ov, ovDesc, tpoData) => {
    try {
      await apiRequest("/placements/overview-officer", {
        method: "PUT",
        body: JSON.stringify({ overview: ov, overviewDesc: ovDesc, tpo: tpoData })
      });
    } catch (err) {
      console.warn("API Overview/TPO update failed:", err);
    }
  };

  const syncRecruitersToBackend = async (recs) => {
    try {
      await apiRequest("/placements/recruiters", {
        method: "PUT",
        body: JSON.stringify({ recruiters: recs })
      });
    } catch (err) {
      console.warn("API Recruiters update failed:", err);
    }
  };

  const syncNoticesToBackend = async (ntcs) => {
    try {
      await apiRequest("/placements/notices", {
        method: "PUT",
        body: JSON.stringify({ notices: ntcs })
      });
    } catch (err) {
      console.warn("API Notices update failed:", err);
    }
  };

  const syncDrivesToBackend = async (drvs) => {
    try {
      await apiRequest("/placements/drives", {
        method: "PUT",
        body: JSON.stringify({ drives: drvs })
      });
    } catch (err) {
      console.warn("API Drives update failed:", err);
    }
  };

  // ==========================================
  // --- HANDLERS 1: Overview & TPO ---
  // ==========================================
  const handleOverviewSubmit = async (e) => {
    e.preventDefault();
    await syncOverviewAndTpoToBackend(overview, overviewDesc, tpo);
    triggerAlert("Placement Cell details updated successfully!");
  };
  const handleTpoSubmit = async (e) => {
    e.preventDefault();
    await syncOverviewAndTpoToBackend(overview, overviewDesc, tpo);
    triggerAlert("Placement Officer profile saved!");
  };

  // ==========================================
  // --- HANDLERS 2: Recruiters ---
  // ==========================================
  const handleRecruiterAdd = () => {
    setCurrentRecruiter(null);
    setRecruiterFormData({ name: "", logo: "" });
    setIsRecFormOpen(true);
  };
  const handleRecruiterEdit = (rec) => {
    setCurrentRecruiter(rec);
    setRecruiterFormData({ name: rec.name, logo: rec.logo });
    setIsRecFormOpen(true);
  };
  const handleRecruiterSubmit = async (e) => {
    e.preventDefault();
    if (!recruiterFormData.name || !recruiterFormData.logo) return;

    let updated = [];
    if (currentRecruiter) {
      updated = recruiters.map(r => r.id === currentRecruiter.id ? { ...r, ...recruiterFormData } : r);
      setRecruiters(updated);
      triggerAlert("Recruiter logo updated successfully!");
    } else {
      updated = [...recruiters, { id: `rec-${Date.now()}`, ...recruiterFormData }];
      setRecruiters(updated);
      triggerAlert("New recruiter logo linked successfully!");
    }
    await syncRecruitersToBackend(updated);
    setIsRecFormOpen(false);
  };
  const handleRecruiterDelete = (rec) => {
    setRecruiterToDelete(rec);
    setIsRecDeleteOpen(true);
  };
  const handleRecruiterConfirmDelete = async () => {
    const updated = recruiters.filter(r => r.id !== recruiterToDelete.id);
    setRecruiters(updated);
    setIsRecDeleteOpen(false);
    await syncRecruitersToBackend(updated);
    triggerAlert("Recruiter logo deleted successfully!", "error");
  };

  // ==========================================
  // --- HANDLERS 3: Notices ---
  // ==========================================
  const handleNoticeAdd = () => {
    setCurrentNotice(null);
    setNoticeFormData({ date: "", title: "", actionLabel: "View PDF", actionUrl: "" });
    setIsNoticeFormOpen(true);
  };
  const handleNoticeEdit = (ntc) => {
    setCurrentNotice(ntc);
    setNoticeFormData({ date: ntc.date, title: ntc.title, actionLabel: ntc.actionLabel, actionUrl: ntc.actionUrl });
    setIsNoticeFormOpen(true);
  };
  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    let updated = [];
    if (currentNotice) {
      updated = notices.map(n => n.id === currentNotice.id ? { ...n, ...noticeFormData } : n);
      setNotices(updated);
      triggerAlert("Placement notice updated!");
    } else {
      updated = [{ id: `pn-${Date.now()}`, ...noticeFormData }, ...notices];
      setNotices(updated);
      triggerAlert("Placement notice published!");
    }
    await syncNoticesToBackend(updated);
    setIsNoticeFormOpen(false);
  };
  const handleNoticeDelete = (ntc) => {
    setNoticeToDelete(ntc);
    setIsNoticeDeleteOpen(true);
  };
  const handleNoticeConfirmDelete = async () => {
    const updated = notices.filter(n => n.id !== noticeToDelete.id);
    setNotices(updated);
    setIsNoticeDeleteOpen(false);
    await syncNoticesToBackend(updated);
    triggerAlert("Placement notice deleted!", "error");
  };

  // ==========================================
  // --- HANDLERS 4: Drives ---
  // ==========================================
  const handleDriveAdd = () => {
    setCurrentDrive(null);
    setDriveFormData({ company: "", date: "", eligibility: "", status: "Upcoming", actionLabel: "Apply", actionUrl: "" });
    setIsDriveFormOpen(true);
  };
  const handleDriveEdit = (drv) => {
    setCurrentDrive(drv);
    setDriveFormData({ company: drv.company, date: drv.date, eligibility: drv.eligibility, status: drv.status, actionLabel: drv.actionLabel, actionUrl: drv.actionUrl });
    setIsDriveFormOpen(true);
  };
  const handleDriveSubmit = async (e) => {
    e.preventDefault();
    let updated = [];
    if (currentDrive) {
      updated = drives.map(d => d.id === currentDrive.id ? { ...d, ...driveFormData } : d);
      setDrives(updated);
      triggerAlert("Recruitment drive updated!");
    } else {
      updated = [...drives, { id: `drv-${Date.now()}`, ...driveFormData }];
      setDrives(updated);
      triggerAlert("New recruitment drive registered!");
    }
    await syncDrivesToBackend(updated);
    setIsDriveFormOpen(false);
  };
  const handleDriveDelete = (drv) => {
    setDriveToDelete(drv);
    setIsDriveDeleteOpen(true);
  };
  const handleDriveConfirmDelete = async () => {
    const updated = drives.filter(d => d.id !== driveToDelete.id);
    setDrives(updated);
    setIsDriveDeleteOpen(false);
    await syncDrivesToBackend(updated);
    triggerAlert("Recruitment drive deleted successfully!", "error");
  };

  return (
    <div>
      {/* Toast popup */}
      {alertInfo.show && (
        <div className={`admin-badge ${alertInfo.type === "success" ? "admin-badge--success" : "admin-badge--error"}`} style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1100, padding: "0.75rem 1.5rem", boxShadow: "var(--shadow-md)" }}>
          {alertInfo.text}
        </div>
      )}

      <div className="admin-page-header">
        <div className="admin-page-header__info">
          <h1 className="admin-page-header__title">Placement Cell Editor</h1>
          <p className="admin-page-header__desc">Directly manage recruiters lists, placement updates, and campus drives tables.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-settings-tabs">
        <button className={`admin-settings-tab ${activeTab === "tpo" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("tpo")}>Cell & Officer Bio</button>
        <button className={`admin-settings-tab ${activeTab === "recruiters" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("recruiters")}>Recruiter Logos</button>
        <button className={`admin-settings-tab ${activeTab === "notices" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("notices")}>Placement Notices</button>
        <button className={`admin-settings-tab ${activeTab === "drives" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("drives")}>Campus Drives</button>
      </div>

      {/* ========================== TAB 1: CELL COVER & TPO ========================== */}
      {activeTab === "tpo" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "flex-start" }} className="admin-form-group--row">
          {/* Cell Overview Form */}
          <form onSubmit={handleOverviewSubmit} className="admin-card" style={{ margin: 0 }}>
            <h3 className="admin-card__title">Placement Cell Overview</h3>

            <div className="admin-form-group">
              <label className="admin-label">Section Title</label>
              <input type="text" className="admin-input" value={overview.title} onChange={(e) => setOverview({ ...overview, title: e.target.value })} required />
            </div>

            <div className="admin-form-group">
              <label className="admin-label font-bold">Image URL *</label>
              <input type="url" className="admin-input" value={overview.image} onChange={(e) => setOverview({ ...overview, image: e.target.value })} required />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Image Alt Description</label>
              <input type="text" className="admin-input" value={overview.imageAlt} onChange={(e) => setOverview({ ...overview, imageAlt: e.target.value })} />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Overview Description Summary</label>
              <textarea className="admin-textarea" value={overviewDesc} onChange={(e) => setOverviewDesc(e.target.value)} required style={{ minHeight: "100px" }} />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button type="submit" className="admin-btn admin-btn--primary">Save Overview Info</button>
            </div>
          </form>

          {/* TPO Officer Info */}
          <form onSubmit={handleTpoSubmit} className="admin-card" style={{ margin: 0 }}>
            <h3 className="admin-card__title">Placement Officer Bio Desk</h3>

            <div className="admin-form-group--row">
              <div className="admin-form-group">
                <label className="admin-label">Officer Name</label>
                <input type="text" className="admin-input" value={tpo.name} onChange={(e) => setTpo({ ...tpo, name: e.target.value })} required />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Official Designation</label>
                <input type="text" className="admin-input" value={tpo.designation} onChange={(e) => setTpo({ ...tpo, designation: e.target.value })} required />
              </div>
            </div>

            <div className="admin-form-group--row">
              <div className="admin-form-group">
                <label className="admin-label">Officer Email</label>
                <input type="email" className="admin-input" value={tpo.email} onChange={(e) => setTpo({ ...tpo, email: e.target.value })} required />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Officer Phone</label>
                <input type="text" className="admin-input" value={tpo.phone} onChange={(e) => setTpo({ ...tpo, phone: e.target.value })} required />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Office Timing Hours</label>
              <input type="text" className="admin-input" value={tpo.officeHours} onChange={(e) => setTpo({ ...tpo, officeHours: e.target.value })} />
            </div>

            <div className="admin-form-group">
              <label className="admin-label font-bold">Officer Avatar Photo URL</label>
              <input type="url" className="admin-input" value={tpo.photo.src} onChange={(e) => setTpo({ ...tpo, photo: { src: e.target.value } })} required />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">CV / Profile PDF URL</label>
              <input type="url" className="admin-input" value={tpo.profileUrl} onChange={(e) => setTpo({ ...tpo, profileUrl: e.target.value })} />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button type="submit" className="admin-btn admin-btn--primary">Save Profile Info</button>
            </div>
          </form>
        </div>
      )}

      {/* ========================== TAB 2: RECRUITER LOGOS ========================== */}
      {activeTab === "recruiters" && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ margin: 0, color: "var(--color-primary-900)" }}>Top Placement Recruiter Network</h3>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={handleRecruiterAdd}>
              <PlusIcon style={{ width: "14px", height: "14px" }} /> Link Recruiter Logo
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Logo Preview</th>
                  <th>Company Name</th>
                  <th>Logo URL</th>
                  <th style={{ width: "150px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recruiters.map((rec) => (
                  <tr key={rec.id}>
                    <td>
                      <img src={rec.logo} alt="" style={{ height: "30px", objectFit: "contain", maxWidth: "100px", background: "#f8f9fb", padding: "2px", borderRadius: "4px" }} />
                    </td>
                    <td style={{ fontWeight: "bold" }}>{rec.name}</td>
                    <td><code style={{ fontSize: "11px" }}>{rec.logo}</code></td>
                    <td>
                      <div className="admin-table__actions" style={{ justifyContent: "flex-end", gap: "0.5rem" }}>
                        <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => handleRecruiterEdit(rec)}><EditIcon /> Edit</button>
                        <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => handleRecruiterDelete(rec)}><DeleteIcon /> Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================== TAB 3: PLACEMENT NOTICES ========================== */}
      {activeTab === "notices" && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ margin: 0, color: "var(--color-primary-900)" }}>Updates & Notices</h3>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={handleNoticeAdd}>
              <PlusIcon style={{ width: "14px", height: "14px" }} /> Add Update Notice
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: "120px" }}>Date Tag</th>
                  <th>Notice Headline Title</th>
                  <th style={{ width: "160px" }}>Document Link</th>
                  <th style={{ width: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((n) => (
                  <tr key={n.id}>
                    <td>{n.date}</td>
                    <td style={{ fontWeight: "bold" }}>{n.title}</td>
                    <td>
                      {n.actionUrl ? (
                        <a href={n.actionUrl} target="_blank" rel="noreferrer" className="admin-btn admin-btn--secondary admin-btn--sm" style={{ display: "inline-flex", padding: "4px 8px" }}>
                          <DocumentIcon style={{ width: "12px", height: "12px", marginRight: "4px" }} /> {n.actionLabel || "View PDF"}
                        </a>
                      ) : "None"}
                    </td>
                    <td>
                      <div className="admin-table__actions">
                        <button className="admin-table__action-btn admin-table__action-btn--edit" onClick={() => handleNoticeEdit(n)}><EditIcon /></button>
                        <button className="admin-table__action-btn admin-table__action-btn--delete" onClick={() => handleNoticeDelete(n)}><DeleteIcon /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================== TAB 4: CAMPUS DRIVES ========================== */}
      {activeTab === "drives" && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ margin: 0, color: "var(--color-primary-900)" }}>Recruitment Drives</h3>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={handleDriveAdd}>
              <PlusIcon style={{ width: "14px", height: "14px" }} /> Register Drive
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Recruiting Corporate</th>
                  <th>Drive Date</th>
                  <th>Eligibility Criteria</th>
                  <th>Status</th>
                  <th style={{ width: "160px" }}>Action Portal</th>
                  <th style={{ width: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {drives.map((drv) => (
                  <tr key={drv.id}>
                    <td style={{ fontWeight: "bold" }}>{drv.company}</td>
                    <td>{drv.date}</td>
                    <td><span className="admin-badge admin-badge--info" style={{ fontSize: "11px" }}>{drv.eligibility}</span></td>
                    <td>
                      <span className={`admin-badge ${
                        drv.status === "Applications Open" ? "admin-badge--success" :
                        drv.status === "Closed" ? "admin-badge--error" :
                        drv.status === "Upcoming" ? "admin-badge--info" : "admin-badge--warning"
                      }`}>{drv.status}</span>
                    </td>
                    <td>
                      {drv.actionUrl ? (
                        <a href={drv.actionUrl} target="_blank" rel="noreferrer" className="admin-btn admin-btn--secondary admin-btn--sm" style={{ display: "inline-flex" }}>
                          {drv.actionLabel || "Apply Link"}
                        </a>
                      ) : "—"}
                    </td>
                    <td>
                      <div className="admin-table__actions">
                        <button className="admin-table__action-btn admin-table__action-btn--edit" onClick={() => handleDriveEdit(drv)}><EditIcon /></button>
                        <button className="admin-table__action-btn admin-table__action-btn--delete" onClick={() => handleDriveDelete(drv)}><DeleteIcon /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}


      {/* ========================================================
          MODALS & FORM DRAWERS (No Image Previews - Sticky Buttons)
          ======================================================== */}
      
      {/* Recruiter Modal */}
      {isRecFormOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up" style={{ maxWidth: "420px" }}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentRecruiter ? "Edit Recruiter Logo" : "Add Recruiter Logo"}</h3>
              <span className="admin-modal__close" onClick={() => setIsRecFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleRecruiterSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Recruiter Name *</label>
                  <input type="text" className="admin-input" value={recruiterFormData.name} onChange={(e) => setRecruiterFormData({ ...recruiterFormData, name: e.target.value })} required />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Logo URL *</label>
                  <input type="url" className="admin-input" value={recruiterFormData.logo} onChange={(e) => setRecruiterFormData({ ...recruiterFormData, logo: e.target.value })} placeholder="https://example.com/logo.svg" required />
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsRecFormOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Save Recruiter</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notice Modal */}
      {isNoticeFormOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up">
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentNotice ? "Edit Circular Details" : "Publish Placement Notice"}</h3>
              <span className="admin-modal__close" onClick={() => setIsNoticeFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleNoticeSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Notice Headline *</label>
                  <textarea className="admin-textarea" value={noticeFormData.title} onChange={(e) => setNoticeFormData({ ...noticeFormData, title: e.target.value })} required style={{ minHeight: "80px" }} />
                </div>
                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">Date Label *</label>
                    <input type="text" className="admin-input" value={noticeFormData.date} onChange={(e) => setNoticeFormData({ ...noticeFormData, date: e.target.value })} placeholder="e.g. 10 Jul 2026" required />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Action Label</label>
                    <input type="text" className="admin-input" value={noticeFormData.actionLabel} onChange={(e) => setNoticeFormData({ ...noticeFormData, actionLabel: e.target.value })} />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Action URL link (PDF Document) *</label>
                  <input type="url" className="admin-input" value={noticeFormData.actionUrl} onChange={(e) => setNoticeFormData({ ...noticeFormData, actionUrl: e.target.value })} required />
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsNoticeFormOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Save Notice</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Campus Drive Register Modal */}
      {isDriveFormOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up">
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentDrive ? "Edit Drive Details" : "Register Recruitment Drive"}</h3>
              <span className="admin-modal__close" onClick={() => setIsDriveFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleDriveSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Recruiting Company *</label>
                  <input type="text" className="admin-input" value={driveFormData.company} onChange={(e) => setDriveFormData({ ...driveFormData, company: e.target.value })} required />
                </div>
                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">Drive Date Label *</label>
                    <input type="text" className="admin-input" value={driveFormData.date} onChange={(e) => setDriveFormData({ ...driveFormData, date: e.target.value })} placeholder="e.g. 2026-07-22" required />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Drive Status</label>
                    <select className="admin-select" value={driveFormData.status} onChange={(e) => setDriveFormData({ ...driveFormData, status: e.target.value })}>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Applications Open">Applications Open</option>
                      <option value="Registration Soon">Registration Soon</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Eligibility Criteria *</label>
                  <input type="text" className="admin-input" value={driveFormData.eligibility} onChange={(e) => setDriveFormData({ ...driveFormData, eligibility: e.target.value })} placeholder="e.g. Civil / Mechanical, 55% and above" required />
                </div>
                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">Action Link Label</label>
                    <input type="text" className="admin-input" value={driveFormData.actionLabel} onChange={(e) => setDriveFormData({ ...driveFormData, actionLabel: e.target.value })} placeholder="Apply" />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Action Registration URL</label>
                    <input type="url" className="admin-input" value={driveFormData.actionUrl} onChange={(e) => setDriveFormData({ ...driveFormData, actionUrl: e.target.value })} />
                  </div>
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsDriveFormOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Save Drive</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Drawers */}
      <DeleteConfirmationModal isOpen={isRecDeleteOpen} onClose={() => setIsRecDeleteOpen(false)} onConfirm={handleRecruiterConfirmDelete} itemName={recruiterToDelete?.name || ""} itemType="corporate recruiter logo" />
      <DeleteConfirmationModal isOpen={isNoticeDeleteOpen} onClose={() => setIsNoticeDeleteOpen(false)} onConfirm={handleNoticeConfirmDelete} itemName={noticeToDelete?.title || ""} itemType="placement update notice" />
      <DeleteConfirmationModal isOpen={isDriveDeleteOpen} onClose={() => setIsDriveDeleteOpen(false)} onConfirm={handleDriveConfirmDelete} itemName={driveToDelete?.company || ""} itemType="recruitment campaign drive" />
    </div>
  );
}
