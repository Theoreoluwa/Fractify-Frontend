import { motion } from 'framer-motion';

const stats = [
  { value: '6', label: 'Anatomical regions detected' },
  { value: '99.5%', label: 'Classification accuracy' },
  { value: '<5s', label: 'Analysis time per X-ray' },
  { value: 'Grad-CAM', label: 'Visual explainability' },
];

export default function Stats() {
  return (
    <section className="px-6 md:px-14 pb-20">
      <div className="flex flex-wrap justify-center gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex-1 min-w-[200px] max-w-[260px] p-7 bg-[#0d1a35]/50 backdrop-blur-md border border-cyan-400/8 rounded-2xl text-center hover:border-cyan-400/20 hover:-translate-y-1 transition-all"
          >
            <div
              className="text-3xl font-bold text-cyan-400 mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {stat.value}
            </div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}