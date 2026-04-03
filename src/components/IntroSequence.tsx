import { useEffect, useState } from 'react';
import gsap from 'gsap';

export const IntroSequence = ({ onComplete }: { onComplete: () => void }) => {
    const [numbers] = useState(Array.from({ length: 100 }, (_, i) => i + 1));
    const [noisePositions, setNoisePositions] = useState<{x: number, y: number, scale: number, delay: number, rot: number}[]>([]);

    useEffect(() => {
        // Pre-calculate scattered random positions to avoid hydration/render mismatch
        setNoisePositions(Array.from({ length: 100 }, () => ({
            x: Math.random() * 95,
            y: Math.random() * 95,
            scale: Math.random() * 2.5 + 0.5,
            delay: Math.random() * 0.5,
            rot: (Math.random() - 0.5) * 45
        })));
        
        document.body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = 'auto';
                    onComplete();
                }
            });

            // 1) Chaotic flicker of the scattered numbers
            tl.fromTo('.scatter-num', 
                { opacity: 0 },
                { 
                    opacity: 1, 
                    duration: 0.05, 
                    stagger: { each: 0.01, from: "random" },
                    ease: "rough({ template: none.out, strength: 2, points: 20, taper: none, randomize: true, clamp: false })"
                }
            );

            // 2) Horrific scale and glitch on the main text
            tl.fromTo('.gothic-title',
                { opacity: 0, scale: 0.8, filter: 'blur(10px)', letterSpacing: '0.5em' },
                { opacity: 1, scale: 1, filter: 'blur(0px)', letterSpacing: '-0.05em', duration: 1.5, ease: "bounce.out" },
                "-=1.0"
            );

            // 3) Violent red flash
            tl.to('.red-flash', {
                opacity: 0.8,
                duration: 0.1,
                yoyo: true,
                repeat: 3,
                ease: 'power4.inOut'
            }, "-=0.5");

            // 4) Suck everything inward into the void
            tl.to(['.scatter-wrapper', '.gothic-title'], {
                scale: 0,
                rotate: 15,
                opacity: 0,
                duration: 0.6,
                ease: "power4.in"
            }, "+=0.4");
            
            // 5) Gothic vertical slices tear apart
            tl.to('.slice-curtain', {
                yPercent: (i) => (i % 2 === 0 ? -100 : 100), 
                duration: 1.0,
                stagger: 0.05,
                ease: "expo.inOut"
            }, "-=0.1");

            tl.to('.intro-container', {
                autoAlpha: 0,
                duration: 0.1
            });
        });

        return () => {
            document.body.style.overflow = 'auto';
            ctx.revert();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const slices = Array.from({ length: 9 });

    return (
        <div className="intro-container fixed inset-0 z-[200] w-screen h-screen flex items-center justify-center pointer-events-none bg-black overflow-hidden font-serif">
            
            {/* Film/Horror Grain overlay */}
            <div className="absolute inset-0 z-[205] opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat animate-pulse" />

            {/* Violent Red Flash Overlay */}
            <div className="red-flash absolute inset-0 z-[204] bg-[#ff0000] mix-blend-color-burn opacity-0 pointer-events-none" />

            {/* Sliced Background Curtains */}
            <div className="absolute inset-0 flex w-full h-full z-[201]">
                {slices.map((_, i) => (
                    <div 
                        key={i} 
                        className="slice-curtain flex-1 h-full bg-[#030303] border-r border-white-[0.01] last:border-0 relative pointer-events-auto shadow-[inset_0_0_50px_rgba(0,0,0,1)]"
                    >
                    </div>
                ))}
            </div>
            
            {/* Chaotic 1 to 100 numbers scattered everywhere */}
            <div className="scatter-wrapper absolute inset-0 z-[202] pointer-events-none">
                {noisePositions.length > 0 && numbers.map((num, i) => (
                    <div 
                        key={i}
                        className="scatter-num absolute text-[#4a4a4a] mix-blend-difference font-black tracking-tighter"
                        style={{
                            left: `${noisePositions[i].x}vw`,
                            top: `${noisePositions[i].y}vh`,
                            transform: `scale(${noisePositions[i].scale}) rotate(${noisePositions[i].rot}deg)`,
                            opacity: 0,
                            animation: `glitch-flicker 0.2s infinite alternate ${noisePositions[i].delay}s text-shadow-[0_0_10px_rgba(255,0,0,0.8)]`
                        }}
                    >
                        {num}
                        <span className="text-[0.4em] text-[#ff0033] absolute -bottom-2 -right-2 opacity-50">%</span>
                    </div>
                ))}
            </div>

            {/* Main Gothic Text Layer */}
            <div className="relative z-[203] flex flex-col items-center pointer-events-none w-full px-8 text-center mix-blend-screen">
                <h1 
                    className="gothic-title text-transparent bg-clip-text bg-gradient-to-b from-white via-[#888] to-[#111] text-7xl md:text-[12rem] font-black uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}
                >
                    OM YADAV
                </h1>
                <p className="gothic-title mt-4 text-[#ff0033] text-sm md:text-xl font-bold tracking-[1em] uppercase shadow-black drop-shadow-[0_0_10px_#ff0033]">
                    NO ESCAPE FROM THE ARCHIVE
                </p>
            </div>
            
            <style>{`
                @keyframes glitch-flicker {
                    0% { opacity: 0; transform: skewX(0deg); }
                    10% { opacity: 1; transform: skewX(-10deg); color: #ff0033; }
                    20% { opacity: 0; transform: skewX(0deg); }
                    30% { opacity: 0.5; transform: skewX(20deg); }
                    50% { opacity: 1; transform: skewX(0deg); color: #fff; }
                    100% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};
