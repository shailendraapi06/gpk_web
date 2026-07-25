import React from "react";
import { TrashIcon, CloseIcon } from "./Icons";

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, itemName, itemType = "item" }) {
  if (!isOpen) return null;

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal admin-delete-modal">
        <div className="admin-delete-modal__icon">
          <TrashIcon />
        </div>
        <h3 className="admin-delete-modal__title">Confirm Delete</h3>
        <p className="admin-delete-modal__text">
          Are you sure you want to delete this {itemType} <strong>"{itemName}"</strong>? This action cannot be undone.
        </p>
        <div className="admin-delete-modal__actions">
          <button className="admin-btn admin-btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="admin-btn admin-btn--danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
