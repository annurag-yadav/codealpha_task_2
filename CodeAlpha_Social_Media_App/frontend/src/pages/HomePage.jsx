import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import PostCard from '../components/PostCard.jsx';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchPosts();
  }, [user, navigate]);

  const fetchPosts = async () => {
    try {
      const { data } = await api.get('/posts/feed');
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await api.post('/posts', { content, image });
      setContent('');
      setImage('');
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async (postId) => {
    try {
      const { data } = await api.put(`/posts/${postId}/like`);
      setPosts((current) => current.map((post) => (post._id === postId ? data : post)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleFollow = async (followedUserId) => {
    try {
      await api.put(`/users/${followedUserId}/follow`);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid gap-6 lg:grid-cols-[1.5fr_0.7fr]">
      <section className="space-y-6">
        <form onSubmit={handleSubmitPost} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <textarea
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share an update with your network..."
            className="w-full border border-slate-200 rounded-2xl p-3 focus:outline-none focus:border-sky-400"
          />
          <div className="mt-3 flex items-center justify-between">
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Optional image URL"
              className="flex-1 mr-3 border border-slate-200 rounded-full px-3 py-2 text-sm focus:outline-none focus:border-sky-400"
            />
            <button type="submit" className="bg-sky-600 text-white px-5 py-2.5 rounded-full hover:bg-sky-500">
              Post
            </button>
          </div>
        </form>

        <div className="space-y-5">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} currentUserId={user?._id} onLike={handleLike} onFollow={handleFollow} />
          ))}
        </div>
      </section>

      <aside className="space-y-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-3 text-slate-800">Your profile</h3>
          <div className="flex items-center gap-3">
            <img
              src={user?.profilePicture || 'https://ui-avatars.com/api/?name=' + user?.name}
              alt={user?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-slate-800">{user?.name}</p>
              <p className="text-sm text-slate-500">{user?.email}</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-600">{user?.bio || 'Create your profile story.'}</div>
        </div>
      </aside>
    </div>
  );
};

export default HomePage;
