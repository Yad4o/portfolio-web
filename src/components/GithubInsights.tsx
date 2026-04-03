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
          <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.4em] mb-4 ml-1">
            GITHUB DEEP DIVE
          </p>
          <h2 className="text-[5rem] md:text-[8rem] font-black tracking-tighter text-white leading-[0.8] mb-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            AI & ML <br/> Profile.
          </h2>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto border border-[#b6bac5]/20 bg-[#0b0d16]/90 px-8 py-6 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-3xl text-left pointer-events-auto">
            A curated snapshot of GitHub work – highlighting multi‑agent systems, recommendation engines,
            computer vision, and data‑driven projects demonstrating capability as an applied AI engineer.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr] mb-20 pointer-events-auto">
          <div className="bg-[#0b0d16]/95 border-b-4 border-[#b6bac5]/40 p-8 md:p-12 rounded-t-3xl backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-6 mb-10">
              <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
                <BrainCog className="w-8 h-8 text-white/50" />
              </div>
              <div className="text-left">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 font-bold mb-2">
                  Core Themes
                </p>
                <p className="text-xl md:text-2xl text-white/90 font-bold tracking-tight">
                  Applied AI, multi‑agent systems, and practical analytics.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 text-sm text-white/60 font-light leading-loose">
              <div className="border border-white/5 rounded-[1.5rem] p-6 bg-white/[0.01]">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 font-bold mb-4">
                  AI SYSTEMS
                </p>
                <p>
                  Projects like <span className="font-bold text-white">MAP</span> and recommendation
                  work in <span className="font-bold text-white">SRS</span> show you can design, orchestrate,
                  and ship end‑to‑end AI products.
                </p>
              </div>
              <div className="border border-white/5 rounded-[1.5rem] p-6 bg-white/[0.01]">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 font-bold mb-4">
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

          <div className="bg-[#0b0d16]/95 border-b-4 border-[#b6bac5]/40 p-8 md:p-12 rounded-t-3xl backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <Github className="w-6 h-6 text-white/50" />
                </div>
                <div>
                  <p className="text-xl font-black text-white tracking-tight">GitHub</p>
                  <p className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase mt-1">
                    8+ Public · AI/ML
                  </p>
                </div>
              </div>
              <a
                href="https://github.com/Yad4o"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase font-bold text-white border border-white/20 rounded-full px-4 py-2 hover:bg-white hover:text-black transition-all"
              >
                Profile <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
              </a>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-white/60 font-light">
              <div className="flex items-center justify-between border border-white/5 rounded-2xl px-5 py-4 bg-white/[0.01]">
                <div className="flex items-center gap-3">
                  <Cpu className="w-4 h-4 text-white/40" />
                  <span className="font-bold tracking-widest uppercase text-white/80">Stack</span>
                </div>
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest text-right">
                  Python · C++ · FastAPI<br/>Docker · Redis
                </span>
              </div>
              <div className="flex items-center justify-between border border-white/5 rounded-2xl px-5 py-4 bg-white/[0.01]">
                <div className="flex items-center gap-3">
                  <LineChart className="w-4 h-4 text-white/40" />
                  <span className="font-bold tracking-widest uppercase text-white/80">Domains</span>
                </div>
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest text-right">
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
              className="group bg-[#0b0d16]/90 border border-[#b6bac5]/10 border-b-2 hover:border-b-[#b6bac5] p-8 rounded-2xl backdrop-blur-2xl transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center font-black text-white/30 group-hover:text-white/80 transition-colors">
                    {repo.name[0]}
                  </span>
                  <p className="text-xl font-black text-white group-hover:text-white/80 transition-colors tracking-tighter">
                    {repo.name.replace(/-/g, ' ')}
                  </p>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] font-bold text-white/40 border border-white/10 rounded-full px-3 py-1">
                  {repo.tag}
                </span>
              </div>
              <p className="text-sm text-white/50 mb-8 font-light leading-relaxed h-16">
                {repo.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {repo.focus.map((f) => (
                  <span
                    key={f}
                    className="font-mono text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/10 text-white/60 bg-white/[0.02]"
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

