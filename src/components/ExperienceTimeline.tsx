import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        year: "2024 - Present",
        role: "AI/ML Intern",
        company: "KEMURI Technology",
        desc: "Building and testing machine learning models. Working intimately with multi-agent systems, data analysis pipelines, and expanding internal feature scopes utilizing Python and computer vision libraries."
    }
];

export const ExperienceTimeline = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.timeline-item').forEach((item: any, i) => {
                gsap.from(item, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                    }
                });
            });

            gsap.to('.progress-line', {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: true
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen py-32 z-20 pointer-events-none">
            <div className="max-w-4xl mx-auto px-8 pointer-events-auto">
                <div className="text-center mb-24">
                    <Briefcase className="w-8 h-8 text-white/30 mx-auto mb-6" />
                    <h2 className="text-5xl md:text-[7rem] font-black text-white leading-[0.8] tracking-tighter">
                        JOURNEY.
                    </h2>
                </div>

                <div className="relative">
                    {/* The Track */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
                    {/* The Fill */}
                    <div className="progress-line absolute left-0 md:left-1/2 top-0 h-0 w-[1px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] -translate-x-1/2" />

                    {experiences.map((exp, i) => (
                        <div key={i} className={`timeline-item relative w-full flex flex-col md:flex-row items-center justify-between mb-24 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="w-full md:w-[45%] flex justify-end">
                                <div className={`w-full ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'} bg-[#05060b]/80 border border-white/10 p-8 md:p-12 rounded-[2rem] backdrop-blur-2xl hover:bg-[#05060b]/90 hover:border-white/20 hover:scale-[1.02] transition-all duration-700 shadow-2xl group`}>
                                    <span className="font-mono text-sm tracking-[0.2em] text-white/50 bg-white/[0.05] px-4 py-1 rounded-full">{exp.year}</span>
                                    <h3 className="text-3xl md:text-5xl font-black text-white mt-8 mb-2 tracking-tighter group-hover:text-white/90 transition-colors">{exp.role}</h3>
                                    <h4 className="font-mono text-lg text-white/40 mb-6 tracking-tight uppercase border-b border-white/10 pb-4 inline-block">{exp.company}</h4>
                                    <p className="text-white/50 text-sm md:text-base leading-loose font-light">{exp.desc}</p>
                                </div>
                            </div>
                            
                            {/* Dot */}
                            <div className="absolute left-0 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#05060b] border-2 border-white rounded-full z-10" />
                            
                            <div className="w-full md:w-[45%] hidden md:block"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
