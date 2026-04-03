import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

export const IntroSequence = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Disable scroll during intro
        document.body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = 'auto';
                    onComplete();
                }
            });

            // Lightning fast Initialization Bar
            const rawProgress = { val: 0 };
            tl.to(rawProgress, {
                val: 100,
                duration: 1.0, // MUCH faster
                ease: 'power3.inOut',
                onUpdate: () => setProgress(Math.round(rawProgress.val))
            });

            // Extreme Lightning Shock Flicker Effect
            tl.to('.intro-text', { opacity: 1, duration: 0.02, scale: 1.05 }, "-=0.2")
              .to('.intro-text', { opacity: 0, duration: 0.03, scale: 1.0 })
              .to('.intro-text', { opacity: 1, duration: 0.01, scale: 1.1 })
              .to('.intro-text', { opacity: 0, duration: 0.04, scale: 0.95 })
              .to('.intro-text', { opacity: 0.8, duration: 0.02, scale: 1.02 })
              .to('.intro-text', { opacity: 0, duration: 0.06 })
              .to('.intro-text', { opacity: 1, duration: 0.01 })
              .to('.intro-text', { opacity: 0, duration: 0.03 })
              .to('.intro-text', { opacity: 0.5, duration: 0.02, x: -10 })
              .to('.intro-text', { opacity: 0, duration: 0.02, x: 10 })
              .to('.intro-text', { opacity: 1, duration: 0.02, x: 0 })
              .to('.intro-text', { opacity: 0.2, duration: 0.08 })
              .to('.intro-text', {
                  letterSpacing: '0.3em',
                  opacity: 1,
                  textShadow: '0 0 30px rgba(255,255,255,1), 0 0 60px rgba(255,255,255,0.6)',
                  scale: 1,
                  duration: 0.8,
                  ease: 'elastic.out(1, 0.3)' // Gives a slight shocking snap
              });

            // Curtains pull apart meaning transition
            tl.to('.intro-curtain-top', {
                yPercent: -100,
                duration: 1.5,
                ease: 'expo.inOut'
            }, "+=0.2");
            
            tl.to('.intro-curtain-bottom', {
                yPercent: 100,
                duration: 1.5,
                ease: 'expo.inOut'
            }, "<"); // Run at the same time

            // Fade the text into the background
            tl.to('.intro-text-wrapper', {
                scale: 1.5,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out'
            }, "-=1.2");
            
            tl.to('.intro-container', {
                autoAlpha: 0,
                duration: 0.1
            });
        });

        return () => {
            document.body.style.overflow = 'auto';
            ctx.revert();
        };
    }, [onComplete]);

    return (
        <div className="intro-container fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
            {/* Top Split */}
            <div className="intro-curtain-top absolute top-0 left-0 w-full h-1/2 bg-[#05060b] transform origin-top pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[101]" />
            {/* Bottom Split */}
            <div className="intro-curtain-bottom absolute bottom-0 left-0 w-full h-1/2 bg-[#05060b] transform origin-bottom pointer-events-auto z-[101]" />
            
            {/* Loading Content */}
            <div className="intro-text-wrapper relative z-[102] flex flex-col items-center pointer-events-none">
                <div className="flex gap-8 items-end overflow-hidden mb-4">
                    <h1 className="intro-text text-white text-5xl md:text-[8rem] font-black tracking-tighter opacity-0 uppercase">
                        OM YADAV
                    </h1>
                </div>
                
                {/* Minimal Loading Bar & Percentage */}
                <div className="w-64 flex flex-col items-center gap-4">
                    <div className="w-full h-[1px] bg-white/20 relative overflow-hidden">
                        <div 
                            className="absolute top-0 left-0 h-full bg-white transition-all duration-100 ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="text-white/40 font-mono text-xs tracking-widest">
                        {progress.toString().padStart(3, '0')}% - SYSTEM INITIALIZED
                    </span>
                </div>
            </div>
        </div>
    );
};
