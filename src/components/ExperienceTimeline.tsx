import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        year: "Dec 2025 - Jun 2026",
        role: "AI/ML Engineering Intern",
        company: "Kemuri Technology",
        desc: "Eight-month internship working under a senior engineer on COE AI, an internal AI platform initiative. Built and shipped backend infrastructure in a production FastAPI codebase alongside integrating and testing ML models.",
        highlights: [
            "Built FastAPI microservices and contributed to scalable backend infrastructure for the COE AI platform",
            "Integrated, tested, and validated machine learning models against production workloads",
            "Collaborated within an existing engineering codebase, reviewed by senior engineers"
        ]
    },
    {
        year: "Oct 2025 - Nov 2025",
        role: "Machine Learning Intern",
        company: "Evoastra Ventures Pvt Ltd",
        desc: "Worked on real-world AI and ML projects focusing on data-driven solutions and predictive analytics for client engagements.",
        highlights: [
            "Built and iterated on predictive models using Python data science pipelines",
            "Handled data preprocessing and feature engineering for client datasets",
            "Optimized model performance for real-world deployment constraints"
        ]
    }
];

export const ExperienceTimeline = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.timeline-item').forEach((item: any) => {
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
            <div className="max-w-7xl mx-auto px-8 pointer-events-auto">
                <div className="flex flex-col bg-[#05060b]/80 border border-white/10 rounded-[3rem] p-12 md:p-20 overflow-hidden relative group/section backdrop-blur-2xl shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/[0.05] to-transparent opacity-0 group-hover/section:opacity-100 transition-opacity duration-1000 blur-2xl z-0" />
                    
                    <div className="relative z-10 text-center mb-24">
                        <Briefcase className="w-8 h-8 text-white/30 mx-auto mb-6" />
                        <h2 className="text-5xl md:text-[7rem] font-black text-white leading-[0.8] tracking-tighter">
                            JOURNEY.
                        </h2>
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto w-full">
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
                                    <p className="text-white/50 text-sm md:text-base leading-loose font-light mb-6">{exp.desc}</p>
                                    <ul className={`space-y-2.5 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                        {exp.highlights.map((h, hi) => (
                                            <li key={hi} className="text-white/40 text-xs md:text-sm leading-relaxed font-light">
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            
                            {/* Dot */}
                            <div className="absolute left-0 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#05060b] border-2 border-white rounded-full z-10" />
                            
                            <div className="w-full md:w-[45%] hidden md:block"></div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </section>
    );
};
