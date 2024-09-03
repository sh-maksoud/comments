
const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Delete comment</h2>
        <p>
          Are you sure you want to delete this comment? This will remove the comment and can’t be undone.
        </p>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>No, Cancel</button>
          <button className="delete-btn" onClick={onDelete}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
