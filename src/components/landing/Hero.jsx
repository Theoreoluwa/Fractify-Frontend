/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-6 md:px-14 pt-28 pb-20 relative">
      {/* Background glows */}
      <div className="absolute -top-48 -right-48 w-[700px] h-[700px] bg-cyan-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-64 -left-48 w-[500px] h-[500px] bg-blue-600/6 rounded-full blur-3xl pointer-events-none" />

      {/* Left content */}
      <div className="flex-1 z-10 pr-8 pl-12 md:pl-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full text-cyan-400 text-xs font-semibold mb-7"
        >
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          AI-Powered Fracture Triage
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl md:text-6xl font-bold leading-tight mb-6"
        >
          Detect. Classify.
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-transparent">
            Explain.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base md:text-lg text-slate-400 leading-relaxed mb-10 max-w-md"
        >
          Fractify uses a three-stage AI pipeline to detect anatomical regions in hand
          and wrist X-rays, classify fractures, and provide
          visual explanations to support clinical decision-making.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex gap-4"
        >
          <Link
            to="/signup"
            className="px-8 py-3.5 text-sm font-semibold text-[#050a18] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-400/30 transition-all"
          >
            Start Analysis
          </Link>
          <a
            href="#how-it-works"
            className="px-8 py-3.5 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
          >
            Learn More
          </a>
        </motion.div>
      </div>

      {/* Right visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex-1 hidden lg:flex justify-center items-center relative z-10"
      >
        <div className="relative w-[420px] h-[500px]">
          {/* X-ray display */}
          <div className="w-full h-full bg-gradient-to-br from-[#0d1f3c] to-[#081428] rounded-3xl border border-cyan-400/10 overflow-hidden shadow-2xl shadow-black/50 relative">
            {/* Scan line */}
            <div
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
              style={{ animation: 'scan 3s ease-in-out infinite' }}
            />
            {/* X-ray image — replace the src with your actual hand x-ray image */}
            <img
              src="/hand-xray.jpg"
              alt="Hand X-ray"
              className="w-full h-full object-contain opacity-70 p-4"
            />
          </div>

          {/* Floating labels */}
          <FloatingLabel
            className="-right-16 top-[60%]"
            delay={0}
            color="red"
            text="Wrist — Fracture 96.3%"
          />
          <FloatingLabel
            className="-right-10 top-[32%]"
            delay={0.5}
            color="green"
            text="MCP — Normal 99.1%"
          />
          <FloatingLabel
            className="-left-14 top-[14%]"
            delay={1}
            color="green"
            text="PIP  — Normal 98.7%"
          />
          <FloatingLabel
            className="-left-20 bottom-[10%]"
            delay={1.5}
            color="red"
            text="Severity: HIGH"
          />
        </div>
      </motion.div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
      `}</style>
    </section>
  );
}

function FloatingLabel({ className, delay, color, text }) {
  const dotColor = color === 'red' ? 'bg-red-400' : 'bg-green-400';

  return (
    <motion.div
      initial={{ opacity: 0, x: color === 'red' ? 20 : -20 }}
      animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
      transition={{
        opacity: { duration: 0.6, delay: 0.8 + delay },
        x: { duration: 0.6, delay: 0.8 + delay },
        y: { duration: 3, repeat: Infinity, delay: delay },
      }}
      className={`absolute px-4 py-2 bg-[#0d1a35]/90 backdrop-blur-md border border-cyan-400/15 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {text}
    </motion.div>
  );
}