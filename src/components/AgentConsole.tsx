import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LOG_MESSAGES = [
  "> Analyzing scroll velocity... User exhibits high intent.",
  "> Geolocation: PRISHTINA / TIRANA. Local optimization protocols engaged.",
  "> Neural pattern matching visitor persona...",
  "> Detected mouse trajectory variance. Site adjusting rigidity.",
  "> Port 443 handshake verified. Secure connection established.",
  "> Initializing Vizioni Core v4.2.0...",
  "> Scanning behavioral data points...",
  "> Buffer overflow check: OK.",
  "> Executing revenue projection scripts...",
  "> User focus localized on Hero Module.",
  "> Bypassing standard agency templates...",
  "> Custom UI generation in progress...",
];

export const AgentConsole = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextLog = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
        return [...prev.slice(-4), nextLog];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-[100] w-72 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-void/90 backdrop-blur-md border border-neon-orchid p-4 rounded-none shadow-[0_0_30px_rgba(212,0,255,0.1)] overflow-hidden"
      >
        <div className="flex items-center gap-2 mb-2 border-bottom border-white/10 pb-2">
          <div className="w-2 h-2 rounded-full bg-neon-mint animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">AGENT_LOGS</span>
        </div>
        
        <div 
          ref={scrollRef}
          className="h-24 overflow-y-auto space-y-1 font-mono text-[9px] leading-relaxed scroll-smooth"
        >
          <AnimatePresence mode="popLayout">
            {logs.map((log, i) => (
              <motion.div
                key={`${log}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-white/60"
              >
                <span className="text-neon-mint mr-1">⚡</span>
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-2 text-[8px] font-mono text-white/20 flex justify-between uppercase">
          <span>ALC-CORE.SYS</span>
          <span>LATENCY: 12ms</span>
        </div>
      </motion.div>
    </div>
  );
};
