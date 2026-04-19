import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close the mobile menu on route change automatically
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const links = [
    { name: '[ INIT ]', path: '/' },
    { name: '[ VAULT ]', path: '/vault' },
    { name: '[ LOGIC ]', path: '/process' },
    { name: '[ STREAM ]', path: '/stream' },
    { name: '[ CONTACT ]', path: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] pointer-events-none mt-10 md:mt-12 mix-blend-difference">
        <div className="container mx-auto px-6 max-w-5xl flex justify-between items-center">
          {/* Logo / ID */}
          <Link 
            to="/" 
            className="text-white font-black tracking-tighter uppercase text-xl pointer-events-auto cursor-none hover:text-neon-mint flex flex-col leading-[0.8] mix-blend-normal"
          >
            <span className="text-neon-mint/80 text-[8px] font-mono tracking-widest block mb-1 font-normal">AGENCY_CORE</span>
            VIZIONI
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 pointer-events-auto items-center">
            {links.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-mono text-[10px] tracking-widest cursor-none transition-colors ${
                    isActive ? 'text-neon-mint font-bold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden pointer-events-auto flex items-center gap-4">
            <Link
              to="/contact"
              className="font-mono text-[10px] tracking-widest text-neon-mint hover:text-white transition-colors cursor-none border border-neon-mint/30 px-3 py-1.5"
            >
              [ CONTACT ]
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-neon-mint transition-colors cursor-none p-1"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-void/95 backdrop-blur-lg pointer-events-auto flex flex-col items-center justify-center border-b border-neon-mint/20"
          >
            <div className="flex flex-col items-center gap-8 mt-12 w-full px-6">
              {links.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`font-mono text-xl sm:text-2xl tracking-widest cursor-none transition-all block text-center ${
                        isActive ? 'text-neon-mint font-bold scale-110' : 'text-white/60 hover:text-white hover:scale-105'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
            
            <div className="absolute bottom-12 font-mono text-[10px] text-white/30 tracking-widest uppercase">
              Vizioni Core // Online
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
