import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { setCredentials } from '../redux/authSlice.js';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      dispatch(setCredentials({ user: data, token: data.token }));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h1 className="text-3xl font-bold text-slate-800">Welcome back</h1>
        <p className="mt-2 text-slate-500">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border rounded-xl px-3 py-2.5 focus:outline-none focus:border-sky-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border rounded-xl px-3 py-2.5 focus:outline-none focus:border-sky-400"
              required
            />
          </div>

          {error && <p className="text-sm text-rose-500">{error}</p>}

          <button type="submit" className="w-full bg-sky-600 text-white py-3 rounded-xl font-medium hover:bg-sky-500">
            Login
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-500 text-center">
          New here? <Link to="/register" className="text-sky-600 font-medium">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
