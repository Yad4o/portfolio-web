import React from 'react';
import { Layers, Zap, Cpu, Code2, Globe2, Shapes } from 'lucide-react';

export const BentoSkills = () => {
    return (
        <section className="relative min-h-screen py-32 z-20 mix-blend-overlay pointer-events-none">
            <div className="max-w-7xl mx-auto px-8 pointer-events-auto">
                <div className="mb-16">
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.4em] mb-4 ml-1">
                        ARSENAL
                    </p>
                    <h2 className="text-5xl md:text-[6rem] font-black text-white leading-[0.8] tracking-tighter">
                        EXPERTISE.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-auto md:h-[800px]">
                    {/* Main Tech Stack - Span 2x2 */}
                    <div className="md:col-span-2 md:row-span-2 bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 md:p-12 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/[0.08] transition-all duration-700" />
                        <Layers className="w-10 h-10 text-white/50 mb-6" />
                        <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Core Stack</h3>
                        <p className="text-white/50 mb-8 max-w-sm">Focused on AI/ML, backend engineering, and multi-agent system automation.</p>
                        <div className="flex flex-wrap gap-3">
                            {['Python', 'C++', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'BentoML'].map(skill => (
                                <span key={skill} className="px-4 py-2 border border-white/10 rounded-full text-xs font-medium text-white/80 bg-white/[0.02]">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Creative Dev - Span 2x1 */}
                    <div className="md:col-span-2 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-[2rem] p-8 hover:border-white/30 transition-all duration-500 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay group-hover:opacity-30 transition-opacity" />
                        <div className="relative z-10 flex items-start justify-between">
                            <div>
                                <Shapes className="w-8 h-8 text-white/60 mb-4" />
                                <h3 className="text-2xl font-bold text-white mb-2">AI & Machine Learning</h3>
                                <p className="text-white/50 text-sm">Computer Vision, Recommendation Engines, OpenCV, CNNs, Data Analysis</p>
                            </div>
                        </div>
                    </div>

                    {/* Performance - Span 1x1 */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 hover:-translate-y-2 transition-transform duration-500 flex flex-col justify-between">
                        <Zap className="w-8 h-8 text-white/40" />
                        <div>
                            <h3 className="text-xl font-bold text-white">Algorithms</h3>
                            <p className="text-white/40 text-xs mt-2">Data Structures, Trie, Optimization in C++</p>
                        </div>
                    </div>

                    {/* Architecture - Span 1x1 */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 hover:-translate-y-2 transition-transform duration-500 flex flex-col justify-between">
                        <Cpu className="w-8 h-8 text-white/40" />
                        <div>
                            <h3 className="text-xl font-bold text-white">System Design</h3>
                            <p className="text-white/40 text-xs mt-2">Multi-Agent Arch, Microservices, API Design</p>
                        </div>
                    </div>

                    {/* UI/UX - Span 2x1 */}
                    <div className="md:col-span-2 bg-white/[0.01] border-2 border-white/5 border-dashed rounded-[2rem] p-8 hover:bg-white/[0.03] hover:border-white/20 transition-all duration-500 flex items-center justify-between">
                        <div>
                            <Globe2 className="w-8 h-8 text-white/40 mb-4" />
                            <h3 className="text-2xl font-bold text-white">Frontend Dev</h3>
                            <p className="text-white/50 text-xs mt-2">React, Next.js, Modern UI Implementations</p>
                        </div>
                        <h1 className="text-8xl font-black text-white/[0.03] tracking-tighter mix-blend-overlay hidden md:block">
                            LOGIC
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    );
};
