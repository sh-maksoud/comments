




import { useCommentStore } from '../store/commentStore';
import DeleteModal from './DeleteModal';
import { useState } from 'react';

const Comment = ({ comment, depth = 0 }) => {
  // Destructure state and actions from Zustand store
  const {
    addReply,
    updateComment,
    deleteComment,
    upvoteComment,
    downvoteComment,
    setNewReply,
    setEditedContent,
    setIsDeleteModalOpen
  } = useCommentStore(state => ({
    addReply: state.addReply,
    updateComment: state.updateComment,
    deleteComment: state.deleteComment,
    upvoteComment: state.upvoteComment,
    downvoteComment: state.downvoteComment,
    setNewReply: state.setNewReply,
    setEditedContent: state.setEditedContent,
    setIsDeleteModalOpen: state.setIsDeleteModalOpen
  }));

  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newReply, setNewReplyLocal] = useState('');
  const [editedContent, setEditedContentLocal] = useState(comment.content);
  const [isDeleteModalOpen, setIsDeleteModalOpenLocal] = useState(false);

  // Handle input changes
  const handleReplyChange = (e) => {
    setNewReplyLocal(e.target.value);
  };

  const handleEditChange = (e) => {
    setEditedContentLocal(e.target.value);
  };

  // Handle form submissions
  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (newReply.trim() === '') return;

    addReply(comment.id, {
      id: Date.now(),
      author: 'juliusomo',
      img: '/images/avatars/image-juliusomo.png',
      timestamp: 'Just now',
      content: `@${comment.author} ${newReply}`,
      voteCount: 0,
      replies: []
    });
    setNewReplyLocal('');
    setIsReplyOpen(false);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (editedContent.trim() === '') return;

    updateComment(comment.id, editedContent);
    setIsEditing(false);
  };

  // Handle delete modal
  const handleDeleteClick = () => {
    setIsDeleteModalOpenLocal(true);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpenLocal(false);
  };

  const handleDeleteConfirm = () => {
    deleteComment(comment.id);
    setIsDeleteModalOpenLocal(false);
  };

  // Handle upvote and downvote
  const handleUpvote = () => {
    upvoteComment(comment.id);
  };

  const handleDownvote = () => {
    downvoteComment(comment.id);
  };

  // Render content with mentions styled
  const renderContentWithMentions = (content) => {
    const mentionRegex = /@(\w+)/g;
    return content.split(mentionRegex).map((part, index) => {
      if (index % 2 === 0) return part; // Regular text
      const mention = part;
      if (mention === 'ramsesmiron' || mention === 'maxblagun') {
        return <span key={index} className="mention">@{mention}</span>;
      }
      return `@${mention}`;
    });
  };

  return (
    <div className={`comment-container ${depth > 0 ? 'reply' : ''}`}>
      <div className="comment">
        <div className="comment-vote">
          <button className="vote-btn" onClick={handleUpvote}>+</button>
          <span className="vote-count">{comment.voteCount || 0}</span>
          <button className="vote-btn" onClick={handleDownvote}>-</button>
        </div>
        <div className="comment-body">
          <div className="comment-header">
            <img src={comment.img} alt={comment.author} />
            <div className="comment-author-info">
              <span className="comment-author"><strong>{comment.author}</strong></span>
              {comment.author === 'juliusomo' && <span className="comment-you-label">you</span>}
              <span className="comment-timestamp">{comment.timestamp}</span>
            </div>
          </div>

          <div className="comment-content">
            {isEditing ? (
              <form onSubmit={handleSubmitEdit}>
                <textarea value={editedContent} onChange={handleEditChange} />
                <button type="submit" className="update-btn">Save</button>
              </form>
            ) : (
              <p>{renderContentWithMentions(comment.content)}</p>
            )}
          </div>
          <div className="comment-actions">
            {comment.author === 'juliusomo' && (
              <>
                <button className="delete-btn" onClick={handleDeleteClick}>
                  <img src="/images/icon-delete.svg" alt="" /> Delete
                </button>
                <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
                  <img src="/images/icon-edit.svg" alt="" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </>
            )}
            {comment.author !== 'juliusomo' && (
              <button className="reply-btn" onClick={() => setIsReplyOpen(!isReplyOpen)}>
                <img src="/images/icon-reply.svg" alt="" />
                {isReplyOpen ? 'Cancel Reply' : 'Reply'}
              </button>
            )}
          </div>
        </div>
      </div>

      {isReplyOpen && (
        <div className="reply-section">
          <form onSubmit={handleSubmitReply} className="reply-form">
            <img src="/images/avatars/image-juliusomo.png" alt="juliusomo" />
            <textarea
              className='reply-input'
              value={newReply}
              onChange={handleReplyChange}
              placeholder={`Reply to ${comment.author}`}
            />
            <button type="submit" className="reply-submit-btn">Reply</button>
          </form>
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="comment-replies">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDeleteConfirm}
      />
    </div>
  );
};

export default Comment;
