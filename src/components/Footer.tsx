export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/10 py-12 relative z-10 w-full bg-void">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-1 text-center md:text-left">
              <span className="text-xl font-black uppercase tracking-tighter text-white">Vizioni Digjital</span>
              <span className="text-[9px] font-mono text-white/30 tracking-[0.4em] uppercase">AGENTIC_AI_CONSTRUCT</span>
          </div>
          <div className="flex gap-8 font-mono text-[10px] text-white/40 uppercase pointer-events-auto">
              <a href="#" className="hover:text-neon-mint transition-colors cursor-none">INSTAGRAM</a>
              <a href="#" className="hover:text-neon-mint transition-colors cursor-none">TWITTER (X)</a>
              <a href="#" className="hover:text-neon-mint transition-colors cursor-none">GITHUB</a>
          </div>
          <div className="text-[10px] font-mono text-white/20 text-center md:text-right">
              © 2026 // KOSOVO_ALBANIA_NODES
          </div>
      </div>
    </footer>
  );
};
