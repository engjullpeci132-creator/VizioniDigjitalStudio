import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, ShieldCheck, Lock } from 'lucide-react';

const useCypher = (text: string) => {
  return useMemo(() => {
    return text.split('').map(char => {
      if (/[a-zA-Z]/.test(char)) {
        const code = char.charCodeAt(0);
        return String.fromCharCode(code + 3); // Simple ROT3 for visual effect
      }
      return char;
    }).join('');
  }, [text]);
};

export const Contact = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(false);

  const cypherName = useCypher(name);
  const cypherMessage = useCypher(message);

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setIsEncrypted(true);
    // Reset after some time to simulate successful transmit
    setTimeout(() => {
      setName('');
      setMessage('');
      setIsEncrypted(false);
    }, 4000);
  };

  return (
    <section className="py-20 md:py-32 bg-void border-t border-white/10 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-neon-orchid/5 blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <span className="text-neon-mint font-mono text-[10px] tracking-[0.4em] uppercase block mb-4">
              [ SECURE_UPLINK ]
            </span>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.8] mb-8 md:mb-12">
              Start The <br/> <span className="text-neon-mint">Initialization</span>
            </h2>
            
            <div className="space-y-6">
                <div className="flex gap-4 items-start">
                    <ShieldCheck className="w-5 h-5 text-neon-mint mt-1 shrink-0" />
                    <p className="font-mono text-[10px] text-white/40 uppercase leading-relaxed">
                        &gt; End-to-end neural encryption enabled.<br/>
                        &gt; Direct tunnel to Prishtina/Tirana Ops Centre.<br/>
                        &gt; Zero-knowledge data handling protocol.
                    </p>
                </div>
                <div className="p-4 border border-white/10 bg-white/[0.02] rounded-r-lg border-l-neon-mint border-l-2">
                    <span className="font-mono text-[10px] text-white/60 uppercase block mb-1">CURRENT_LOCATION</span>
                    <span className="text-sm font-bold uppercase tracking-widest">HQ: PRISHTINA // TIRANA</span>
                </div>
            </div>
          </div>

          <form onSubmit={handleTransmit} className="space-y-8 pointer-events-auto">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">USER_IDENTIFIER</label>
              <input 
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="$ ENTER_IDENTITY_TOKEN..."
                className="w-full bg-transparent border-b border-white/30 p-3 md:p-4 focus:outline-none focus:border-neon-mint transition-colors font-mono text-sm tracking-widest uppercase placeholder:text-white/20 custom-cursor-area cursor-none"
              />
              {name && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-[9px] font-mono text-neon-mint/60 italic"
                >
                  ENCRYPTED: {cypherName}
                </motion.div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">TRANSMISSION_PAYLOAD</label>
              <textarea 
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="DEFINE_YOUR_VISION..."
                className="w-full bg-glass-bg border border-glass-border p-3 md:p-4 focus:outline-none focus:border-neon-mint transition-colors font-mono text-sm tracking-widest uppercase placeholder:text-white/20 resize-none custom-cursor-area cursor-none"
              />
              {message && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-[9px] font-mono text-neon-orchid/60 italic break-words"
                >
                  ENCRYPTED_BUF: {cypherMessage}
                </motion.div>
              )}
            </div>

            <button 
              type="submit"
              className="flex w-full md:w-auto items-center justify-center gap-4 px-8 py-4 bg-neon-mint text-void font-bold uppercase tracking-[0.2em] text-sm hover:brightness-110 active:scale-95 transition-all cursor-none"
            >
              <Send className="w-4 h-4" />
              {isEncrypted ? 'TRANSMITTING...' : 'SEND_TRANSMISSION'}
            </button>

            <AnimatePresence>
                {isEncrypted && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-neon-mint font-mono text-[10px] uppercase"
                    >
                        <Lock className="w-3 h-3" />
                        TRANSMISSION_SECURED_AND_QUEUED
                    </motion.div>
                )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
};
