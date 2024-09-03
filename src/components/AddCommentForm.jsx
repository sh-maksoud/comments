








import { useCommentStore } from '../store/commentStore';

const AddCommentForm = () => {
  const { addComment } = useCommentStore(state => ({
    addComment: state.addComment,
  }));
  const [newComment, setNewComment] = useCommentStore(state => [state.newComment, state.setNewComment]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    addComment({
      id: Date.now(),
      author: 'juliusomo',
      img: '/images/avatars/image-juliusomo.png',
      timestamp: 'Just now',
      content: newComment,
      replies: [],
    });
    setNewComment('');
  };

  return (
    <div className="add-comment-form">
      <form onSubmit={handleSubmitComment}>
        <img src="/images/avatars/image-juliusomo.png" alt="juliusomo" />
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          aria-label="New comment"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default AddCommentForm;
