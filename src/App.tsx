import { Suspense, useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Mail, ArrowDown, ExternalLink } from 'lucide-react';

import { BackgroundShader } from './components/BackgroundShader';
import { ParticleMorpher } from './components/ParticleMorpher';
import { CameraRig } from './components/CameraRig';
import { GitHubProjects } from './components/GitHubProjects';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// IMMERSIVE 3D EXPERIENCE CONTROLLER
// ─────────────────────────────────────────────
const ImmersiveCore = ({ scroll }: { scroll: number }) => {
  return (
    <Suspense fallback={null}>
      <CameraRig />
      <BackgroundShader />
      <ParticleMorpher scroll={scroll} />
      
      {/* Decorative stars / dust */}
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
    </Suspense>
  );
};

// ─────────────────────────────────────────────
// MAIN APP ENTRY
// ─────────────────────────────────────────────
const App = () => {
  const [scroll, setScroll] = useState(0);

  // ── Smooth Scroll (Lenis) ──────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on('scroll', (e: any) => {
        setScroll(e.progress);
    });

    gsap.ticker.add((time: number) => lenis.raf(time * 1000));
    return () => {
        gsap.ticker.remove((time: number) => lenis.raf(time * 1000));
        lenis.destroy();
    };
  }, []);

  // ── Reveal Animations ─────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from('.hero-reveal', {
            y: 100,
            opacity: 0,
            stagger: 0.2,
            duration: 1.5,
            ease: 'expo.out',
            delay: 0.5
        });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#383e4e]">
      {/* FIXED IMMERSIVE CANVAS */}
      <div className="fixed inset-0 z-0 w-screen h-screen">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          gl={{ 
            antialias: false, 
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
            alpha: false
          }}
          dpr={[1, 1]}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0
          }}
        >
          <ImmersiveCore scroll={scroll} />
        </Canvas>
      </div>

      {/* INTERACTIVE UI LAYER */}
      <main className="relative z-10 w-full">
        
        <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center mix-blend-difference border-b border-[#b6bac5]/20 backdrop-blur-md">
          <div className="text-xl font-black tracking-tighter text-[#b6bac5] border border-[#b6bac5]/30 px-4 py-2 rounded-lg">OM.</div>
          <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-widest text-[#b6bac5] font-bold">
            <a href="#about" className="hover:text-white transition-colors border border-[#b6bac5]/20 px-3 py-1 rounded-full hover:border-[#b6bac5]/40">About</a>
            <a href="#projects" className="hover:text-white transition-colors border border-[#b6bac5]/20 px-3 py-1 rounded-full hover:border-[#b6bac5]/40">Projects</a>
            <a href="#contact" className="hover:text-white transition-colors border border-[#b6bac5]/20 px-3 py-1 rounded-full hover:border-[#b6bac5]/40">Contact</a>
          </div>
        </nav>

        <section className="h-[200vh] relative flex flex-col items-center justify-center pointer-events-none">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-4 w-full">
                <p className="hero-reveal text-[#b6bac5] text-xs uppercase tracking-[0.5em] mb-4 font-black border border-[#b6bac5]/20 px-4 py-2 rounded-full inline-block text-border-clear">
                    CREATIVE DEVELOPER & 3D ARCHITECT
                </p>
                <h1 className="hero-reveal text-6xl md:text-[12rem] font-black leading-none mb-8 text-white border-4 border-[#b6bac5]/20 px-8 py-4 rounded-2xl text-border-thick">
                    OM <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b6bac5] to-white drop-shadow-[0_0_80px_rgba(182,186,197,0.4)] text-border-white">YADAV</span>
                </h1>
                <p className="hero-reveal text-white/60 text-sm md:text-lg max-w-xl font-light tracking-[0.2em] uppercase border border-[#b6bac5]/15 px-6 py-3 rounded-xl text-border-clear">
                    Building immersive web experiences at the intersection of code and creativity.
                </p>
                <div className="hero-reveal mt-20 flex flex-col items-center gap-4 text-white/20">
                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-border-clear">NAVIGATE DOWN</span>
                    <ArrowDown size={14} className="animate-bounce" />
                </div>
            </div>
        </section>

        <section id="about" className="h-[200vh] relative">
            <div className="sticky top-0 h-screen flex items-center justify-center p-8 md:p-24 overflow-hidden">
                <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-5xl md:text-8xl font-black mb-8 text-white leading-none border-4 border-[#b6bac5]/20 px-6 py-3 rounded-2xl inline-block text-border-thick">About Me.</h2>
                        <div className="space-y-6 text-lg text-white/60 leading-relaxed font-light">
                            <p className="border border-[#b6bac5]/10 px-4 py-3 rounded-lg text-border-clear">I'm a creative developer passionate about building immersive web experiences and 3D interfaces.</p>
                            <p className="border border-[#b6bac5]/10 px-4 py-3 rounded-lg text-border-clear">Specializing in React, Three.js, and creative coding to push the boundaries of web development.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {['React', 'Three.js', 'TypeScript', 'WebGL'].map((t, i) => (
                            <div key={i} className="p-8 border-2 border-[#b6bac5]/20 bg-[#b6bac5]/[0.05] backdrop-blur-3xl rounded-3xl group hover:border-[#b6bac5]/50 transition-all shadow-lg shadow-black/20">
                                <span className="text-[#b6bac5]/50 font-black text-xs border border-[#b6bac5]/30 px-2 py-1 rounded-full inline-block text-border-clear">0{i+1}</span>
                                <h3 className="text-white font-bold mt-2 border border-[#b6bac5]/15 px-3 py-1 rounded-lg text-center text-border-clear">{t}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        <section id="projects-section" className="min-h-screen relative py-24">
            <div className="max-w-7xl mx-auto px-8">
                <div className="text-center mb-16">
                    <p className="text-[#b6bac5] text-xs uppercase tracking-[0.4em] mb-4 border border-[#b6bac5]/20 px-4 py-2 rounded-full inline-block text-border-clear">SELECTED PROJECTS</p>
                    <h2 className="text-4xl md:text-8xl font-black text-white mb-8 border-4 border-[#b6bac5]/20 px-6 py-3 rounded-2xl inline-block text-border-thick">MY WORK.</h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto border border-[#b6bac5]/15 px-6 py-3 rounded-xl text-border-clear">
                        Explore my latest projects and contributions on GitHub
                    </p>
                </div>
                
                <GitHubProjects />
                
                <div className="text-center mt-16">
                    <a 
                        href="https://github.com/Yad4o" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#b6bac5]/30 bg-[#b6bac5]/[0.05] backdrop-blur-3xl rounded-full text-[#b6bac5] hover:bg-[#b6bac5] hover:text-black transition-all shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30"
                    >
                        <Github className="w-4 h-4" />
                        <span className="text-border-clear">View All on GitHub</span>
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>

        <section id="contact" className="h-screen flex items-center justify-center bg-transparent p-6">
            <div className="max-w-xl w-full p-16 border-2 border-[#b6bac5]/20 bg-[#b6bac5]/[0.05] backdrop-blur-3xl rounded-[4rem] text-center relative group shadow-lg shadow-black/20">
                <div className="absolute inset-0 bg-gradient-to-b from-[#b6bac5]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[4rem]" />
                <h2 className="text-4xl md:text-7xl font-black text-white mb-8 border-4 border-[#b6bac5]/20 px-4 py-2 rounded-2xl inline-block text-border-thick">Get In Touch.</h2>
                <div className="flex justify-center gap-8 relative z-10">
                    <a href="mailto:omyadao@gmail.com" className="w-16 h-16 rounded-full border-2 border-[#b6bac5]/20 flex items-center justify-center hover:bg-[#b6bac5] hover:text-black transition-all shadow-lg shadow-black/20">
                        <Mail />
                    </a>
                    <a href="https://github.com/Yad4o" target="_blank" className="w-16 h-16 rounded-full border-2 border-[#b6bac5]/20 flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-lg shadow-black/20">
                        <Github />
                    </a>
                </div>
                <p className="mt-12 text-white/20 text-xs font-bold tracking-widest uppercase border border-[#b6bac5]/15 px-4 py-2 rounded-full inline-block text-border-clear">Open for creative opportunities.</p>
            </div>
        </section>

        <footer className="p-12 text-center text-white/10 text-[10px] uppercase font-black tracking-widest border-t-2 border-[#b6bac5]/20">
            © 2024 OM YADAV. CRAFTED WITH PASSION.
        </footer>
      </main>
    </div>
  );
};

export default App;
