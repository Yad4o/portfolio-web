import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

// Simple component to test if Three.js works
const TestScene = () => {
  return (
    <>
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
};

const SimpleApp = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* FIXED CANVAS */}
      <div className="fixed inset-0 z-0 w-screen h-screen">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ 
            antialias: false, 
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
            alpha: false
          }}
          dpr={[1, 1]}
        >
          <Suspense fallback={null}>
            <TestScene />
          </Suspense>
        </Canvas>
      </div>

      {/* UI LAYER */}
      <main className="relative z-10 w-full">
        <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center">
          <div className="text-xl font-black tracking-tighter text-white">OM.</div>
        </nav>

        <section className="h-screen relative flex flex-col items-center justify-center">
          <h1 className="text-6xl font-black leading-none mb-8 text-white">
            OM <span className="text-orange-500">YADAV</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl font-light text-center">
            Simple test version - if you see this, it's working!
          </p>
        </section>
      </main>
    </div>
  );
};

export default SimpleApp;
