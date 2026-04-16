/* eslint-disable no-unused-vars */
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { HiOutlineCloudArrowUp, HiOutlineClock, HiOutlineUser, HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/upload', label: 'Upload', icon: <HiOutlineCloudArrowUp className="text-lg" /> },
    { path: '/history', label: 'History', icon: <HiOutlineClock className="text-lg" /> },
    { path: '/profile', label: 'Profile', icon: <HiOutlineUser className="text-lg" /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 px-6 md:px-14 py-4 flex justify-between items-center bg-[#050a18]/80 backdrop-blur-xl border-b border-cyan-400/8">
      <Link to="/upload" className="flex items-center gap-3">
        <img src="/logo.jpg" alt="Fractify" className="w-9 h-9 rounded-xl" />
        <span className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Fractify</span>
      </Link>

      <div className="flex items-center gap-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              isActive(item.path)
                ? 'bg-cyan-400/10 text-cyan-400'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.icon}
            <span className="hidden md:inline">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-400 hidden md:inline">
          {user?.first_name} {user?.last_name}
        </span>
        <button
          onClick={() => {
            logout();
            window.location.href = '/';
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-red-400 rounded-xl hover:bg-red-500/10 transition-all"
        >
          <HiOutlineArrowRightOnRectangle className="text-lg" />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
}