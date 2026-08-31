import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../api/axios.js';
import PostCard from '../components/PostCard.jsx';

const ProfilePage = () => {
  const { id } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [userRes, postsRes] = await Promise.all([
          api.get(`/users/${id}`),
          api.get(`/posts/user/${id}`),
        ]);
        setProfile(userRes.data);
        setPosts(postsRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [id]);

  const handleLike = async (postId) => {
    try {
      const { data } = await api.put(`/posts/${postId}/like`);
      setPosts((current) => current.map((post) => (post._id === postId ? data : post)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleFollow = async () => {
    if (!profile) return;
    try {
      await api.put(`/users/${profile._id}/follow`);
      const { data } = await api.get(`/users/${id}`);
      setProfile(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!profile) return <div className="text-center py-16">Loading profile...</div>;

  const isCurrentUser = currentUser?._id === profile._id;
  const isFollowing = currentUser && profile.followers?.some((user) => user._id === currentUser._id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex items-center gap-4">
            <img
              src={profile.profilePicture || 'https://ui-avatars.com/api/?name=' + profile.name}
              alt={profile.name}
              className="w-20 h-20 rounded-full object-cover border border-slate-200"
            />
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{profile.name}</h1>
              <p className="text-sm text-slate-500">{profile.email}</p>
            </div>
          </div>

          {!isCurrentUser && currentUser && (
            <button onClick={handleFollow} className="bg-sky-600 text-white px-5 py-2.5 rounded-full hover:bg-sky-500">
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>

        <p className="mt-5 text-slate-600">{profile.bio || 'No bio available.'}</p>

        <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <div className="font-bold text-slate-800">{profile.followers?.length || 0}</div>
            <div className="text-slate-500">Followers</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <div className="font-bold text-slate-800">{profile.following?.length || 0}</div>
            <div className="text-slate-500">Following</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <div className="font-bold text-slate-800">{posts.length}</div>
            <div className="text-slate-500">Posts</div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} currentUserId={currentUser?._id} onLike={handleLike} onFollow={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
