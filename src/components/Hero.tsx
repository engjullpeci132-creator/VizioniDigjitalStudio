import { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion, AnimatePresence } from 'motion/react';
import { PerspectiveCamera } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

// Pre-allocate to prevent geometry/material replication across 25 nodes
const sharedGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
const sharedMaterial = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  transparent: true,
  opacity: 0.15,
  metalness: 0.9,
  roughness: 0.1
});

const Cube = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Rotate based on mouse interaction
    const targetRotationX = mouse.y * 0.3;
    const targetRotationY = mouse.x * 0.3;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.05);
    
    // Subtle float - reduced frequency
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.0015;
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      geometry={sharedGeometry}
      material={sharedMaterial}
    />
  );
};

const Grid = () => {
  const cubes = [];
  for (let x = -4; x <= 4; x += 2) {
    for (let z = -4; z <= 4; z += 2) {
      cubes.push(<Cube key={`${x}-${z}`} position={[x, 0, z]} />);
    }
  }
  return <>{cubes}</>;
};

const MORPHING_TEXTS = [
  "We Build Autonomous Revenue Engines.",
  "Balkan Roots. Global AI Execution.",
  "Your Vision. Digitized. Optimized.",
];

export const Hero = () => {
  const [index, setIndex] = useState(0);
  const [webglSupported, setWebglSupported] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MORPHING_TEXTS.length);
    }, 4000);

    // Simple WebGL Support Check
    try {
      const canvas = document.createElement('canvas');
      const support = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setWebglSupported(support);
    } catch {
      setWebglSupported(false);
    }

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* ThreeJS Background with Fallback */}
      <div className="absolute inset-0 z-0 opacity-50">
        {webglSupported ? (
          <Canvas 
            dpr={[1, 1.5]}
            gl={{ failIfMajorPerformanceCaveat: true, antialias: false, powerPreference: "high-performance" }}
            onError={() => setWebglSupported(false)}
          >
            <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Grid />
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#050505" />
              </mesh>
            </Suspense>
          </Canvas>
        ) : (
          /* Brutalist Fallback Background */
          <div className="absolute inset-0 bg-void">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--color-neon-mint)_0%,transparent_70%)]" />
            <div className="grid grid-cols-12 h-full opacity-10">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="border-r border-white/20 h-full" />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-px bg-white/10" />
            </div>
          </div>
        )}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-neon-mint font-mono text-xs uppercase tracking-[0.5em] mb-4 block animate-pulse">
            [ AGENTIC_STUDIO_ONLINE ]
          </span>
          
          <div className="h-48 md:h-64 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={index}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase"
              >
                {MORPHING_TEXTS[index]}
              </motion.h1>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <button 
              onClick={() => navigate('/contact')}
              data-cursor-label="DEPLOY"
              className="group relative px-6 py-3 sm:px-8 sm:py-4 border border-neon-mint text-neon-mint hover:bg-neon-mint/[0.05] font-mono text-xs sm:text-sm tracking-widest uppercase transition-all z-50 pointer-events-auto cursor-none"
            >
              <span className="relative z-10">[ INITIALIZE CONTACT ]</span>
            </button>
            <p className="font-mono text-[10px] text-white/40 max-w-xs text-center md:text-left md:border-l border-white/10 md:pl-4 uppercase leading-relaxed">
              &gt; SYSTEM CORE: PRISHTINA/TIRANA<br/>
              &gt; LATENCY: OPTIMIZED<br/>
              &gt; STATUS: READY FOR SCALE
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Accent Lines */}
      <div className="absolute bottom-12 left-0 w-full px-12 flex justify-between items-end opacity-20 pointer-events-none">
        <div className="h-[1px] bg-white w-1/4" />
        <div className="flex gap-4">
          <div className="w-2 h-2 border border-white" />
          <div className="w-2 h-2 border border-white rotate-45" />
          <div className="w-2 h-2 border border-white" />
        </div>
        <div className="h-[1px] bg-white w-1/4" />
      </div>
    </section>
  );
};
