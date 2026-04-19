import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const PhantomCursor = () => {
  const [label, setLabel] = useState('IDLE');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250 };
  const sx = useSpring(mouseX, springConfig);
  const sy = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverLabel = target.closest('[data-cursor-label]')?.getAttribute('data-cursor-label');
      if (hoverLabel) {
        setLabel(hoverLabel);
      } else if (target.closest('button, a')) {
        setLabel('INITIALIZE');
      } else {
        setLabel('IDLE');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] flex items-center justify-center"
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div
          className="absolute w-12 h-12 border border-white/20 rounded-full"
          animate={{ scale: [1, 1.2, 1], rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Core Dot */}
        <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />

        {/* Text Readout */}
        <div className="absolute left-6 top-0 ml-4 whitespace-nowrap">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">SYSTEM://STATUS</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-white">{label}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
