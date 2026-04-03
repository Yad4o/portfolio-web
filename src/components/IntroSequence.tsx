import { useEffect } from 'react';
import gsap from 'gsap';

export const IntroSequence = ({ onComplete }: { onComplete: () => void }) => {
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = 'auto';
                    onComplete();
                }
            });

            // 1. Terminals snap into existence aggressively
            tl.fromTo('.term-box', 
                { opacity: 0, scale: 0.9, y: (i) => i === 1 ? 150 : -150 },
                { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0, 
                    duration: 0.3, 
                    stagger: 0.1,
                    ease: "expo.out"
                }
            );

            // 2. Glitch white flash at the very end to transition abruptly
            tl.to('.intro-container', {
                backgroundColor: '#ffffff',
                duration: 0.05,
                ease: 'power4.in'
            }, 0.8);

            // 3. Very sudden snap out to reveal the site using CSS autoAlpha
            tl.to('.intro-container', {
                autoAlpha: 0,
                duration: 0.1,
                ease: "power4.out"
            }, 0.9);
        });

        return () => {
            document.body.style.overflow = 'auto';
            ctx.revert();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Synthetic rapidly jumping code for the terminals (massive blocks for hyper-fast scrolling)
    const generateGarbage = (lines: number) => 
        Array.from({length: lines}).map(() => 
            Array.from({length: 8}).map(() => Math.random().toString(16).substr(2, 8)).join(' ')
        ).join('\n');

    const jiberish1 = generateGarbage(100);
    const jiberish2 = generateGarbage(200);
    const jiberish3 = generateGarbage(150);

    return (
        <div className="intro-container fixed inset-0 z-[200] w-screen h-screen flex items-center justify-center bg-[#05060b] overflow-hidden pointer-events-none">
            
            {/* Very faint background noise / grid lines for cold dark theme */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[repeating-linear-gradient(transparent_0%,transparent_98%,#94a3b8_98%,#94a3b8_100%)] bg-[length:100%_4px]" />

            <div className="flex flex-col md:flex-row gap-6 p-8 w-full max-w-7xl h-full md:h-auto items-center md:items-stretch justify-center">
                
                {/* TERMINAL BOX 1 */}
                <div className="term-box w-full md:w-1/3 h-48 md:h-96 border border-[#334155] bg-white/[0.02] p-4 rounded-lg shadow-[0_0_30px_rgba(148,163,184,0.05)] relative overflow-hidden flex flex-col justify-start">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#94a3b8] to-transparent opacity-30 z-10" />
                    <span className="text-[#e2e8f0] font-mono text-xs md:text-sm font-bold mb-2 bg-[#05060b]/90 px-2 absolute top-4 left-4 z-10 border-b border-[#334155]/50 pb-1">
                        INIT_BOOT()
                    </span>
                    <pre className="text-[#94a3b8] font-mono text-[8px] md:text-[10px] leading-tight opacity-50 m-0 break-all w-full animate-code-scroll absolute top-14">
                        {jiberish1}
                    </pre>
                </div>

                {/* TERMINAL BOX 2 */}
                <div className="term-box w-full md:w-1/3 h-48 md:h-96 border border-[#334155] bg-white/[0.02] p-4 rounded-lg shadow-[0_0_50px_rgba(148,163,184,0.1)] relative overflow-hidden flex flex-col justify-start md:mt-12 backdrop-blur-sm">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#cbd5e1] to-transparent opacity-40 z-10" />
                    <span className="text-white font-mono text-xs md:text-sm font-black mb-2 bg-[#05060b]/90 px-2 absolute top-4 left-4 z-10 border-b border-[#64748b]/50 pb-1 tracking-[0.2em]">
                        DECRYPTING ARCHIVE
                    </span>
                    <pre className="text-[#64748b] font-mono text-[8px] md:text-[10px] leading-tight opacity-60 m-0 break-all w-full animate-code-scroll-fast absolute top-14">
                        {jiberish2}
                    </pre>
                </div>

                {/* TERMINAL BOX 3 */}
                <div className="term-box w-full md:w-1/3 h-48 md:h-96 border border-[#334155] bg-white/[0.02] p-4 rounded-lg shadow-[0_0_30px_rgba(148,163,184,0.05)] relative overflow-hidden flex flex-col justify-start">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#94a3b8] to-transparent opacity-30 z-10" />
                    <span className="text-[#e2e8f0] font-mono text-xs md:text-sm font-bold mb-2 bg-[#05060b]/90 px-2 absolute top-4 left-4 z-10 border-b border-[#334155]/50 pb-1">
                        ALLOCATING_MEM
                    </span>
                    <pre className="text-[#94a3b8] font-mono text-[8px] md:text-[10px] leading-tight opacity-50 m-0 break-all w-full animate-code-scroll absolute top-14 border-l border-[#334155] pl-2">
                        {jiberish3}
                    </pre>
                </div>

            </div>

            <style>{`
                @keyframes scrollCodeBlur {
                    0% { transform: translateY(0); filter: blur(0px); }
                    100% { transform: translateY(-70%); filter: blur(1px); }
                }
                .animate-code-scroll {
                    animation: scrollCodeBlur 1.2s linear infinite;
                }
                .animate-code-scroll-fast {
                    animation: scrollCodeBlur 0.8s linear infinite reverse;
                }
            `}</style>
        </div>
    );
};
