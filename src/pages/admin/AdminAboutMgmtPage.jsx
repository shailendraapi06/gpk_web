import React, { useState } from "react";
import { PlusIcon, EditIcon, DeleteIcon } from "../../components/admin/Icons";
import { DeleteConfirmationModal } from "../../components/admin/DeleteConfirmationModal";

export function AdminAboutMgmtPage() {
  const [activeTab, setActiveTab] = useState("highlights");
  const [alertInfo, setAlertInfo] = useState({ show: false, text: "", type: "success" });

  const triggerAlert = (text, type = "success") => {
    setAlertInfo({ show: true, text, type });
    setTimeout(() => setAlertInfo({ show: false, text: "", type: "success" }), 3000);
  };

  // --- STATE 1: At A Glance Highlights (label, value) ---
  const [highlights, setHighlights] = useState([
    { id: "hl-1", label: "Established", value: "1958" },
    { id: "hl-2", label: "Departments", value: "15+" },
    { id: "hl-3", label: "Faculty", value: "50+" },
    { id: "hl-4", label: "Students", value: "2000+" }
  ]);
  const [isHlFormOpen, setIsHlFormOpen] = useState(false);
  const [currentHl, setCurrentHl] = useState(null);
  const [hlFormData, setHlFormData] = useState({ label: "", value: "" });

  // --- STATE 2: Journey Timeline (year, title, description) ---
  const [journey, setJourney] = useState([
    { id: "j-1", year: "1958", title: "Institute Foundation", description: "Government Polytechnic Kanpur was established to strengthen technical education and workforce development in Uttar Pradesh." },
    { id: "j-2", year: "1980s", title: "Academic Expansion", description: "The institution expanded its diploma offerings and improved its practical learning infrastructure for core technical disciplines." },
    { id: "j-3", year: "2000s", title: "Modernization of Facilities", description: "Laboratories, workshops, and campus learning resources were gradually modernized to support evolving curriculum standards." },
    { id: "j-4", year: "Today", title: "Industry-Ready Education", description: "The college continues to focus on employability, applied skills, academic discipline, and student development in a modern technical environment." }
  ]);
  const [isJourneyFormOpen, setIsJourneyFormOpen] = useState(false);
  const [isJourneyDeleteOpen, setIsJourneyDeleteOpen] = useState(false);
  const [currentJourney, setCurrentJourney] = useState(null);
  const [journeyToDelete, setJourneyToDelete] = useState(null);
  const [journeyFormData, setJourneyFormData] = useState({ year: "", title: "", description: "" });

  // --- STATE 3: Campus Infrastructure (title, description, image) ---
  const [infrastructure, setInfrastructure] = useState([
    { id: "infra-1", title: "Library", description: "The library supports academic development with technical books, reference materials, study resources, and quiet reading spaces for students.", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=400&auto=format&fit=crop" },
    { id: "infra-2", title: "Laboratories", description: "Department laboratories enable applied learning, experimentation, and practical understanding across engineering and technical subjects.", image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=400&auto=format&fit=crop" },
    { id: "infra-3", title: "Workshops", description: "Hands-on workshops provide essential exposure to tools, processes, fabrication practices, and discipline-oriented technical exercises.", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=400&auto=format&fit=crop" }
  ]);
  const [isInfraFormOpen, setIsInfraFormOpen] = useState(false);
  const [isInfraDeleteOpen, setIsInfraDeleteOpen] = useState(false);
  const [currentInfra, setCurrentInfra] = useState(null);
  const [infraToDelete, setInfraToDelete] = useState(null);
  const [infraFormData, setInfraFormData] = useState({ title: "", description: "", image: "" });

  // --- STATE 4: Main About Page Image (collegeOverview.image) ---
  const [aboutPageImage, setAboutPageImage] = useState("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop");

  // --- STATE 5: Institutional Recognition (id, title, description, logo) ---
  const [recognitions, setRecognitions] = useState([
    { id: "approval-1", title: "Government Polytechnic Kanpur", description: "Institutional identity representing a long-standing government technical education presence in Kanpur.", logo: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=150&auto=format&fit=crop" },
    { id: "approval-2", title: "Technical Education Framework", description: "The college functions within state technical education systems and established academic governance structures.", logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150&auto=format&fit=crop" }
  ]);
  const [isRecogFormOpen, setIsRecogFormOpen] = useState(false);
  const [isRecogDeleteOpen, setIsRecogDeleteOpen] = useState(false);
  const [currentRecog, setCurrentRecog] = useState(null);
  const [recogToDelete, setRecogToDelete] = useState(null);
  const [recogFormData, setRecogFormData] = useState({ title: "", description: "", logo: "" });


  // ==========================================
  // --- HANDLERS 1: Highlights ---
  // ==========================================
  const handleHlEdit = (hl) => {
    setCurrentHl(hl);
    setHlFormData({ label: hl.label, value: hl.value });
    setIsHlFormOpen(true);
  };
  const handleHlSubmit = (e) => {
    e.preventDefault();
    setHighlights(prev => prev.map(h => h.id === currentHl.id ? { ...h, ...hlFormData } : h));
    setIsHlFormOpen(false);
    triggerAlert("Metric highlight updated successfully!");
  };

  // ==========================================
  // --- HANDLERS 2: Journey ---
  // ==========================================
  const handleJourneyAdd = () => {
    setCurrentJourney(null);
    setJourneyFormData({ year: "", title: "", description: "" });
    setIsJourneyFormOpen(true);
  };
  const handleJourneyEdit = (j) => {
    setCurrentJourney(j);
    setJourneyFormData({ year: j.year, title: j.title, description: j.description });
    setIsJourneyFormOpen(true);
  };
  const handleJourneySubmit = (e) => {
    e.preventDefault();
    if (currentJourney) {
      setJourney(prev => prev.map(j => j.id === currentJourney.id ? { ...j, ...journeyFormData } : j));
      triggerAlert("Timeline step updated successfully!");
    } else {
      setJourney(prev => [...prev, { id: `j-${Date.now()}`, ...journeyFormData }]);
      triggerAlert("Timeline milestone added successfully!");
    }
    setIsJourneyFormOpen(false);
  };
  const handleJourneyDelete = (j) => {
    setJourneyToDelete(j);
    setIsJourneyDeleteOpen(true);
  };
  const handleJourneyConfirmDelete = () => {
    setJourney(prev => prev.filter(j => j.id !== journeyToDelete.id));
    setIsJourneyDeleteOpen(false);
    triggerAlert("Timeline step deleted successfully!", "error");
  };

  // ==========================================
  // --- HANDLERS 3: Infrastructure ---
  // ==========================================
  const handleInfraAdd = () => {
    setCurrentInfra(null);
    setInfraFormData({ title: "", description: "", image: "" });
    setIsInfraFormOpen(true);
  };
  const handleInfraEdit = (i) => {
    setCurrentInfra(i);
    setInfraFormData({ title: i.title, description: i.description, image: i.image });
    setIsInfraFormOpen(true);
  };
  const handleInfraSubmit = (e) => {
    e.preventDefault();
    if (currentInfra) {
      setInfrastructure(prev => prev.map(i => i.id === currentInfra.id ? { ...i, ...infraFormData } : i));
      triggerAlert("Infrastructure item updated!");
    } else {
      setInfrastructure(prev => [...prev, { id: `infra-${Date.now()}`, ...infraFormData }]);
      triggerAlert("New infrastructure item added!");
    }
    setIsInfraFormOpen(false);
  };
  const handleInfraDelete = (i) => {
    setInfraToDelete(i);
    setIsInfraDeleteOpen(true);
  };
  const handleInfraConfirmDelete = () => {
    setInfrastructure(prev => prev.filter(i => i.id !== infraToDelete.id));
    setIsInfraDeleteOpen(false);
    triggerAlert("Infrastructure item deleted!", "error");
  };

  // ==========================================
  // --- HANDLERS 4: Main About Image ---
  // ==========================================
  const handleAboutImageSubmit = (e) => {
    e.preventDefault();
    triggerAlert("Main About page image URL saved!");
  };

  // ==========================================
  // --- HANDLERS 5: Institutional Recognition ---
  // ==========================================
  const handleRecogAdd = () => {
    setCurrentRecog(null);
    setRecogFormData({ title: "", description: "", logo: "" });
    setIsRecogFormOpen(true);
  };
  const handleRecogEdit = (r) => {
    setCurrentRecog(r);
    setRecogFormData({ title: r.title, description: r.description, logo: r.logo });
    setIsRecogFormOpen(true);
  };
  const handleRecogSubmit = (e) => {
    e.preventDefault();
    if (currentRecog) {
      setRecognitions(prev => prev.map(r => r.id === currentRecog.id ? { ...r, ...recogFormData } : r));
      triggerAlert("Institutional recognition updated successfully!");
    } else {
      setRecognitions(prev => [...prev, { id: `recog-${Date.now()}`, ...recogFormData }]);
      triggerAlert("New institutional recognition added successfully!");
    }
    setIsRecogFormOpen(false);
  };
  const handleRecogDelete = (r) => {
    setRecogToDelete(r);
    setIsRecogDeleteOpen(true);
  };
  const handleRecogConfirmDelete = () => {
    setRecognitions(prev => prev.filter(r => r.id !== recogToDelete.id));
    setIsRecogDeleteOpen(false);
    triggerAlert("Recognition step deleted successfully!", "error");
  };

  return (
    <div>
      {/* Success/Error alert */}
      {alertInfo.show && (
        <div className={`admin-badge ${alertInfo.type === "success" ? "admin-badge--success" : "admin-badge--error"}`} style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1100, padding: "0.75rem 1.5rem", boxShadow: "var(--shadow-md)" }}>
          {alertInfo.text}
        </div>
      )}

      <div className="admin-page-header">
        <div className="admin-page-header__info">
          <h1 className="admin-page-header__title">About Page Editor</h1>
          <p className="admin-page-header__desc">Directly manage about timelines, glancing metrics, campus infrastructures, and recognitions.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-settings-tabs" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
        <button className={`admin-settings-tab ${activeTab === "highlights" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("highlights")}>At a Glance</button>
        <button className={`admin-settings-tab ${activeTab === "journey" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("journey")}>Journey Timeline</button>
        <button className={`admin-settings-tab ${activeTab === "infra" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("infra")}>Infrastructure</button>
        <button className={`admin-settings-tab ${activeTab === "aboutImage" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("aboutImage")}>Main Page Image</button>
        <button className={`admin-settings-tab ${activeTab === "recognition" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("recognition")}>Institutional Recognition</button>
      </div>

      {/* ========================== TAB 1: GLANCING HIGHLIGHTS ========================== */}
      {activeTab === "highlights" && (
        <div className="admin-card">
          <h3 className="admin-card__title">At a Glance Highlights</h3>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Stat Label</th>
                  <th>Stat Value</th>
                  <th style={{ width: "100px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {highlights.map((hl) => (
                  <tr key={hl.id}>
                    <td style={{ fontWeight: "bold" }}>{hl.label}</td>
                    <td><span className="admin-badge admin-badge--info" style={{ fontWeight: "bold", fontSize: "13px" }}>{hl.value}</span></td>
                    <td>
                      <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => handleHlEdit(hl)}><EditIcon /> Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================== TAB 2: JOURNEY TIMELINE ========================== */}
      {activeTab === "journey" && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ margin: 0, color: "var(--color-primary-900)" }}>History & Journey Milestones</h3>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={handleJourneyAdd}>
              <PlusIcon style={{ width: "14px", height: "14px" }} /> Add Milestone
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: "110px" }}>Year</th>
                  <th style={{ width: "200px" }}>Milestone Title</th>
                  <th>Description Summary</th>
                  <th style={{ width: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {journey.map((j) => (
                  <tr key={j.id}>
                    <td><span className="admin-badge admin-badge--info" style={{ fontWeight: "bold" }}>{j.year}</span></td>
                    <td style={{ fontWeight: "bold" }}>{j.title}</td>
                    <td>{j.description}</td>
                    <td>
                      <div className="admin-table__actions">
                        <button className="admin-table__action-btn admin-table__action-btn--edit" onClick={() => handleJourneyEdit(j)}><EditIcon /></button>
                        <button className="admin-table__action-btn admin-table__action-btn--delete" onClick={() => handleJourneyDelete(j)}><DeleteIcon /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================== TAB 3: INFRASTRUCTURE ========================== */}
      {activeTab === "infra" && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ margin: 0, color: "var(--color-primary-900)" }}>Campus Learning Spaces</h3>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={handleInfraAdd}>
              <PlusIcon style={{ width: "14px", height: "14px" }} /> Add Space
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Space Title</th>
                  <th>Space Description</th>
                  <th>Image URL</th>
                  <th style={{ width: "180px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {infrastructure.map((infraItem) => (
                  <tr key={infraItem.id}>
                    <td style={{ fontWeight: "bold" }}>{infraItem.title}</td>
                    <td>{infraItem.description}</td>
                    <td><code style={{ fontSize: "11px" }}>{infraItem.image}</code></td>
                    <td>
                      <div className="admin-table__actions" style={{ justifyContent: "flex-end", gap: "0.5rem" }}>
                        <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => handleInfraEdit(infraItem)}><EditIcon /> Edit</button>
                        <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => handleInfraDelete(infraItem)}><DeleteIcon /> Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================== TAB 4: MAIN ABOUT IMAGE ========================== */}
      {activeTab === "aboutImage" && (
        <form onSubmit={handleAboutImageSubmit} className="admin-card" style={{ maxWidth: "600px" }}>
          <h3 className="admin-card__title">Main About Page Overview Image</h3>
          
          <div className="admin-form-group">
            <label className="admin-label">Image URL *</label>
            <input type="url" className="admin-input" value={aboutPageImage} onChange={(e) => setAboutPageImage(e.target.value)} required />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="admin-btn admin-btn--primary">Save Image URL</button>
          </div>
        </form>
      )}

      {/* ========================== TAB 5: INSTITUTIONAL RECOGNITION ========================== */}
      {activeTab === "recognition" && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ margin: 0, color: "var(--color-primary-900)" }}>Institutional Recognition</h3>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={handleRecogAdd}>
              <PlusIcon style={{ width: "14px", height: "14px" }} /> Add Recognition
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Recognition Title</th>
                  <th>Description</th>
                  <th>Image URL</th>
                  <th style={{ width: "180px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recognitions.map((r) => (
                  <tr key={r.id}>
                    <td style={{ fontWeight: "bold" }}>{r.title}</td>
                    <td>{r.description}</td>
                    <td><code style={{ fontSize: "11px" }}>{r.logo}</code></td>
                    <td>
                      <div className="admin-table__actions" style={{ justifyContent: "flex-end", gap: "0.5rem" }}>
                        <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => handleRecogEdit(r)}><EditIcon /> Edit</button>
                        <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => handleRecogDelete(r)}><DeleteIcon /> Delete</button>
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
          MODALS WITH STICKY FOOTER ACTION BUTTONS (No Previews)
          ======================================================== */}
      
      {/* Glance Highlight Modal */}
      {isHlFormOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up" style={{ maxWidth: "400px" }}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">Edit Glancing Metric</h3>
              <span className="admin-modal__close" onClick={() => setIsHlFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleHlSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Stat Label</label>
                  <input type="text" className="admin-input" value={hlFormData.label} disabled />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Stat Value *</label>
                  <input type="text" className="admin-input" value={hlFormData.value} onChange={(e) => setHlFormData({ ...hlFormData, value: e.target.value })} required />
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsHlFormOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Save Highlight</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Timeline Journey Modal */}
      {isJourneyFormOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up">
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentJourney ? "Edit Timeline Step" : "Add Timeline Step"}</h3>
              <span className="admin-modal__close" onClick={() => setIsJourneyFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleJourneySubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Milestone Year (Text or Number) *</label>
                  <input type="text" className="admin-input" value={journeyFormData.year} onChange={(e) => setJourneyFormData({ ...journeyFormData, year: e.target.value })} placeholder="e.g. 1958 or 1980s" required />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Milestone Title *</label>
                  <input type="text" className="admin-input" value={journeyFormData.title} onChange={(e) => setJourneyFormData({ ...journeyFormData, title: e.target.value })} required />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Description Summary *</label>
                  <textarea className="admin-textarea" value={journeyFormData.description} onChange={(e) => setJourneyFormData({ ...journeyFormData, description: e.target.value })} required style={{ minHeight: "80px" }} />
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsJourneyFormOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Save Milestone</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Infrastructure Modal */}
      {isInfraFormOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up">
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentInfra ? "Edit Space" : "Add Space"}</h3>
              <span className="admin-modal__close" onClick={() => setIsInfraFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleInfraSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Space Title *</label>
                  <input type="text" className="admin-input" value={infraFormData.title} onChange={(e) => setInfraFormData({ ...infraFormData, title: e.target.value })} required />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Space Description *</label>
                  <textarea className="admin-textarea" value={infraFormData.description} onChange={(e) => setInfraFormData({ ...infraFormData, description: e.target.value })} required style={{ minHeight: "80px" }} />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label font-bold">Image URL *</label>
                  <input type="url" className="admin-input" value={infraFormData.image} onChange={(e) => setInfraFormData({ ...infraFormData, image: e.target.value })} required />
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsInfraFormOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Save Space</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Recognition Modal */}
      {isRecogFormOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up">
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentRecog ? "Edit Recognition" : "Add Recognition"}</h3>
              <span className="admin-modal__close" onClick={() => setIsRecogFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleRecogSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Recognition Title *</label>
                  <input type="text" className="admin-input" value={recogFormData.title} onChange={(e) => setRecogFormData({ ...recogFormData, title: e.target.value })} required />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Description Summary *</label>
                  <textarea className="admin-textarea" value={recogFormData.description} onChange={(e) => setRecogFormData({ ...recogFormData, description: e.target.value })} required style={{ minHeight: "80px" }} />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label font-bold">Image URL *</label>
                  <input type="url" className="admin-input" value={recogFormData.logo} onChange={(e) => setRecogFormData({ ...recogFormData, logo: e.target.value })} placeholder="https://example.com/logo.png" required />
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsRecogFormOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Save Recognition</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Warning Modals */}
      <DeleteConfirmationModal isOpen={isJourneyDeleteOpen} onClose={() => setIsJourneyDeleteOpen(false)} onConfirm={handleJourneyConfirmDelete} itemName={journeyToDelete?.title || ""} itemType="timeline milestone" />
      <DeleteConfirmationModal isOpen={isInfraDeleteOpen} onClose={() => setIsInfraDeleteOpen(false)} onConfirm={handleInfraConfirmDelete} itemName={infraToDelete?.title || ""} itemType="campus infrastructure item" />
      <DeleteConfirmationModal isOpen={isRecogDeleteOpen} onClose={() => setIsRecogDeleteOpen(false)} onConfirm={handleRecogConfirmDelete} itemName={recogToDelete?.title || ""} itemType="institutional recognition" />
    </div>
  );
}
