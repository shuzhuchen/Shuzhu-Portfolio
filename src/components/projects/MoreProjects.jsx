import React, { useState } from 'react';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';

const MoreProjects = ({ projects }) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Normalize projects to a flat array in case data contains nested arrays
  const flatProjects = React.useMemo(() => {
    if (!Array.isArray(projects)) return [];
    const list = projects.some((p) => Array.isArray(p)) ? projects.flat() : [...projects];
    // sort by id desc (support numeric or string ids)
    return list
      .slice()
      .sort((a, b) => {
        const aId = typeof a?.id === 'number' ? a.id : parseInt(a?.id, 10);
        const bId = typeof b?.id === 'number' ? b.id : parseInt(b?.id, 10);
        return (bId || 0) - (aId || 0);
      });
  }, [projects]);

  // Filter: only id 22 down to 4, and match category when selected
  const filteredByRangeAndCategory = React.useMemo(() => {
    return flatProjects.filter((project) => {
      const idNum = typeof project?.id === 'number' ? project.id : parseInt(project?.id, 10);
      if (!Number.isFinite(idNum)) return false;
      return idNum <= 22 && idNum >= 4 && (selectedCategory === 'All' || project.category === selectedCategory);
    });
  }, [flatProjects, selectedCategory]);

  const handleProjectClick = (project) => {
    console.log('Project clicked:', project);
  };

  return (
    <>
      <div className="relative">
        <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 font-serif md:text-3xl mb-12 text-center tracking-wide">
          More Projects
        </h3>

        {/* Projects Grid */}
        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto px-4">

          {/* Category Filter Buttons - 防重叠且丝滑缩放 */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 md:mb-8 px-2">
            {[ 'All', 'Data Analysis', 'Machine Learning', 'LLM', 'Database' ].map((category) => {
              let baseStyle = 'inline-flex items-center justify-center px-[10px] sm:px-3 md:px-5 py-[6px] sm:py-1.5 md:py-2 text-[clamp(11px,2.6vw,12px)] md:text-sm font-medium transition-all duration-300 rounded-full shadow-md whitespace-nowrap';
              let activeStyle = '';
              if (selectedCategory === category) {
                if (category === 'Data Analysis') {
                  activeStyle = 'bg-pink-100 dark:bg-[#d4969e] text-pink-900';
                } else if (category === 'Machine Learning') {
                  activeStyle = 'bg-blue-100 dark:bg-[#5EB1BF] text-blue-900';
                } else if (category === 'LLM') {
                  activeStyle = 'bg-yellow-100 dark:bg-[#D6B65C] text-yellow-900';
                } else if (category === 'Database') {
                  activeStyle = 'bg-green-100 dark:bg-[#7BC47F] text-green-900';
                } else {
                  activeStyle = 'bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800';
                }
              } else {
                activeStyle = 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600';
              }

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`${baseStyle} ${activeStyle}`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* 网格：小屏两列，减少空白，间距随断点调整 */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
            {filteredByRangeAndCategory
              .slice(0, showAll ? filteredByRangeAndCategory.length : 6)
              .map((project, idx) => {
                let bgColor = 'bg-white/80 dark:bg-[#1e1f1e]';
                let hoverBgColor = 'hover:bg-gray-50 dark:hover:bg-[#2a2b2a]';
                let hoverTextColor = 'group-hover:text-gray-700';
                let hoverIconColor = 'hover:text-gray-700 dark:hover:text-gray-300';
                let techStackHoverColor = 'hover:text-gray-700 dark:hover:text-gray-300';
                
                if (project.category === 'Data Analysis') {
                  bgColor = 'bg-pink-100 dark:bg-[#C6878F]';
                  hoverBgColor = 'hover:bg-pink-50 dark:hover:bg-[#d4969e]';
                  hoverTextColor = 'group-hover:text-pink-900 dark:group-hover:text-pink-900';
                  hoverIconColor = 'hover:text-pink-900 dark:hover:text-pink-900';
                  techStackHoverColor = 'hover:text-pink-900 dark:hover:text-pink-900';
                } else if (project.category === 'Machine Learning') {
                  bgColor = 'bg-blue-100 dark:bg-[#8ac5f4]';
                  hoverBgColor = 'hover:bg-blue-50 dark:hover:bg-[#5EB1BF]';
                  hoverTextColor = 'group-hover:text-blue-900 dark:group-hover:text-blue-900';
                  hoverIconColor = 'hover:text-blue-900 dark:hover:text-blue-900';
                  techStackHoverColor = 'hover:text-blue-900 dark:hover:text-blue-900';
                } else if (project.category === 'LLM') {
                  bgColor = 'bg-yellow-100 dark:bg-[#D6B65C]';
                  hoverBgColor = 'hover:bg-yellow-50 dark:hover:bg-[#e6cd7e]';
                  hoverTextColor = 'group-hover:text-yellow-900 dark:group-hover:text-yellow-900';
                  hoverIconColor = 'hover:text-yellow-900 dark:hover:text-yellow-900';
                  techStackHoverColor = 'hover:text-yellow-900 dark:hover:text-yellow-900';
                } else if (project.category === 'Database') {
                  bgColor = 'bg-green-100 dark:bg-[#7BC47F]';
                  hoverBgColor = 'hover:bg-green-50 dark:hover:bg-[#8fd48f]';
                  hoverTextColor = 'group-hover:text-green-900 dark:group-hover:text-green-900';
                  hoverIconColor = 'hover:text-green-900 dark:hover:text-green-900';
                  techStackHoverColor = 'hover:text-green-900 dark:hover:text-green-900';
                }

                const techs = Array.isArray(project.techStack) ? project.techStack : [];
                const briefText = Array.isArray(project.brief) ? project.brief[0] : project.brief;
                const hasDemo = typeof project.demo === 'string' && project.demo.trim().length > 0;
                const hasGithub = typeof project.github === 'string' && project.github.trim().length > 0;

                return (
                  <div
                    key={project.id ?? `${project.name ?? 'project'}-${idx}`}
                    className={`group ${bgColor} ${hoverBgColor} backdrop-blur-sm border border-gray-300 dark:border-[#757779] shadow-sm hover:shadow-md overflow-hidden cursor-pointer transition-all duration-300 h-auto md:aspect-[5/4] flex flex-col justify-between`}
                    onClick={() => handleProjectClick(project)}
                  >
                    <div className="absolute inset-0 dark:bg-black/50 bg-yellow-100 bg-opacity-30 opacity-100 group-hover:opacity-0 transition duration-300 z-10 pointer-events-none" />

                    {/* Top area: title and external link(s) */}
                    <div className="relative p-[clamp(10px,2.6vw,16px)] md:p-6 z-20 h-full flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2 md:gap-3 mb-2 md:mb-3">
                        <h3 className={`text-[clamp(14px,3.8vw,18px)] md:text-xl font-semibold text-gray-900 dark:text-white ${hoverTextColor} transition-colors flex-1 min-w-0`}>
                          {project.name}
                        </h3>
                        <div className="flex items-center gap-2 shrink-0">
                          {hasGithub && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className={`text-[#A9ABAD] dark:text-gray-200 ${hoverIconColor}`}
                              aria-label="Open source code"
                            >
                              <Github className="w-4 h-4 md:w-5 md:h-5" />
                            </a>
                          )}
                          {hasDemo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className={`text-[#A9ABAD] dark:text-gray-200 ${hoverIconColor}`}
                              aria-label="Open live demo"
                            >
                              <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className={`mb-3 md:mb-4 text-gray-600 dark:text-gray-100 text-[clamp(11px,3.3vw,14px)] md:text-sm leading-[clamp(16px,4.2vw,20px)] md:leading-relaxed transition-colors ${hoverTextColor}`}>
                        {briefText}
                      </p>

                      {/* Tech Stack (comma-separated at bottom) */}
                      <p className={`mt-auto text-[clamp(9px,2.5vw,12px)] md:text-xs font-fira-code text-gray-700 dark:text-gray-100 ${techStackHoverColor} whitespace-normal break-words`}>
                        {techs.join(', ')}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
          
          {/* Show More/Less Button - 小屏更紧凑（同时修正 LLM 的 dark:hover 类名） */}
          {(() => {
            const filteredProjectsCount = filteredByRangeAndCategory.length;
            if (filteredProjectsCount > 6) {
              let buttonStyle = 'group px-5 py-2 text-sm md:px-8 md:py-3 md:text-base rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105';
              if (selectedCategory === 'Data Analysis') {
                buttonStyle += ' bg-pink-100 dark:bg-[#C6878F] text-pink-900 hover:bg-pink-200 dark:hover:bg-[#d4969e]';
              } else if (selectedCategory === 'Machine Learning') {
                buttonStyle += ' bg-blue-100 dark:bg-[#5EB1BF] text-blue-900 hover:bg-blue-200 dark:hover:bg-[#79c0cf]';
              } else if (selectedCategory === 'LLM') {
                buttonStyle += ' bg-yellow-100 dark:bg-[#D6B65C] text-yellow-900 hover:bg-yellow-200 dark:hover:bg-[#e6cd7e]';
              } else if (selectedCategory === 'Database') {
                buttonStyle += ' bg-green-100 dark:bg-[#7BC47F] text-green-900 hover:bg-green-200 dark:hover:bg-[#8fd48f]';
              } else {
                buttonStyle += ' bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 hover:bg-gray-600 dark:hover:bg-white';
              }
              return (
                <div className="text-center mt-8 md:mt-12">
                  <button onClick={() => setShowAll(!showAll)} className={buttonStyle}>
                    <span className="flex items-center gap-2">
                      {showAll ? 'Show Less' : 'Show More'}
                      <div className={`transform transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </span>
                  </button>
                </div>
              );
            }
            return null;
          })()}
        </div>
      </div>
    </>
  );
};

export default MoreProjects;