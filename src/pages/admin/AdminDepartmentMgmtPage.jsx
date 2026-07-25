import React, { useState, useEffect } from "react";
import { PlusIcon, EditIcon, DeleteIcon, DocumentIcon, DownloadIcon } from "../../components/admin/Icons";
import { DeleteConfirmationModal } from "../../components/admin/DeleteConfirmationModal";
import { apiRequest } from "../../services/api/client";

export function AdminDepartmentMgmtPage() {
  const [alertInfo, setAlertInfo] = useState({ show: false, text: "", type: "success" });

  const triggerAlert = (text, type = "success") => {
    setAlertInfo({ show: true, text, type });
    setTimeout(() => setAlertInfo({ show: false, text: "", type: "success" }), 3000);
  };

  // --- DEPARTMENTS DIRECTORY SCHEMA ---
  const [departments, setDepartments] = useState([
    {
      id: "dept-1",
      slug: "computer-science-engineering",
      name: "Computer Science & Engineering",
      about: {
        heading: "About the Department",
        summary: "Computer Science & Engineering at Government Polytechnic Kanpur combines academic discipline, practical exposure, and industry-aligned training for diploma learners. The department focuses on software development, networks, and advanced programming.",
        focusAreas: [
          "Practice-oriented teaching and laboratory sessions",
          "Curriculum aligned with diploma-level technical competencies",
          "Faculty mentoring, discipline, and academic support"
        ]
      },
      hod: {
        name: "Dr. Anil Kumar",
        designation: "Head of Department, Computer Science & Engineering",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
        message: "Our department is committed to nurturing technically competent, disciplined, and socially responsible students through a balanced approach of theory, practice, and continuous mentoring."
      },
      faculty: [
        { id: "dept-fac-1", name: "Prof. Priya Srivastava", designation: "Lecturer", qualification: "M.Tech., NET", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop", profileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { id: "dept-fac-2", name: "Prof. Amit Kumar", designation: "Lecturer", qualification: "M.E., B.Tech.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop", profileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
      ],
      recruiters: [
        { id: "rec-1", name: "Tech Axis", logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150&auto=format&fit=crop" },
        { id: "rec-2", name: "Prime Electro", logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150&auto=format&fit=crop" }
      ],
      gallery: [
        { id: "gal-1", title: "CS Main Programming Lab", category: "Laboratories", image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=300&auto=format&fit=crop" }
      ]
    },
    {
      id: "dept-2",
      slug: "information-technology",
      name: "Information Technology",
      about: {
        heading: "About the Department",
        summary: "Information Technology department delivers detailed education on networking systems, database management, and internet engineering applications.",
        focusAreas: [
          "Curriculum aligned with industry standards",
          "Advanced network laboratories",
          "Continuous internship preparation support"
        ]
      },
      hod: {
        name: "Prof. Ritu Singh",
        designation: "Head of Department, Information Technology",
        photo: "https://images.unsplash.com/photo-1580894732444-8fecef2271ff?q=80&w=200&auto=format&fit=crop",
        message: "The IT engineering curriculum prepares students for robust web development, cloud computing, and database administration roles."
      },
      faculty: [
        { id: "dept-fac-3", name: "Prof. Ritu Singh", designation: "Lecturer", qualification: "M.Tech., B.Tech.", photo: "https://images.unsplash.com/photo-1580894732444-8fecef2271ff?q=80&w=150&auto=format&fit=crop", profileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
      ],
      recruiters: [
        { id: "rec-3", name: "BuildCraft India", logo: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=150&auto=format&fit=crop" }
      ],
      gallery: [
        { id: "gal-2", title: "IT Networking Systems Laboratory", category: "Laboratories", image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=300&auto=format&fit=crop" }
      ]
    }
  ]);

  useEffect(() => {
    async function fetchDepts() {
      try {
        const res = await apiRequest("/departments");
        if (res && res.departments && res.departments.length > 0) {
          setDepartments(res.departments.map(d => ({
            id: d.id || d._id,
            _id: d.id || d._id,
            slug: d.slug,
            name: d.name,
            about: d.about || { heading: "About the Department", summary: d.description || "", focusAreas: [] },
            hod: {
              name: d.hod?.name || d.hodName || "",
              designation: d.hod?.designation || `Head of Department, ${d.name}`,
              photo: d.hod?.photo || d.hod?.photoUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
              message: d.hod?.message || ""
            },
            faculty: d.faculty || [],
            recruiters: d.recruiters || [],
            gallery: d.gallery || []
          })));
        }
      } catch (err) {
        console.warn("Could not fetch departments for management page:", err);
      }
    }
    fetchDepts();
  }, []);

  const [selectedDeptId, setSelectedDeptId] = useState("dept-1");
  const [activeTab, setActiveTab] = useState("general");

  const dept = departments.find(d => d.id === selectedDeptId) || departments[0];

  // Modals Open
  const [isAddDeptOpen, setIsAddDeptOpen] = useState(false);
  const [isDeleteDeptOpen, setIsDeleteDeptOpen] = useState(false);
  const [newDeptData, setNewDeptData] = useState({ name: "", summary: "", hodName: "", hodPhoto: "", hodMessage: "" });

  const [isFacModalOpen, setIsFacModalOpen] = useState(false);
  const [isFacDeleteOpen, setIsFacDeleteOpen] = useState(false);
  const [currentFac, setCurrentFac] = useState(null);
  const [facToDelete, setFacToDelete] = useState(null);
  const [facFormData, setFacFormData] = useState({ name: "", designation: "Lecturer", qualification: "", photo: "", profileUrl: "" });

  const [isRecModalOpen, setIsRecModalOpen] = useState(false);
  const [isRecDeleteOpen, setIsRecDeleteOpen] = useState(false);
  const [currentRec, setCurrentRec] = useState(null);
  const [recToDelete, setRecToDelete] = useState(null);
  const [recFormData, setRecFormData] = useState({ name: "", logo: "" });

  const [isGalModalOpen, setIsGalModalOpen] = useState(false);
  const [isGalDeleteOpen, setIsGalDeleteOpen] = useState(false);
  const [currentGal, setCurrentGal] = useState(null);
  const [galToDelete, setGalToDelete] = useState(null);
  const [galFormData, setGalFormData] = useState({ title: "", category: "Campus", image: "" });

  const designationsList = ["Head of Department", "Senior Lecturer", "Lecturer", "Workshop / Lab Incharge"];

  // ==========================================
  // --- HANDLERS: Master Department Add/Remove
  // ==========================================
  const handleAddDeptClick = () => {
    setNewDeptData({ name: "", summary: "", hodName: "", hodPhoto: "", hodMessage: "" });
    setIsAddDeptOpen(true);
  };
  const handleAddDeptSubmit = (e) => {
    e.preventDefault();
    const newSlug = newDeptData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const newDeptObj = {
      id: `dept-${Date.now()}`,
      slug: newSlug,
      name: newDeptData.name,
      about: {
        heading: "About the Department",
        summary: newDeptData.summary,
        focusAreas: [
          "Practice-oriented teaching and laboratory sessions",
          "Faculty mentoring, discipline, and academic support"
        ]
      },
      hod: {
        name: newDeptData.hodName,
        designation: `Head of Department, ${newDeptData.name}`,
        photo: newDeptData.hodPhoto || "https://via.placeholder.com/200",
        message: newDeptData.hodMessage
      },
      faculty: [],
      recruiters: [],
      gallery: []
    };
    setDepartments(prev => [...prev, newDeptObj]);
    setSelectedDeptId(newDeptObj.id);
    setIsAddDeptOpen(false);
    triggerAlert("Department created successfully!");
  };
  const handleDeleteDeptConfirm = () => {
    if (departments.length <= 1) {
      triggerAlert("At least one department must remain in the system.", "error");
      setIsDeleteDeptOpen(false);
      return;
    }
    const remaining = departments.filter(d => d.id !== selectedDeptId);
    setDepartments(remaining);
    setSelectedDeptId(remaining[0].id);
    setIsDeleteDeptOpen(false);
    triggerAlert("Department deleted successfully!", "error");
  };

  // ==========================================
  // --- HANDLERS: Tab 1: General Info & HOD ---
  // ==========================================
  const handleGeneralSubmit = async (e) => {
    e.preventDefault();
    if (dept) {
      try {
        await apiRequest(`/departments/${dept.id}`, {
          method: "PUT",
          body: JSON.stringify({
            about: dept.about,
            hod: dept.hod
          })
        });
        triggerAlert("Department branding and HOD details updated successfully!");
      } catch (err) {
        console.warn("API update failed, saved locally:", err);
        triggerAlert("Department details updated locally!");
      }
    }
  };
  const handleDeptAboutChange = (field, value) => {
    setDepartments(prev => prev.map(d => {
      if (d.id === selectedDeptId) {
        return { ...d, about: { ...d.about, [field]: value } };
      }
      return d;
    }));
  };
  const handleHODChange = (field, value) => {
    setDepartments(prev => prev.map(d => {
      if (d.id === selectedDeptId) {
        return { ...d, hod: { ...d.hod, [field]: value } };
      }
      return d;
    }));
  };

  // ==========================================
  // --- HANDLERS: Tab 2: Faculty Members ---
  // ==========================================
  const handleAddFacClick = () => {
    setCurrentFac(null);
    setFacFormData({ name: "", designation: "Lecturer", qualification: "", photo: "", profileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" });
    setIsFacModalOpen(true);
  };
  const handleEditFacClick = (fac) => {
    setCurrentFac(fac);
    setFacFormData({ name: fac.name, designation: fac.designation, qualification: fac.qualification, photo: fac.photo, profileUrl: fac.profileUrl });
    setIsFacModalOpen(true);
  };
  const handleFacSubmit = (e) => {
    e.preventDefault();
    if (currentFac) {
      setDepartments(prev => prev.map(d => {
        if (d.id === selectedDeptId) {
          return { ...d, faculty: d.faculty.map(f => f.id === currentFac.id ? { ...f, ...facFormData } : f) };
        }
        return d;
      }));
      triggerAlert("Faculty profile updated!");
    } else {
      const newFac = { id: `dept-fac-${Date.now()}`, ...facFormData };
      setDepartments(prev => prev.map(d => {
        if (d.id === selectedDeptId) {
          return { ...d, faculty: [...d.faculty, newFac] };
        }
        return d;
      }));
      triggerAlert("Faculty profile linked successfully!");
    }
    setIsFacModalOpen(false);
  };
  const handleRemoveFacClick = (fac) => {
    setFacToDelete(fac);
    setIsFacDeleteOpen(true);
  };
  const handleFacConfirmDelete = () => {
    setDepartments(prev => prev.map(d => {
      if (d.id === selectedDeptId) {
        return { ...d, faculty: d.faculty.filter(f => f.id !== facToDelete.id) };
      }
      return d;
    }));
    setIsFacDeleteOpen(false);
    triggerAlert("Faculty profile unlinked from department.", "error");
  };

  // ==========================================
  // --- HANDLERS: Tab 3: Recruiters ---
  // ==========================================
  const handleAddRecClick = () => {
    setCurrentRec(null);
    setRecFormData({ name: "", logo: "" });
    setIsRecModalOpen(true);
  };
  const handleEditRecClick = (rec) => {
    setCurrentRec(rec);
    setRecFormData({ name: rec.name, logo: rec.logo });
    setIsRecModalOpen(true);
  };
  const handleRecSubmit = (e) => {
    e.preventDefault();
    if (currentRec) {
      setDepartments(prev => prev.map(d => {
        if (d.id === selectedDeptId) {
          return { ...d, recruiters: d.recruiters.map(r => r.id === currentRec.id ? { ...r, ...recFormData } : r) };
        }
        return d;
      }));
      triggerAlert("Recruiter partner updated!");
    } else {
      const newRec = { id: `rec-${Date.now()}`, ...recFormData };
      setDepartments(prev => prev.map(d => {
        if (d.id === selectedDeptId) {
          return { ...d, recruiters: [...d.recruiters, newRec] };
        }
        return d;
      }));
      triggerAlert("Recruiter partner linked!");
    }
    setIsRecModalOpen(false);
  };
  const handleRemoveRecClick = (rec) => {
    setRecToDelete(rec);
    setIsRecDeleteOpen(true);
  };
  const handleRecConfirmDelete = () => {
    setDepartments(prev => prev.map(d => {
      if (d.id === selectedDeptId) {
        return { ...d, recruiters: d.recruiters.filter(r => r.id !== recToDelete.id) };
      }
      return d;
    }));
    setIsRecDeleteOpen(false);
    triggerAlert("Recruiter unlinked successfully!", "error");
  };

  // ==========================================
  // --- HANDLERS: Tab 4: Gallery ---
  // ==========================================
  const handleAddGalClick = () => {
    setCurrentGal(null);
    setGalFormData({ title: "", category: "Campus", image: "" });
    setIsGalModalOpen(true);
  };
  const handleEditGalClick = (gal) => {
    setCurrentGal(gal);
    setGalFormData({ title: gal.title, category: gal.category, image: gal.image });
    setIsGalModalOpen(true);
  };
  const handleGalSubmit = (e) => {
    e.preventDefault();
    if (currentGal) {
      setDepartments(prev => prev.map(d => {
        if (d.id === selectedDeptId) {
          return { ...d, gallery: d.gallery.map(g => g.id === currentGal.id ? { ...g, ...galFormData } : g) };
        }
        return d;
      }));
      triggerAlert("Gallery item updated successfully!");
    } else {
      const newGal = { id: `gal-${Date.now()}`, ...galFormData };
      setDepartments(prev => prev.map(d => {
        if (d.id === selectedDeptId) {
          return { ...d, gallery: [...d.gallery, newGal] };
        }
        return d;
      }));
      triggerAlert("Gallery image linked successfully!");
    }
    setIsGalModalOpen(false);
  };
  const handleRemoveGalClick = (gal) => {
    setGalToDelete(gal);
    setIsGalDeleteOpen(true);
  };
  const handleGalConfirmDelete = () => {
    setDepartments(prev => prev.map(d => {
      if (d.id === selectedDeptId) {
        return { ...d, gallery: d.gallery.filter(g => g.id !== galToDelete.id) };
      }
      return d;
    }));
    setIsGalDeleteOpen(false);
    triggerAlert("Gallery item deleted!", "error");
  };

  return (
    <div>
      {/* Toast feedback alerts */}
      {alertInfo.show && (
        <div className={`admin-badge ${alertInfo.type === "success" ? "admin-badge--success" : "admin-badge--error"}`} style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1100, padding: "0.75rem 1.5rem", boxShadow: "var(--shadow-md)" }}>
          {alertInfo.text}
        </div>
      )}

      <div className="admin-page-header">
        <div className="admin-page-header__info">
          <h1 className="admin-page-header__title">Department Editor</h1>
          <p className="admin-page-header__desc">Directly manage dynamic sub-pages for specific college engineering and applied branches.</p>
        </div>
      </div>

      {/* Selector and Master Controls */}
      <div className="admin-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <label className="admin-label" style={{ margin: 0, fontWeight: "bold" }}>Selected Branch:</label>
          <select 
            className="admin-filter-select" 
            style={{ width: "280px" }}
            value={selectedDeptId}
            onChange={(e) => setSelectedDeptId(e.target.value)}
          >
            {departments.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="admin-btn admin-btn--primary" onClick={handleAddDeptClick}>
            <PlusIcon style={{ width: "16px", height: "16px" }} /> Create Branch
          </button>
          <button className="admin-btn admin-btn--danger" onClick={() => setIsDeleteDeptOpen(true)}>
            <DeleteIcon style={{ width: "16px", height: "16px" }} /> Delete Branch
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-settings-tabs">
        <button className={`admin-settings-tab ${activeTab === "general" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("general")}>General & HOD</button>
        <button className={`admin-settings-tab ${activeTab === "faculty" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("faculty")}>Branch Faculty</button>
        <button className={`admin-settings-tab ${activeTab === "recruiters" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("recruiters")}>Placement Recruiters</button>
        <button className={`admin-settings-tab ${activeTab === "gallery" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("gallery")}>Lab Gallery</button>
      </div>

      {/* ========================== TAB 1: GENERAL INFO & HOD ========================== */}
      {activeTab === "general" && (
        <form onSubmit={handleGeneralSubmit} className="admin-card" style={{ maxWidth: "800px" }}>
          <h3 className="admin-card__title">Department Overview</h3>

          <div className="admin-form-group">
            <label className="admin-label">Department Display Name</label>
            <input type="text" className="admin-input" value={dept.name} onChange={(e) => {
              const val = e.target.value;
              setDepartments(prev => prev.map(d => d.id === selectedDeptId ? { ...d, name: val } : d));
            }} required />
          </div>

          <div className="admin-form-group">
            <label className="admin-label font-bold">About Summary Paragraph</label>
            <textarea className="admin-textarea" value={dept.about.summary} onChange={(e) => handleDeptAboutChange("summary", e.target.value)} required style={{ minHeight: "80px" }} />
          </div>

          <hr style={{ border: 0, borderTop: "1px solid var(--color-neutral-100)", margin: "1.5rem 0" }} />

          <h4 style={{ color: "var(--color-primary-900)", marginBottom: "1rem" }}>HOD Details</h4>

          <div className="admin-form-group--row">
            <div className="admin-form-group">
              <label className="admin-label">HOD Name</label>
              <input type="text" className="admin-input" value={dept.hod.name} onChange={(e) => handleHODChange("name", e.target.value)} required />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">HOD Official Designation</label>
              <input type="text" className="admin-input" value={dept.hod.designation} onChange={(e) => handleHODChange("designation", e.target.value)} required />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">HOD Photo URL</label>
            <input type="url" className="admin-input" value={dept.hod.photo} onChange={(e) => handleHODChange("photo", e.target.value)} required />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">HOD Message Speech Message</label>
            <textarea className="admin-textarea" value={dept.hod.message} onChange={(e) => handleHODChange("message", e.target.value)} required style={{ minHeight: "80px" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="admin-btn admin-btn--primary">Save General Details</button>
          </div>
        </form>
      )}

      {/* ========================== TAB 2: BRANCH FACULTY ========================== */}
      {activeTab === "faculty" && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ margin: 0, color: "var(--color-primary-900)" }}>Faculty Directory ({dept.name})</h3>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={handleAddFacClick}>
              <PlusIcon style={{ width: "14px", height: "14px" }} /> Link Faculty
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Member Name</th>
                  <th>Designation</th>
                  <th>Qualification</th>
                  <th>Photo URL</th>
                  <th>CV / Portfolio Link</th>
                  <th style={{ width: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dept.faculty.length > 0 ? (
                  dept.faculty.map((fac) => (
                    <tr key={fac.id}>
                      <td style={{ fontWeight: "bold" }}>{fac.name}</td>
                      <td>{fac.designation}</td>
                      <td>{fac.qualification}</td>
                      <td><code style={{ fontSize: "11px" }}>{fac.photo}</code></td>
                      <td>
                        {fac.profileUrl ? (
                          <a href={fac.profileUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "underline", color: "var(--color-primary-500)", display: "flex", alignItems: "center", gap: "2px", fontSize: "12px" }}>
                            <DocumentIcon style={{ width: "12px", height: "12px" }} /> Download CV
                          </a>
                        ) : "None"}
                      </td>
                      <td>
                        <div className="admin-table__actions">
                          <button className="admin-table__action-btn admin-table__action-btn--edit" onClick={() => handleEditFacClick(fac)}><EditIcon /></button>
                          <button className="admin-table__action-btn admin-table__action-btn--delete" onClick={() => handleRemoveFacClick(fac)}><DeleteIcon /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-muted)" }}>No branch faculty linked yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================== TAB 3: PLACEMENT RECRUITERS ========================== */}
      {activeTab === "recruiters" && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ margin: 0, color: "var(--color-primary-900)" }}>Top Recruiters ({dept.name})</h3>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={handleAddRecClick}>
              <PlusIcon style={{ width: "14px", height: "14px" }} /> Link Recruiter Partner
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
                {dept.recruiters.length > 0 ? (
                  dept.recruiters.map((rec) => (
                    <tr key={rec.id}>
                      <td>
                        <img src={rec.logo} alt="" style={{ height: "30px", objectFit: "contain", maxWidth: "100px", background: "#f8f9fb", padding: "2px", borderRadius: "4px" }} />
                      </td>
                      <td style={{ fontWeight: "bold" }}>{rec.name}</td>
                      <td><code style={{ fontSize: "11px" }}>{rec.logo}</code></td>
                      <td>
                        <div className="admin-table__actions" style={{ justifyContent: "flex-end", gap: "0.5rem" }}>
                          <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => handleEditRecClick(rec)}><EditIcon /> Edit</button>
                          <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => handleRemoveRecClick(rec)}><DeleteIcon /> Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-muted)" }}>No corporate recruiters linked.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================== TAB 4: LABORATORY GALLERY ========================== */}
      {activeTab === "gallery" && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ margin: 0, color: "var(--color-primary-900)" }}>Department Lab Showcase</h3>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={handleAddGalClick}>
              <PlusIcon style={{ width: "14px", height: "14px" }} /> Add Showcase Image
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image Title</th>
                  <th>Category</th>
                  <th>Image URL</th>
                  <th style={{ width: "150px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dept.gallery.length > 0 ? (
                  dept.gallery.map((g) => (
                    <tr key={g.id}>
                      <td style={{ fontWeight: "bold" }}>{g.title}</td>
                      <td><span className="admin-badge admin-badge--info">{g.category}</span></td>
                      <td><code style={{ fontSize: "11px" }}>{g.image}</code></td>
                      <td>
                        <div className="admin-table__actions" style={{ justifyContent: "flex-end", gap: "0.5rem" }}>
                          <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => handleEditGalClick(g)}><EditIcon /> Edit</button>
                          <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => handleRemoveGalClick(g)}><DeleteIcon /> Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-muted)" }}>No gallery items uploaded yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}


      {/* ========================================================
          MODALS & FORM DRAWERS (Sticky Footer - No Previews)
          ======================================================== */}
      
      {/* Create Department Modal */}
      {isAddDeptOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up">
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">Create Academic Department</h3>
              <span className="admin-modal__close" onClick={() => setIsAddDeptOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleAddDeptSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Department Name *</label>
                  <input type="text" className="admin-input" value={newDeptData.name} onChange={(e) => setNewDeptData({ ...newDeptData, name: e.target.value })} placeholder="e.g. Mechanical Engineering" required />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label font-bold">About Description *</label>
                  <textarea className="admin-textarea" value={newDeptData.summary} onChange={(e) => setNewDeptData({ ...newDeptData, summary: e.target.value })} placeholder="Describe branch curriculum goals..." style={{ minHeight: "80px" }} required />
                </div>
                <hr style={{ border: 0, borderTop: "1px solid var(--color-neutral-100)", margin: "1rem 0" }} />
                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">HOD Full Name *</label>
                    <input type="text" className="admin-input" value={newDeptData.hodName} onChange={(e) => setNewDeptData({ ...newDeptData, hodName: e.target.value })} required />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">HOD Photo URL</label>
                    <input type="url" className="admin-input" value={newDeptData.hodPhoto} onChange={(e) => setNewDeptData({ ...newDeptData, hodPhoto: e.target.value })} />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">HOD Message Speech Message</label>
                  <textarea className="admin-textarea" value={newDeptData.hodMessage} onChange={(e) => setNewDeptData({ ...newDeptData, hodMessage: e.target.value })} placeholder="HOD Desk quote..." style={{ minHeight: "60px" }} />
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsAddDeptOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Create Department</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Link Faculty Modal */}
      {isFacModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up">
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentFac ? "Edit Department Faculty" : "Link Department Faculty"}</h3>
              <span className="admin-modal__close" onClick={() => setIsFacModalOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleFacSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Faculty Member Name *</label>
                  <input type="text" className="admin-input" value={facFormData.name} onChange={(e) => setFacFormData({ ...facFormData, name: e.target.value })} placeholder="e.g. Prof. Priya Srivastava" required />
                </div>
                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">Designation</label>
                    <select className="admin-select" value={facFormData.designation} onChange={(e) => setFacFormData({ ...facFormData, designation: e.target.value })}>
                      {designationsList.map((d, idx) => (
                        <option key={idx} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Qualification *</label>
                    <input type="text" className="admin-input" value={facFormData.qualification} onChange={(e) => setFacFormData({ ...facFormData, qualification: e.target.value })} placeholder="e.g. M.Tech., NET" required />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label font-bold">Photo Avatar URL</label>
                  <input type="url" className="admin-input" value={facFormData.photo} onChange={(e) => setFacFormData({ ...facFormData, photo: e.target.value })} />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">CV / Portfolio PDF URL</label>
                  <input type="url" className="admin-input" value={facFormData.profileUrl} onChange={(e) => setFacFormData({ ...facFormData, profileUrl: e.target.value })} placeholder="e.g. https://gpk.ac.in/cv.pdf" />
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsFacModalOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Save Faculty</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Link Recruiter Partner Modal */}
      {isRecModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up" style={{ maxWidth: "420px" }}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentRec ? "Edit Linked Recruiter" : "Link Top Recruiter Partner"}</h3>
              <span className="admin-modal__close" onClick={() => setIsRecModalOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleRecSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Company Name *</label>
                  <input type="text" className="admin-input" value={recFormData.name} onChange={(e) => setRecFormData({ ...recFormData, name: e.target.value })} required />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label font-bold">Logo Image URL *</label>
                  <input type="url" className="admin-input" value={recFormData.logo} onChange={(e) => setRecFormData({ ...recFormData, logo: e.target.value })} required />
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsRecModalOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Save Partner</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Showcase Lab Gallery Image Modal */}
      {isGalModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up">
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentGal ? "Edit Showcase Image" : "Add Laboratory Showcase"}</h3>
              <span className="admin-modal__close" onClick={() => setIsGalModalOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleGalSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Image Title Label *</label>
                  <input type="text" className="admin-input" value={galFormData.title} onChange={(e) => setGalFormData({ ...galFormData, title: e.target.value })} placeholder="e.g. CS Main Programming Lab" required />
                </div>
                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">Display Category</label>
                    <select className="admin-select" value={galFormData.category} onChange={(e) => setGalFormData({ ...galFormData, category: e.target.value })}>
                      <option value="Laboratories">Laboratories</option>
                      <option value="Workshops">Workshops</option>
                      <option value="Campus">Campus</option>
                      <option value="Events">Events</option>
                      <option value="Exhibitions">Exhibitions</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label font-bold">Image Source URL *</label>
                    <input type="url" className="admin-input" value={galFormData.image} onChange={(e) => setGalFormData({ ...galFormData, image: e.target.value })} required />
                  </div>
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsGalModalOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Save Image</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Drawers */}
      <DeleteConfirmationModal
        isOpen={isDeleteDeptOpen}
        onClose={() => setIsDeleteDeptOpen(false)}
        onConfirm={handleDeleteDeptConfirm}
        itemName={dept?.name || ""}
        itemType="polytechnic department"
      />
      <DeleteConfirmationModal
        isOpen={isFacDeleteOpen}
        onClose={() => setIsFacDeleteOpen(false)}
        onConfirm={handleFacConfirmDelete}
        itemName={facToDelete?.name || ""}
        itemType="department faculty member"
      />
      <DeleteConfirmationModal
        isOpen={isRecDeleteOpen}
        onClose={() => setIsRecDeleteOpen(false)}
        onConfirm={handleRecConfirmDelete}
        itemName={recToDelete?.name || ""}
        itemType="recruiter partner"
      />
      <DeleteConfirmationModal
        isOpen={isGalDeleteOpen}
        onClose={() => setIsGalDeleteOpen(false)}
        onConfirm={handleGalConfirmDelete}
        itemName={galToDelete?.title || ""}
        itemType="department showcase image"
      />
    </div>
  );
}
