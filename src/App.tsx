import { Suspense, useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Mail, ArrowDown, ExternalLink, Linkedin, Instagram } from 'lucide-react';

import { BgOptionCyber } from './components/BgOptionCyber';
import { BgOptionHoloTopography, BgOptionGalacticSpiral } from './components/ExtraBackgrounds';
import { BgOptionWaveGrid } from './components/ExtraBackgrounds2';
import { CameraRig } from './components/CameraRig';
import { GitHubProjects } from './components/GitHubProjects';
import { GithubInsights } from './components/GithubInsights';
import { BentoSkills } from './components/BentoSkills';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { EducationSection } from './components/EducationSection';
import { IntroSequence } from './components/IntroSequence';

gsap.registerPlugin(ScrollTrigger);

// IMMERSIVE 3D BACKGROUND
const ImmersiveCore = ({ scroll, activePage }: { scroll: number, activePage: string }) => {
  return (
    <Suspense fallback={null}>
      <CameraRig />
      {activePage === 'home' && <BgOptionGalacticSpiral scroll={scroll} />}
      {activePage === 'resume' && <BgOptionWaveGrid scroll={scroll} />}
      {activePage === 'github' && <><BgOptionCyber scroll={scroll} /><BgOptionHoloTopography scroll={scroll} /></>}
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
                        start: 'top 85%',
                        once: true
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
          <ImmersiveCore scroll={scroll} activePage={activePage} />
        </Canvas>
      </div>

      {/* INTERACTIVE UI LAYER */}
      <main className="relative z-10 w-full">

        {/* NAVIGATION OPTIONS (TOP RIGHT) */}
        <div className="fixed top-8 right-8 z-[100] flex flex-col gap-3 font-mono items-end pointer-events-auto">
          <button
            onClick={() => setActivePage('home')}
            className={`px-6 py-2 rounded-full border backdrop-blur-xl transition-all duration-500 ${
              activePage === 'home'
                ? 'border-[#00d4ff]/50 bg-[#00d4ff]/10 text-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.3)]'
                : 'border-white/10 text-[#94a3b8] hover:text-white hover:border-white/30 hover:bg-white/5'
            } text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase`}
          >
            Portfolio
          </button>
          <button
            onClick={() => setActivePage('resume')}
            className={`px-6 py-2 rounded-full border backdrop-blur-xl transition-all duration-500 ${
              activePage === 'resume'
                ? 'border-[#00d4ff]/50 bg-[#00d4ff]/10 text-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.3)]'
                : 'border-white/10 text-[#94a3b8] hover:text-white hover:border-white/30 hover:bg-white/5'
            } text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase`}
          >
            Resume
          </button>
          <button
            onClick={() => setActivePage('github')}
            className={`px-6 py-2 rounded-full border backdrop-blur-xl transition-all duration-500 ${
              activePage === 'github'
                ? 'border-[#00d4ff]/50 bg-[#00d4ff]/10 text-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.3)]'
                : 'border-white/10 text-[#94a3b8] hover:text-white hover:border-white/30 hover:bg-white/5'
            } text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase`}
          >
            Github
          </button>
        </div>

        {/* FLOATING LEFT BUTTON */}
        <button
          onClick={() => setActivePage('home')}
          className="fixed top-8 left-8 z-[100] text-2xl font-black tracking-tighter text-[#b6bac5] hover:text-[#94a3b8] hover:scale-110 transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          OM YADAO
        </button>
        
        <div style={{ display: activePage === 'home' ? 'block' : 'none' }}>
        <section className="min-h-screen relative flex flex-col items-center justify-center pointer-events-none">
            <div className="h-screen flex flex-col items-center justify-center text-center px-4 w-full">
                <div className="hero-reveal mb-6 overflow-hidden">
                    <p className="text-white/50 text-[10px] md:text-xs font-semibold uppercase tracking-[0.5em] backdrop-blur-sm px-6 py-2 rounded-full border border-white/10 bg-white/[0.02]">
                        VISIONARY CREATIVE DEVELOPER
                    </p>
                </div>
                <div className="hero-reveal relative z-50 pointer-events-auto mt-4">
                    <div className="flex flex-col items-center md:items-start group cursor-crosshair gap-8">
                        {/* FIRST NAME */}
                        <div className="flex overflow-visible relative perspective-1000">
                            {"OM".split('').map((char, i) => (
                                <span 
                                    key={i} 
                                    className="text-[8rem] md:text-[18rem] font-black leading-[0.75] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-[#94a3b8] hover:from-[#00d4ff] hover:to-[#94a3b8] transition-all duration-500 ease-out hover:-translate-y-12 hover:rotate-[-5deg] hover:scale-[1.2] inline-block drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:drop-shadow-[0_0_80px_rgba(0,212,255,0.8)] z-10 hover:z-50 will-change-transform"
                                    style={{ transitionDelay: `${i * 100}ms` }}
                                >
                                    {char}
                                </span>
                            ))}
                        </div>
                        {/* LAST NAME */}
                        <div className="flex ml-0 md:ml-40 overflow-visible relative perspective-1000">
                            {"YADAO".split('').map((char, i) => (
                                <span 
                                    key={i} 
                                    className="text-[6rem] md:text-[14rem] font-black leading-[0.75] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#e2e8f0] to-[#334155] hover:from-[#64748b] hover:to-[#94a3b8] transition-all duration-500 ease-out hover:-translate-y-16 hover:translate-x-4 hover:rotate-[15deg] hover:scale-[1.3] inline-block drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:drop-shadow-[0_0_100px_rgba(100,116,139,0.8)] z-10 hover:z-50 will-change-transform"
                                    style={{ transitionDelay: `${(i+2) * 100}ms` }}
                                >
                                    {char}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="hero-reveal mt-10 flex flex-col items-center md:items-start gap-4 pointer-events-auto w-full md:w-auto px-4 md:px-0">
                    <div className="bg-gradient-to-r from-[#020617]/95 via-[#0f172a]/95 to-[#05060b]/50 border-l-4 border-[#00d4ff] rounded-r-3xl p-6 md:p-8 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:translate-x-4 hover:bg-[#0f172a]/100 transition-all duration-500 text-left relative overflow-hidden group/hero-desc">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/10 to-transparent opacity-0 group-hover/hero-desc:opacity-100 transition-opacity duration-700" />
                        <p className="text-white text-sm md:text-lg max-w-lg font-semibold tracking-[0.1em] leading-relaxed uppercase drop-shadow-md relative z-10">
                            Engineering intelligent systems perfectly balanced between rigorous data science and bleeding-edge machine learning.
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#e2e8f0]">
                        <span className="px-5 py-2.5 border border-[#475569] rounded-full bg-[#020617]/95 backdrop-blur-2xl shadow-lg hover:border-[#00d4ff]/50 transition-colors cursor-default">19 YO</span>
                        <span className="px-5 py-2.5 border border-[#475569] rounded-full bg-[#020617]/95 backdrop-blur-2xl shadow-lg hover:border-[#00d4ff]/50 transition-colors cursor-default">3rd Yr AI & DS Student</span>
                        <span className="px-5 py-2.5 border-2 border-[#00d4ff]/50 rounded-full bg-[#020617]/95 backdrop-blur-2xl shadow-[0_0_15px_rgba(0,212,255,0.2)] text-[#00d4ff] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] transition-all cursor-default">AI/ML Intern @ Kemuri Tech</span>
                    </div>
                </div>
                <div className="hero-reveal absolute bottom-12 flex flex-col items-center gap-3 text-white/30">
                    <span className="text-[8px] uppercase font-bold tracking-[0.4em]">DISCOVER MORE</span>
                    <ArrowDown size={14} className="animate-bounce opacity-50" />
                </div>
            </div>
        </section>

        {/* MARQUEE SECTION - HYPER GEN-Z TYPOGRAPHY */}
        <section className="marquee-section relative h-[50vh] flex items-center overflow-hidden bg-transparent z-10 pointer-events-auto mix-blend-overlay cursor-none group">
            <div className="absolute top-1/2 -translate-y-1/2 w-max flex marquee-track group-hover:[animation-play-state:paused]">
                <div className="flex shrink-0 min-w-[100vw] w-max justify-around items-center space-x-16 px-8 pr-16">
                    {['ONE', 'PIECE', 'ONE', 'PIECE', 'ONE', 'PIECE'].map((text, i) => (
                        <span key={i} className="text-[8rem] md:text-[12rem] font-black italic tracking-tighter text-transparent hover:text-white hover:scale-110 hover:-rotate-3 hover:drop-shadow-[0_0_50px_rgba(255,255,255,0.8)] transition-all duration-300 whitespace-nowrap" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>
                            {text}
                        </span>
                    ))}
                </div>
                <div className="flex shrink-0 min-w-[100vw] w-max justify-around items-center space-x-16 px-8 pr-16">
                    {['ONE', 'PIECE', 'ONE', 'PIECE', 'ONE', 'PIECE'].map((text, i) => (
                        <span key={'b'+i} className="text-[8rem] md:text-[12rem] font-black italic tracking-tighter text-transparent hover:text-white hover:scale-110 hover:-rotate-3 hover:drop-shadow-[0_0_50px_rgba(255,255,255,0.8)] transition-all duration-300 whitespace-nowrap" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>
                            {text}
                        </span>
                    ))}
                </div>
            </div>
        </section>

        <section id="about" className="min-h-screen relative mt-20">
            <div className="h-screen flex items-center justify-center p-8 md:p-24 overflow-hidden pointer-events-none">
                <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                    <div className="md:col-span-7 flex flex-col justify-center">
                        <h2 className="text-5xl md:text-[7rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-[#64748b] leading-[0.8] mb-10 drop-shadow-[0_10px_30px_rgba(100,116,139,0.4)] hover:-rotate-2 hover:scale-105 origin-left transition-all duration-700">
                            Pushing <br/>Boundaries.
                        </h2>
                        <div className="group space-y-6 text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-xl pointer-events-auto bg-gradient-to-br from-[#020617]/95 to-[#0f172a]/95 border-l-4 border-[#94a3b8] backdrop-blur-3xl p-8 rounded-r-3xl shadow-[0_20px_50px_rgba(2,6,23,0.8)] hover:shadow-[0_0_80px_rgba(148,163,184,0.3)] hover:translate-x-4 transition-all duration-700">
                            <p className="group-hover:text-white transition-colors duration-500">
                                A relentless pursuit of intelligent system architecture. Specialized in fusing complex data pipelines with bleeding-edge machine learning models.
                            </p>
                            <p className="text-[#e2e8f0] text-base group-hover:text-[#94a3b8] transition-colors duration-500 font-medium">
                                Transforming raw data into predictive, autonomous, and scalable AI realities.
                            </p>
                        </div>
                    </div>
                    <div className="md:col-span-5 grid grid-cols-2 gap-4 items-center pointer-events-auto mt-10 md:mt-0 perspective-1000">
                        {['Python', 'Machine Learning', 'Computer Vision', 'Multi-Agent AI'].map((t, i) => (
                            <div
                              key={i}
                              className="group p-6 bg-gradient-to-b from-[#020617]/90 to-[#0f172a]/90 shadow-[0_15px_30px_rgba(0,0,0,0.9)] border-t-2 border-transparent hover:border-[#e2e8f0] backdrop-blur-3xl rounded-xl hover:bg-[#0f172a]/90 transition-all duration-700 hover:-translate-y-4 hover:rotate-3 hover:scale-110 hover:shadow-[0_0_40px_rgba(148,163,184,0.4)]"
                            >
                                <span className="text-[#0f172a] font-black text-xs inline-block mb-8 transition-transform group-hover:translate-x-4 group-hover:text-[#94a3b8] duration-500 scale-150">0{i+1}</span>
                                <h3 className="text-white/60 font-bold tracking-[0.2em] text-sm uppercase transition-all duration-500 group-hover:text-white">
                                  {t}
                                </h3>
                                <div className="w-0 group-hover:w-full h-[3px] bg-gradient-to-r from-[#94a3b8] to-[#e2e8f0] mt-4 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(226,232,240,0.8)]"></div>
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
                <div className="parallax-float backdrop-blur-3xl bg-gradient-to-t from-[#020617]/95 to-[#0f172a]/80 border-b-4 border-[#475569] p-12 rounded-t-3xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] group hover:bg-[#0f172a]/90 hover:-translate-y-6 hover:shadow-[0_0_100px_rgba(71,85,105,0.2)] transition-all duration-700 ease-out cursor-default">
                    <h4 className="text-[5rem] md:text-[8rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-[#94a3b8] overflow-hidden drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)] group-hover:scale-110 transition-transform duration-700">
                        <span className="metric-number" data-target="6">0</span><span className="text-[#64748b] font-light">+</span>
                    </h4>
                    <p className="text-[#94a3b8] text-sm font-bold tracking-[0.3em] uppercase mt-6 group-hover:text-white group-hover:tracking-[0.45em] transition-all duration-700">Real-World Backend Systems</p>
                </div>
                <div className="parallax-float backdrop-blur-3xl bg-gradient-to-t from-[#020617]/95 to-[#0f172a]/80 border-b-4 border-[#475569] p-12 rounded-t-3xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] group hover:bg-[#0f172a]/90 hover:-translate-y-6 hover:shadow-[0_0_100px_rgba(71,85,105,0.2)] transition-all duration-700 ease-out cursor-default md:mt-24">
                    <h4 className="text-[5rem] md:text-[8rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-[#94a3b8] overflow-hidden drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)] group-hover:scale-110 transition-transform duration-700">
                        <span className="metric-number" data-target="150">0</span><span className="text-[#64748b] font-light">+</span>
                    </h4>
                    <p className="text-[#94a3b8] text-sm font-bold tracking-[0.3em] uppercase mt-6 group-hover:text-white group-hover:tracking-[0.45em] transition-all duration-700">API Endpoints Deployed</p>
                </div>
                <div className="parallax-float backdrop-blur-3xl bg-gradient-to-t from-[#020617]/95 to-[#0f172a]/80 border-b-4 border-[#475569] p-12 rounded-t-3xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] group hover:bg-[#0f172a]/90 hover:-translate-y-6 hover:shadow-[0_0_100px_rgba(71,85,105,0.2)] transition-all duration-700 ease-out cursor-default">
                    <h4 className="text-[5rem] md:text-[8rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-[#94a3b8] overflow-hidden drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)] group-hover:scale-110 transition-transform duration-700">
                        <span className="metric-number" data-target="9">0</span><span className="text-[#64748b] font-light">+</span>
                    </h4>
                    <p className="text-[#94a3b8] text-sm font-bold tracking-[0.3em] uppercase mt-6 group-hover:text-white group-hover:tracking-[0.45em] transition-all duration-700">GitHub Repositories</p>
                </div>
            </div>
            {/* Interactive Cyber grid background element */}
            <div className="absolute bottom-0 w-full h-[40vh] border-t border-white/[0.02] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        </section>

        <section id="projects-section" className="min-h-screen relative py-32 z-20 bg-black/20 backdrop-blur-[2px]">
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 group">
                    <div>
                        <p className="text-[#e2e8f0] text-[10px] uppercase font-bold tracking-[0.4em] mb-4 ml-1 group-hover:tracking-[0.8em] transition-all duration-700 pointer-events-auto">
                            SELECTED WORKS
                        </p>
                        <h2 className="text-5xl md:text-[6rem] font-black leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white group-hover:from-white group-hover:to-[#94a3b8] transition-all duration-700 pointer-events-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                            ARCHIVE.
                        </h2>
                    </div>
                    <p className="text-white/50 text-sm md:text-base max-w-sm font-light leading-relaxed group-hover:text-white/80 transition-colors pointer-events-auto bg-[#020617]/80 border-l-4 border-[#475569] p-6 rounded-r-2xl backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
                        A curated selection of complex technical challenges transformed into elegant front-end architectures.
                    </p>
                </div>
                
                <GitHubProjects />
                
                <div className="flex justify-center mt-24">
                    <a 
                        href="https://github.com/Yad4o" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-4 px-12 py-6 bg-transparent border-2 border-[#475569] rounded-2xl hover:scale-110 hover:-rotate-2 transition-all duration-500 overflow-hidden shadow-[0_0_20px_rgba(71,85,105,0.2)] hover:shadow-[0_0_60px_rgba(148,163,184,0.6)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#475569] to-[#94a3b8] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        <Github className="w-6 h-6 relative z-10 text-[#94a3b8] group-hover:text-black group-hover:scale-125 transition-all duration-500" />
                        <span className="text-sm font-black tracking-[0.3em] relative z-10 text-white group-hover:text-black uppercase transition-colors duration-500">Full Repository</span>
                        <ExternalLink className="w-5 h-5 relative z-10 text-[#94a3b8] group-hover:text-black opacity-50 group-hover:opacity-100 transition-all duration-500" />
                    </a>
                </div>
            </div>
        </section>

        <section id="contact" className="h-screen flex items-center justify-center bg-transparent p-6 relative">
            <div className="max-w-4xl w-full text-center z-10 flex flex-col items-center group pointer-events-auto">
                <h2 className="text-[5rem] md:text-[10rem] font-black text-white leading-[0.8] tracking-tighter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] mb-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-[#475569] group-hover:scale-105 group-hover:italic transition-all duration-700 cursor-default">
                  LET'S TALK
                </h2>
                <div className="flex justify-center gap-8 mt-4">
                    <a href="mailto:omyadao@gmail.com" className="group/btn w-20 h-20 rounded-3xl border-2 border-[#334155] bg-[#020617] backdrop-blur-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-[#94a3b8] hover:to-[#334155] hover:border-white transition-all duration-500 hover:-translate-y-4 hover:-rotate-6 hover:scale-110 shadow-[0_10px_30px_rgba(0,0,0,0.9)] hover:shadow-[0_0_50px_rgba(71,85,105,0.6)]">
                        <Mail className="w-8 h-8 text-[#94a3b8] group-hover/btn:text-white transition-colors duration-500" />
                    </a>
                    <a href="https://www.linkedin.com/in/om-yadao-5359791a9" target="_blank" className="group/btn w-20 h-20 rounded-3xl border-2 border-[#334155] bg-[#020617] backdrop-blur-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-[#94a3b8] hover:to-[#334155] hover:border-white transition-all duration-500 hover:-translate-y-4 hover:scale-110 shadow-[0_10px_30px_rgba(0,0,0,0.9)] hover:shadow-[0_0_50px_rgba(71,85,105,0.6)]">
                        <Linkedin className="w-8 h-8 text-[#94a3b8] group-hover/btn:text-white transition-colors duration-500" />
                    </a>
                    <a href="https://github.com/Yad4o" target="_blank" className="group/btn w-20 h-20 rounded-3xl border-2 border-[#334155] bg-[#020617] backdrop-blur-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-[#94a3b8] hover:to-[#334155] hover:border-white transition-all duration-500 hover:-translate-y-4 hover:rotate-6 hover:scale-110 shadow-[0_10px_30px_rgba(0,0,0,0.9)] hover:shadow-[0_0_50px_rgba(71,85,105,0.6)]">
                        <Github className="w-8 h-8 text-[#94a3b8] group-hover/btn:text-white transition-colors duration-500" />
                    </a>
                </div>
                <div className="mt-24 overflow-hidden px-8 py-3 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-default">
                    <p className="text-white/30 text-[12px] font-bold tracking-[0.4em] uppercase group-hover:text-[#e2e8f0] group-hover:tracking-[0.8em] transition-all duration-1000">
                      Open for visionary opportunities
                    </p>
                </div>
            </div>

            {/* OTHER CONTACT OPTIONS (INSTAGRAM) */}
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex flex-col items-end gap-3 pointer-events-auto">
                <span className="text-[8px] md:text-[10px] uppercase font-bold tracking-[0.2em] md:tracking-[0.3em] text-[#94a3b8]/70">See other contact opt</span>
                <a href="https://www.instagram.com/om.fps" target="_blank" className="group flex items-center gap-3 px-5 py-2 md:px-6 md:py-3 rounded-full border border-white/10 bg-[#020617]/50 backdrop-blur-xl hover:bg-gradient-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:border-transparent transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(253,29,29,0.4)] hover:scale-105 hover:-rotate-2">
                    <span className="text-white/70 text-[10px] md:text-xs font-mono group-hover:text-white transition-colors tracking-widest">@om.fps</span>
                    <Instagram className="w-3 h-3 md:w-4 md:h-4 text-white/70 group-hover:text-white transition-colors" />
                </a>
            </div>
        </section>

        <footer className="p-12 text-center text-white/15 text-[10px] uppercase font-black tracking-widest border-t-2 border-[#b6bac5]/20">
            © 2024 OM YADAV. CRAFTED WITH PASSION.
        </footer>
        </div>

        <div style={{ display: activePage === 'resume' ? 'block' : 'none' }}>
          <div className="pt-24 pb-24 relative z-10 transition-opacity duration-1000">
            {/* BENTO SKILLS GRID */}
            <BentoSkills />

            {/* EDUCATION SECTION */}
            <EducationSection />

            {/* EXPERIENCE TIMELINE */}
            <ExperienceTimeline />
          </div>
        </div>

        <div style={{ display: activePage === 'github' ? 'block' : 'none' }}>
          <div className="pt-24 transition-opacity duration-1000">
            <GithubInsights />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
