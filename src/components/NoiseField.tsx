import { useEffect, useState } from 'react';

export const NoiseField = () => {
  const [opacity, setOpacity] = useState(0.05);

  useEffect(() => {
    let animationFrameId: number;
    let mouseVelocity = 0;
    let lastMousePosition = { x: 0, y: 0 };
    let currentOpacity = 0.05;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMousePosition.x;
      const dy = e.clientY - lastMousePosition.y;
      mouseVelocity = Math.sqrt(dx * dx + dy * dy);
      lastMousePosition = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smoothed loop exclusively for setting CSS opacity instead of pixel iteration
    const render = () => {
      mouseVelocity *= 0.95; // Decay
      
      const targetOpacity = 0.05 + Math.min(mouseVelocity * 0.005, 0.3);
      currentOpacity += (targetOpacity - currentOpacity) * 0.1; // Smooth interpolation

      // Only update state if change is significant to avoid unnecessary re-renders
      if (Math.abs(opacity - currentOpacity) > 0.01) {
          setOpacity(currentOpacity);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [opacity]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[0] w-full h-full"
      style={{ 
        opacity: opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        mixBlendMode: 'screen'
      }}
    />
  );
};
