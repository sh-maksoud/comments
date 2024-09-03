








  import { useCommentStore } from './store/commentStore';
  import Comment from './components/Comment';
  import AddCommentForm from './components/AddCommentForm';
  import './App.css';

  const App = () => {
    const { comments } = useCommentStore();

    return (
      <div className="app">
        <div className="comments">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
        <AddCommentForm />
      </div>
    );
  };

  export default App;
