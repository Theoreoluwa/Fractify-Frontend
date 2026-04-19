/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineCloudArrowUp,
  HiOutlineDocumentArrowDown,
  HiOutlineEye,
} from "react-icons/hi2";
import Navbar from "../components/common/Navbar";
import API from "../api/axios";
import {
  SEVERITY_COLORS,
  CLASSIFICATION_COLORS,
  REGION_FULL_NAMES,
} from "../utils/constants";

export default function ResultsPage() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [generatingReport, setGeneratingReport] = useState(false);

    useEffect(() => {
    document.title = "Fractify | Analysis Results";
  })

  useEffect(() => {
    fetchResults();
  }, [id]);

  const fetchResults = async () => {
    try {
      const res = await API.get(`/xray/${id}`);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load results.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    setGeneratingReport(true);
    try {
      await API.post(`/report/${id}`);
      const res = await API.get(`/report/${id}/download`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `fracture_report_CASE-${String(id).padStart(5, "0")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.response?.data?.detail || "Report generation failed.");
    } finally {
      setGeneratingReport(false);
    }
  };

  const severityStyle =
    SEVERITY_COLORS[result?.overall_severity] || SEVERITY_COLORS.NONE;

  if (loading) {
    return (
      <div
        className="min-h-screen bg-[#050a18] text-white"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <div className="w-10 h-10 border-3 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen bg-[#050a18] text-white"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <Navbar />
        <div className="pt-24 px-6 md:px-14 max-w-4xl mx-auto text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Link
            to="/upload"
            className="text-cyan-400 hover:text-cyan-300 text-sm"
          >
            Back to upload
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#050a18] text-white"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <Navbar />

      <div className="pt-24 px-6 md:px-14 max-w-6xl mx-auto pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Analysis Results</h1>
            <p className="text-slate-400 text-sm">
              Case #{String(id).padStart(5, "0")}
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Link
              to="/upload"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#050a18] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-400/25 transition-all"
            >
              <HiOutlineCloudArrowUp className="text-lg" />
              New Analysis
            </Link>
          </div>
        </motion.div>

        {/* Overall severity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`p-5 rounded-2xl border mb-8 ${severityStyle.bg} ${severityStyle.border}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                Overall triage severity
              </p>
              <p className={`text-2xl font-bold ${severityStyle.text}`}>
                {result?.overall_severity || "NONE"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 mb-1">Regions detected</p>
              <p className="text-lg font-semibold">
                {result?.predictions?.length || 0}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 mb-1">Fractures found</p>
              <p className="text-lg font-semibold text-red-400">
                {result?.predictions?.filter(
                  (p) => p.classification === "fracture",
                ).length || 0}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Annotated image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-4">
              X-ray Detection Result
            </h2>
            <div className="bg-[#0a1628] border border-white/8 rounded-2xl p-4 overflow-hidden">
              {result?.annotated_path ? (
                <img
                  src={result.annotated_path}
                  alt="Annotated X-ray"
                  className="w-full rounded-xl"
                />
              ) : result?.file_path ? (
                <img
                  src={result.file_path}
                  alt="Original X-ray"
                  className="w-full rounded-xl"
                />
              ) : (
                <div className="h-64 flex items-center justify-center text-slate-500">
                  No image available
                </div>
              )}
              <div className="flex gap-3 mt-3">
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="w-3 h-1 bg-red-500 rounded-full" /> Fracture
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="w-3 h-1 bg-green-500 rounded-full" /> Normal
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Region list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-4">Detected Regions</h2>
            <div className="space-y-3">
              {result?.predictions?.length > 0 ? (
                [...result.predictions]
                  .sort((a, b) => {
                    if (
                      a.classification === "fracture" &&
                      b.classification !== "fracture"
                    )
                      return -1;
                    if (
                      a.classification !== "fracture" &&
                      b.classification === "fracture"
                    )
                      return 1;
                    return 0;
                  })
                  .map((pred) => {
                    const isSelected = selectedRegion?.id === pred.id;
                    const classColor =
                      CLASSIFICATION_COLORS[pred.classification] ||
                      "text-slate-400";
                    const predSeverity =
                      SEVERITY_COLORS[pred.severity] || SEVERITY_COLORS.NONE;

                    return (
                      <div
                        key={pred.id}
                        className={`bg-[#0a1628] border rounded-xl p-4 transition-all cursor-pointer ${
                          isSelected
                            ? "border-cyan-400/40"
                            : "border-white/8 hover:border-white/15"
                        }`}
                        onClick={() =>
                          setSelectedRegion(isSelected ? null : pred)
                        }
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-2 h-2 rounded-full ${pred.classification === "fracture" ? "bg-red-400" : "bg-green-400"}`}
                            />
                            <div>
                              <p className="text-sm font-semibold">
                                {REGION_FULL_NAMES[pred.region_class] ||
                                  pred.region_class}
                              </p>
                              <p className={`text-xs ${classColor}`}>
                                {pred.classification?.toUpperCase()} —{" "}
                                {(pred.classification_confidence * 100).toFixed(
                                  1,
                                )}
                                %
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {pred.severity && pred.severity !== "NONE" && (
                              <span
                                className={`text-xs px-2.5 py-1 rounded-lg ${predSeverity.bg} ${predSeverity.text} ${predSeverity.border} border`}
                              >
                                {pred.severity}
                              </span>
                            )}
                            {pred.gradcam_image_path && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedRegion(isSelected ? null : pred);
                                }}
                                className="p-2 hover:bg-white/5 rounded-lg transition-all"
                                title="View Grad-CAM heatmap"
                              >
                                <HiOutlineEye className="text-lg text-cyan-400" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Expanded view with ROI and Grad-CAM */}
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-white/8"
                          >
                            <div className="grid grid-cols-2 gap-4">
                              {pred.roi_image_path && (
                                <div>
                                  <p className="text-xs text-slate-400 mb-2">
                                    ROI Crop
                                  </p>
                                  <img
                                    src={pred.roi_image_path}
                                    alt={`${pred.region_class} ROI`}
                                    className="w-full rounded-lg border border-white/8"
                                  />
                                </div>
                              )}
                              {pred.gradcam_image_path && (
                                <div>
                                  <p className="text-xs text-slate-400 mb-2">
                                    Grad-CAM Heatmap
                                  </p>
                                  <img
                                    src={pred.gradcam_image_path}
                                    alt={`${pred.region_class} Grad-CAM`}
                                    className="w-full rounded-lg border border-white/8"
                                  />
                                </div>
                              )}
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-4 text-xs text-slate-400">
                              <div>
                                <span>Detection confidence: </span>
                                <span className="text-white">
                                  {(pred.detection_confidence * 100).toFixed(1)}
                                  %
                                </span>
                              </div>
                              <div>
                                <span>Classification confidence: </span>
                                <span className="text-white">
                                  {(
                                    pred.classification_confidence * 100
                                  ).toFixed(1)}
                                  %
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    );
                  })
              ) : (
                <div className="bg-[#0a1628] border border-white/8 rounded-xl p-8 text-center">
                  <p className="text-slate-400">
                    No anatomical regions were detected in this image.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}