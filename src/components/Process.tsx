import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Database, Zap, Cpu, TrendingUp } from 'lucide-react';

const NODES = [
  { title: 'Data Ingestion', icon: Database, description: 'Aggregating raw telemetry from edge sensors and user interaction nodes.' },
  { title: 'Neural Training', icon: Cpu, description: 'Refining proprietary LLMs optimized for specific Balkan linguistic nuances.' },
  { title: 'Agent Deployment', icon: Zap, description: 'Injecting autonomous agents into your existing infrastructure via secure API.' },
  { title: 'Revenue Scaling', icon: TrendingUp, description: 'Real-time ROI monitoring and automated campaign optimization.' },
];

export const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-void overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16 md:mb-24">
          <span className="text-neon-mint font-mono text-[10px] tracking-[0.4em] uppercase mb-4">
            [ LOGIC_FLOW ]
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-center tracking-tighter max-w-2xl leading-[0.9]">
            Cognitive Architecture
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line (Horizontal for Desktop, Vertical for Mobile) */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 hidden md:block" />
          <motion.div 
            className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-neon-mint via-neon-orchid to-neon-mint -translate-y-1/2 hidden md:block origin-left z-10"
            style={{ scaleX: pathLength }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-20">
            {NODES.map((node, i) => (
              <motion.div
                key={node.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative mb-6">
                  {/* Outer Ring */}
                  <motion.div 
                    className="absolute -inset-4 border border-white/5 rounded-full group-hover:border-neon-mint/30 transition-colors"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Hexagon Wrapper (CSS Clip) */}
                  <div className="w-16 h-16 bg-void border border-white/20 flex items-center justify-center rotate-45 group-hover:bg-white/[0.05] transition-all">
                    <node.icon className="w-6 h-6 text-white/60 -rotate-45 group-hover:text-neon-mint" />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold uppercase tracking-tight mb-3 group-hover:text-white transition-colors">
                  {node.title}
                </h3>
                <p className="text-[11px] font-mono text-white/30 leading-relaxed uppercase">
                  {node.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
