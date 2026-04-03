import { useState, useEffect } from 'react';
import { Github, ExternalLink, Star } from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  size: number;
}

export const GitHubProjects = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Yad4o/repos');
        const data = await response.json();
        
        const sortedRepos = data
          .filter((repo: Repo) => repo.name !== 'portfolio-web')
          .sort((a: Repo, b: Repo) => {
            if (b.stargazers_count !== a.stargazers_count) {
              return b.stargazers_count - a.stargazers_count;
            }
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
          })
          .slice(0, 6);
        
        setRepos(sortedRepos);
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      'TypeScript': '#c77dff',
      'Python': '#5a189a',
      'JavaScript': '#e0aaff',
      'C++': '#9d4edd',
      'Jupyter Notebook': '#7b2cbf',
      'CSS': '#3c096c',
    };
    return colors[language || ''] || '#c77dff';
  };

  const cardStyles = [
    {
      // Animation 1: The Massive Scale Up
      wrapperAnim: "hover:scale-110 hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(157,78,221,0.5)]",
      titleAnim: "group-hover:tracking-widest group-hover:scale-110",
      iconAnim: "group-hover:rotate-[360deg] group-hover:scale-125"
    },
    {
      // Animation 2: The Squeezed Skew
      wrapperAnim: "hover:scale-[0.98] hover:skew-x-3 hover:translate-x-4 hover:shadow-[-20px_20px_50px_rgba(157,78,221,0.4)]",
      titleAnim: "group-hover:-skew-x-6 group-hover:translate-x-4",
      iconAnim: "group-hover:-rotate-12 group-hover:-translate-x-4"
    },
    {
      // Animation 3: The Heavy Rotate
      wrapperAnim: "hover:rotate-6 hover:scale-105 hover:-translate-y-2 hover:shadow-[30px_30px_50px_rgba(157,78,221,0.4)] origin-bottom-left",
      titleAnim: "group-hover:rotate-[-6deg]",
      iconAnim: "group-hover:scale-[2] group-hover:rotate-90 group-hover:opacity-20 translate-y-4"
    },
    {
      // Animation 4: The Deep Depress
      wrapperAnim: "hover:scale-90 hover:translate-y-4 hover:shadow-[0_0_15px_rgba(157,78,221,0.8)] opacity-90 hover:opacity-100",
      titleAnim: "group-hover:tracking-tighter group-hover:scale-95",
      iconAnim: "group-hover:scale-75 group-hover:translate-y-4"
    },
    {
      // Animation 5: The Vertical Stretch
      wrapperAnim: "hover:scale-y-110 hover:scale-x-95 hover:-translate-y-6 hover:shadow-[0_40px_40px_rgba(157,78,221,0.3)]",
      titleAnim: "group-hover:scale-y-150 group-hover:translate-y-4",
      iconAnim: "group-hover:scale-y-50 group-hover:-translate-y-2"
    },
    {
      // Animation 6: The Left Slide
      wrapperAnim: "hover:-translate-x-6 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[40px_20px_60px_rgba(157,78,221,0.3)]",
      titleAnim: "group-hover:translate-x-6 group-hover:text-white",
      iconAnim: "group-hover:translate-x-12 group-hover:scale-110"
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-8 border border-white/10 bg-[#10002b]/50 backdrop-blur-3xl rounded-[2rem] animate-pulse">
            <div className="h-6 bg-[#9d4edd]/20 rounded-full mb-6 w-1/3"></div>
            <div className="h-4 bg-[#3c096c]/40 rounded mb-3 w-full"></div>
            <div className="h-4 bg-[#3c096c]/40 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-8 flex flex-col justify-between h-full bg-gradient-to-br from-[#10002b]/80 to-[#240046]/80 backdrop-blur-3xl border border-[#9d4edd]/30 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-[600ms] ease-out hover:bg-gradient-to-br hover:from-[#240046]/90 hover:to-[#3c096c]/90 hover:border-[#c77dff]/60 hover:scale-[1.03] hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(157,78,221,0.5)]"
        >
          {/* Background interactive element (Constant neon bloom across all) */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#c77dff]/10 rounded-full blur-[60px] pointer-events-none transition-all duration-700 group-hover:scale-[2] group-hover:bg-[#e0aaff]/15" />
          
          <div className="relative z-10 w-full">
              <div className="flex items-start justify-between mb-8 w-full">
                <div className="p-3 bg-[#3c096c]/30 border border-[#9d4edd]/40 rounded-xl transition-all duration-500 group-hover:bg-[#5a189a]/60 group-hover:border-[#c77dff] group-hover:scale-110 group-hover:-rotate-12">
                  <Github className="w-6 h-6 text-[#c77dff] transition-all duration-500 group-hover:text-white" />
                </div>
                {repo.stargazers_count > 0 && (
                  <div className="flex items-center gap-1.5 text-white/70 text-[10px] font-bold tracking-[0.2em] border border-[#9d4edd]/30 bg-[#3c096c]/20 px-3 py-1.5 rounded-full transition-all duration-500 group-hover:border-[#c77dff] group-hover:bg-[#5a189a]/50">
                    <Star className="w-3 h-3 text-[#e0aaff] fill-current transition-transform duration-500 group-hover:scale-125" />
                    <span className="text-[#e0aaff] transition-colors duration-500 group-hover:text-white">{repo.stargazers_count}</span>
                  </div>
                )}
              </div>
              
              <h3 className="text-white font-black text-2xl tracking-tighter mb-4 transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#c77dff] origin-left group-hover:scale-105">
                {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
              </h3>
              
              <p className="text-[#e0aaff]/60 text-sm mb-10 line-clamp-3 leading-relaxed transition-all duration-500 group-hover:text-[#e0aaff]/90">
                {repo.description || 'Command-line execution and data-orchestration repository without immediate public description.'}
              </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-between border-t border-[#9d4edd]/20 pt-6 mt-auto relative z-10 transition-colors duration-500 group-hover:border-[#c77dff]/40">
            {repo.language && (
              <div className="flex items-center gap-2 border border-[#9d4edd]/30 bg-[#10002b]/60 px-3 py-1.5 rounded-full transition-colors duration-500 group-hover:border-[#c77dff]/50">
                <div 
                  className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor] animate-pulse transition-colors" 
                  style={{ backgroundColor: getLanguageColor(repo.language), color: getLanguageColor(repo.language) }}
                />
                <span className="text-[#c77dff] font-mono text-[9px] uppercase tracking-widest font-bold transition-colors duration-500 group-hover:text-white">{repo.language}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-[#9d4edd] text-[9px] font-mono uppercase font-bold tracking-[0.2em] transition-colors duration-500 group-hover:text-[#e0aaff]">
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">{formatDate(repo.updated_at)}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:scale-150 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-500 text-[#c77dff] group-hover:text-white" />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};
