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

            // Simulate loading progress
            const rawProgress = { val: 0 };
            tl.to(rawProgress, {
                val: 100,
                duration: 2.5,
                ease: 'power4.inOut',
                onUpdate: () => setProgress(Math.round(rawProgress.val))
            });

            // Name spread and fade
            tl.to('.intro-text', {
                letterSpacing: '0.4em',
                opacity: 1,
                duration: 1.5,
                ease: 'expo.out'
            }, "-=1.0");

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
