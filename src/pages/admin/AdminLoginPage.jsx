import React, { useState } from "react";
import logo from "../../assets/branding/logo.png";
import { apiRequest } from "../../services/api/client";

export function AdminLoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotMsg, setShowForgotMsg] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      if (response && response.token) {
        localStorage.setItem("admin_logged_in", "true");
        localStorage.setItem("admin_token", response.token);
        localStorage.setItem("admin_user", JSON.stringify(response.user));

        if (onLoginSuccess) {
          onLoginSuccess(response.user);
        } else {
          window.location.reload();
        }
      } else {
        setError(response.message || "Authentication failed.");
      }
    } catch (err) {
      setError(err.message || "Invalid credentials or server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth-container">
      <div className="admin-auth-card animate-fade-in">
        <div className="admin-auth-header">
          <img src={logo} alt="GPK Logo" className="admin-auth-logo" />
          <h2 className="admin-auth-title">GPK Admin Portal</h2>
          <p className="admin-auth-subtitle">Sign in to manage the college website</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="admin-badge admin-badge--error" style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem", borderRadius: "var(--radius-sm)", textAlign: "center", display: "block" }}>
              {error}
            </div>
          )}

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              className="admin-input"
              placeholder="e.g. admin@gpk.ac.in"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              className="admin-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          <button
            type="button"
            className="admin-auth-forgot"
            onClick={() => setShowForgotMsg(true)}
          >
            Forgot Password?
          </button>

          <button type="submit" disabled={loading} className="admin-btn admin-btn--primary" style={{ width: "100%", padding: "0.75rem", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)" }}>
          <p>Demo Username: <strong>admin@gpk.ac.in</strong></p>
          <p>Demo Password: <strong>admin123</strong></p>
        </div>
      </div>

      {showForgotMsg && (
        <div className="admin-modal-overlay" onClick={() => setShowForgotMsg(false)}>
          <div className="admin-modal admin-delete-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "400px", padding: "2rem" }}>
            <h3 className="admin-modal__title" style={{ marginBottom: "1rem", color: "var(--color-primary-900)" }}>Reset Password</h3>
            <p className="admin-delete-modal__text" style={{ padding: 0 }}>
              Password reset link has been simulated. In a production environment, this would email a secure recovery link.
            </p>
            <button className="admin-btn admin-btn--primary" style={{ marginTop: "1rem" }} onClick={() => setShowForgotMsg(false)}>
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
