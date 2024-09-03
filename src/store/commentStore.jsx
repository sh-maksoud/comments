


import { create } from 'zustand';

export const useCommentStore = create((set) => ({
  comments: [
    {
      id: 1,
      author: 'amyrobson',
      timestamp: '1 month ago',
      content: 'Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You\'ve nailed the design and the responsiveness at various breakpoints works really well.',
      img: '/images/avatars/image-amyrobson.png',
      voteCount: 12,
      replies: [],
    },
    {
      id: 3,
      author: 'maxblagun',
      timestamp: '2 weeks ago',
      content: 'Woah, your project looks awesome! How long have you been coding for? I\'m still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!',
      img: '/images/avatars/image-maxblagun.png',
      voteCount: 5,
      replies: [
        {
          id: 4,
          author: 'ramsesmiron',
          timestamp: '1 week ago',
          content: '@maxblagun If you\'re still new, I\'d recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It\'s very tempting to jump ahead but lay a solid foundation first.',
          img: '/images/avatars/image-ramsesmiron.png',
          voteCount: 4,
          replies: [],
        },
      ],
    },
    {
      id: 6,
      author: 'juliusomo',
      timestamp: '2 days ago',
      content: '@ramsesmiron, I couldn\'t agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.',
      img: '/images/avatars/image-juliusomo.png',
      voteCount: 2,
      replies: [],
    },
  ],
  
  // Other states
  newComment: '',
  newReply: '',
  isEditing: false,
  editedContent: '',
  isDeleteModalOpen: false,

  // Actions
  setNewComment: (newComment) => set({ newComment }),
  setNewReply: (newReply) => set({ newReply }),
  setIsEditing: (isEditing) => set({ isEditing }),
  setEditedContent: (editedContent) => set({ editedContent }),
  setIsDeleteModalOpen: (isDeleteModalOpen) => set({ isDeleteModalOpen }),

  addComment: (comment) =>
    set((state) => ({
      comments: [...state.comments, comment],
    })),

  deleteComment: (id) => set((state) => {
    const deleteRecursive = (comments) =>
      comments
        .filter((comment) => comment.id !== id)
        .map((comment) => ({
          ...comment,
          replies: deleteRecursive(comment.replies),
        }));
    return { comments: deleteRecursive(state.comments) };
  }),

  addReply: (parentId, reply) => set((state) => {
    const addReplyRecursive = (comments) =>
      comments.map((comment) =>
        comment.id === parentId
          ? { ...comment, replies: [...comment.replies, reply] }
          : { ...comment, replies: addReplyRecursive(comment.replies) }
      );
    return { comments: addReplyRecursive(state.comments) };
  }),

  updateComment: (id, content) => set((state) => {
    const updateRecursive = (comments) =>
      comments.map((comment) =>
        comment.id === id
          ? { ...comment, content }
          : { ...comment, replies: updateRecursive(comment.replies) }
      );
    return { comments: updateRecursive(state.comments) };
  }),

  upvoteComment: (id) => set((state) => {
    const upvoteRecursive = (comments) =>
      comments.map((comment) =>
        comment.id === id
          ? { ...comment, voteCount: (comment.voteCount || 0) + 1 }
          : { ...comment, replies: upvoteRecursive(comment.replies) }
      );
    return { comments: upvoteRecursive(state.comments) };
  }),

  downvoteComment: (id) => set((state) => {
    const downvoteRecursive = (comments) =>
      comments.map((comment) =>
        comment.id === id
          ? { ...comment, voteCount: Math.max((comment.voteCount || 0) - 1, 0) }
          : { ...comment, replies: downvoteRecursive(comment.replies) }
      );
    return { comments: downvoteRecursive(state.comments) };
  }),
}));
