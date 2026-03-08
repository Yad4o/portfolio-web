import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { Canvas } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Component
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      window.addEventListener('mousemove', (e) => {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out',
        });
        gsap.to(followerRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: 'power3.out',
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-screen -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[9998] transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
};

// 3D Background Scene Component
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Floating Abstract Shapes */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Float
          key={i}
          speed={Math.random() * 2 + 1}
          rotationIntensity={Math.random() * 2}
          floatIntensity={Math.random() * 2}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10 - 5
          ]}
        >
          <mesh>
            {i % 3 === 0 ? <icosahedronGeometry args={[Math.random() * 0.5 + 0.2, 0]} /> : 
             i % 3 === 1 ? <torusGeometry args={[Math.random() * 0.4 + 0.2, 0.1, 16, 32]} /> :
             <octahedronGeometry args={[Math.random() * 0.4 + 0.2]} />}
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#00d4ff" : "#ffffff"} 
              wireframe={Math.random() > 0.5}
              transparent
              opacity={0.3}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

// Main App Component
const App = () => {
  // Setup Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // GSAP Animations
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero reveal
      gsap.from('.hero-text', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.5
      });

      // About section cards
      gsap.from('.about-card', {
        scrollTrigger: {
          trigger: '#about',
          start: 'top 70%',
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
      });

      // Horizontal Scroll for Projects
      const projectsSection = document.querySelector('.projects-container');
      const projectsWrapper = document.querySelector('.projects-wrapper');
      
      if (projectsSection && projectsWrapper) {
        gsap.to(projectsSection, {
          x: () => -(projectsSection.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: projectsWrapper,
            start: 'center center',
            end: () => `+=${projectsSection.scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1
          }
        });
      }

    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <CustomCursor />
      
      {/* Fixed WebGL Canvas inside Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Scene />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a] pointer-events-none z-10" />
      </div>

      {/* Main Content Overlay */}
      <main className="relative z-10">
        
        {/* Navbar */}
        <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
          <div className="text-xl font-bold tracking-tighter">OY</div>
          <div className="flex gap-6 text-sm uppercase tracking-widest font-medium">
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <a href="#projects" className="hover:text-accent transition-colors">Projects</a>
            <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-4">
          <h1 className="hero-text text-5xl md:text-8xl font-black tracking-tighter mb-4 leading-none">
            OM <span className="text-accent inline-block drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]">YADAV</span>
          </h1>
          <p className="hero-text text-lg md:text-2xl text-secondary max-w-2xl font-light tracking-wide">
            Creative Developer & AI Engineer blurring the line between intelligent systems and immersive web experiences.
          </p>
          <div className="hero-text mt-12 animate-bounce">
            <div className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent mx-auto" />
          </div>
        </section>

        {/* Interactive About Section */}
        <section id="about" className="min-h-screen py-24 px-6 md:px-24 flex items-center">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8">Who I Am.</h2>
              <div className="space-y-6 text-lg text-secondary leading-relaxed">
                <p>
                  I'm an AI/ML Intern & Full-stack Engineer obsessed with crafting digital experiences that feel alive.
                </p>
                <p>
                  Specializing in machine learning, generative UI, and WebGL, I build tools that aren't just functional—they are visually stunning. 
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="about-card glass p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
                <div className="text-accent text-3xl mb-4 font-black">01</div>
                <h3 className="text-xl font-bold mb-2">AI Systems</h3>
                <p className="text-sm text-secondary">Computer Vision, FastAPIs, automated Python workflows.</p>
              </div>
              <div className="about-card glass p-8 rounded-2xl md:mt-12 hover:-translate-y-2 transition-transform duration-300">
                <div className="text-accent text-3xl mb-4 font-black">02</div>
                <h3 className="text-xl font-bold mb-2">Interactive Web</h3>
                <p className="text-sm text-secondary">WebXR, Three.js, React, cutting-edge frontends.</p>
              </div>
              <div className="about-card glass p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
                <div className="text-accent text-3xl mb-4 font-black">03</div>
                <h3 className="text-xl font-bold mb-2">Data Science</h3>
                <p className="text-sm text-secondary">Deep Learning models, natural language processing.</p>
              </div>
              <div className="about-card glass p-8 rounded-2xl md:mt-12 hover:-translate-y-2 transition-transform duration-300">
                <div className="text-accent text-3xl mb-4 font-black">04</div>
                <h3 className="text-xl font-bold mb-2">Systems Config</h3>
                <p className="text-sm text-secondary">C++, advanced data structures and algorithms.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Project Showcase (Horizontal Scroll) */}
        <section id="projects" className="projects-wrapper h-screen bg-[#050505] relative flex items-center overflow-hidden">
          <div className="absolute top-12 left-12 z-20 mix-blend-difference">
            <h2 className="text-4xl md:text-6xl font-bold">Selected Works</h2>
          </div>
          <div className="projects-container flex gap-12 px-12 md:px-32 w-[300vw] h-full items-center">
            
            {[
               { title: "SRS Support AI", tech: "Python / NLP / FastAPI", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800" },
               { title: "Action Recognition", tech: "TensorFlow / OpenCV", img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800" },
               { title: "3D Image Describer", tech: "Next.js / Three.js", img: "https://images.unsplash.com/photo-1620641788421-7a1c34a62120?auto=format&fit=crop&q=80&w=800" },
               { title: "Evoastra Analytics", tech: "Pandas / Scikit-Learn", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" }
            ].map((p, i) => (
              <div key={i} className="flex-shrink-0 w-[80vw] md:w-[40vw] h-[60vh] relative group cursor-pointer">
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <p className="text-accent uppercase tracking-widest text-xs mb-2 font-bold">{p.tech}</p>
                  <h3 className="text-3xl md:text-5xl font-black">{p.title}</h3>
                </div>
              </div>
            ))}
            
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-32 px-6 relative border-t border-white/5">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-16">Tech Ecosystem</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['Python', 'C++', 'TypeScript', 'TensorFlow', 'PyTorch', 'React', 'Three.js', 'FastAPI', 'Docker', 'OpenCV', 'SQL', 'PostgreSQL', 'Next.js', 'Tailwind'].map((tech) => (
                <div key={tech} className="glass px-6 py-3 rounded-full hover:bg-white/10 hover:scale-110 hover:-translate-y-2 transition-all duration-300 cursor-pointer text-sm tracking-wider">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1)_0%,transparent_60%)]" />
          <div className="glass max-w-2xl w-full p-12 md:p-24 rounded-3xl relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Let's Connect</h2>
            <p className="text-secondary mb-12 text-lg">
              Available for full-time roles & innovative collaborations.
            </p>
            <div className="flex justify-center gap-6">
              <a href="mailto:hello@example.com" className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-black transition-all duration-300 hover:scale-110">
                <Mail size={24} />
              </a>
              <a href="https://github.com/Yad4o" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-black transition-all duration-300 hover:scale-110">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/om-yadao-5359791a9" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-black transition-all duration-300 hover:scale-110">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
