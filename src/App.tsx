import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { PhantomCursor } from './components/PhantomCursor';
import { NoiseField } from './components/NoiseField';
import { AgentConsole } from './components/AgentConsole';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoNotification } from './components/Notification';

// Pages
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Process } from './components/Process';
import { RSSFeed } from './components/RSSFeed';
import { Contact } from './components/Contact';

// Helper to scroll to top on page change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const { scrollYProgress } = useScroll();
  
  // Dynamic accent color shift based on scroll
  const accentColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#00FFAA', '#D400FF', '#00FFAA']
  );

  useEffect(() => {
    // Update CSS variable for accent color
    const unsubscribe = accentColor.on('change', (latest) => {
      document.documentElement.style.setProperty('--accent', latest);
    });
    return () => unsubscribe();
  }, [accentColor]);

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-void text-white selection:bg-neon-mint selection:text-void custom-cursor-area flex flex-col">
        <DemoNotification />
        <Navbar />
        <PhantomCursor />
        <NoiseField />
        <AgentConsole />

        <main className="flex-grow flex flex-col items-center w-full">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/vault" element={<Portfolio />} />
            <Route path="/process" element={<Process />} />
            <Route path="/stream" element={<RSSFeed />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />

        {/* Extreme Low-Light Atmospheric Gradients */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <motion.div 
            className="absolute top-0 -left-1/4 w-[80%] h-[80%] rounded-full blur-[120px] opacity-[0.03]"
            style={{ backgroundColor: accentColor }}
          />
          <motion.div 
            className="absolute bottom-0 -right-1/4 w-[80%] h-[80%] rounded-full blur-[120px] opacity-[0.03]"
            style={{ backgroundColor: accentColor }}
          />
        </div>
      </div>
    </Router>
  );
}
