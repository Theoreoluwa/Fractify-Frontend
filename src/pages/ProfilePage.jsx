/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineKey } from 'react-icons/hi2';
import Navbar from '../components/common/Navbar';
import { useAuth } from '../hooks/useAuth';
import API from '../api/axios';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);

    useEffect(() => {
      document.title = "Fractify | Profile";
    })


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-[#050a18] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <Navbar />

      <div className="pt-24 px-6 md:px-14 max-w-2xl mx-auto pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-slate-400 text-sm mb-8">Manage your account details</p>

          {/* User info card */}
          <div className="bg-[#0a1628] border border-white/8 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-[#050a18]">
                {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user?.first_name} {user?.last_name}</h2>
                <p className="text-sm text-slate-400">Clinician</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white/3 rounded-xl">
                <HiOutlineUser className="text-lg text-cyan-400" />
                <div>
                  <p className="text-xs text-slate-400">Full name</p>
                  <p className="text-sm">{user?.first_name} {user?.last_name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/3 rounded-xl">
                <HiOutlineEnvelope className="text-lg text-cyan-400" />
                <div>
                  <p className="text-xs text-slate-400">Email address</p>
                  <p className="text-sm">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/3 rounded-xl">
                <HiOutlineKey className="text-lg text-cyan-400" />
                <div>
                  <p className="text-xs text-slate-400">Member since</p>
                  <p className="text-sm">{user?.created_at ? formatDate(user.created_at) : 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              logout();
              window.location.href = '/';
            }}
            className="w-full py-3.5 text-sm font-medium text-red-400 bg-red-500/5 border border-red-500/15 rounded-xl hover:bg-red-500/10 transition-all"
          >
            Log out
          </button>
        </motion.div>
      </div>
    </div>
  );
}