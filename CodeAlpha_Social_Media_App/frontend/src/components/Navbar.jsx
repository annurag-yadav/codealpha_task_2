import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice.js';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-2xl font-bold text-sky-600">CodeAlpha</Link>
          <span className="text-sm text-slate-500 hidden sm:inline">Social</span>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
          <Link to="/" className="hover:text-sky-600">Home</Link>
          {user ? (
            <>
              <Link to={`/profile/${user._id}`} className="hover:text-sky-600">Profile</Link>
              <button onClick={handleLogout} className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-700">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-sky-600">Login</Link>
              <Link to="/register" className="bg-sky-600 text-white px-4 py-2 rounded-full hover:bg-sky-500">
                Join
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
