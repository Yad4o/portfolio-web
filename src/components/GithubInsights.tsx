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
        <div className="text-center mb-16">
          <p className="text-[#b6bac5] text-xs uppercase tracking-[0.4em] mb-4 border border-[#b6bac5]/20 px-4 py-2 rounded-full inline-block text-border-clear">
            GITHUB DEEP DIVE
          </p>
          <h2 className="text-4xl md:text-7xl font-black text-white mb-6 border-4 border-[#b6bac5]/20 px-6 py-3 rounded-2xl inline-block text-border-thick">
            AI & ML Profile.
          </h2>
          <p className="text-white/65 text-sm md:text-base max-w-2xl mx-auto border border-[#b6bac5]/15 px-6 py-3 rounded-xl text-border-clear">
            A curated snapshot of your GitHub work – highlighting multi‑agent systems, recommendation engines,
            computer vision, and data‑driven projects that show your strength as an applied AI engineer.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr] mb-14">
          <div className="border-2 border-[#b6bac5]/30 bg-[#05060b]/80 backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-xl shadow-black/40">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl border border-[#b6bac5]/40 bg-[#0b0d16]/80">
                <BrainCog className="w-5 h-5 text-[#b6bac5]" />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#b6bac5]/70 font-semibold">
                  Core Themes
                </p>
                <p className="text-sm md:text-base text-white/80 font-medium">
                  Applied AI, multi‑agent systems, and practical analytics.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 text-xs md:text-sm text-white/70">
              <div className="border border-[#b6bac5]/30 rounded-2xl p-4 bg-black/40">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#b6bac5]/70 font-semibold mb-2">
                  AI SYSTEMS
                </p>
                <p>
                  Projects like <span className="font-semibold text-white">MAP</span> and your recommendation
                  work in <span className="font-semibold text-white">SRS</span> show you can design, orchestrate,
                  and ship end‑to‑end AI products – from APIs and data stores to orchestration and deployment.
                </p>
              </div>
              <div className="border border-[#b6bac5]/30 rounded-2xl p-4 bg-black/40">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#b6bac5]/70 font-semibold mb-2">
                  RESEARCH → REAL WORLD
                </p>
                <p>
                  Vision work like{' '}
                  <span className="font-semibold text-white">Human-Action-Recognition</span> and analytics in{' '}
                  <span className="font-semibold text-white">Evoastra</span> & accident‑EDA repos demonstrate you
                  can move from notebooks and experiments into insights that matter for users and businesses.
                </p>
              </div>
            </div>
          </div>

          <div className="border-2 border-[#b6bac5]/30 bg-[#05060b]/80 backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-xl shadow-black/40 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl border border-[#b6bac5]/40 bg-[#0b0d16]/80">
                  <Github className="w-5 h-5 text-[#b6bac5]" />
                </div>
                <div>
                  <p className="text-xs text-white/80 font-semibold">GitHub Snapshot</p>
                  <p className="text-[11px] text-white/40 tracking-[0.2em] uppercase">
                    8+ public repos · AI/ML focus
                  </p>
                </div>
              </div>
              <a
                href="https://github.com/Yad4o"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-[#b6bac5] border border-[#b6bac5]/40 rounded-full px-3 py-1 hover:bg-[#b6bac5] hover:text-black transition-all"
              >
                View profile
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-3 text-xs text-white/70">
              <div className="flex items-center justify-between border border-[#b6bac5]/25 rounded-2xl px-3 py-2 bg-black/40">
                <div className="flex items-center gap-2">
                  <Cpu className="w-3 h-3 text-[#b6bac5]" />
                  <span className="font-semibold">Tech Stack</span>
                </div>
                <span className="text-[11px] text-white/55">
                  Python · TypeScript · C++ · FastAPI · PostgreSQL · Redis · Docker
                </span>
              </div>
              <div className="flex items-center justify-between border border-[#b6bac5]/25 rounded-2xl px-3 py-2 bg-black/40">
                <div className="flex items-center gap-2">
                  <LineChart className="w-3 h-3 text-[#b6bac5]" />
                  <span className="font-semibold">Project Types</span>
                </div>
                <span className="text-[11px] text-white/55">
                  Multi‑agent systems · Recommenders · Vision · Analytics · Algorithms
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
              className="group border-2 border-[#b6bac5]/25 bg-[#05060b]/85 backdrop-blur-2xl rounded-3xl p-5 hover:border-[#b6bac5]/60 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full border border-[#b6bac5]/40 bg-black/60 flex items-center justify-center text-[10px] font-bold text-[#b6bac5]">
                    {repo.name[0]}
                  </span>
                  <p className="text-sm font-semibold text-white group-hover:text-[#b6bac5] transition-colors">
                    {repo.name.replace(/-/g, ' ')}
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#b6bac5]/70 border border-[#b6bac5]/35 rounded-full px-2 py-0.5">
                  {repo.tag}
                </span>
              </div>
              <p className="text-xs text-white/65 mb-3 border border-[#b6bac5]/20 rounded-2xl px-3 py-2 bg-black/40">
                {repo.summary}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {repo.focus.map((f) => (
                  <span
                    key={f}
                    className="text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded-full border border-[#b6bac5]/30 text-[#b6bac5]/80 bg-black/40"
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

