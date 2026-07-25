import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  SliderIcon, 
  SettingsIcon, 
  AboutIcon, 
  AdmissionIcon, 
  DepartmentsIcon, 
  FacultyIcon, 
  PlacementIcon, 
  GalleryIcon 
} from "../../components/admin/Icons";

export function AdminDashboardPage() {
  const [stats] = useState([
    { label: "Faculty Directory", value: "50 Members", icon: <FacultyIcon />, colorClass: "admin-stat-card__icon-wrapper" },
    { label: "Academic Departments", value: "15+", icon: <DepartmentsIcon />, colorClass: "admin-stat-card__icon-wrapper--success" },
    { label: "Gallery Assets", value: "12 Mixed Media", icon: <GalleryIcon />, colorClass: "admin-stat-card__icon-wrapper--accent" },
    { label: "Latest Bulletins", value: "5 Published", icon: <SliderIcon />, colorClass: "admin-stat-card__icon-wrapper--accent" },
    { label: "Placement Drives", value: "3 Active", icon: <PlacementIcon />, colorClass: "admin-stat-card__icon-wrapper--success" }
  ]);

  const [activities] = useState([
    { id: 1, text: "Updated Principal Desk message content", time: "10 mins ago", category: "Homepage" },
    { id: 2, text: "Added new recruitment drive for BuildCraft India", time: "1 hour ago", category: "Placement" },
    { id: 3, text: "Uploaded Semester 1 Syllabus PDF for IT department", time: "3 hours ago", category: "Departments" },
    { id: 4, text: "Re-aligned annual tuition fee values under Admissions", time: "Yesterday", category: "Admissions" },
    { id: 5, text: "Linked Prof. Priya Srivastava to Computer Science department", time: "2 days ago", category: "Faculty" }
  ]);

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header__info">
          <h1 className="admin-page-header__title">Dashboard Overview</h1>
          <p className="admin-page-header__desc">Welcome back, Administrator. Manage the website content using the direct direct-edit modules below.</p>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="admin-stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="admin-stat-card">
            <div className={stat.colorClass}>
              {stat.icon}
            </div>
            <div className="admin-stat-card__info">
              <span className="admin-stat-card__value" style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-bold)", color: "var(--color-primary-900)" }}>
                {stat.value}
              </span>
              <span className="admin-stat-card__label" style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)" }}>
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginTop: "1.5rem" }} className="admin-form-group--row">
        {/* Quick Links Short-cuts */}
        <div className="admin-card" style={{ margin: 0 }}>
          <h3 className="admin-card__title">Quick Editor Shortcuts</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
            <Link to="/admin/homepage" className="admin-btn admin-btn--secondary" style={{ display: "flex", flexDirection: "row", padding: "1rem", height: "auto", gap: "0.75rem", justifyContent: "flex-start", textAlign: "left" }}>
              <SliderIcon style={{ width: "20px", height: "20px", color: "var(--color-primary-500)" }} />
              <div>
                <strong style={{ display: "block", fontSize: "14px" }}>Homepage</strong>
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>Banners, notices, leaders</span>
              </div>
            </Link>
            <Link to="/admin/footer" className="admin-btn admin-btn--secondary" style={{ display: "flex", flexDirection: "row", padding: "1rem", height: "auto", gap: "0.75rem", justifyContent: "flex-start", textAlign: "left" }}>
              <SettingsIcon style={{ width: "20px", height: "20px", color: "var(--color-primary-500)" }} />
              <div>
                <strong style={{ display: "block", fontSize: "14px" }}>Footer</strong>
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>Branding, contacts, socials</span>
              </div>
            </Link>
            <Link to="/admin/about" className="admin-btn admin-btn--secondary" style={{ display: "flex", flexDirection: "row", padding: "1rem", height: "auto", gap: "0.75rem", justifyContent: "flex-start", textAlign: "left" }}>
              <AboutIcon style={{ width: "20px", height: "20px", color: "var(--color-primary-500)" }} />
              <div>
                <strong style={{ display: "block", fontSize: "14px" }}>About Page</strong>
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>Timeline, infrastructures</span>
              </div>
            </Link>
            <Link to="/admin/admission" className="admin-btn admin-btn--secondary" style={{ display: "flex", flexDirection: "row", padding: "1rem", height: "auto", gap: "0.75rem", justifyContent: "flex-start", textAlign: "left" }}>
              <AdmissionIcon style={{ width: "20px", height: "20px", color: "var(--color-primary-500)" }} />
              <div>
                <strong style={{ display: "block", fontSize: "14px" }}>Admissions</strong>
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>Fees, courses, eligibility</span>
              </div>
            </Link>
            <Link to="/admin/departments" className="admin-btn admin-btn--secondary" style={{ display: "flex", flexDirection: "row", padding: "1rem", height: "auto", gap: "0.75rem", justifyContent: "flex-start", textAlign: "left" }}>
              <DepartmentsIcon style={{ width: "20px", height: "20px", color: "var(--color-primary-500)" }} />
              <div>
                <strong style={{ display: "block", fontSize: "14px" }}>Departments</strong>
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>HODs, faculty, lab gallery</span>
              </div>
            </Link>
            <Link to="/admin/faculty" className="admin-btn admin-btn--secondary" style={{ display: "flex", flexDirection: "row", padding: "1rem", height: "auto", gap: "0.75rem", justifyContent: "flex-start", textAlign: "left" }}>
              <FacultyIcon style={{ width: "20px", height: "20px", color: "var(--color-primary-500)" }} />
              <div>
                <strong style={{ display: "block", fontSize: "14px" }}>Faculty Master</strong>
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>Searchable staff directory</span>
              </div>
            </Link>
            <Link to="/admin/placement" className="admin-btn admin-btn--secondary" style={{ display: "flex", flexDirection: "row", padding: "1rem", height: "auto", gap: "0.75rem", justifyContent: "flex-start", textAlign: "left" }}>
              <PlacementIcon style={{ width: "20px", height: "20px", color: "var(--color-primary-500)" }} />
              <div>
                <strong style={{ display: "block", fontSize: "14px" }}>Placements</strong>
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>TPO info, circulars, drives</span>
              </div>
            </Link>
            <Link to="/admin/gallery" className="admin-btn admin-btn--secondary" style={{ display: "flex", flexDirection: "row", padding: "1rem", height: "auto", gap: "0.75rem", justifyContent: "flex-start", textAlign: "left" }}>
              <GalleryIcon style={{ width: "20px", height: "20px", color: "var(--color-primary-500)" }} />
              <div>
                <strong style={{ display: "block", fontSize: "14px" }}>Gallery</strong>
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>Vault photo/video assets</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Activity Logs */}
        <div className="admin-card" style={{ margin: 0 }}>
          <h3 className="admin-card__title">Recent Site Activity</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {activities.map((act) => (
              <div key={act.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 1rem", border: "1px dashed var(--color-border)", borderRadius: "var(--radius-sm)", alignItems: "center" }}>
                <div>
                  <span className="admin-badge admin-badge--info" style={{ fontSize: "9px", padding: "2px 4px", marginRight: "6px" }}>{act.category}</span>
                  <span style={{ fontSize: "13px", fontWeight: "var(--font-weight-semibold)" }}>{act.text}</span>
                </div>
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
