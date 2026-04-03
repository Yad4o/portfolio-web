import React from 'react';
import { GraduationCap } from 'lucide-react';

export const EducationSection = () => {
    return (
        <section className="relative py-24 z-20 pointer-events-none">
            <div className="max-w-7xl mx-auto px-8 pointer-events-auto">
                <div className="flex flex-col md:flex-row justify-between items-center bg-[#05060b]/80 border border-white/10 rounded-[3rem] p-12 md:p-20 overflow-hidden relative group backdrop-blur-2xl shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl" />
                    
                    <div className="relative z-10 md:w-1/2 mb-10 md:mb-0">
                        <GraduationCap className="w-12 h-12 text-white/40 mb-8" />
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                            EDUCATION.
                        </h2>
                        <p className="text-white/50 text-lg max-w-sm font-light">
                            Formal foundation intersecting computer science and engineering.
                        </p>
                    </div>

                    <div className="relative z-10 md:w-1/2 flex flex-col gap-8">
                        <div className="group/item">
                            <h3 className="text-2xl font-bold text-white group-hover/item:text-white/80 transition-colors">Bachelor of Engineering (B.E.)</h3>
                            <div className="flex justify-between items-center mt-2 border-b border-white/10 pb-4">
                                <span className="text-white/50 text-sm tracking-wider uppercase">Artificial Intelligence & Data Science</span>
                                <span className="text-white/30 text-xs font-bold tracking-[0.2em] px-3 py-1 bg-white/[0.05] rounded-full">3rd Year</span>
                            </div>
                            <p className="text-white/40 mt-3 text-xs uppercase tracking-widest">Savitribai Phule Pune University (SPPU)</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
