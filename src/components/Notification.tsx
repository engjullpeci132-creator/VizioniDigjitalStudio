import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, X } from 'lucide-react';

export const DemoNotification = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="w-full z-[1000] relative pointer-events-auto bg-neon-orchid/10 border-b border-neon-orchid text-[9px] sm:text-[10px]"
        >
          <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-hidden">
              <AlertCircle className="w-3 h-3 text-neon-orchid shrink-0 animate-pulse" />
              <div className="font-mono truncate text-white/80 uppercase">
                <span className="text-neon-orchid font-bold mr-2 hidden sm:inline">SYSTEM_NOTICE:</span>
                Demo mode. For full functional AI systems, visit{' '}
                <a 
                  href="https://vizionidigjital.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neon-mint hover:underline font-bold ml-1"
                >
                  vizionidigjital.com
                </a>
              </div>
            </div>
            
            <button 
              onClick={() => setIsVisible(false)}
              className="text-white/40 hover:text-white transition-colors shrink-0"
              aria-label="Close notification"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
