import React, { useState } from "react";
import { PlusIcon, EditIcon, DeleteIcon } from "../../components/admin/Icons";
import { DeleteConfirmationModal } from "../../components/admin/DeleteConfirmationModal";

export function AdminHeroSliderPage() {
  const [slides, setSlides] = useState([
    {
      id: "slide-1",
      title: "Welcome to Government Polytechnic Kanpur",
      subtitle: "Nurturing technical competence, innovation, and career excellence since 1958.",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop",
      ctaText: "Explore Admissions",
      ctaLink: "/admissions",
      order: 1,
      status: "Active"
    },
    {
      id: "slide-2",
      title: "State-of-the-Art Labs & Infrastructure",
      subtitle: "Equipped with advanced technical setups, workshops, and high-performance computing centers.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop",
      ctaText: "Our Facilities",
      ctaLink: "/facilities",
      order: 2,
      status: "Active"
    },
    {
      id: "slide-3",
      title: "Record Breaking Placement Drives",
      subtitle: "Top-tier industrial recruiters recruiting technical graduates across IT, Civil, and Mechanical fields.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
      ctaText: "Placement Statistics",
      ctaLink: "/placement",
      order: 3,
      status: "Active"
    }
  ]);

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(null);
  const [slideToDelete, setSlideToDelete] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image: "",
    ctaText: "",
    ctaLink: "",
    order: 1,
    status: "Active"
  });

  // Open Form for Add
  const handleAddClick = () => {
    setCurrentSlide(null);
    setFormData({
      title: "",
      subtitle: "",
      image: "",
      ctaText: "",
      ctaLink: "",
      order: slides.length + 1,
      status: "Active"
    });
    setIsFormOpen(true);
  };

  // Open Form for Edit
  const handleEditClick = (slide) => {
    setCurrentSlide(slide);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      image: slide.image,
      ctaText: slide.ctaText,
      ctaLink: slide.ctaLink,
      order: slide.order,
      status: slide.status
    });
    setIsFormOpen(true);
  };

  // Handle Form Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Save Add / Edit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.image) {
      alert("Title and Image URL are required.");
      return;
    }

    if (currentSlide) {
      // Edit
      setSlides(prev => prev.map(s => s.id === currentSlide.id ? { ...s, ...formData, order: Number(formData.order) } : s));
    } else {
      // Add
      const newSlide = {
        id: `slide-${Date.now()}`,
        ...formData,
        order: Number(formData.order)
      };
      setSlides(prev => [...prev, newSlide]);
    }
    setIsFormOpen(false);
  };

  // Open Delete Confirm
  const handleDeleteClick = (slide) => {
    setSlideToDelete(slide);
    setIsDeleteOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (slideToDelete) {
      setSlides(prev => prev.filter(s => s.id !== slideToDelete.id));
      setIsDeleteOpen(false);
      setSlideToDelete(null);
    }
  };

  // Sort slides by order
  const sortedSlides = [...slides].sort((a, b) => a.order - b.order);

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header__info">
          <h1 className="admin-page-header__title">Homepage Hero Slider</h1>
          <p className="admin-page-header__desc">Manage slider images, headings, and call-to-action links featured on the landing page banner.</p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={handleAddClick}>
          <PlusIcon style={{ width: "16px", height: "16px" }} />
          <span>Add New Slide</span>
        </button>
      </div>

      {/* Grid of Slides */}
      <div className="admin-grid">
        {sortedSlides.map((slide) => (
          <div key={slide.id} className="admin-slide-card">
            <div className="admin-slide-card__image-wrapper">
              <img src={slide.image} alt={slide.title} className="admin-slide-card__img" />
              <span className={`admin-badge admin-slide-card__status ${slide.status === "Active" ? "admin-badge--success" : "admin-badge--warning"}`}>
                {slide.status}
              </span>
            </div>
            <div className="admin-slide-card__content">
              <h3 className="admin-slide-card__title">{slide.title}</h3>
              <p className="admin-slide-card__subtitle">{slide.subtitle}</p>
              
              <div className="admin-slide-card__meta">
                <div>CTA: <strong>{slide.ctaText || "None"}</strong></div>
                <div>Link: <code>{slide.ctaLink || "None"}</code></div>
                <div>Order: <strong>{slide.order}</strong></div>
              </div>

              <div className="admin-slide-card__actions">
                <button 
                  className="admin-btn admin-btn--secondary admin-btn--sm"
                  onClick={() => handleEditClick(slide)}
                >
                  <EditIcon style={{ width: "14px", height: "14px" }} />
                  <span>Edit</span>
                </button>
                <button 
                  className="admin-btn admin-btn--danger admin-btn--sm"
                  onClick={() => handleDeleteClick(slide)}
                >
                  <DeleteIcon style={{ width: "14px", height: "14px" }} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isFormOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up">
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentSlide ? "Edit Banner Slide" : "Add Banner Slide"}</h3>
              <span className="admin-modal__close" onClick={() => setIsFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Slide Heading / Title *</label>
                  <input
                    type="text"
                    name="title"
                    className="admin-input"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter main heading text"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Slide Description / Subtitle</label>
                  <textarea
                    name="subtitle"
                    className="admin-textarea"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    placeholder="Enter description text"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Image URL *</label>
                  <input
                    type="url"
                    name="image"
                    className="admin-input"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Paste image URL (e.g. https://images.unsplash.com/...)"
                    required
                  />
                </div>

                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">CTA Button Label</label>
                    <input
                      type="text"
                      name="ctaText"
                      className="admin-input"
                      value={formData.ctaText}
                      onChange={handleInputChange}
                      placeholder="e.g. Apply Now"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">CTA Redirect Link</label>
                    <input
                      type="text"
                      name="ctaLink"
                      className="admin-input"
                      value={formData.ctaLink}
                      onChange={handleInputChange}
                      placeholder="e.g. /admissions"
                    />
                  </div>
                </div>

                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">Display Order</label>
                    <input
                      type="number"
                      name="order"
                      className="admin-input"
                      value={formData.order}
                      onChange={handleInputChange}
                      min="1"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Display Status</label>
                    <select
                      name="status"
                      className="admin-select"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="admin-form-actions">
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn--primary">
                  Save Slide
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
        itemName={slideToDelete?.title || ""}
        itemType="banner slide"
      />
    </div>
  );
}
