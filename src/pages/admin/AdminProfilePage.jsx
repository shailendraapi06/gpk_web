import React, { useState } from "react";

export function AdminProfilePage() {
  const [profile, setProfile] = useState({
    name: "GPK Administrator",
    email: "admin@gpk.ac.in",
    role: "Super Admin",
    joinedDate: "October 14, 2024"
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [detailsSavedMsg, setDetailsSavedMsg] = useState(false);
  const [passwordSavedMsg, setPasswordSavedMsg] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    setDetailsSavedMsg(false);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setDetailsSavedMsg(true);
    setTimeout(() => setDetailsSavedMsg(false), 3000);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    setPasswordSavedMsg(false);
    setPasswordError("");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New Password and Confirmation do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("New Password must be at least 6 characters.");
      return;
    }

    // Success simulation
    setPasswordSavedMsg(true);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setTimeout(() => setPasswordSavedMsg(false), 3000);
  };

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header__info">
          <h1 className="admin-page-header__title">Administrator Profile</h1>
          <p className="admin-page-header__desc">Manage your personal credentials, contact info, and security passwords.</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem", alignItems: "flex-start" }} className="admin-form-group--row">
        {/* Profile Card */}
        <div className="admin-profile-card">
          <div className="admin-profile-card__avatar">A</div>
          <h3 className="admin-profile-card__name">{profile.name}</h3>
          <span className="admin-profile-card__role">{profile.role}</span>
          
          <div className="admin-profile-card__meta">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Email:</span>
              <strong style={{ color: "var(--color-text)" }}>{profile.email}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Joined:</span>
              <strong style={{ color: "var(--color-text)" }}>{profile.joinedDate}</strong>
            </div>
          </div>
        </div>

        {/* Edit Panels */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Personal Details Form */}
          <div className="admin-card" style={{ margin: 0 }}>
            <h3 className="admin-card__title">Personal Details</h3>
            {detailsSavedMsg && (
              <div className="admin-badge admin-badge--success" style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", borderRadius: "var(--radius-sm)", display: "block", textAlign: "center" }}>
                Personal details saved successfully!
              </div>
            )}
            <form onSubmit={handleProfileSubmit}>
              <div className="admin-form-group">
                <label className="admin-label">Administrator Full Name *</label>
                <input
                  type="text"
                  name="name"
                  className="admin-input"
                  value={profile.name}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Official Email Address *</label>
                <input
                  type="email"
                  name="email"
                  className="admin-input"
                  value={profile.email}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" className="admin-btn admin-btn--primary">
                  Save Details
                </button>
              </div>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="admin-card" style={{ margin: 0 }}>
            <h3 className="admin-card__title">Security Configuration</h3>
            {passwordSavedMsg && (
              <div className="admin-badge admin-badge--success" style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", borderRadius: "var(--radius-sm)", display: "block", textAlign: "center" }}>
                Password changed successfully! (Simulation)
              </div>
            )}
            {passwordError && (
              <div className="admin-badge admin-badge--error" style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", borderRadius: "var(--radius-sm)", display: "block", textAlign: "center" }}>
                {passwordError}
              </div>
            )}
            <form onSubmit={handlePasswordSubmit}>
              <div className="admin-form-group">
                <label className="admin-label" htmlFor="currentPassword">Current Password *</label>
                <input
                  id="currentPassword"
                  type="password"
                  name="currentPassword"
                  className="admin-input"
                  placeholder="••••••••"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="admin-form-group--row">
                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="newPassword">New Password *</label>
                  <input
                    id="newPassword"
                    type="password"
                    name="newPassword"
                    className="admin-input"
                    placeholder="••••••••"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="confirmPassword">Confirm New Password *</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    className="admin-input"
                    placeholder="••••••••"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" className="admin-btn admin-btn--primary">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
