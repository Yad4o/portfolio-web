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
import { GithubInsights } from './components/GithubInsights';
import { BentoSkills } from './components/BentoSkills';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { EducationSection } from './components/EducationSection';
import { IntroSequence } from './components/IntroSequence';

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
  const [activePage, setActivePage] = useState<'home' | 'resume' | 'github'>('home');
  const [isIntroDone, setIsIntroDone] = useState(false);

  // ── Smooth Scroll (Lenis) ──────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
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

  // ── GSAP Reveal & Parallax Animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {
        // Hero Entrance
        gsap.from('.hero-reveal', {
            y: 100,
            opacity: 0,
            stagger: 0.2,
            duration: 1.5,
            ease: 'expo.out',
            delay: 0.5
        });

        // Infinite Scroller Parallax
        gsap.to('.marquee-track', {
            xPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.marquee-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5
            }
        });

        // Animated Metric Counters
        const metrics = document.querySelectorAll('.metric-number');
        metrics.forEach((metric: any) => {
            const target = parseInt(metric.getAttribute('data-target') || '0', 10);
            gsap.fromTo(metric, 
                { innerText: 0 },
                {
                    innerText: target,
                    duration: 2.5,
                    snap: { innerText: 1 },
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: metric,
                        start: 'top 85%'
                    }
                }
            );
        });

        // Parallax Floating Elements in Data
        gsap.to('.parallax-float', {
            y: -100,
            ease: 'none',
            scrollTrigger: {
                trigger: '.data-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#05060b]">
      {/* MASSIVE CINEMATIC INTRO SEQUENCE */}
      {!isIntroDone && <IntroSequence onComplete={() => setIsIntroDone(true)} />}

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
        
        <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-5 flex justify-between items-center border-b border-[#b6bac5]/20 backdrop-blur-xl bg-[#05060b]/60">
          <button
            onClick={() => setActivePage('home')}
            className="text-xl font-black tracking-tighter text-[#b6bac5] border border-[#b6bac5]/30 px-4 py-2 rounded-lg hover:border-white/60 hover:text-white transition-colors"
          >
            OM.
          </button>
          <div className="hidden md:flex gap-4 text-[10px] uppercase tracking-widest text-[#b6bac5] font-bold">
            <button
              onClick={() => setActivePage('home')}
              className={`px-3 py-1 rounded-full border ${
                activePage === 'home'
                  ? 'border-[#b6bac5]/70 text-white bg-[#b6bac5]/10'
                  : 'border-[#b6bac5]/20 hover:border-[#b6bac5]/40 hover:text-white'
              } transition-colors`}
            >
              Portfolio
            </button>
            <button
              onClick={() => setActivePage('resume')}
              className={`px-3 py-1 rounded-full border ${
                activePage === 'resume'
                  ? 'border-[#b6bac5]/70 text-white bg-[#b6bac5]/10'
                  : 'border-[#b6bac5]/20 hover:border-[#b6bac5]/40 hover:text-white'
              } transition-colors`}
            >
              Resume
            </button>
            <button
              onClick={() => setActivePage('github')}
              className={`px-3 py-1 rounded-full border ${
                activePage === 'github'
                  ? 'border-[#b6bac5]/70 text-white bg-[#b6bac5]/10'
                  : 'border-[#b6bac5]/20 hover:border-[#b6bac5]/40 hover:text-white'
              } transition-colors`}
            >
              GitHub Analysis
            </button>
          </div>
        </nav>

        {activePage === 'home' && (
        <>
        <section className="h-[200vh] relative flex flex-col items-center justify-center pointer-events-none">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-4 w-full">
                <div className="hero-reveal mb-6 overflow-hidden">
                    <p className="text-white/50 text-[10px] md:text-xs font-semibold uppercase tracking-[0.5em] backdrop-blur-sm px-6 py-2 rounded-full border border-white/10 bg-white/[0.02]">
                        VISIONARY CREATIVE DEVELOPER
                    </p>
                </div>
                <div className="hero-reveal relative">
                    <h1 className="text-[6rem] md:text-[14rem] font-black leading-[0.8] tracking-tighter text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                        OM<br/><span className="ml-[10%] opacity-90">YADAV</span>
                    </h1>
                </div>
                <div className="hero-reveal mt-10 bg-[#05060b]/90 border-l-4 border-white rounded-r-2xl p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto">
                    <p className="text-white/60 text-sm md:text-lg max-w-md font-medium tracking-[0.1em] leading-relaxed uppercase">
                        Forging immersive digital experiences perfectly balanced strictly between engineering and visual art.
                    </p>
                </div>
                <div className="hero-reveal absolute bottom-12 flex flex-col items-center gap-3 text-white/30">
                    <span className="text-[8px] uppercase font-bold tracking-[0.4em]">DISCOVER MORE</span>
                    <ArrowDown size={14} className="animate-bounce opacity-50" />
                </div>
            </div>
        </section>

        {/* MARQUEE SECTION - HYPER GEN-Z TYPOGRAPHY */}
        <section className="marquee-section relative h-[50vh] flex items-center overflow-hidden bg-transparent z-10 pointer-events-none mix-blend-overlay">
            <div className="absolute top-1/2 -translate-y-1/2 w-[200vw] flex marquee-track">
                {/* Track repeated twice for infinite effect */}
                <div className="flex shrink-0 w-[100vw] justify-around items-center space-x-16 px-8">
                    {['WEBGL', 'THREE.JS', 'REACT', 'GSAP', 'GLSL', 'VITE'].map((text, i) => (
                        <span key={i} className="text-[8rem] md:text-[12rem] font-black italic tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>
                            {text}
                        </span>
                    ))}
                </div>
                <div className="flex shrink-0 w-[100vw] justify-around items-center space-x-16 px-8">
                    {['WEBGL', 'THREE.JS', 'REACT', 'GSAP', 'GLSL', 'VITE'].map((text, i) => (
                        <span key={'b'+i} className="text-[8rem] md:text-[12rem] font-black italic tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>
                            {text}
                        </span>
                    ))}
                </div>
            </div>
        </section>

        <section id="about" className="h-[200vh] relative mt-20">
            <div className="sticky top-0 h-screen flex items-center justify-center p-8 md:p-24 overflow-hidden pointer-events-none">
                <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                    <div className="md:col-span-7 flex flex-col justify-center">
                        <h2 className="text-5xl md:text-[7rem] font-black tracking-tighter text-white leading-[0.8] mb-10 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
                            Pushing <br/>Boundaries.
                        </h2>
                        <div className="space-y-6 text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-xl pointer-events-auto bg-[#05060b]/90 border-l-4 border-[#b6bac5] backdrop-blur-2xl p-8 rounded-r-3xl shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                            <p>
                                A relentless pursuit of flawless interactive execution. Specialized in fusing high-performance code with bleeding-edge visual fidelity.
                            </p>
                            <p className="text-white/50 text-base">
                                Transforming static concepts into living, breathing fluid WebGL realities.
                            </p>
                        </div>
                    </div>
                    <div className="md:col-span-5 grid grid-cols-2 gap-4 items-center pointer-events-auto mt-10 md:mt-0">
                        {['React.js', 'WebGL', 'Three.js', 'Animation'].map((t, i) => (
                            <div
                              key={i}
                              className="group p-6 bg-[#05060b]/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-l-2 border-transparent hover:border-white backdrop-blur-3xl hover:bg-[#05060b]/95 transition-all duration-700 hover:-translate-y-2 hover:scale-105"
                            >
                                <span className="text-white/20 font-black text-xs inline-block mb-8 transition-transform group-hover:translate-x-2 duration-500">0{i+1}</span>
                                <h3 className="text-white/80 font-bold tracking-[0.2em] text-sm uppercase transition-all duration-500 group-hover:text-white">
                                  {t}
                                </h3>
                                <div className="w-0 group-hover:w-full h-[2px] bg-white mt-4 transition-all duration-700 ease-out"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* EXTREME DATA METRICS SECTION */}
        <section className="data-section relative min-h-screen py-32 flex flex-col items-center justify-center pointer-events-none z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#05060b] via-transparent to-transparent opacity-80" />
            <div className="max-w-7xl mx-auto px-8 relative w-full grid grid-cols-1 md:grid-cols-3 gap-12 text-center pointer-events-auto">
                <div className="parallax-float backdrop-blur-2xl bg-[#05060b]/90 border-t-4 border-white p-12 rounded-b-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] group hover:bg-black transition-all duration-500">
                    <h4 className="text-[5rem] md:text-[8rem] font-black leading-none text-white overflow-hidden drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
                        <span className="metric-number" data-target="9">0</span>
                    </h4>
                    <p className="text-white/40 text-sm font-bold tracking-[0.4em] uppercase mt-6 group-hover:text-white/80 transition-colors">Repositories</p>
                </div>
                <div className="parallax-float backdrop-blur-2xl bg-[#05060b]/90 border-t-4 border-white p-12 rounded-b-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] group hover:bg-black transition-all duration-500 md:mt-24">
                    <h4 className="text-[5rem] md:text-[8rem] font-black leading-none text-white overflow-hidden drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
                        <span className="metric-number" data-target="4">0</span><span className="text-white/30 font-light">M</span>
                    </h4>
                    <p className="text-white/40 text-sm font-bold tracking-[0.4em] uppercase mt-6 group-hover:text-white/80 transition-colors">Lines of Code</p>
                </div>
                <div className="parallax-float backdrop-blur-2xl bg-[#05060b]/90 border-t-4 border-white p-12 rounded-b-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] group hover:bg-black transition-all duration-500">
                    <h4 className="text-[5rem] md:text-[8rem] font-black leading-none text-white overflow-hidden drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
                        <span className="text-white/30 font-light">∞</span>
                    </h4>
                    <p className="text-white/40 text-sm font-bold tracking-[0.4em] uppercase mt-6 group-hover:text-white/80 transition-colors">Energy Level</p>
                </div>
            </div>
            {/* Interactive Cyber grid background element */}
            <div className="absolute bottom-0 w-full h-[40vh] border-t border-white/[0.02] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        </section>

        <section id="projects-section" className="min-h-screen relative py-32 z-20 bg-black/20 backdrop-blur-[2px]">
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div>
                        <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.4em] mb-4 ml-1">
                            SELECTED WORKS
                        </p>
                        <h2 className="text-5xl md:text-[6rem] font-black text-white leading-[0.8] tracking-tighter">
                            ARCHIVE.
                        </h2>
                    </div>
                    <p className="text-white/50 text-sm md:text-base max-w-sm font-light leading-relaxed">
                        A curated selection of complex technical challenges transformed into elegant front-end architectures.
                    </p>
                </div>
                
                <GitHubProjects />
                
                <div className="flex justify-center mt-24">
                    <a 
                        href="https://github.com/Yad4o" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        <Github className="w-5 h-5 relative z-10" />
                        <span className="text-xs font-bold tracking-[0.2em] relative z-10 uppercase">Full Repository</span>
                        <ExternalLink className="w-4 h-4 relative z-10 opacity-50 group-hover:opacity-100" />
                    </a>
                </div>
            </div>
        </section>

        <section id="contact" className="h-screen flex items-center justify-center bg-transparent p-6 relative">
            <div className="max-w-4xl w-full text-center z-10 flex flex-col items-center">
                <h2 className="text-[5rem] md:text-[10rem] font-black text-white leading-[0.8] tracking-tighter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] mb-10">
                  LET'S TALK
                </h2>
                <div className="flex justify-center gap-6 mt-4">
                    <a href="mailto:omyadao@gmail.com" className="w-16 h-16 border border-white/20 bg-white/[0.02] backdrop-blur-xl flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 hover:-translate-y-2">
                        <Mail className="w-5 h-5" />
                    </a>
                    <a href="https://github.com/Yad4o" target="_blank" className="w-16 h-16 border border-white/20 bg-white/[0.02] backdrop-blur-xl flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 hover:-translate-y-2">
                        <Github className="w-5 h-5" />
                    </a>
                </div>
                <div className="mt-20 overflow-hidden">
                    <p className="text-white/30 text-[10px] font-bold tracking-[0.4em] uppercase">
                      Open for visionary opportunities
                    </p>
                </div>
            </div>
        </section>

        <footer className="p-12 text-center text-white/15 text-[10px] uppercase font-black tracking-widest border-t-2 border-[#b6bac5]/20">
            © 2024 OM YADAV. CRAFTED WITH PASSION.
        </footer>
        </>
        )}

        {activePage === 'resume' && (
          <div className="pt-24 pb-24 relative z-10 transition-opacity duration-1000">
            {/* BENTO SKILLS GRID */}
            <BentoSkills />

            {/* EDUCATION SECTION */}
            <EducationSection />

            {/* EXPERIENCE TIMELINE */}
            <ExperienceTimeline />
          </div>
        )}

        {activePage === 'github' && (
          <div className="pt-24 transition-opacity duration-1000">
            <GithubInsights />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
