import React, { useState, useEffect } from "react";
import { PlusIcon, EditIcon, DeleteIcon } from "../../components/admin/Icons";
import { DeleteConfirmationModal } from "../../components/admin/DeleteConfirmationModal";
import { apiRequest } from "../../services/api/client";

export function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState([
    { id: "dept-1", name: "Computer Science & Engineering", slug: "computer-science-engineering", hod: "Dr. Anil Kumar", intake: 60, duration: "3 Years", desc: "Build strong foundations in programming, software development, data structures, and modern computing practices." },
    { id: "dept-2", name: "Information Technology", slug: "information-technology", hod: "Prof. Ritu Singh", intake: 60, duration: "3 Years", desc: "Develop digital systems knowledge with a focus on applications, networking, and information-driven solutions." },
    { id: "dept-3", name: "Artificial Intelligence & Machine Learning", slug: "artificial-intelligence-machine-learning", hod: "Dr. Vivek Sharma", intake: 30, duration: "3 Years", desc: "Learn intelligent systems, data modelling, and algorithmic thinking for future-ready technical careers." },
    { id: "dept-4", name: "Civil Engineering", slug: "civil-engineering", hod: "Prof. S. K. Verma", intake: 120, duration: "3 Years", desc: "Study structures, surveying, construction methods, and infrastructure planning through practical exposure." },
    { id: "dept-5", name: "Mechanical Engineering", slug: "mechanical-engineering", hod: "Prof. Rajesh Tiwari", intake: 120, duration: "3 Years", desc: "Gain applied knowledge in design, manufacturing, thermal systems, and workshop-oriented learning." },
    { id: "dept-6", name: "Electrical Engineering", slug: "electrical-engineering", hod: "Dr. P. K. Mishra", intake: 60, duration: "3 Years", desc: "Understand electrical systems, power applications, machines, and industry-focused technical practices." }
  ]);

  useEffect(() => {
    async function fetchDepts() {
      try {
        const res = await apiRequest("/departments");
        if (res && res.departments && res.departments.length > 0) {
          setDepartments(res.departments.map(d => ({
            id: d.id || d._id,
            _id: d.id || d._id,
            name: d.name,
            slug: d.slug,
            hod: d.hodName || d.hod?.name || "N/A",
            intake: d.intake || 60,
            duration: d.duration || "3 Years",
            desc: d.shortDescription || d.description || d.desc || ""
          })));
        }
      } catch (err) {
        console.warn("Could not fetch departments from API:", err);
      }
    }
    fetchDepts();
  }, []);

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentDept, setCurrentDept] = useState(null);
  const [deptToDelete, setDeptToDelete] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    hod: "",
    intake: 60,
    duration: "3 Years",
    desc: ""
  });

  const handleAddClick = () => {
    setCurrentDept(null);
    setFormData({
      name: "",
      slug: "",
      hod: "",
      intake: 60,
      duration: "3 Years",
      desc: ""
    });
    setIsFormOpen(true);
  };

  const handleEditClick = (dept) => {
    setCurrentDept(dept);
    setFormData({
      name: dept.name,
      slug: dept.slug,
      hod: dept.hod,
      intake: dept.intake,
      duration: dept.duration,
      desc: dept.desc
    });
    setIsFormOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === "name" && !currentDept) {
        updated.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      }
      return updated;
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.hod) {
      alert("Department Name and HOD Name are required.");
      return;
    }

    const payload = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      shortDescription: formData.desc,
      description: formData.desc,
      intake: Number(formData.intake),
      duration: formData.duration,
      hod: { name: formData.hod, designation: `Head of Department, ${formData.name}` }
    };

    try {
      if (currentDept) {
        await apiRequest(`/departments/${currentDept.id}`, {
          method: "PUT",
          body: JSON.stringify(payload)
        });
        setDepartments(prev => prev.map(d => d.id === currentDept.id ? { ...d, ...formData, intake: Number(formData.intake) } : d));
      } else {
        const res = await apiRequest("/departments", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        const newDept = {
          id: res?.department?.id || `dept-${Date.now()}`,
          ...formData,
          intake: Number(formData.intake)
        };
        setDepartments(prev => [...prev, newDept]);
      }
    } catch (err) {
      console.warn("API operation failed, updating state locally:", err);
      if (currentDept) {
        setDepartments(prev => prev.map(d => d.id === currentDept.id ? { ...d, ...formData, intake: Number(formData.intake) } : d));
      } else {
        setDepartments(prev => [...prev, { id: `dept-${Date.now()}`, ...formData, intake: Number(formData.intake) }]);
      }
    }

    setIsFormOpen(false);
  };

  const handleDeleteClick = (dept) => {
    setDeptToDelete(dept);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deptToDelete) {
      try {
        await apiRequest(`/departments/${deptToDelete.id}`, { method: "DELETE" });
      } catch (err) {
        console.warn("API delete failed, removing locally:", err);
      }
      setDepartments(prev => prev.filter(d => d.id !== deptToDelete.id));
      setIsDeleteOpen(false);
      setDeptToDelete(null);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header__info">
          <h1 className="admin-page-header__title">Academic Departments</h1>
          <p className="admin-page-header__desc">Manage course offerings, student intake capacities, and department heads.</p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={handleAddClick}>
          <PlusIcon style={{ width: "16px", height: "16px" }} />
          <span>Add Department</span>
        </button>
      </div>

      {/* Grid of Department Cards */}
      <div className="admin-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
        {departments.map((dept) => (
          <div key={dept.id} className="admin-card" style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", margin: 0 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <h3 style={{ margin: 0, fontSize: "var(--font-size-md)", fontWeight: "var(--font-weight-bold)", color: "var(--color-primary-900)" }}>
                  {dept.name}
                </h3>
              </div>
              <span className="admin-badge admin-badge--info" style={{ marginBottom: "1rem" }}>HOD: {dept.hod}</span>
              <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-soft)", marginBottom: "1.25rem", lineHeight: "1.4" }}>
                {dept.desc}
              </p>
              
              <div style={{ display: "flex", gap: "1.5rem", fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)", borderTop: "1px solid var(--color-neutral-100)", paddingTop: "0.75rem", marginBottom: "1.25rem" }}>
                <div>Intake: <strong style={{ color: "var(--color-text)" }}>{dept.intake} Students</strong></div>
                <div>Duration: <strong style={{ color: "var(--color-text)" }}>{dept.duration}</strong></div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end", borderTop: "1px solid var(--color-neutral-100)", paddingTop: "0.75rem" }}>
              <button 
                className="admin-btn admin-btn--secondary admin-btn--sm"
                onClick={() => handleEditClick(dept)}
              >
                <EditIcon style={{ width: "14px", height: "14px" }} />
                <span>Edit</span>
              </button>
              <button 
                className="admin-btn admin-btn--danger admin-btn--sm"
                onClick={() => handleDeleteClick(dept)}
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
              <h3 className="admin-modal__title">{currentDept ? "Edit Department" : "Add Department"}</h3>
              <span className="admin-modal__close" onClick={() => setIsFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Department Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="admin-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Computer Science & Engineering"
                    required
                  />
                </div>

                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">Slug / Path Key</label>
                    <input
                      type="text"
                      name="slug"
                      className="admin-input"
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="e.g. computer-science"
                      disabled={!!currentDept} // Lock slug in edit
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">HOD Full Name *</label>
                    <input
                      type="text"
                      name="hod"
                      className="admin-input"
                      value={formData.hod}
                      onChange={handleInputChange}
                      placeholder="e.g. Dr. Anil Kumar"
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">Intake Student Capacity</label>
                    <input
                      type="number"
                      name="intake"
                      className="admin-input"
                      value={formData.intake}
                      onChange={handleInputChange}
                      min="1"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Course Duration</label>
                    <input
                      type="text"
                      name="duration"
                      className="admin-input"
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="e.g. 3 Years"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Department Description</label>
                  <textarea
                    name="desc"
                    className="admin-textarea"
                    value={formData.desc}
                    onChange={handleInputChange}
                    placeholder="Provide a brief summary of the department..."
                    style={{ minHeight: "100px" }}
                  />
                </div>
              </div>
              <div className="admin-form-actions">
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn--primary">
                  Save Department
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
        itemName={deptToDelete?.name || ""}
        itemType="department"
      />
    </div>
  );
}
