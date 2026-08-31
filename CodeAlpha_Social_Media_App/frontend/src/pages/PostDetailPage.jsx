import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios.js';
import CommentBox from '../components/CommentBox.jsx';

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    try {
      const { data } = await api.get(`/posts/${id}`);
      setPost(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleLike = async () => {
    try {
      const { data } = await api.put(`/posts/${id}/like`);
      setPost(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async (postId, text) => {
    try {
      await api.post('/comments', { postId, text });
      fetchPost();
    } catch (error) {
      console.error(error);
    }
  };

  if (!post) return <div className="text-center py-16">Loading post...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <img src={post.author?.profilePicture || 'https://ui-avatars.com/api/?name=' + post.author?.name} alt={post.author?.name} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-slate-800">{post.author?.name}</p>
            <p className="text-xs text-slate-500">{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <p className="mt-4 text-slate-700 whitespace-pre-line">{post.content}</p>
        {post.image && <img src={post.image} alt="Post" className="mt-4 rounded-2xl w-full max-h-[500px] object-cover" />}

        <div className="mt-4 flex items-center gap-5 text-sm text-slate-600">
          <button onClick={handleLike} className="flex items-center gap-2 hover:text-rose-500">
            <span>♥</span>
            <span>{post.likes?.length || 0}</span>
          </button>
          <span className="flex items-center gap-2">
            <span>💬</span>
            <span>{post.comments?.length || 0}</span>
          </span>
        </div>

        <CommentBox postId={post._id} onSubmit={handleComment} />

        <div className="mt-6 space-y-3">
          {post.comments?.map((comment) => (
            <div key={comment._id} className="flex gap-3 border-t border-slate-100 pt-3">
              <img src={comment.author?.profilePicture || 'https://ui-avatars.com/api/?name=' + comment.author?.name} alt={comment.author?.name} className="w-9 h-9 rounded-full object-cover" />
              <div>
                <p className="font-medium text-slate-700">{comment.author?.name}</p>
                <p className="text-slate-600">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
