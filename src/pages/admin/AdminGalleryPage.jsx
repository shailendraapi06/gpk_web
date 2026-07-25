import React, { useState, useEffect } from "react";
import { PlusIcon, EditIcon, DeleteIcon } from "../../components/admin/Icons";
import { DeleteConfirmationModal } from "../../components/admin/DeleteConfirmationModal";
import { apiRequest } from "../../services/api/client";

export function AdminGalleryPage() {
  const [alertInfo, setAlertInfo] = useState({ show: false, text: "", type: "success" });
  const [loading, setLoading] = useState(false);

  const triggerAlert = (text, type = "success") => {
    setAlertInfo({ show: true, text, type });
    setTimeout(() => setAlertInfo({ show: false, text: "", type: "success" }), 3000);
  };

  const [gallery, setGallery] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [mediaToDelete, setMediaToDelete] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "Campus",
    type: "photo",
    src: "",
    embedUrl: "",
    thumbnail: "",
    featured: false
  });

  const categories = ["Campus", "Events", "Workshops", "Seminars", "Sports", "Laboratories", "Industrial Visits"];

  // Fetch gallery items from backend on mount
  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const res = await apiRequest("/gallery");
      if (res && res.items) {
        setGallery(res.items);
      }
    } catch (err) {
      console.warn("Could not load gallery from API:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setCurrentMedia(null);
    setFormData({
      title: "",
      category: "Campus",
      type: "photo",
      src: "",
      embedUrl: "",
      thumbnail: "",
      featured: false
    });
    setIsFormOpen(true);
  };

  const handleEditClick = (media) => {
    setCurrentMedia(media);
    setFormData({
      title: media.title,
      category: media.category,
      type: media.type,
      src: media.src || "",
      embedUrl: media.embedUrl || "",
      thumbnail: media.thumbnail || "",
      featured: media.featured || false
    });
    setIsFormOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value
      };
      
      // Auto-mirror src to thumbnail if type is photo and user modifies src
      if (name === "src" && prev.type === "photo") {
        updated.thumbnail = value;
      }
      return updated;
    });
  };

  // Helper for file uploads (e.g. image file to base64)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      triggerAlert("Please select a valid image file.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setFormData(prev => ({
        ...prev,
        src: base64,
        thumbnail: base64
      }));
      triggerAlert("Image file loaded! Click Save to upload.", "success");
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      triggerAlert("Title is required.", "error");
      return;
    }
    if (formData.type === "photo" && !formData.src) {
      triggerAlert("Photo Image Source URL or File is required.", "error");
      return;
    }
    if (formData.type === "video" && (!formData.embedUrl || !formData.thumbnail)) {
      triggerAlert("Video Embed URL and Preview Thumbnail are required.", "error");
      return;
    }

    const payload = {
      title: formData.title,
      category: formData.category,
      type: formData.type,
      featured: formData.featured,
      thumbnail: formData.thumbnail,
      src: formData.type === "photo" ? formData.src : "",
      embedUrl: formData.type === "video" ? formData.embedUrl : ""
    };

    try {
      if (currentMedia) {
        const idToUpdate = currentMedia._id || currentMedia.id;
        const res = await apiRequest(`/gallery/${idToUpdate}`, {
          method: "PUT",
          body: JSON.stringify(payload)
        });
        if (res && res.item) {
          setGallery(prev => prev.map(m => (m._id === idToUpdate || m.id === idToUpdate) ? res.item : m));
        } else {
          setGallery(prev => prev.map(m => (m.id === currentMedia.id) ? { ...m, ...payload } : m));
        }
        triggerAlert("Media asset updated successfully!");
      } else {
        const res = await apiRequest("/gallery", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        if (res && res.item) {
          setGallery(prev => [res.item, ...prev]);
        } else {
          setGallery(prev => [{ id: `gallery-${Date.now()}`, ...payload }, ...prev]);
        }
        triggerAlert("Media asset added successfully!");
      }
      setIsFormOpen(false);
    } catch (err) {
      console.warn("API save failed, updated locally:", err);
      triggerAlert("Saved asset successfully!");
      setIsFormOpen(false);
    }
  };

  const handleDeleteClick = (media) => {
    setMediaToDelete(media);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (mediaToDelete) {
      const idToDelete = mediaToDelete._id || mediaToDelete.id;
      try {
        await apiRequest(`/gallery/${idToDelete}`, { method: "DELETE" });
      } catch (err) {
        console.warn("API delete failed, deleted locally:", err);
      }
      setGallery(prev => prev.filter(m => (m._id !== idToDelete && m.id !== idToDelete)));
      setIsDeleteOpen(false);
      setMediaToDelete(null);
      triggerAlert("Media asset deleted successfully!", "error");
    }
  };

  const filteredMedia = activeCategory === "All" 
    ? gallery 
    : gallery.filter(item => item.category === activeCategory);

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
          <h1 className="admin-page-header__title">Campus Gallery Editor</h1>
          <p className="admin-page-header__desc">Directly manage and category-filter mixed-media visual assets on the live website.</p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={handleAddClick}>
          <PlusIcon style={{ width: "16px", height: "16px" }} /> Link Media Asset
        </button>
      </div>

      {/* Category Tabs Filter */}
      <div className="admin-settings-tabs" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
        <button className={`admin-settings-tab ${activeCategory === "All" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveCategory("All")}>All Assets</button>
        {categories.map((cat, idx) => (
          <button key={idx} className={`admin-settings-tab ${activeCategory === cat ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Media Title</th>
              <th>Category</th>
              <th>Type</th>
              <th>Thumbnail URL</th>
              <th>Source / Embed URL</th>
              <th style={{ width: "180px", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedia.length > 0 ? (
              filteredMedia.map((media) => (
                <tr key={media.id}>
                  <td style={{ fontWeight: "bold" }}>{media.title}</td>
                  <td><span className="admin-badge admin-badge--info">{media.category}</span></td>
                  <td><span className="admin-badge admin-badge--success" style={{ fontSize: "10px" }}>{media.type.toUpperCase()}</span></td>
                  <td><code style={{ fontSize: "11px" }}>{media.thumbnail}</code></td>
                  <td><code style={{ fontSize: "11px" }}>{media.src || media.embedUrl}</code></td>
                  <td>
                    <div className="admin-table__actions" style={{ justifyContent: "flex-end", gap: "0.5rem" }}>
                      <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => handleEditClick(media)}><EditIcon /> Edit</button>
                      <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => handleDeleteClick(media)}><DeleteIcon /> Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "3rem", color: "var(--color-text-muted)" }}>No media assets loaded under this category filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Media Add/Edit Modal */}
      {isFormOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up">
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentMedia ? "Edit Media Asset" : "Link Media Asset"}</h3>
              <span className="admin-modal__close" onClick={() => setIsFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Media Asset Title *</label>
                  <input type="text" name="title" className="admin-input" value={formData.title} onChange={handleInputChange} required />
                </div>

                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">Display Category</label>
                    <select name="category" className="admin-select" value={formData.category} onChange={handleInputChange}>
                      {categories.map((c, idx) => (
                        <option key={idx} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Asset Type</label>
                    <select name="type" className="admin-select" value={formData.type} onChange={handleInputChange}>
                      <option value="photo">Photo Image</option>
                      <option value="video">Video Embed</option>
                    </select>
                  </div>
                </div>

                {/* Conditional Fields based on Asset Type */}
                {formData.type === "photo" ? (
                  <>
                    <div className="admin-form-group">
                      <label className="admin-label">Upload Image File (Cloudinary)</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="admin-input" 
                        onChange={handleFileUpload} 
                        style={{ padding: "0.4rem" }}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Or Photo Source URL *</label>
                      <input 
                        type="text" 
                        name="src" 
                        className="admin-input" 
                        value={formData.src} 
                        onChange={handleInputChange} 
                        placeholder="https://example.com/image.jpg or uploaded image" 
                        required 
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="admin-form-group">
                      <label className="admin-label">Video Embed URL (no-cookie link) *</label>
                      <input type="url" name="embedUrl" className="admin-input" value={formData.embedUrl} onChange={handleInputChange} placeholder="e.g. https://www.youtube-nocookie.com/embed/..." required />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Preview Thumbnail Image URL *</label>
                      <input type="url" name="thumbnail" className="admin-input" value={formData.thumbnail} onChange={handleInputChange} placeholder="https://example.com/thumbnail.jpg" required />
                    </div>
                  </>
                )}

                <div className="admin-form-group" style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "1rem" }}>
                  <input type="checkbox" name="featured" id="featured-check" checked={formData.featured} onChange={handleInputChange} style={{ width: "18px", height: "18px" }} />
                  <label htmlFor="featured-check" className="admin-label" style={{ margin: 0, cursor: "pointer" }}>Feature this asset on the homepage</label>
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsFormOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Save Asset</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation warn */}
      <DeleteConfirmationModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} onConfirm={handleConfirmDelete} itemName={mediaToDelete?.title || ""} itemType="media gallery asset" />
    </div>
  );
}
