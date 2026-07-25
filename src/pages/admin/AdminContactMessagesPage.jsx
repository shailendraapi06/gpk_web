import React, { useState, useEffect } from "react";
import { MessagesIcon, SearchIcon, DeleteIcon, TrashIcon } from "../../components/admin/Icons";
import { DeleteConfirmationModal } from "../../components/admin/DeleteConfirmationModal";
import { apiRequest } from "../../services/api/client";

export function AdminContactMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replySentMsg, setReplySentMsg] = useState(false);

  // Delete modal state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [msgToDelete, setMsgToDelete] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await apiRequest("/contact");
      if (res && res.data) {
        setMessages(res.data);
      }
    } catch (err) {
      console.warn("Could not load contact messages from API:", err);
    } finally {
      setLoading(false);
    }
  };

  // Select message
  const handleSelectMessage = async (msg) => {
    const messageId = msg._id || msg.id;
    setSelectedMessage(msg);
    setReplyText("");
    setReplySentMsg(false);

    // Mark as read in state & backend
    setMessages(prev => prev.map(m => (m._id === messageId || m.id === messageId) ? { ...m, status: "read" } : m));

    if (msg.status === "unread") {
      try {
        await apiRequest(`/contact/${messageId}/status`, {
          method: "PUT",
          body: JSON.stringify({ status: "read" })
        });
      } catch (err) {
        console.warn("Failed to update message status:", err);
      }
    }
  };

  // Reply Draft Submission
  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setReplySentMsg(true);
    setReplyText("");
    setTimeout(() => {
      setReplySentMsg(false);
    }, 4000);
  };

  // Delete message click
  const handleDeleteClick = (msg, e) => {
    e.stopPropagation(); // Avoid selecting it when clicking delete
    setMsgToDelete(msg);
    setIsDeleteOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (msgToDelete) {
      const messageId = msgToDelete._id || msgToDelete.id;
      try {
        await apiRequest(`/contact/${messageId}`, { method: "DELETE" });
      } catch (err) {
        console.warn("API delete failed, removed locally:", err);
      }

      setMessages(prev => prev.filter(m => m._id !== messageId && m.id !== messageId));
      if (selectedMessage && (selectedMessage._id === messageId || selectedMessage.id === messageId)) {
        setSelectedMessage(null);
      }
      setIsDeleteOpen(false);
      setMsgToDelete(null);
    }
  };

  const filteredMessages = messages.filter(msg => 
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header__info">
          <h1 className="admin-page-header__title">Contact Inquiries Inbox</h1>
          <p className="admin-page-header__desc">Review and respond to messages submitted by visitors, prospective candidates, and corporate recruiters.</p>
        </div>
      </div>

      {/* Split Pane Inbox Layout */}
      <div className="admin-inbox">
        {/* Messages List Panel */}
        <div className="admin-inbox__list">
          <div className="admin-inbox__list-header">
            <div className="admin-search-wrapper" style={{ width: "100%" }}>
              <SearchIcon className="admin-search-icon" />
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search inbox..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="admin-inbox__list-scroll">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`admin-inbox-item ${selectedMessage?.id === msg.id ? "admin-inbox-item--active" : ""} ${msg.status === "unread" ? "admin-inbox-item--unread" : ""}`}
                  onClick={() => handleSelectMessage(msg)}
                >
                  <div className="admin-inbox-item__header">
                    <span className="admin-inbox-item__sender" style={{ fontWeight: msg.status === "unread" ? "var(--font-weight-bold)" : "var(--font-weight-medium)" }}>
                      {msg.name}
                    </span>
                    <span className="admin-inbox-item__date">{msg.date}</span>
                  </div>
                  <div className="admin-inbox-item__subject" style={{ fontWeight: msg.status === "unread" ? "var(--font-weight-bold)" : "var(--font-weight-medium)" }}>
                    {msg.subject}
                  </div>
                  <div className="admin-inbox-item__excerpt">{msg.body.substring(0, 70)}...</div>
                  
                  {/* Delete trigger */}
                  <button 
                    style={{ position: "absolute", bottom: "8px", right: "8px", background: "transparent", color: "var(--color-text-muted)", cursor: "pointer", border: 0 }}
                    onClick={(e) => handleDeleteClick(msg, e)}
                    title="Delete message"
                  >
                    <TrashIcon style={{ width: "14px", height: "14px" }} />
                  </button>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "3rem", color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)" }}>
                No messages found.
              </div>
            )}
          </div>
        </div>

        {/* Message Details Panel */}
        <div className="admin-inbox__detail">
          {selectedMessage ? (
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <div className="admin-inbox__detail-header">
                <div>
                  <h3 className="admin-inbox__detail-subject">{selectedMessage.subject}</h3>
                  <div className="admin-inbox__detail-sender-info">
                    <span>From: <strong className="admin-inbox__detail-sender-name">{selectedMessage.name}</strong> (<code>{selectedMessage.email}</code>)</span>
                    {selectedMessage.phone && <span>Contact: <strong>{selectedMessage.phone}</strong></span>}
                    <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>Received: {selectedMessage.date}</span>
                  </div>
                </div>
                <button 
                  className="admin-btn admin-btn--secondary admin-btn--danger"
                  style={{ padding: "0.5rem" }}
                  onClick={(e) => handleDeleteClick(selectedMessage, e)}
                  title="Delete Inquiry"
                >
                  <DeleteIcon style={{ width: "16px", height: "16px" }} />
                </button>
              </div>

              <div className="admin-inbox__detail-body">
                {selectedMessage.body}
              </div>

              <div className="admin-inbox__detail-reply">
                {replySentMsg && (
                  <div className="admin-badge admin-badge--success" style={{ display: "block", textAlign: "center", padding: "0.5rem", marginBottom: "1rem", borderRadius: "var(--radius-sm)" }}>
                    Draft Reply sent to {selectedMessage.email}! (Simulated)
                  </div>
                )}
                <form onSubmit={handleSendReply}>
                  <label className="admin-label" htmlFor="replyText">Compose Email Response</label>
                  <textarea
                    id="replyText"
                    className="admin-textarea"
                    rows="4"
                    placeholder={`Reply to ${selectedMessage.name}...`}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    required
                    style={{ minHeight: "80px", marginBottom: "0.75rem" }}
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button type="submit" className="admin-btn admin-btn--primary">
                      Send Reply
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="admin-inbox__detail-empty">
              <MessagesIcon />
              <h3>Select an inquiry message</h3>
              <p>Click on any message in the inbox sidebar to view full details and compose email drafts.</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={msgToDelete?.subject || ""}
        itemType="contact message"
      />
    </div>
  );
}
