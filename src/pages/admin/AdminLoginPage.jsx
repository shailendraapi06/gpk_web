import React, { useState } from "react";
import logo from "../../assets/branding/logo.png";
import { apiRequest } from "../../services/api/client";

export function AdminLoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: request code, 2: reset password, 3: success
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccessMsg, setForgotSuccessMsg] = useState("");

  const handleOpenForgotModal = () => {
    setForgotEmail(email || "admin@gpk.ac.in");
    setForgotStep(1);
    setResetCode("");
    setNewPassword("");
    setConfirmNewPassword("");
    setForgotError("");
    setForgotSuccessMsg("");
    setShowForgotModal(true);
  };

  const handleRequestResetCode = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setForgotError("Please enter your registered email address.");
      return;
    }

    try {
      setForgotLoading(true);
      setForgotError("");
      const res = await apiRequest("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: forgotEmail })
      });

      if (res && res.success) {
        setForgotSuccessMsg(res.message || "Reset verification code generated.");
        if (res.resetCode) {
          setResetCode(res.resetCode); // Pre-fill for instant seamless verification
        }
        setForgotStep(2);
      } else {
        setForgotError(res.message || "Failed to generate reset code.");
      }
    } catch (err) {
      setForgotError(err.message || "Could not process request. Please check email address.");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!resetCode || !newPassword || !confirmNewPassword) {
      setForgotError("All fields are required.");
      return;
    }

    if (newPassword.length < 6) {
      setForgotError("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setForgotError("Passwords do not match.");
      return;
    }

    try {
      setForgotLoading(true);
      setForgotError("");
      const res = await apiRequest("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          email: forgotEmail,
          resetCode,
          newPassword
        })
      });

      if (res && res.success) {
        setForgotStep(3);
        setForgotSuccessMsg("Password reset successfully! You can now log in.");
        // Pre-fill login inputs with the new credentials
        setEmail(forgotEmail);
        setPassword(newPassword);
      } else {
        setForgotError(res.message || "Password reset failed.");
      }
    } catch (err) {
      setForgotError(err.message || "Invalid or expired code. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

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
            onClick={handleOpenForgotModal}
          >
            Forgot Password?
          </button>

          <button type="submit" disabled={loading} className="admin-btn admin-btn--primary" style={{ width: "100%", padding: "0.75rem", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)" }}>
          <p>Default Admin: <strong>admin@gpk.ac.in</strong></p>
          <p>Default Password: <strong>admin123</strong></p>
        </div>
      </div>

      {showForgotModal && (
        <div className="admin-modal-overlay" onClick={() => setShowForgotModal(false)}>
          <div className="admin-modal animate-slide-up" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "440px", padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 className="admin-modal__title" style={{ margin: 0, color: "var(--color-primary-900)" }}>
                {forgotStep === 1 && "Reset Admin Password"}
                {forgotStep === 2 && "Enter Verification Code"}
                {forgotStep === 3 && "Password Reset Complete"}
              </h3>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "var(--color-text-muted)" }}
              >
                &times;
              </button>
            </div>

            {forgotError && (
              <div className="admin-badge admin-badge--error" style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem", borderRadius: "var(--radius-sm)", textAlign: "center", display: "block" }}>
                {forgotError}
              </div>
            )}

            {forgotSuccessMsg && (
              <div className="admin-badge admin-badge--success" style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem", borderRadius: "var(--radius-sm)", textAlign: "center", display: "block", wordBreak: "break-word" }}>
                {forgotSuccessMsg}
              </div>
            )}

            {forgotStep === 1 && (
              <form onSubmit={handleRequestResetCode}>
                <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", marginBottom: "1.25rem", lineHeight: "1.5" }}>
                  Enter your registered administrator email. A secure 6-digit recovery code will be generated to reset your credentials.
                </p>

                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="forgot-email">Admin Email Address</label>
                  <input
                    id="forgot-email"
                    type="email"
                    className="admin-input"
                    placeholder="admin@gpk.ac.in"
                    value={forgotEmail}
                    onChange={(e) => {
                      setForgotEmail(e.target.value);
                      setForgotError("");
                    }}
                    required
                  />
                </div>

                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                  <button type="button" className="admin-btn admin-btn--secondary" style={{ flex: 1 }} onClick={() => setShowForgotModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" disabled={forgotLoading} className="admin-btn admin-btn--primary" style={{ flex: 1, opacity: forgotLoading ? 0.7 : 1 }}>
                    {forgotLoading ? "Generating..." : "Get Reset Code"}
                  </button>
                </div>
              </form>
            )}

            {forgotStep === 2 && (
              <form onSubmit={handleResetPasswordSubmit}>
                <div style={{ background: "var(--color-neutral-50)", padding: "0.75rem", borderRadius: "var(--radius-sm)", marginBottom: "1.25rem", border: "1px solid var(--color-border)", fontSize: "var(--font-size-xs)" }}>
                  <span>Account: <strong>{forgotEmail}</strong></span>
                  {resetCode && (
                    <div style={{ marginTop: "0.5rem", color: "var(--color-primary-700)" }}>
                      Your 6-Digit Code: <strong style={{ fontSize: "var(--font-size-md)", letterSpacing: "2px" }}>{resetCode}</strong>
                    </div>
                  )}
                </div>

                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="reset-code">6-Digit Verification Code</label>
                  <input
                    id="reset-code"
                    type="text"
                    className="admin-input"
                    placeholder="123456"
                    value={resetCode}
                    onChange={(e) => {
                      setResetCode(e.target.value);
                      setForgotError("");
                    }}
                    maxLength={6}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="new-password">New Password (min 6 characters)</label>
                  <input
                    id="new-password"
                    type="password"
                    className="admin-input"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setForgotError("");
                    }}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="confirm-new-password">Confirm New Password</label>
                  <input
                    id="confirm-new-password"
                    type="password"
                    className="admin-input"
                    placeholder="••••••••"
                    value={confirmNewPassword}
                    onChange={(e) => {
                      setConfirmNewPassword(e.target.value);
                      setForgotError("");
                    }}
                    required
                  />
                </div>

                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                  <button type="button" className="admin-btn admin-btn--secondary" style={{ flex: 1 }} onClick={() => setForgotStep(1)}>
                    Back
                  </button>
                  <button type="submit" disabled={forgotLoading} className="admin-btn admin-btn--primary" style={{ flex: 1, opacity: forgotLoading ? 0.7 : 1 }}>
                    {forgotLoading ? "Resetting..." : "Save Password"}
                  </button>
                </div>
              </form>
            )}

            {forgotStep === 3 && (
              <div>
                <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text)", marginBottom: "1.5rem", lineHeight: "1.5" }}>
                  Your administrator password has been updated. The login form has been pre-filled with your new credentials.
                </p>
                <button
                  type="button"
                  className="admin-btn admin-btn--primary"
                  style={{ width: "100%", padding: "0.75rem" }}
                  onClick={() => setShowForgotModal(false)}
                >
                  Return to Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
