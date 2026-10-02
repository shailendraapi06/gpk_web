import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AdminLoginPage } from "../pages/admin/AdminLoginPage";
import { apiRequest } from "../services/api/client";
import logo from "../assets/branding/logo.png";
import "../styles/admin.css";
import {
  DashboardIcon,
  SettingsIcon,
  SliderIcon,
  DepartmentsIcon,
  FacultyIcon,
  PlacementIcon,
  GalleryIcon,
  ProfileIcon,
  LogoutIcon,
  MenuIcon,
  CloseIcon,
  AboutIcon,
  AdmissionIcon,
  MessagesIcon
} from "../components/admin/Icons";

export function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        setIsAuthenticated(false);
        setIsCheckingAuth(false);
        return;
      }

      try {
        const res = await apiRequest("/auth/me");
        if (res && res.success) {
          setIsAuthenticated(true);
          setAdminUser(res.user);
          localStorage.setItem("admin_logged_in", "true");
        } else {
          handleLocalClear();
        }
      } catch (err) {
        // If token expired or invalid, clear local auth
        handleLocalClear();
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLocalClear = () => {
    localStorage.removeItem("admin_logged_in");
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  // Close sidebar on route change (for mobile view)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await apiRequest("/auth/logout", { method: "POST" });
    } catch (e) {
      // ignore logout network errors
    } finally {
      handleLocalClear();
      navigate("/admin");
    }
  };

  if (isCheckingAuth) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f8fafc" }}>
        <p style={{ color: "#475569", fontWeight: 500 }}>Verifying admin session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLoginPage
        onLoginSuccess={(user) => {
          setIsAuthenticated(true);
          setAdminUser(user);
        }}
      />
    );
  }

  const menuItems = [
    { label: "Homepage Management", path: "/admin/homepage", icon: <SliderIcon /> },
    { label: "Footer Management", path: "/admin/footer", icon: <SettingsIcon /> },
    { label: "About Management", path: "/admin/about", icon: <AboutIcon /> },
    { label: "Admission Management", path: "/admin/admission", icon: <AdmissionIcon /> },
    { label: "Department Management", path: "/admin/departments", icon: <DepartmentsIcon /> },
    { label: "Faculty Management", path: "/admin/faculty", icon: <FacultyIcon /> },
    { label: "Placement Management", path: "/admin/placement", icon: <PlacementIcon /> },
    { label: "Gallery Management", path: "/admin/gallery", icon: <GalleryIcon /> },
    { label: "Contact Inquiries", path: "/admin/contact", icon: <MessagesIcon /> },
    { label: "Website Settings", path: "/admin/settings", icon: <SettingsIcon /> }
  ];

  // Get current page label
  const currentMenuItem = menuItems.find(item => 
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)
  );
  const pageTitle = currentMenuItem ? currentMenuItem.label : "Admin Panel";

  return (
    <div className="admin-shell">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="admin-sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? "admin-sidebar--open" : ""}`}>
        <div className="admin-sidebar__brand">
          <img src={logo} alt="GPK Logo" className="admin-sidebar__logo" />
          <div className="admin-sidebar__title-wrapper">
            <h1 className="admin-sidebar__title">GPK Admin</h1>
            <span className="admin-sidebar__subtitle">Management Console</span>
          </div>
          <button 
            type="button"
            className="admin-sidebar__close-btn" 
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close navigation sidebar"
          >
            <CloseIcon style={{ width: "24px", height: "24px" }} />
          </button>
        </div>

        <nav className="admin-sidebar__nav">
          {menuItems.map((item) => {
            const isActive = item.exact 
              ? location.pathname === item.path 
              : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`admin-sidebar__link ${isActive ? "admin-sidebar__link--active" : ""}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar__footer">
          <button onClick={handleLogout} className="admin-sidebar__logout-btn">
            <LogoutIcon />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="admin-main-wrapper">
        <header className="admin-navbar">
          <div className="admin-navbar__left">
            <button 
              type="button"
              className="admin-navbar__toggle admin-navbar__toggle--mobile-only" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle navigation sidebar"
            >
              <MenuIcon style={{ width: "24px", height: "24px" }} />
            </button>
            <h2 className="admin-navbar__title">{pageTitle}</h2>
          </div>

          <div className="admin-navbar__right">
            <div 
              className="admin-navbar__profile"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="admin-navbar__avatar">
                {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="admin-navbar__user-info" style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span className="admin-navbar__username">{adminUser?.name || "GPK Administrator"}</span>
                <span className="admin-navbar__role">{adminUser?.role === "admin" ? "Super Admin" : "Administrator"}</span>
              </div>
              
              {isDropdownOpen && (
                <div className="admin-navbar__dropdown">
                  <Link to="/admin/profile" className="admin-navbar__dropdown-item">
                    <ProfileIcon style={{ width: "16px", height: "16px" }} />
                    <span>My Profile</span>
                  </Link>
                  <Link to="/admin/settings" className="admin-navbar__dropdown-item">
                    <SettingsIcon style={{ width: "16px", height: "16px" }} />
                    <span>Settings</span>
                  </Link>
                  <hr style={{ border: 0, borderTop: "1px solid var(--color-neutral-100)", margin: "0.25rem 0" }} />
                  <div onClick={handleLogout} className="admin-navbar__dropdown-item" style={{ color: "var(--color-error-500)" }}>
                    <LogoutIcon style={{ width: "16px", height: "16px" }} />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
