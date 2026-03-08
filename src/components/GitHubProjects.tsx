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
        
        // Sort by stars and updated_at, filter out portfolio-web
        const sortedRepos = data
          .filter((repo: Repo) => repo.name !== 'portfolio-web')
          .sort((a: Repo, b: Repo) => {
            // Prioritize starred repos
            if (b.stargazers_count !== a.stargazers_count) {
              return b.stargazers_count - a.stargazers_count;
            }
            // Then by recent updates
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
          })
          .slice(0, 6); // Show top 6 repos
        
        setRepos(sortedRepos);
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      'TypeScript': '#3178c6',
      'Python': '#3572A5',
      'JavaScript': '#f1e05a',
      'C++': '#f34b7d',
      'Jupyter Notebook': '#DA5B0B',
      'CSS': '#563d7c',
    };
    return colors[language || ''] || '#b6bac5';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-6 border-2 border-[#b6bac5]/20 bg-[#b6bac5]/[0.05] backdrop-blur-3xl rounded-3xl animate-pulse shadow-lg shadow-black/20">
            <div className="h-4 bg-[#b6bac5]/20 rounded mb-4 border border-[#b6bac5]/10"></div>
            <div className="h-3 bg-[#b6bac5]/10 rounded mb-2 border border-[#b6bac5]/10"></div>
            <div className="h-3 bg-[#b6bac5]/10 rounded w-3/4 border border-[#b6bac5]/10"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group p-6 border-2 border-[#b6bac5]/20 bg-[#b6bac5]/[0.05] backdrop-blur-3xl rounded-3xl hover:border-[#b6bac5]/40 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 border border-[#b6bac5]/20 rounded-lg">
              <Github className="w-5 h-5 text-[#b6bac5] group-hover:text-white transition-colors" />
            </div>
            {repo.stargazers_count > 0 && (
              <div className="flex items-center gap-1 text-[#b6bac5]/60 text-xs border border-[#b6bac5]/15 px-2 py-1 rounded-full">
                <Star className="w-3 h-3 fill-current" />
                {repo.stargazers_count}
              </div>
            )}
          </div>
          
          <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#b6bac5] transition-colors border border-[#b6bac5]/10 px-3 py-1 rounded-lg text-center">
            {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
          </h3>
          
          <p className="text-white/60 text-sm mb-4 line-clamp-2 border border-[#b6bac5]/10 px-3 py-2 rounded-lg">
            {repo.description || 'No description available'}
          </p>
          
          <div className="flex items-center justify-between">
            {repo.language && (
              <div className="flex items-center gap-2 border border-[#b6bac5]/15 px-2 py-1 rounded-full">
                <div 
                  className="w-2 h-2 rounded-full border border-[#b6bac5]/20" 
                  style={{ backgroundColor: getLanguageColor(repo.language) }}
                />
                <span className="text-[#b6bac5]/60 text-xs">{repo.language}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1 text-[#b6bac5]/40 text-xs border border-[#b6bac5]/15 px-2 py-1 rounded-full">
              <span>Updated {formatDate(repo.updated_at)}</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};
