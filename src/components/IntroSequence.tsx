import { useEffect, useState } from 'react';
import gsap from 'gsap';

const BOOT_LOGS = [
    "INITIALIZING KERNEL_CORE_V9.0...",
    "LOADING WEBGL PARTICLE SHADERS...",
    "MOUNTING NEON VIOLET GRAVITY...",
    "ESTABLISHING C:\PORTFOLIO\ARCHIVE...",
    "BYPASSING SECURITY PROTOCOLS...",
    "AWWWARDS.SYS FULLY ONLINE."
];

export const IntroSequence = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [activeLogs, setActiveLogs] = useState<string[]>([]);

    useEffect(() => {
        // Disable scroll during intro
        document.body.style.overflow = 'hidden';

        // Terminal Log Animation Simulation
        let logIndex = 0;
        const logInterval = setInterval(() => {
            if (logIndex < BOOT_LOGS.length) {
                setActiveLogs(prev => [...prev, BOOT_LOGS[logIndex]]);
                logIndex++;
            }
        }, 120);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = 'auto';
                    onComplete();
                }
            });

            // 1) Fast progress bar filling
            const rawProgress = { val: 0 };
            tl.to(rawProgress, {
                val: 100,
                duration: 1.5,
                ease: 'power4.inOut',
                onUpdate: () => setProgress(Math.round(rawProgress.val))
            });

            // 2) Chromatic Glitch Effect on Text
            tl.to('.glitch-layer-1', { x: -5, opacity: 0.8, duration: 0.05, yoyo: true, repeat: 10 }, "-=1.0")
              .to('.glitch-layer-2', { x: 5, opacity: 0.8, duration: 0.05, yoyo: true, repeat: 10 }, "-=1.0")
              .to('.glitch-main', { scale: 1.1, duration: 0.1, ease: 'rough' }, "-=0.8")
              .to('.glitch-main', { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.3)', textShadow: "0 0 40px rgba(148,163,184,0.8)" });

            // 3) Pulling the UI away inward before breaking curtains
            tl.to('.intro-text-wrapper', {
                scale: 2,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.in'
            }, "+=0.3");
            
            // 4) 5 slicing vertical panels zooming out!
            tl.to('.slice-curtain', {
                yPercent: (i) => (i % 2 === 0 ? -100 : 100), // Evens up, Odds down
                duration: 1.2,
                stagger: 0.1,
                ease: 'expo.inOut'
            }, "-=0.2");

            tl.to('.intro-container', {
                autoAlpha: 0,
                duration: 0.1
            });
        });

        return () => {
            document.body.style.overflow = 'auto';
            clearInterval(logInterval);
            ctx.revert();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Create 5 panels for the sliced background effect
    const slices = Array.from({ length: 5 });

    return (
        <div className="intro-container fixed inset-0 z-[100] w-screen h-screen flex items-center justify-center pointer-events-none">
            
            {/* Sliced Background Panels */}
            <div className="absolute inset-0 flex w-full h-full z-[101]">
                {slices.map((_, i) => (
                    <div 
                        key={i} 
                        className="slice-curtain flex-1 h-full bg-[#05060b] border-r border-[#94a3b8]/10 last:border-0 relative overflow-hidden pointer-events-auto"
                    >
                        {/* Terminal grid lines falling */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(transparent_0%,transparent_98%,#94a3b820_98%,#94a3b820_100%)] bg-[length:100%_20px]" />
                    </div>
                ))}
            </div>
            
            {/* Main Content Layer */}
            <div className="intro-text-wrapper relative z-[102] flex flex-col items-center pointer-events-none w-full max-w-4xl px-8">
                
                {/* Synthetic Terminal Logs (Top Left corner simulating boot) */}
                <div className="absolute -top-32 -left-10 md:left-0 flex flex-col items-start gap-1">
                    {activeLogs.map((log, i) => (
                        <span key={i} className="text-[#00ff41] font-mono text-[8px] md:text-[10px] tracking-widest opacity-80 uppercase">
                            &gt; {log}
                        </span>
                    ))}
                    <span className="text-[#00ff41] font-mono text-[8px] md:text-[10px] tracking-widest animate-pulse">_</span>
                </div>

                {/* Glitching Title Container */}
                <div className="relative mb-12">
                    {/* Cyan Aberration */}
                    <h1 className="glitch-layer-1 absolute inset-0 text-[#00ffff] mix-blend-screen text-5xl md:text-[8rem] font-black tracking-tighter opacity-0 scale-[1.01]">
                        OM YADAV
                    </h1>
                    {/* Magenta Aberration */}
                    <h1 className="glitch-layer-2 absolute inset-0 text-[#ff00ff] mix-blend-screen text-5xl md:text-[8rem] font-black tracking-tighter opacity-0 scale-[0.99]">
                        OM YADAV
                    </h1>
                    {/* Core White Text */}
                    <h1 className="glitch-main relative text-white text-5xl md:text-[8rem] font-black tracking-tighter">
                        OM YADAV
                    </h1>
                </div>
                
                {/* Cyberpunk Loading Bar */}
                <div className="w-full md:w-96 flex flex-col gap-4">
                    <div className="flex justify-between items-end w-full">
                        <span className="text-[#94a3b8] font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
                            SYSTEM LOAD
                        </span>
                        <span className="text-white font-mono text-[10px] tracking-widest font-black">
                            {progress.toString().padStart(3, '0')}%
                        </span>
                    </div>
                    
                    {/* Aggressive glowing progress bar */}
                    <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
                        {/* Glow head */}
                        <div 
                            className="absolute top-0 h-full bg-gradient-to-r from-transparent via-[#94a3b8] to-white shadow-[0_0_20px_#94a3b8]"
                            style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                        />
                    </div>
                    
                    {/* Grid decoration below bar */}
                    <div className="flex w-full justify-between mt-1 opacity-30">
                        {Array.from({length: 10}).map((_, i) => (
                            <div key={i} className="w-[1px] h-1 bg-[#94a3b8]" />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};
