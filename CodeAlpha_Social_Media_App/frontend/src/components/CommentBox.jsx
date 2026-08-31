import { useState } from 'react';

const CommentBox = ({ postId, onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(postId, text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 border border-slate-200 rounded-full px-4 py-2 text-sm outline-none focus:border-sky-400"
      />
      <button type="submit" className="bg-sky-600 text-white px-4 py-2 rounded-full text-sm hover:bg-sky-500">
        Comment
      </button>
    </form>
  );
};

export default CommentBox;
