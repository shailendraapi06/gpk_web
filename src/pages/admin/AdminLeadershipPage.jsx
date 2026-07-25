import React, { useState } from "react";
import { PlusIcon, EditIcon, DeleteIcon, ChevronUpIcon, ChevronDownIcon } from "../../components/admin/Icons";
import { DeleteConfirmationModal } from "../../components/admin/DeleteConfirmationModal";

export function AdminLeadershipPage() {
  const [leaders, setLeaders] = useState([
    {
      id: "leader-1",
      name: "Dr. Anil Kumar Yadav",
      designation: "Principal",
      message: "Our institute focuses on nurturing industry-aligned technical competencies and values. We aim to guide students to build robust engineering foundations that prepare them for advanced roles.",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop",
      order: 1
    },
    {
      id: "leader-2",
      name: "Prof. Sudhakar Pandey",
      designation: "Vice Principal",
      message: "Academic discipline, modern laboratory learning, and regular attendance are crucial to engineering curriculum outcomes. We support students in achieving their professional milestones.",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop",
      order: 2
    },
    {
      id: "leader-3",
      name: "Prof. Amit Kumar",
      designation: "Training & Placement Officer",
      message: "Our placement cell maintains close ties with industrial recruiters to coordinate recruitment drives and pre-placement orientation programs for diploma final year students.",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop",
      order: 3
    }
  ]);

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentLeader, setCurrentLeader] = useState(null);
  const [leaderToDelete, setLeaderToDelete] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    message: "",
    photo: "",
    order: 1
  });

  const handleAddClick = () => {
    setCurrentLeader(null);
    setFormData({
      name: "",
      designation: "",
      message: "",
      photo: "",
      order: leaders.length + 1
    });
    setIsFormOpen(true);
  };

  const handleEditClick = (leader) => {
    setCurrentLeader(leader);
    setFormData({
      name: leader.name,
      designation: leader.designation,
      message: leader.message,
      photo: leader.photo,
      order: leader.order
    });
    setIsFormOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.designation) {
      alert("Name and Designation are required.");
      return;
    }

    if (currentLeader) {
      setLeaders(prev => prev.map(l => l.id === currentLeader.id ? { ...l, ...formData, order: Number(formData.order) } : l));
    } else {
      const newLeader = {
        id: `leader-${Date.now()}`,
        ...formData,
        order: Number(formData.order)
      };
      setLeaders(prev => [...prev, newLeader]);
    }
    setIsFormOpen(false);
  };

  const handleDeleteClick = (leader) => {
    setLeaderToDelete(leader);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (leaderToDelete) {
      setLeaders(prev => prev.filter(l => l.id !== leaderToDelete.id));
      setIsDeleteOpen(false);
      setLeaderToDelete(null);
    }
  };

  // Reorder functionality (up/down)
  const handleMove = (index, direction) => {
    const sorted = [...leaders].sort((a, b) => a.order - b.order);
    const newIndex = direction === "up" ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= sorted.length) return;

    // Swap order values
    const tempOrder = sorted[index].order;
    sorted[index].order = sorted[newIndex].order;
    sorted[newIndex].order = tempOrder;

    setLeaders(sorted);
  };

  const sortedLeaders = [...leaders].sort((a, b) => a.order - b.order);

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header__info">
          <h1 className="admin-page-header__title">College Leadership & Messages</h1>
          <p className="admin-page-header__desc">Manage key administration members, Principal messages, and staff profiles visible on the homepage.</p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={handleAddClick}>
          <PlusIcon style={{ width: "16px", height: "16px" }} />
          <span>Add Leader Profile</span>
        </button>
      </div>

      {/* Leadership List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {sortedLeaders.map((leader, index) => (
          <div key={leader.id} className="admin-card" style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", padding: "1.5rem", position: "relative", flexWrap: "wrap" }}>
            {/* Reorder Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", justifyContent: "center" }}>
              <button 
                className="admin-btn admin-btn--secondary admin-btn--icon-only" 
                style={{ padding: "0.25rem", borderRadius: "var(--radius-pill)" }}
                onClick={() => handleMove(index, "up")}
                disabled={index === 0}
                title="Move Up"
              >
                <ChevronUpIcon style={{ width: "16px", height: "16px" }} />
              </button>
              <button 
                className="admin-btn admin-btn--secondary admin-btn--icon-only" 
                style={{ padding: "0.25rem", borderRadius: "var(--radius-pill)" }}
                onClick={() => handleMove(index, "down")}
                disabled={index === sortedLeaders.length - 1}
                title="Move Down"
              >
                <ChevronDownIcon style={{ width: "16px", height: "16px" }} />
              </button>
            </div>

            {/* Portrait Photo */}
            <img 
              src={leader.photo || "https://via.placeholder.com/150"} 
              alt={leader.name} 
              style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }} 
            />

            {/* Content Details */}
            <div style={{ flex: 1, minWidth: "260px" }}>
              <h3 style={{ margin: 0, color: "var(--color-primary-900)", fontSize: "var(--font-size-lg)", fontWeight: "var(--font-weight-bold)" }}>{leader.name}</h3>
              <span className="admin-badge admin-badge--info" style={{ marginTop: "0.25rem", marginBottom: "0.75rem" }}>{leader.designation}</span>
              <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-soft)", lineHeight: "var(--line-height-relaxed)", whiteSpace: "pre-wrap", italic: "true" }}>
                "{leader.message}"
              </p>
            </div>

            {/* Actions Panel */}
            <div style={{ display: "flex", gap: "0.5rem", alignSelf: "center", marginLeft: "auto" }}>
              <button 
                className="admin-btn admin-btn--secondary admin-btn--sm"
                onClick={() => handleEditClick(leader)}
              >
                <EditIcon style={{ width: "14px", height: "14px" }} />
                <span>Edit</span>
              </button>
              <button 
                className="admin-btn admin-btn--danger admin-btn--sm"
                onClick={() => handleDeleteClick(leader)}
              >
                <DeleteIcon style={{ width: "14px", height: "14px" }} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Form Modal */}
      {isFormOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up">
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentLeader ? "Edit Leader Profile" : "Add Leader Profile"}</h3>
              <span className="admin-modal__close" onClick={() => setIsFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Leader Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="admin-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Dr. Anil Kumar Yadav"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Designation / Role Title *</label>
                  <input
                    type="text"
                    name="designation"
                    className="admin-input"
                    value={formData.designation}
                    onChange={handleInputChange}
                    placeholder="e.g. Principal / Head of Department"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Message / Speech Text</label>
                  <textarea
                    name="message"
                    className="admin-textarea"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter message text featured on the website"
                    style={{ minHeight: "120px" }}
                  />
                </div>

                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">Photo URL</label>
                    <input
                      type="url"
                      name="photo"
                      className="admin-input"
                      value={formData.photo}
                      onChange={handleInputChange}
                      placeholder="e.g. https://unsplash.com/..."
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Order Priority</label>
                    <input
                      type="number"
                      name="order"
                      className="admin-input"
                      value={formData.order}
                      onChange={handleInputChange}
                      min="1"
                    />
                  </div>
                </div>
              </div>
              <div className="admin-form-actions">
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn--primary">
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={leaderToDelete?.name || ""}
        itemType="leadership profile"
      />
    </div>
  );
}
