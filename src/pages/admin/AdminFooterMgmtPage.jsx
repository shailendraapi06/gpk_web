import React, { useState, useEffect } from "react";
import { PlusIcon, EditIcon, DeleteIcon } from "../../components/admin/Icons";
import { DeleteConfirmationModal } from "../../components/admin/DeleteConfirmationModal";
import { apiRequest } from "../../services/api/client";

export function AdminFooterMgmtPage() {
  const [alertInfo, setAlertInfo] = useState({ show: false, text: "", type: "success" });
  const [loading, setLoading] = useState(false);

  const triggerAlert = (text, type = "success") => {
    setAlertInfo({ show: true, text, type });
    setTimeout(() => setAlertInfo({ show: false, text: "", type: "success" }), 3000);
  };

  // Branding College Info
  const [collegeInfo, setCollegeInfo] = useState({
    title: "Government Polytechnic Kanpur",
    description: "A professional academic web platform foundation for institutional information, student services, and future API-driven updates."
  });

  // Contact Details
  const [contactDetails, setContactDetails] = useState({
    address: "Kanpur, Uttar Pradesh, India",
    email: "info@gpk.ac.in",
    phone: "+91 512 258 0188"
  });

  // Social Links
  const [socials, setSocials] = useState([
    { id: "soc-1", label: "Facebook", href: "https://facebook.com", shortLabel: "Fb" },
    { id: "soc-2", label: "Instagram", href: "https://instagram.com", shortLabel: "Ig" },
    { id: "soc-3", label: "LinkedIn", href: "https://linkedin.com", shortLabel: "In" },
    { id: "soc-4", label: "YouTube", href: "https://youtube.com", shortLabel: "Yt" }
  ]);

  // Modal and Form States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentSocial, setCurrentSocial] = useState(null);
  const [socialToDelete, setSocialToDelete] = useState(null);
  const [formData, setFormData] = useState({ label: "", href: "", shortLabel: "" });

  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true);
        const res = await apiRequest("/settings");
        if (res && res.settings) {
          const s = res.settings;
          setCollegeInfo({
            title: s.collegeName || "Government Polytechnic Kanpur",
            description: s.collegeDescription || s.tagline || ""
          });
          setContactDetails({
            address: s.address || "",
            email: s.email || s.primaryEmail || "",
            phone: s.phone || ""
          });
          if (s.socials && s.socials.length > 0) {
            setSocials(s.socials);
          }
        }
      } catch (err) {
        console.warn("Could not fetch footer settings from API:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleBrandingSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest("/settings", {
        method: "PUT",
        body: JSON.stringify({
          collegeName: collegeInfo.title,
          collegeDescription: collegeInfo.description,
          address: contactDetails.address,
          email: contactDetails.email,
          phone: contactDetails.phone
        })
      });
      triggerAlert("Branding copy and contact information updated successfully!");
    } catch (err) {
      console.warn("Branding submit API error:", err);
      triggerAlert("Information updated locally!");
    }
  };

  const saveSocialsToBackend = async (newSocials) => {
    try {
      await apiRequest("/settings", {
        method: "PUT",
        body: JSON.stringify({ socials: newSocials })
      });
    } catch (err) {
      console.warn("Socials save API error:", err);
    }
  };

  const handleAddClick = () => {
    setCurrentSocial(null);
    setFormData({ label: "", href: "", shortLabel: "" });
    setIsFormOpen(true);
  };

  const handleEditClick = (social) => {
    setCurrentSocial(social);
    setFormData({ label: social.label, href: social.href, shortLabel: social.shortLabel });
    setIsFormOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === "label" && !currentSocial) {
        updated.shortLabel = value.substring(0, 2);
      }
      return updated;
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.label || !formData.href || !formData.shortLabel) {
      triggerAlert("All fields are required.", "error");
      return;
    }

    let updatedList = [];
    if (currentSocial) {
      updatedList = socials.map(s => s.id === currentSocial.id ? { ...s, ...formData } : s);
      triggerAlert("Social link updated successfully!");
    } else {
      updatedList = [...socials, { id: `soc-${Date.now()}`, ...formData }];
      triggerAlert("New social link added successfully!");
    }

    setSocials(updatedList);
    await saveSocialsToBackend(updatedList);
    setIsFormOpen(false);
  };

  const handleDeleteClick = (social) => {
    setSocialToDelete(social);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    const updatedList = socials.filter(s => s.id !== socialToDelete.id);
    setSocials(updatedList);
    await saveSocialsToBackend(updatedList);
    setIsDeleteOpen(false);
    triggerAlert("Social link deleted successfully!", "error");
  };

  return (
    <div>
      {/* Toast Alert */}
      {alertInfo.show && (
        <div className={`admin-badge ${alertInfo.type === "success" ? "admin-badge--success" : "admin-badge--error"}`} style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1100, padding: "0.75rem 1.5rem", boxShadow: "var(--shadow-md)" }}>
          {alertInfo.text}
        </div>
      )}

      <div className="admin-page-header">
        <div className="admin-page-header__info">
          <h1 className="admin-page-header__title">Footer Editor</h1>
          <p className="admin-page-header__desc">Directly manage branding content and social networking redirect URLs displayed in the main website footer.</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "flex-start" }} className="admin-form-group--row">
        {/* Contact Info Form */}
        <form onSubmit={handleBrandingSubmit} className="admin-card" style={{ margin: 0 }}>
          <h3 className="admin-card__title">College Info & Contact</h3>

          <div className="admin-form-group">
            <label className="admin-label">College Brand Title</label>
            <input type="text" className="admin-input" value={collegeInfo.title} onChange={(e) => setCollegeInfo({ ...collegeInfo, title: e.target.value })} required />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">College Brand Description</label>
            <textarea className="admin-textarea" value={collegeInfo.description} onChange={(e) => setCollegeInfo({ ...collegeInfo, description: e.target.value })} required style={{ minHeight: "80px" }} />
          </div>

          <hr style={{ border: 0, borderTop: "1px solid var(--color-neutral-100)", margin: "1.25rem 0" }} />

          <h4 style={{ color: "var(--color-primary-900)", marginBottom: "1rem" }}>Contact Information</h4>

          <div className="admin-form-group">
            <label className="admin-label">Footer Address Line</label>
            <input type="text" className="admin-input" value={contactDetails.address} onChange={(e) => setContactDetails({ ...contactDetails, address: e.target.value })} required />
          </div>

          <div className="admin-form-group--row">
            <div className="admin-form-group">
              <label className="admin-label">Footer Email</label>
              <input type="email" className="admin-input" value={contactDetails.email} onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })} required />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Footer Phone</label>
              <input type="text" className="admin-input" value={contactDetails.phone} onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })} required />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="admin-btn admin-btn--primary">Save Information</button>
          </div>
        </form>

        {/* Social Links List */}
        <div className="admin-card" style={{ margin: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ margin: 0, color: "var(--color-primary-900)" }}>Social Links</h3>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={handleAddClick}>
              <PlusIcon style={{ width: "14px", height: "14px" }} /> Add Social Link
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: "80px" }}>Initials</th>
                  <th>Platform Name</th>
                  <th>Destination Redirect URL</th>
                  <th style={{ width: "100px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {socials.map((social) => (
                  <tr key={social.id}>
                    <td>
                      <span className="admin-badge admin-badge--info" style={{ fontWeight: "bold" }}>{social.shortLabel}</span>
                    </td>
                    <td style={{ fontWeight: "bold" }}>{social.label}</td>
                    <td><code style={{ fontSize: "11px" }}>{social.href}</code></td>
                    <td>
                      <div className="admin-table__actions">
                        <button className="admin-table__action-btn admin-table__action-btn--edit" onClick={() => handleEditClick(social)}><EditIcon /></button>
                        <button className="admin-table__action-btn admin-table__action-btn--delete" onClick={() => handleDeleteClick(social)}><DeleteIcon /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Social Link Form Modal */}
      {isFormOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up" style={{ maxWidth: "440px" }}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentSocial ? "Edit Social Link" : "Add Social Link"}</h3>
              <span className="admin-modal__close" onClick={() => setIsFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Platform Name *</label>
                  <input type="text" name="label" className="admin-input" value={formData.label} onChange={handleInputChange} placeholder="e.g. Facebook" required />
                </div>
                
                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">Destination URL *</label>
                    <input type="url" name="href" className="admin-input" value={formData.href} onChange={handleInputChange} placeholder="e.g. https://facebook.com/gpk" required />
                  </div>
                  <div className="admin-form-group" style={{ maxWidth: "120px" }}>
                    <label className="admin-label">Initials *</label>
                    <input type="text" name="shortLabel" className="admin-input" value={formData.shortLabel} onChange={handleInputChange} maxLength="3" placeholder="e.g. Fb" required />
                  </div>
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsFormOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Save Social Link</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Drawer */}
      <DeleteConfirmationModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} onConfirm={handleConfirmDelete} itemName={socialToDelete?.label || ""} itemType="social network redirect link" />
    </div>
  );
}
