import React, { useState, useEffect } from "react";
import { PlusIcon, EditIcon, DeleteIcon, SearchIcon, DocumentIcon } from "../../components/admin/Icons";
import { DeleteConfirmationModal } from "../../components/admin/DeleteConfirmationModal";
import { apiRequest } from "../../services/api/client";

export function AdminFacultyPage() {
  const [alertInfo, setAlertInfo] = useState({ show: false, text: "", type: "success" });

  const triggerAlert = (text, type = "success") => {
    setAlertInfo({ show: true, text, type });
    setTimeout(() => setAlertInfo({ show: false, text: "", type: "success" }), 3000);
  };

  const [faculties, setFaculties] = useState([
    { id: "fac-1", name: "Dr. Anil Kumar", designation: "Head of Department", department: "Computer Science & Engineering", qualification: "M.Tech., Ph.D.", experience: "14 Years", email: "anil.kumar@gpk.ac.in", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop", profileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: "fac-2", name: "Prof. Ritu Singh", designation: "Lecturer", department: "Information Technology", qualification: "M.Tech., B.Tech.", experience: "11 Years", email: "ritu.singh@gpk.ac.in", photo: "https://images.unsplash.com/photo-1580894732444-8fecef2271ff?q=80&w=200&auto=format&fit=crop", profileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: "fac-3", name: "Dr. Vivek Sharma", designation: "Lecturer", department: "Artificial Intelligence & Machine Learning", qualification: "M.Tech., Ph.D.", experience: "9 Years", email: "vivek.sharma@gpk.ac.in", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop", profileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: "fac-4", name: "Prof. S. K. Verma", designation: "Head of Department", department: "Civil Engineering", qualification: "M.E., B.E.", experience: "16 Years", email: "sk.verma@gpk.ac.in", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", profileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: "fac-5", name: "Prof. Rajesh Tiwari", designation: "Lecturer", department: "Mechanical Engineering", qualification: "M.Tech., B.Tech.", experience: "13 Years", email: "rajesh.tiwari@gpk.ac.in", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop", profileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
  ]);

  useEffect(() => {
    async function fetchFaculties() {
      try {
        const res = await apiRequest("/faculties");
        if (res && res.faculties && res.faculties.length > 0) {
          setFaculties(res.faculties.map(f => ({
            id: f.id || f._id,
            _id: f.id || f._id,
            name: f.name,
            designation: f.designation,
            department: f.departmentName || f.department || "Computer Science & Engineering",
            qualification: f.qualification,
            experience: f.experience,
            email: f.email,
            phone: f.phone,
            photo: f.photo || f.photoUrl || "",
            profileUrl: f.profileUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          })));
        }
      } catch (err) {
        console.warn("Could not load faculty list from API:", err);
      }
    }
    fetchFaculties();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentFaculty, setCurrentFaculty] = useState(null);
  const [facultyToDelete, setFacultyToDelete] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    designation: "Lecturer",
    department: "Computer Science & Engineering",
    qualification: "",
    experience: "",
    email: "",
    photo: "",
    profileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  });

  const departmentsList = [
    "Computer Science & Engineering",
    "Information Technology",
    "Artificial Intelligence & Machine Learning",
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Electronics Engineering",
    "Interior Design"
  ];

  const designationsList = [
    "Head of Department",
    "Senior Lecturer",
    "Lecturer",
    "Workshop / Lab Incharge"
  ];

  const handleAddClick = () => {
    setCurrentFaculty(null);
    setFormData({
      name: "",
      designation: "Lecturer",
      department: "Computer Science & Engineering",
      qualification: "",
      experience: "",
      email: "",
      photo: "",
      profileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    });
    setIsFormOpen(true);
  };

  const handleEditClick = (faculty) => {
    setCurrentFaculty(faculty);
    setFormData({
      name: faculty.name,
      designation: faculty.designation,
      department: faculty.department,
      qualification: faculty.qualification,
      experience: faculty.experience,
      email: faculty.email,
      photo: faculty.photo,
      profileUrl: faculty.profileUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    });
    setIsFormOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      triggerAlert("Name and Email are required.", "error");
      return;
    }

    const payload = {
      name: formData.name,
      designation: formData.designation,
      departmentName: formData.department,
      qualification: formData.qualification,
      experience: formData.experience,
      email: formData.email,
      photo: formData.photo,
      profileUrl: formData.profileUrl
    };

    try {
      if (currentFaculty) {
        await apiRequest(`/faculties/${currentFaculty.id}`, {
          method: "PUT",
          body: JSON.stringify(payload)
        });
        setFaculties(prev => prev.map(f => f.id === currentFaculty.id ? { ...f, ...formData } : f));
        triggerAlert("Faculty profile updated successfully!");
      } else {
        const res = await apiRequest("/faculties", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        const newFaculty = {
          id: res?.faculty?.id || `fac-${Date.now()}`,
          ...formData
        };
        setFaculties(prev => [newFaculty, ...prev]);
        triggerAlert("New faculty profile added successfully!");
      }
    } catch (err) {
      console.warn("API faculty action failed, applying locally:", err);
      if (currentFaculty) {
        setFaculties(prev => prev.map(f => f.id === currentFaculty.id ? { ...f, ...formData } : f));
        triggerAlert("Faculty profile updated locally!");
      } else {
        setFaculties(prev => [{ id: `fac-${Date.now()}`, ...formData }, ...prev]);
        triggerAlert("New faculty profile added locally!");
      }
    }

    setIsFormOpen(false);
  };

  const handleDeleteClick = (faculty) => {
    setFacultyToDelete(faculty);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (facultyToDelete) {
      try {
        await apiRequest(`/faculties/${facultyToDelete.id}`, { method: "DELETE" });
      } catch (err) {
        console.warn("API faculty delete failed, deleting locally:", err);
      }

      setFaculties(prev => prev.filter(f => f.id !== facultyToDelete.id));
      setIsDeleteOpen(false);
      setFacultyToDelete(null);
      triggerAlert("Faculty profile deleted successfully!", "error");
      
      const updatedTotalPages = Math.ceil((faculties.length - 1) / itemsPerPage);
      if (currentPage > updatedTotalPages && currentPage > 1) {
        setCurrentPage(updatedTotalPages);
      }
    }
  };

  // Filter
  const filteredFaculties = faculties.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faculty.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faculty.qualification.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === "All" || faculty.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  // Pagination
  const totalPages = Math.ceil(filteredFaculties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFaculties = filteredFaculties.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div>
      {/* Toast Alert banner */}
      {alertInfo.show && (
        <div className={`admin-badge ${alertInfo.type === "success" ? "admin-badge--success" : "admin-badge--error"}`} style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1100, padding: "0.75rem 1.5rem", boxShadow: "var(--shadow-md)" }}>
          {alertInfo.text}
        </div>
      )}

      <div className="admin-page-header">
        <div className="admin-page-header__info">
          <h1 className="admin-page-header__title">Faculty Master Directory</h1>
          <p className="admin-page-header__desc">Directly manage academic staff listings, designations, and verify curriculum CV portfolio links.</p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={handleAddClick}>
          <PlusIcon style={{ width: "16px", height: "16px" }} /> Add Faculty Member
        </button>
      </div>

      {/* Filter and Search */}
      <div className="admin-filter-bar">
        <div className="admin-search-wrapper">
          <SearchIcon className="admin-search-icon" />
          <input
            type="text"
            className="admin-search-input"
            placeholder="Search by name or qualification..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="admin-filter-controls">
          <label className="admin-label" style={{ margin: 0 }}>Department:</label>
          <select
            className="admin-filter-select"
            value={deptFilter}
            onChange={(e) => {
              setDeptFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Departments</option>
            {departmentsList.map((d, idx) => (
              <option key={idx} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Member Details</th>
              <th>Department</th>
              <th>Qualification</th>
              <th>Experience</th>
              <th>Photo URL</th>
              <th>Profile PDF</th>
              <th style={{ width: "120px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFaculties.length > 0 ? (
              paginatedFaculties.map((fac) => (
                <tr key={fac.id}>
                  <td>
                    <div style={{ fontWeight: "var(--font-weight-bold)" }}>{fac.name}</div>
                    <div style={{ fontSize: "var(--font-size-xs)", color: "var(--color-primary-500)", fontWeight: "var(--font-weight-semibold)" }}>{fac.designation}</div>
                    <div style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)" }}>{fac.email}</div>
                  </td>
                  <td>{fac.department}</td>
                  <td>{fac.qualification}</td>
                  <td>{fac.experience}</td>
                  <td><code style={{ fontSize: "11px" }}>{fac.photo}</code></td>
                  <td>
                    {fac.profileUrl ? (
                      <a href={fac.profileUrl} target="_blank" rel="noreferrer" className="admin-btn admin-btn--secondary admin-btn--sm" style={{ display: "inline-flex", padding: "4px 8px" }}>
                        <DocumentIcon style={{ width: "12px", height: "12px", marginRight: "4px" }} /> Preview CV
                      </a>
                    ) : (
                      <span style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-xs)" }}>None</span>
                    )}
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      <button className="admin-table__action-btn admin-table__action-btn--edit" onClick={() => handleEditClick(fac)} title="Edit Profile"><EditIcon /></button>
                      <button className="admin-table__action-btn admin-table__action-btn--delete" onClick={() => handleDeleteClick(fac)} title="Delete Profile"><DeleteIcon /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-muted)" }}>No faculty members found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", padding: "0.75rem 1.5rem", background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)" }}>
          <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-soft)" }}>Showing Page <strong>{currentPage}</strong> of {totalPages}</span>
          <div style={{ display: "flex", gap: "0.25rem" }}>
            <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button key={idx} className={`admin-btn admin-btn--sm ${currentPage === idx + 1 ? "admin-btn--primary" : "admin-btn--secondary"}`} style={{ minWidth: "32px", padding: "0.375rem" }} onClick={() => handlePageChange(idx + 1)}>{idx + 1}</button>
            ))}
            <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
      )}

      {/* Faculty Add/Edit Modal */}
      {isFormOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up">
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentFaculty ? "Edit Faculty Profile" : "Add Faculty Profile"}</h3>
              <span className="admin-modal__close" onClick={() => setIsFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Member Full Name *</label>
                  <input type="text" name="name" className="admin-input" value={formData.name} onChange={handleInputChange} placeholder="e.g. Prof. Priya Srivastava" required />
                </div>

                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">Academic Department</label>
                    <select name="department" className="admin-select" value={formData.department} onChange={handleInputChange}>
                      {departmentsList.map((d, idx) => (
                        <option key={idx} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Designation</label>
                    <select name="designation" className="admin-select" value={formData.designation} onChange={handleInputChange}>
                      {designationsList.map((d, idx) => (
                        <option key={idx} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">Qualification *</label>
                    <input type="text" name="qualification" className="admin-input" value={formData.qualification} onChange={handleInputChange} placeholder="e.g. M.Tech., NET" required />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Experience Years</label>
                    <input type="text" name="experience" className="admin-input" value={formData.experience} onChange={handleInputChange} placeholder="e.g. 10 Years" />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Official Email Address *</label>
                  <input type="email" name="email" className="admin-input" value={formData.email} onChange={handleInputChange} placeholder="e.g. priya.s@gpk.ac.in" required />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Profile CV PDF URL</label>
                  <input type="url" name="profileUrl" className="admin-input" value={formData.profileUrl} onChange={handleInputChange} placeholder="e.g. https://gpk.ac.in/cv.pdf" />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label font-bold">Avatar Photo URL</label>
                  <input type="url" name="photo" className="admin-input" value={formData.photo} onChange={handleInputChange} placeholder="https://example.com/avatar.jpg" />
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsFormOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Save Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Warning */}
      <DeleteConfirmationModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} onConfirm={handleConfirmDelete} itemName={facultyToDelete?.name || ""} itemType="faculty profile" />
    </div>
  );
}
