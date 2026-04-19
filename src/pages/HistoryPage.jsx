/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineEye, HiOutlineTrash, HiOutlineCloudArrowUp } from 'react-icons/hi2';
import Navbar from '../components/common/Navbar';
import API from '../api/axios';
import { SEVERITY_COLORS } from '../utils/constants';

export default function HistoryPage() {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(null);

    useEffect(() => {
    document.title = "Fractify | History";
  })

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    try {
      const res = await API.get('/xray/');
      setUploads(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load history.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (uploadId) => {
    if (!window.confirm('Are you sure you want to delete this analysis? This cannot be undone.')) return;

    setDeleting(uploadId);
    try {
      await API.delete(`/xray/${uploadId}`);
      setUploads(uploads.filter(u => u.id !== uploadId));
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to delete upload.');
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-[#050a18] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <Navbar />

      <div className="pt-24 px-6 md:px-14 max-w-5xl mx-auto pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Analysis History</h1>
              <p className="text-slate-400 text-sm">View and manage your past X-ray analyses</p>
            </div>
            <Link
              to="/upload"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#050a18] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-400/25 transition-all"
            >
              <HiOutlineCloudArrowUp className="text-lg" />
              New Analysis
            </Link>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-10 h-10 border-3 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
            </div>
          ) : uploads.length === 0 ? (
            <div className="bg-[#0a1628] border border-white/8 rounded-2xl p-16 text-center">
              <HiOutlineCloudArrowUp className="text-5xl text-slate-500 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">No analyses yet</p>
              <p className="text-sm text-slate-400 mb-6">Upload your first X-ray to get started</p>
              <Link
                to="/upload"
                className="inline-block px-6 py-3 text-sm font-semibold text-[#050a18] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl hover:-translate-y-0.5 transition-all"
              >
                Upload X-ray
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {uploads.map((upload, i) => {
                const severityStyle = SEVERITY_COLORS[upload.overall_severity] || SEVERITY_COLORS.NONE;
                const fractureCount = upload.predictions?.filter(p => p.classification === 'fracture').length || 0;
                const totalRegions = upload.predictions?.length || 0;

                return (
                  <motion.div
                    key={upload.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="bg-[#0a1628] border border-white/8 rounded-xl p-5 hover:border-white/15 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Thumbnail */}
                        <div className="w-14 h-14 bg-black/30 rounded-lg overflow-hidden flex-shrink-0">
                          {upload.file_path && (
                            <img
                              src={upload.file_path}
                              alt="X-ray"
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        <div>
                          <p className="text-sm font-semibold mb-1">{upload.original_filename}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-400">
                            <span>Case #{String(upload.id).padStart(5, '0')}</span>
                            <span>{formatDate(upload.created_at)}</span>
                            <span>{totalRegions} regions</span>
                            {fractureCount > 0 && (
                              <span className="text-red-400">{fractureCount} fracture{fractureCount > 1 ? 's' : ''}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {upload.overall_severity && (
                          <span className={`text-xs px-3 py-1.5 rounded-lg border ${severityStyle.bg} ${severityStyle.text} ${severityStyle.border}`}>
                            {upload.overall_severity}
                          </span>
                        )}

                        <span className={`text-xs px-3 py-1.5 rounded-lg ${
                          upload.status === 'completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                          upload.status === 'failed' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                          'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                        }`}>
                          {upload.status}
                        </span>

                        {upload.status === 'completed' && (
                          <Link
                            to={`/results/${upload.id}`}
                            className="p-2 hover:bg-cyan-400/10 rounded-lg transition-all"
                            title="View results"
                          >
                            <HiOutlineEye className="text-lg text-cyan-400" />
                          </Link>
                        )}

                        <button
                          onClick={() => handleDelete(upload.id)}
                          disabled={deleting === upload.id}
                          className="p-2 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
                          title="Delete"
                        >
                          <HiOutlineTrash className={`text-lg ${deleting === upload.id ? 'text-slate-500' : 'text-slate-400 hover:text-red-400'}`} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}