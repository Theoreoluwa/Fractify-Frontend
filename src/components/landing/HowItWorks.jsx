/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { TbScan, TbBrain, TbFlame } from "react-icons/tb";
// import { motion } from 'framer-motion';
// import { HiOutlineCpuChip } from 'react-icons/hi2';
// import { TbBrain } from 'react-icons/tb';
// import { HiOutlineFire } from 'react-icons/hi2';

const steps = [
  {
    number: "1",
    title: "Detect",
    icon: <TbScan className="text-3xl text-cyan-400" />,
    description:
      "YOLO anatomical detector identifies and localises six key anatomical regions - DIP, PIP, MCP, Radius, Ulna and Wrist - with bounding box precision.",
  },
  {
    number: "2",
    title: "Classify",
    icon: <TbBrain className="text-3xl text-cyan-400" />,
    description:
      "Each detected region is cropped and analysed by a trained YOLO fracture detector, to determine fracture presence with high confidence.",
  },
  {
    number: "3",
    title: "Explain",
    icon: <TbFlame className="text-3xl text-cyan-400" />,
    description:
      "Grad-CAM generates heatmap visualisations highlighting the exact features influencing each prediction, supporting transparent clinical reasoning.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 md:px-14 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-4">
          How it works
        </p>
        <h2 className="text-4xl font-bold mb-4">Three-stage AI pipeline</h2>
        <p className="text-base text-slate-400 max-w-lg mx-auto leading-relaxed">
          From X-ray upload to explainable triage assessment in seconds. Each
          stage is independently optimised for maximum accuracy and
          transparency.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="p-9 bg-[#0d1a35] border border-white/5 rounded-2xl hover:border-cyan-400/15 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/30 transition-all group"
          >
            <div className="w-12 h-12 bg-cyan-400/10 border border-cyan-400/20 rounded-xl flex items-center justify-center text-lg font-bold text-cyan-400 mb-6">
              {step.number}
            </div>
            <div className="mb-5">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
