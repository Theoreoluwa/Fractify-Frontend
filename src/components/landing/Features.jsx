/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { HiOutlineChartBar, HiOutlineDocumentText, HiOutlineCamera, HiOutlineLockClosed } from 'react-icons/hi2';

const features = [
  {
    icon: <HiOutlineChartBar className="text-xl text-cyan-400" />,
    title: 'Triage severity scoring',
    description:
      'Automatic severity assessment based on fracture location and classification confidence. HIGH, MEDIUM, or LOW priority assigned instantly.',
  },
  {
    icon: <HiOutlineDocumentText className="text-xl text-cyan-400" />,
    title: ' Optimised clinical decision support',
    description:
      'Grad-CAM heatmaps highlight key fracture features, providing transparent visual explanations to aid radiologist triage decisions.',
  },
  {
    icon: <HiOutlineCamera className="text-xl text-cyan-400" />,
    title: 'Camera capture upload',
    description:
      'Upload X-ray images directly from your device camera or select existing files. Supports all standard radiographic formats.',
  },
  {
    icon: <HiOutlineLockClosed className="text-xl text-cyan-400" />,
    title: 'Secure authentication',
    description:
      'JWT-based authentication with bcrypt password hashing. Your clinical data stays protected with industry-standard security.',
  },
];

export default function Features() {
  return (
    <section id="features" className="px-6 md:px-14 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-4">
          Features
        </p>
        <h2 className="text-4xl font-bold mb-4">
          Built for clinical workflows
        </h2>
        <p className="text-base text-slate-400 max-w-lg mx-auto leading-relaxed">
          Every feature is designed to support radiologists and emergency clinicians
          in making faster, more informed triage decisions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-8 bg-[#0d1a35]/40 border border-white/5 rounded-2xl hover:border-cyan-400/12 transition-all"
          >
            <div className="w-11 h-11 bg-cyan-400/10 rounded-xl flex items-center justify-center mb-5">
              {feature.icon}
            </div>
            <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}