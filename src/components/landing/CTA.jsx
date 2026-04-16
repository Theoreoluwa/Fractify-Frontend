// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="px-6 md:px-14 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center p-16 bg-gradient-to-br from-cyan-400/8 to-blue-600/5 border border-cyan-400/12 rounded-3xl"
      >
        <h2
          className="text-3xl font-bold mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Ready to transform fracture triage?
        </h2>
        <p className="text-base text-slate-400 mb-8 leading-relaxed">
          Start using Fractify to enhance your radiographic analysis with AI-powered
          detection, classification and explainability.
        </p>
        <Link
          to="/signup"
          className="inline-block px-8 py-3.5 text-sm font-semibold text-[#050a18] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-400/30 transition-all"
        >
          Get Started Free
        </Link>
      </motion.div>
    </section>
  );
}