import { motion, useInView } from 'motion/react';
import { Database, Waves, BarChart3, MapPin } from 'lucide-react';
import { useRef } from 'react';

const ProtocolCard = ({ protocol }: { protocol: any }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      key={protocol.id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      data-cursor-label="SCAN_TARGET"
      className="group relative h-[500px] border-r border-b border-glass-border p-8 overflow-hidden bg-glass-bg transition-colors"
    >
      {/* Visual Background */}
      <div className={isInView ? 'opacity-100' : 'opacity-0'}>
        {protocol.visual(isInView)}
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 border border-white/20 flex items-center justify-center">
              <protocol.icon className="w-5 h-5 text-white/60" />
            </div>
            <div className="font-mono text-[10px] text-neon-orchid tracking-widest bg-white/5 px-2 py-1">
              PROTOCOL_{protocol.id}
            </div>
          </div>
          <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 group-hover:text-neon-mint transition-colors">
            {protocol.title}
          </h3>
          <p className="text-white/40 text-sm leading-relaxed max-w-[250px]">
            {protocol.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {protocol.tags.map((tag: string) => (
            <span key={tag} className="text-[10px] font-mono border border-white/10 px-2 py-0.5 text-white/20">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-neon-mint scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
    </motion.div>
  );
};

const PROTOCOLS = [
  {
    id: '01',
    title: 'PropTech AI',
    description: 'Autonomous geographic intent mapping for real estate giants across the Balkans.',
    tags: ['MAP_INTENT', 'GEO_AI', 'PRISHTINA'],
    icon: MapPin,
    visual: (isInView: boolean) => (
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/kosovo/800/600')] bg-cover bg-center grayscale opacity-20 group-hover:opacity-40 transition-opacity">
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full relative">
                 {/* Visual Pins */}
                 {isInView && (
                   <>
                    <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-neon-mint rounded-full animate-ping" />
                    <div className="absolute top-1/2 left-2/3 w-2 h-2 bg-neon-mint rounded-full animate-ping delay-300" />
                    <div className="absolute top-2/3 left-1/2 w-2 h-2 bg-neon-mint rounded-full animate-ping delay-700" />
                   </>
                 )}
            </div>
        </div>
      </div>
    )
  },
  {
    id: '02',
    title: 'Voice Interface OS',
    description: 'Human-parity conversational agents serving over 1M queries monthly.',
    tags: ['TTS', 'NER', 'SEMANTICS'],
    icon: Waves,
    visual: (isInView: boolean) => (
      <div className="absolute inset-0 flex items-center justify-center p-8 opacity-40">
        <div className="flex items-end gap-1 h-24">
          {isInView && [...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-neon-orchid"
              animate={{ 
                height: [20, 80, 20] 
              }}
              transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    )
  },
  {
    id: '03',
    title: 'Predictive Commerce',
    description: 'Anticipatory logistics model for high-frequency retail networks in Tirana.',
    tags: ['REVENUE_DRIVE', 'FORECAST', 'ALGO'],
    icon: BarChart3,
    visual: (isInView: boolean) => (
      <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-40">
        <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-mono text-neon-mint">$</span>
            <motion.span 
              className="text-4xl font-mono text-neon-mint"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            >
              842,109.42
            </motion.span>
        </div>
        <div className="w-full h-1 bg-white/10 relative overflow-hidden">
            {isInView && (
              <motion.div 
                  className="absolute inset-0 bg-neon-mint"
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 2, repeat: Infinity }}
              />
            )}
        </div>
      </div>
    )
  }
];

export const Portfolio = () => {
  return (
    <section className="py-32 container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
        <div>
          <span className="text-neon-orchid font-mono text-[10px] tracking-[0.3em] uppercase block mb-2">
            [ ARCHIVE_MANIFEST ]
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Intelligence Vault
          </h2>
        </div>
        <div className="max-w-md text-left md:text-right">
          <p className="text-white/40 font-mono text-[10px] md:text-xs uppercase leading-relaxed">
            &gt; We do not build websites. We deploy digital organisms that evolve with your market data.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/10">
        {PROTOCOLS.map((protocol) => (
          <ProtocolCard key={protocol.id} protocol={protocol} />
        ))}
      </div>
    </section>
  );
};
