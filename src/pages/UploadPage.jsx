/* eslint-disable no-unused-vars */
import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineCloudArrowUp, HiOutlineCamera, HiOutlineXMark, HiOutlinePhoto } from 'react-icons/hi2';
import Navbar from '../components/common/Navbar';
import API from '../api/axios';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  const handleFile = useCallback((selectedFile) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/bmp', 'image/tiff'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Invalid file type. Please upload a PNG, JPG, BMP, or TIFF image.');
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File too large. Maximum size is 10MB.');
      return;
    }
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setError('');
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
      setError('');
    } catch {
      setError('Camera access denied. Please allow camera permissions.');
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      const capturedFile = new File([blob], 'xray-capture.png', { type: 'image/png' });
      handleFile(capturedFile);
      stopCamera();
    }, 'image/png');
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  // Upload and process
  const handleUploadAndProcess = async () => {
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      // Step 1: Upload
      const formData = new FormData();
      formData.append('file', file);
      const uploadRes = await API.post('/xray/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploadId = uploadRes.data.id;

      // Step 2: Process
      setUploading(false);
      setProcessing(true);

      await API.post(`/predict/${uploadId}`);

      // Step 3: Navigate to results
      navigate(`/results/${uploadId}`);
    } catch (err) {
      setError(err.response?.data?.detail || 'Upload or processing failed. Please try again.');
      setUploading(false);
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050a18] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <Navbar />

      <div className="pt-24 px-6 md:px-14 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-2">Upload X-ray</h1>
          <p className="text-slate-400 mb-8">Upload a hand or wrist radiograph for AI-powered fracture analysis</p>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Processing overlay */}
          {(uploading || processing) && (
            <div className="fixed inset-0 bg-[#050a18]/90 backdrop-blur-sm z-50 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-16 h-16 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-2">
                  {uploading ? 'Uploading X-ray...' : 'Analysing X-ray...'}
                </h3>
                <p className="text-slate-400 text-sm">
                  {uploading
                    ? 'Securely uploading your image'
                    : 'Running AI detection, classification and explainability pipeline'
                  }
                </p>
              </motion.div>
            </div>
          )}

          {/* Camera view */}
          {showCamera && (
            <div className="mb-6 relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-2xl border border-white/10"
              />
              <div className="flex gap-3 justify-center mt-4">
                <button
                  onClick={capturePhoto}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-[#050a18] font-semibold text-sm rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-400/25 transition-all"
                >
                  Capture
                </button>
                <button
                  onClick={stopCamera}
                  className="px-6 py-3 bg-white/5 border border-white/10 text-white text-sm rounded-xl hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Upload area */}
          {!showCamera && !preview && (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all cursor-pointer ${
                dragActive
                  ? 'border-cyan-400 bg-cyan-400/5'
                  : 'border-white/10 hover:border-white/20 hover:bg-white/2'
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <HiOutlineCloudArrowUp className="text-5xl text-slate-500 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Drop your X-ray image here</p>
              <p className="text-sm text-slate-400 mb-6">or click to browse files</p>
              <p className="text-xs text-slate-500">Supports PNG, JPG, BMP, TIFF — Max 10MB</p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.bmp,.tiff,.tif"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          )}

          {/* Camera button */}
          {!showCamera && !preview && (
            <div className="flex justify-center mt-4">
              <button
                onClick={startCamera}
                className="flex items-center gap-2 px-5 py-2.5 text-sm text-slate-400 hover:text-cyan-400 border border-white/10 hover:border-cyan-400/30 rounded-xl transition-all"
              >
                <HiOutlineCamera className="text-lg" />
                Use camera instead
              </button>
            </div>
          )}

          {/* Preview */}
          {preview && !uploading && !processing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <div className="relative bg-[#0d1a35]/50 border border-white/8 rounded-2xl p-6">
                <button
                  onClick={clearFile}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-red-500/20 rounded-lg flex items-center justify-center transition-all"
                >
                  <HiOutlineXMark className="text-lg" />
                </button>

                <div className="flex items-center gap-6">
                  <img
                    src={preview}
                    alt="X-ray preview"
                    className="w-40 h-40 object-contain rounded-xl bg-black/30"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <HiOutlinePhoto className="text-cyan-400" />
                      <p className="text-sm font-medium">{file.name}</p>
                    </div>
                    <p className="text-xs text-slate-400 mb-4">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <button
                      onClick={handleUploadAndProcess}
                      className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-[#050a18] font-semibold text-sm rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-400/25 transition-all"
                    >
                      Analyse X-ray
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}