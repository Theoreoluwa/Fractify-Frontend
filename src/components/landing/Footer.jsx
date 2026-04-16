export default function Footer() {
  return (
    <footer className="px-6 md:px-14 py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-xs text-slate-500">© 2026 Fractify. AI-Based Fracture Triage System.</p>
      <div className="flex gap-6">
        <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy</a>
        <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Terms</a>
        <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Contact</a>
      </div>
    </footer>
  );
}