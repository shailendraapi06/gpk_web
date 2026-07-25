import React, { useState } from "react";
import { PlusIcon, EditIcon, DeleteIcon, SearchIcon, EyeIcon } from "../../components/admin/Icons";
import { DeleteConfirmationModal } from "../../components/admin/DeleteConfirmationModal";

export function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, date: "2026-07-22", title: "Semester examination schedule released for final year students", category: "Examination", status: "Active", isPinned: true, fileUrl: "https://example.com/exam.pdf" },
    { id: 2, date: "2026-07-20", title: "Admissions 2026 open registration guidelines and links", category: "Admission", status: "Active", isPinned: true, fileUrl: "https://example.com/admission.pdf" },
    { id: 3, date: "2026-07-15", title: "Tech Axis campus drive scheduled on 28th July 2026", category: "Placement", status: "Active", isPinned: false, fileUrl: "https://example.com/placement.pdf" },
    { id: 4, date: "2026-07-10", title: "Syllabus revision for Interior Design diploma course", category: "Academic", status: "Active", isPinned: false, fileUrl: "https://example.com/syllabus.pdf" },
    { id: 5, date: "2026-06-30", title: "Summer training program guidelines for CSE, IT and AIML students", category: "Academic", status: "Archived", isPinned: false, fileUrl: "https://example.com/summer.pdf" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  
  const [currentNotice, setCurrentNotice] = useState(null);
  const [noticeToDelete, setNoticeToDelete] = useState(null);
  const [noticeToView, setNoticeToView] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "Academic",
    date: new Date().toISOString().split('T')[0],
    status: "Active",
    isPinned: false,
    fileUrl: ""
  });

  const categories = ["Academic", "Admission", "Placement", "Examination", "General"];

  const handleAddClick = () => {
    setCurrentNotice(null);
    setFormData({
      title: "",
      category: "Academic",
      date: new Date().toISOString().split('T')[0],
      status: "Active",
      isPinned: false,
      fileUrl: ""
    });
    setIsFormOpen(true);
  };

  const handleEditClick = (notice) => {
    setCurrentNotice(notice);
    setFormData({
      title: notice.title,
      category: notice.category,
      date: notice.date,
      status: notice.status,
      isPinned: notice.isPinned,
      fileUrl: notice.fileUrl
    });
    setIsFormOpen(true);
  };

  const handleViewClick = (notice) => {
    setNoticeToView(notice);
    setIsViewOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) {
      alert("Notification title is required.");
      return;
    }

    if (currentNotice) {
      setNotifications(prev => prev.map(n => n.id === currentNotice.id ? { ...n, ...formData } : n));
    } else {
      const newNotice = {
        id: Date.now(),
        ...formData
      };
      setNotifications(prev => [newNotice, ...prev]);
    }
    setIsFormOpen(false);
  };

  const handleDeleteClick = (notice) => {
    setNoticeToDelete(notice);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (noticeToDelete) {
      setNotifications(prev => prev.filter(n => n.id !== noticeToDelete.id));
      setIsDeleteOpen(false);
      setNoticeToDelete(null);
    }
  };

  // Filter and Search logic
  const filteredNotices = notifications.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          notice.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || notice.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header__info">
          <h1 className="admin-page-header__title">Latest Notifications & Announcements</h1>
          <p className="admin-page-header__desc">Manage ticker announcements, academic bulletins, exam routines, and placement notices.</p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={handleAddClick}>
          <PlusIcon style={{ width: "16px", height: "16px" }} />
          <span>Post Notification</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-filter-bar">
        <div className="admin-search-wrapper">
          <SearchIcon className="admin-search-icon" />
          <input
            type="text"
            className="admin-search-input"
            placeholder="Search by keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="admin-filter-controls">
          <label className="admin-label" style={{ margin: 0 }}>Category:</label>
          <select
            className="admin-filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((c, idx) => (
              <option key={idx} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Notifications Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: "120px" }}>Date</th>
              <th style={{ width: "140px" }}>Category</th>
              <th>Announcement Title</th>
              <th style={{ width: "120px" }}>Status</th>
              <th style={{ width: "100px" }}>Pinned</th>
              <th style={{ width: "140px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (
                <tr key={notice.id}>
                  <td>{notice.date}</td>
                  <td>
                    <span className="admin-badge admin-badge--info">
                      {notice.category}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: "var(--font-weight-semibold)" }}>{notice.title}</div>
                    {notice.fileUrl && (
                      <a href={notice.fileUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: "var(--font-size-xs)", color: "var(--color-primary-500)", textDecoration: "underline" }}>
                        Attachment: PDF Link
                      </a>
                    )}
                  </td>
                  <td>
                    <span className={`admin-badge ${notice.status === "Active" ? "admin-badge--success" : "admin-badge--warning"}`}>
                      {notice.status}
                    </span>
                  </td>
                  <td>
                    {notice.isPinned ? (
                      <span className="admin-badge admin-badge--warning">Pinned</span>
                    ) : (
                      <span style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-xs)" }}>No</span>
                    )}
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      <button className="admin-table__action-btn admin-table__action-btn--view" onClick={() => handleViewClick(notice)} title="View Details">
                        <EyeIcon />
                      </button>
                      <button className="admin-table__action-btn admin-table__action-btn--edit" onClick={() => handleEditClick(notice)} title="Edit Notice">
                        <EditIcon />
                      </button>
                      <button className="admin-table__action-btn admin-table__action-btn--delete" onClick={() => handleDeleteClick(notice)} title="Delete Notice">
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-muted)" }}>
                  No announcements found matching the criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {isFormOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up">
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentNotice ? "Edit Notification" : "New Notification"}</h3>
              <span className="admin-modal__close" onClick={() => setIsFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Announcement Title / Headline *</label>
                  <textarea
                    name="title"
                    className="admin-textarea"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter the notification announcement text"
                    required
                  />
                </div>

                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">Category</label>
                    <select
                      name="category"
                      className="admin-select"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      {categories.map((c, idx) => (
                        <option key={idx} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Post Date</label>
                    <input
                      type="date"
                      name="date"
                      className="admin-input"
                      value={formData.date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Attachment Link (PDF or URL)</label>
                  <input
                    type="url"
                    name="fileUrl"
                    className="admin-input"
                    value={formData.fileUrl}
                    onChange={handleInputChange}
                    placeholder="e.g. https://gpk.ac.in/documents/notice.pdf"
                  />
                </div>

                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">Publishing Status</label>
                    <select
                      name="status"
                      className="admin-select"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                  <div className="admin-form-group" style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1.75rem" }}>
                    <input
                      type="checkbox"
                      name="isPinned"
                      id="isPinned"
                      checked={formData.isPinned}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="isPinned" className="admin-label" style={{ margin: 0, cursor: "pointer" }}>
                      Pin to Home Ticker
                    </label>
                  </div>
                </div>
              </div>
              <div className="admin-form-actions">
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn--primary">
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Notice Detail Modal */}
      {isViewOpen && noticeToView && (
        <div className="admin-modal-overlay" onClick={() => setIsViewOpen(false)}>
          <div className="admin-modal animate-slide-up" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "600px" }}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">Notification Details</h3>
              <span className="admin-modal__close" onClick={() => setIsViewOpen(false)}>&times;</span>
            </div>
            <div className="admin-modal__body">
              <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                <span className="admin-badge admin-badge--info">Posted: {noticeToView.date}</span>
                <span className="admin-badge admin-badge--success">Category: {noticeToView.category}</span>
                <span className={`admin-badge ${noticeToView.status === "Active" ? "admin-badge--success" : "admin-badge--warning"}`}>Status: {noticeToView.status}</span>
                {noticeToView.isPinned && <span className="admin-badge admin-badge--warning">Pinned Announcement</span>}
              </div>
              <div style={{ padding: "1rem", backgroundColor: "var(--color-neutral-50)", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", marginBottom: "1.5rem" }}>
                <h4 style={{ color: "var(--color-primary-900)", fontSize: "var(--font-size-md)", fontWeight: "var(--font-weight-semibold)", lineHeight: "var(--line-height-relaxed)" }}>
                  {noticeToView.title}
                </h4>
              </div>
              {noticeToView.fileUrl && (
                <div>
                  <h5 className="admin-label">Attachment Document:</h5>
                  <a href={noticeToView.fileUrl} target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn--secondary" style={{ display: "inline-flex" }}>
                    Download Document File (PDF)
                  </a>
                </div>
              )}
            </div>
            <div className="admin-form-actions" style={{ padding: "1.25rem 1.5rem" }}>
              <button className="admin-btn admin-btn--secondary" onClick={() => setIsViewOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={noticeToDelete?.title || ""}
        itemType="notification announcement"
      />
    </div>
  );
}
