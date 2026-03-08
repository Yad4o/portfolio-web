import { Suspense, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';

import { BackgroundShader } from './components/BackgroundShader';
import { ParticleField } from './components/ParticleField';
import { FloatingGeometry } from './components/FloatingGeometry';
import { CameraRig } from './components/CameraRig';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// 3D Scene (performance-isolated in its own canvas)
// ─────────────────────────────────────────────
const WebGLScene = () => (
  <Suspense fallback={null}>
    <CameraRig />
    <BackgroundShader />
    <ParticleField />
    <FloatingGeometry />
    <AdaptiveDpr pixelated />
    <AdaptiveEvents />
  </Suspense>
);

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
const App = () => {

  // ── Smooth Scroll (Lenis) ──────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    // Expose lenis tick to GSAP
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  // ── GSAP Scroll Animations ─────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero letter-by-letter reveal ────────
      const heroChars = document.querySelectorAll('.hero-char');
      gsap.from(heroChars, {
        y: 120,
        opacity: 0,
        rotateX: 80,
        stagger: 0.04,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3,
      });
      gsap.from('.hero-sub', {
        y: 40,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
        delay: 1.0,
      });
      gsap.from('.hero-scroll', {
        opacity: 0,
        duration: 0.8,
        delay: 1.6,
      });

      // ── About section ────────────────────────
      gsap.from('.about-headline span', {
        scrollTrigger: { trigger: '#about', start: 'top 75%' },
        y: 80,
        opacity: 0,
        stagger: 0.06,
        duration: 1,
        ease: 'power3.out',
      });
      gsap.from('.about-card', {
        scrollTrigger: { trigger: '#about', start: 'top 60%' },
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
      });

      // ── Horizontal project scroll ────────────
      const container = document.querySelector('.projects-container') as HTMLElement;
      const wrapper   = document.querySelector('.projects-wrapper')   as HTMLElement;
      if (container && wrapper) {
        gsap.to(container, {
          x: () => -(container.scrollWidth - window.innerWidth + 80),
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: () => `+=${container.scrollWidth}`,
            scrub: 1.2,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }

      // ── Skills badges stagger ────────────────
      gsap.from('.skill-badge', {
        scrollTrigger: { trigger: '#skills', start: 'top 80%' },
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'back.out(1.7)',
      });

      // ── Contact reveal ───────────────────────
      gsap.from('.contact-glass', {
        scrollTrigger: { trigger: '#contact', start: 'top 70%' },
        y: 80,
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
      });
    });

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: 'SRS Support AI',
      tech: 'Python · NLP · FastAPI',
      desc: 'Enterprise AI backend classifying and resolving support tickets using TF-IDF and cosine similarity.',
      link: 'https://github.com/Yad4o/SRS',
      hue: '195',
    },
    {
      title: 'Action Recognition',
      tech: 'TensorFlow · OpenCV · Streamlit',
      desc: 'Real-time human action recognition using MobileNetV2 with live webcam inference.',
      link: 'https://github.com/Yad4o/Human-Action-Recognition',
      hue: '270',
    },
    {
      title: '3D Image Describer',
      tech: 'Next.js · Three.js · AI Vision',
      desc: 'Immersive 3D web canvas that analyses uploaded images and returns poetic AI-generated descriptions.',
      link: 'https://github.com/Yad4o/aesthetic-3d-image-describer',
      hue: '165',
    },
    {
      title: 'Evoastra Analytics',
      tech: 'Python · Pandas · Scikit-Learn',
      desc: 'Customer churn analysis pipeline delivering actionable retention strategies via data-driven insights.',
      link: 'https://github.com/Yad4o/Evoastra_project',
      hue: '220',
    },
    {
      title: 'Text Autocomplete',
      tech: 'C++ · Trie · DSA',
      desc: 'Efficient Trie-based autocomplete system achieving O(L) prefix-search time complexity.',
      link: 'https://github.com/Yad4o/Text-Autocomplete-System',
      hue: '30',
    },
  ];

  const skills = [
    'Python', 'C++', 'TypeScript', 'JavaScript',
    'TensorFlow', 'PyTorch', 'OpenCV', 'scikit-learn',
    'React', 'Next.js', 'Three.js', 'WebGL',
    'FastAPI', 'Docker', 'PostgreSQL', 'Git',
  ];

  return (
    <>
      {/* Fixed WebGL background canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{
            antialias: false,
            powerPreference: 'high-performance',
            alpha: false,
          }}
          dpr={[1, 1.5]}
        >
          <WebGLScene />
        </Canvas>
      </div>

      {/* Dark vignette overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#0a0a0a]/30 via-transparent to-[#0a0a0a]/60" />

      {/* All scrollable content */}
      <div className="relative z-[2]">

        {/* ── NAV ─────────────────────────────── */}
        <nav className="fixed top-0 left-0 w-full z-50 px-8 py-5 flex justify-between items-center">
          <div className="text-lg font-black tracking-widest text-white/90">OY</div>
          <div className="flex gap-8 text-xs uppercase tracking-[0.18em] text-white/60 font-medium">
            {['About','Projects','Skills','Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-[#00d4ff] transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* ── HERO ────────────────────────────── */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6 perspective-[1000px]">
          <div className="overflow-hidden mb-3">
            <p className="hero-sub text-[#00d4ff] text-xs uppercase tracking-[0.3em] font-semibold mb-6">
              Creative Developer · AI Engineer
            </p>
          </div>
          <h1 className="overflow-hidden leading-none mb-6">
            {'OM YADAV'.split('').map((char, i) => (
              <span
                key={i}
                className="hero-char inline-block text-6xl sm:text-7xl md:text-[10rem] font-black tracking-tighter"
                style={{
                  color: char === ' ' ? 'transparent' : 'white',
                  textShadow: char !== ' ' ? '0 0 40px rgba(0,212,255,0.15)' : 'none',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
          <p className="hero-sub text-secondary text-base md:text-lg max-w-xl font-light tracking-wide leading-relaxed">
            Building intelligent systems and cinematic web experiences at the intersection of AI and creative code.
          </p>
          <div className="hero-scroll mt-16 flex flex-col items-center gap-3 text-white/30">
            <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
            <ArrowDown size={14} className="animate-bounce" />
          </div>
        </section>

        {/* ── ABOUT ───────────────────────────── */}
        <section id="about" className="min-h-screen py-32 px-6 md:px-20 flex items-center">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="about-headline text-5xl md:text-7xl font-black leading-none mb-10">
                {'Who I Am.'.split(' ').map((word, wi) => (
                  <span key={wi} className="inline-block overflow-hidden mr-4">
                    <span className="inline-block">{word}</span>
                  </span>
                ))}
              </h2>
              <div className="space-y-5 text-base md:text-lg text-white/55 leading-relaxed">
                <p>I'm an AI/ML Intern & full-stack engineer currently at <span className="text-white/90 font-medium">Kemuri Technology</span>, building production-grade ML pipelines and intelligent APIs.</p>
                <p>Obsessed with the intersection of <span className="text-[#00d4ff]">AI</span> and <span className="text-[#a78bfa]">creative code</span> — I make things that think and things that look extraordinary.</p>
                <p>Based in Maharashtra, India. Available for <span className="text-white/90 font-medium">full-time roles</span> globally.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { n:'01', title:'AI Systems',      body:'Computer Vision, NLP, FastAPI production pipelines.' },
                { n:'02', title:'Interactive Web',  body:'WebGL, React Three Fiber, cinematic frontend experiences.' },
                { n:'03', title:'Data Science',     body:'Deep learning, statistical analysis, actionable insights.' },
                { n:'04', title:'Systems & DSA',    body:'C++, algorithms, high-performance data structures.' },
              ].map(({ n, title, body }) => (
                <div
                  key={n}
                  className="about-card group relative p-7 rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm hover:border-[#00d4ff]/30 hover:bg-white/[0.06] transition-all duration-500 cursor-default"
                >
                  <div className="text-[#00d4ff]/60 text-xs font-bold tracking-widest mb-4">{n}</div>
                  <h3 className="text-white text-base font-bold mb-2">{title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{body}</p>
                  {/* Glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: '0 0 40px rgba(0,212,255,0.05) inset' }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS (Horizontal Scroll) ────── */}
        <section id="projects" className="projects-wrapper relative">
          <div className="sticky top-0 h-screen overflow-hidden">
            <div className="absolute top-10 left-10 md:left-16 z-10">
              <p className="text-[#00d4ff] text-xs uppercase tracking-[0.25em] mb-2">Selected Works</p>
              <h2 className="text-4xl md:text-6xl font-black text-white">Projects</h2>
            </div>
          </div>
          <div className="h-[200vh]">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
              <div className="projects-container flex gap-8 pl-16 pr-16 items-center" style={{ width: 'max-content' }}>
                {projects.map((p, i) => (
                  <a
                    key={i}
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-shrink-0 w-[82vw] sm:w-[55vw] md:w-[38vw] h-[65vh] rounded-2xl overflow-hidden relative group cursor-pointer border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all duration-700"
                    style={{ boxShadow: `0 0 60px hsla(${p.hue}, 80%, 60%, 0.04)` }}
                  >
                    {/* Animated gradient bg */}
                    <div
                      className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                      style={{ background: `radial-gradient(ellipse at 40% 40%, hsla(${p.hue},90%,65%,0.35) 0%, transparent 65%)` }}
                    />
                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                      <div className="text-right">
                        <span className="text-xs font-mono text-white/30">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] font-bold mb-3"
                          style={{ color: `hsl(${p.hue}, 90%, 70%)` }}>{p.tech}</p>
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">{p.title}</h3>
                        <p className="text-white/40 text-sm leading-relaxed max-w-xs">{p.desc}</p>
                        <div className="mt-6 flex items-center gap-2 text-xs text-white/30 group-hover:text-white/70 transition-colors duration-300">
                          <span>View on GitHub</span>
                          <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ──────────────────────────── */}
        <section id="skills" className="py-32 px-6 md:px-20 border-t border-white/[0.05]">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-[#00d4ff] text-xs uppercase tracking-[0.25em] mb-4">Technologies</p>
            <h2 className="text-4xl md:text-6xl font-black mb-16">Tech Ecosystem</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((s) => (
                <div
                  key={s}
                  className="skill-badge px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-sm text-white/70 tracking-wide hover:border-[#00d4ff]/40 hover:text-white hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300 cursor-default"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ─────────────────────────── */}
        <section id="contact" className="min-h-screen flex items-center justify-center relative px-6 py-24">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 60%, rgba(0,212,255,0.07) 0%, transparent 55%)' }}
          />
          <div className="contact-glass w-full max-w-2xl rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-12 md:p-20 text-center relative z-10"
            style={{ boxShadow: '0 0 80px rgba(0,212,255,0.06), 0 0 1px 1px rgba(255,255,255,0.04) inset' }}>
            <p className="text-[#00d4ff] text-xs uppercase tracking-[0.25em] mb-4">Get In Touch</p>
            <h2 className="text-4xl md:text-6xl font-black mb-6">Let's Build<br/>Together.</h2>
            <p className="text-white/40 text-lg leading-relaxed mb-12">
              Available for full-time AI/ML roles, creative collaborations, and interesting problems.
            </p>
            <div className="flex justify-center gap-5">
              {[
                { href: 'mailto:omyadao@gmail.com', Icon: Mail,     label: 'Mail'     },
                { href: 'https://github.com/Yad4o', Icon: Github,   label: 'GitHub'   },
                { href: 'https://www.linkedin.com/in/om-yadao-5359791a9', Icon: Linkedin, label: 'LinkedIn' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== 'Mail' ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 rounded-full border border-white/15 flex items-center justify-center text-white/60 group-hover:border-[#00d4ff] group-hover:text-[#00d4ff] group-hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all duration-400">
                    <Icon size={22} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-white/25 group-hover:text-white/60 transition-colors">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-10 flex justify-between items-center border-t border-white/[0.05] text-white/20 text-xs tracking-wider">
          <span>© 2025 Om Yadav</span>
          <span>Built with React · Three.js · GSAP</span>
        </footer>
      </div>
    </>
  );
};

export default App;
