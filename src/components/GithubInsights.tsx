import { Github, BrainCog, LineChart, Cpu, ExternalLink } from 'lucide-react';

const HIGHLIGHT_REPOS = [
  {
    name: 'MAP',
    url: 'https://github.com/Yad4o/MAP',
    tag: 'Multi‑Agent System',
    summary:
      'Production‑ready multi‑agent automation system built with FastAPI, PostgreSQL, Redis queues, Docker, and API‑based AI with BentoML fallback.',
    focus: ['Systems design', 'Backend', 'Agents'],
  },
  {
    name: 'SRS',
    url: 'https://github.com/Yad4o/SRS',
    tag: 'Recommendation Engine',
    summary:
      'Python recommendation system exploring retrieval, ranking, and evaluation patterns for smarter suggestions.',
    focus: ['ML pipelines', 'Recommenders'],
  },
  {
    name: 'Human-Action-Recognition',
    url: 'https://github.com/Yad4o/Human-Action-Recognition',
    tag: 'Computer Vision',
    summary:
      'Deep learning–based human action recognition using CNNs and OpenCV on real‑world video data.',
    focus: ['Computer vision', 'Deep learning'],
  },
  {
    name: 'aesthetic-3d-image-describer',
    url: 'https://github.com/Yad4o/aesthetic-3d-image-describer',
    tag: 'Multimodal',
    summary:
      '3D‑inspired image description tool that blends creative visuals with language‑model powered descriptions.',
    focus: ['Multimodal', 'Creative ML'],
  },
  {
    name: 'Text-Autocomplete-System',
    url: 'https://github.com/Yad4o/Text-Autocomplete-System',
    tag: 'Algorithms',
    summary:
      'Trie‑based autocomplete engine in C++ optimized for fast prefix search and clean data structures.',
    focus: ['Algorithms', 'Data structures'],
  },
  {
    name: 'Evoastra_project',
    url: 'https://github.com/Yad4o/Evoastra_project',
    tag: 'Analytics',
    summary:
      'Customer purchase‑pattern and churn analysis for an e‑commerce dataset, focused on retention insights.',
    focus: ['EDA', 'Customer analytics'],
  },
];

export const GithubInsights = () => {
  return (
    <section className="min-h-screen relative py-24" id="github-insights">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-24 pointer-events-none">
          <p className="text-[#00d4ff] text-[10px] uppercase font-bold tracking-[0.4em] mb-4 ml-1 drop-shadow-[0_0_10px_rgba(0,212,255,0.8)] animate-pulse">
            GITHUB DEEP DIVE
          </p>
          <h2 className="text-[5rem] md:text-[8rem] font-black tracking-tighter text-white leading-[0.8] mb-10 drop-shadow-[0_20px_40px_rgba(0,212,255,0.2)]">
            AI & ML <br/> Profile.
          </h2>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto border border-[#00d4ff]/20 bg-[#001018]/90 px-8 py-6 rounded-2xl shadow-[0_15px_40px_rgba(0,212,255,0.1)] backdrop-blur-3xl text-left pointer-events-auto hover:border-[#00d4ff]/60 hover:shadow-[0_0_50px_rgba(0,212,255,0.2)] hover:-translate-y-2 transition-all duration-700">
            A curated snapshot of GitHub work – highlighting multi‑agent systems, recommendation engines,
            computer vision, and data‑driven projects demonstrating capability as an applied AI engineer.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr] mb-20 pointer-events-auto">
          <div className="group bg-[#001018]/95 border-t-4 border-[#00d4ff]/50 p-8 md:p-12 rounded-b-3xl backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] hover:bg-[#001824] hover:shadow-[0_0_80px_rgba(0,212,255,0.15)] hover:scale-[1.02] transition-all duration-700">
            <div className="flex items-center gap-6 mb-10">
              <div className="p-4 rounded-2xl border border-[#00d4ff]/30 bg-[#00d4ff]/10 group-hover:bg-[#00d4ff]/20 group-hover:scale-110 transition-all duration-500">
                <BrainCog className="w-8 h-8 text-[#00d4ff]" />
              </div>
              <div className="text-left">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#00d4ff]/60 font-bold mb-2">
                  Core Themes
                </p>
                <p className="text-xl md:text-2xl text-white font-bold tracking-tight">
                  Applied AI, multi‑agent systems, and practical analytics.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 text-sm text-white/60 font-light leading-loose">
              <div className="border border-[#00d4ff]/10 rounded-[1.5rem] p-6 bg-white/[0.01] hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/5 transition-all duration-500 hover:-translate-y-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#00d4ff]/60 font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse"></span>
                  AI SYSTEMS
                </p>
                <p>
                  Projects like <span className="font-bold text-white">MAP</span> and recommendation
                  work in <span className="font-bold text-white">SRS</span> show you can design, orchestrate,
                  and ship end‑to‑end AI products.
                </p>
              </div>
              <div className="border border-[#00d4ff]/10 rounded-[1.5rem] p-6 bg-white/[0.01] hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/5 transition-all duration-500 hover:-translate-y-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#00d4ff]/60 font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#64748b] animate-pulse"></span>
                  RESEARCH → REAL WORLD
                </p>
                <p>
                  Vision work like{' '}
                  <span className="font-bold text-white">Human-Action-Recognition</span> demonstrates you
                  can move from experiments into insights that matter for users.
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-[#001018]/95 border-t-4 border-[#64748b]/50 p-8 md:p-12 rounded-b-3xl backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] hover:bg-[#001824] hover:shadow-[0_0_80px_rgba(100,116,139,0.15)] hover:scale-[1.02] transition-all duration-700 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl border border-[#64748b]/30 bg-[#64748b]/10 group-hover:bg-[#64748b]/20 group-hover:scale-110 transition-all duration-500">
                  <Github className="w-6 h-6 text-[#64748b]" />
                </div>
                <div>
                  <p className="text-xl font-black text-white tracking-tight">GitHub</p>
                  <p className="font-mono text-xs text-[#64748b]/60 tracking-[0.2em] uppercase mt-1">
                    8+ Public · AI/ML
                  </p>
                </div>
              </div>
              <a
                href="https://github.com/Yad4o"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-trigger inline-flex items-center gap-2 font-mono text-[10px] uppercase font-bold text-[#64748b] border border-[#64748b]/30 rounded-full px-4 py-2 hover:bg-[#64748b] hover:text-black hover:shadow-[0_0_20px_rgba(100,116,139,0.4)] transition-all duration-300"
              >
                Profile <ExternalLink className="w-3 h-3 transition-transform duration-300" />
              </a>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-white/60 font-light">
              <div className="group/item flex items-center justify-between border border-[#64748b]/10 rounded-2xl px-5 py-4 bg-white/[0.01] hover:border-[#64748b]/40 transition-all duration-300 hover:bg-[#64748b]/5 hover:pl-6">
                <div className="flex items-center gap-3">
                  <Cpu className="w-4 h-4 text-[#64748b]/80 group-hover/item:text-[#64748b] group-hover/item:scale-125 transition-all" />
                  <span className="font-bold tracking-widest uppercase text-white group-hover/item:text-[#64748b] transition-colors">Stack</span>
                </div>
                <span className="font-mono text-[10px] text-[#64748b]/60 uppercase tracking-widest text-right">
                  Python · C++ · FastAPI<br/>Docker · Redis
                </span>
              </div>
              <div className="group/item flex items-center justify-between border border-[#64748b]/10 rounded-2xl px-5 py-4 bg-white/[0.01] hover:border-[#64748b]/40 transition-all duration-300 hover:bg-[#64748b]/5 hover:pl-6">
                <div className="flex items-center gap-3">
                  <LineChart className="w-4 h-4 text-[#64748b]/80 group-hover/item:text-[#64748b] group-hover/item:scale-125 transition-all" />
                  <span className="font-bold tracking-widest uppercase text-white group-hover/item:text-[#64748b] transition-colors">Domains</span>
                </div>
                <span className="font-mono text-[10px] text-[#64748b]/60 uppercase tracking-widest text-right">
                  Agents · Vision<br/>Algorithms
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHT_REPOS.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#001018]/90 border border-[#00d4ff]/10 border-l-4 hover:border-l-[#00d4ff] hover:bg-[#001018] p-8 rounded-r-3xl backdrop-blur-2xl transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:shadow-[0_0_50px_rgba(0,212,255,0.2)] hover:scale-[1.03] hover:-translate-y-2"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-xl border border-[#00d4ff]/20 bg-[#00d4ff]/10 flex items-center justify-center font-black text-[#00d4ff] group-hover:scale-110 group-hover:bg-[#00d4ff] group-hover:text-black transition-all duration-500 shadow-[0_0_10px_rgba(0,212,255,0.2)]">
                    {repo.name[0]}
                  </span>
                  <p className="text-xl font-black text-white group-hover:text-[#00d4ff] transition-colors tracking-tighter">
                    {repo.name.replace(/-/g, ' ')}
                  </p>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] font-bold text-[#00d4ff]/60 border border-[#00d4ff]/20 rounded-full px-3 py-1 group-hover:border-[#00d4ff] group-hover:text-[#00d4ff] transition-colors duration-500">
                  {repo.tag}
                </span>
              </div>
              <p className="text-sm text-white/50 mb-8 font-light leading-relaxed h-16 group-hover:text-white/80 transition-colors duration-500">
                {repo.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {repo.focus.map((f, idx) => (
                  <span
                    key={f}
                    className={`font-mono text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${idx === 0 ? 'border-[#00d4ff]/40 text-[#00d4ff]' : 'border-[#64748b]/40 text-[#64748b]'} bg-[#001824]/50 group-hover:bg-black transition-colors duration-500 shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

