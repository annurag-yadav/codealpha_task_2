import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { updateUser } from '../redux/authSlice.js';

const EditProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    profilePicture: user?.profilePicture || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put('/users/profile', form);
      dispatch(updateUser(data));
      navigate(`/profile/${user?._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">Edit profile</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded-xl px-3 py-2.5 focus:outline-none focus:border-sky-400"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Bio</label>
            <textarea
              rows="4"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full border rounded-xl px-3 py-2.5 focus:outline-none focus:border-sky-400"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Profile Picture URL</label>
            <input
              value={form.profilePicture}
              onChange={(e) => setForm({ ...form, profilePicture: e.target.value })}
              className="w-full border rounded-xl px-3 py-2.5 focus:outline-none focus:border-sky-400"
            />
          </div>

          <button type="submit" className="w-full bg-sky-600 text-white py-3 rounded-xl hover:bg-sky-500">
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
