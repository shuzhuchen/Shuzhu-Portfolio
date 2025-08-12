import React, { useState } from 'react';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturedProjects = ({ projects }) => {
  const [sliderIndex, setSliderIndex] = useState([0, 0, 0]);

  const updateSliderIndex = (projectIdx, newIndex) => {
    setSliderIndex((prev) => {
      const updated = [...prev];
      updated[projectIdx] = newIndex;
      return updated;
    });
  };

  const featuredProjects = [projects[0], projects[1], projects[2]];

  return (
    <div className="mb-20">
      <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 font-serif md:text-3xl mb-12 text-center tracking-wide">
        Featured Projects
      </h3>
      <div className="space-y-16 md:space-y-24">
        {featuredProjects.map((project, index) => (
          <div
            key={project.id}
            className="w-full max-w-none md:max-w-7xl mx-auto"
          >
            <div className={`flex flex-col md:flex-row items-start gap-8 md:gap-12 ${
              index % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}>
              {/* Image Slider */}
              <div className="w-full max-w-[90%] mx-auto md:w-7/12 relative group">
                <div className="overflow-hidden relative">
                  {/* Overlay */}
                  <div className="absolute inset-0 dark:bg-black/50 bg-yellow-100 bg-opacity-30 opacity-100 group-hover:opacity-0 transition duration-300 z-10 pointer-events-none"></div>

                  {/* Images */}
                  <div className="whitespace-nowrap transition-transform duration-500" style={{ transform: `translateX(-${sliderIndex[index] * 100}%)` }}>
                    {project.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`${project.name} screenshot ${i + 1}`}
                        className="inline-block w-full aspect-video object-cover rounded-lg"
                      />
                    ))}
                  </div>

                  {/* Left Arrow */}
                  <button
                    onClick={() => updateSliderIndex(index, (sliderIndex[index] - 1 + project.images.length) % project.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/30 dark:bg-gray-800/30 hover:bg-gray-50/30 dark:hover:bg-gray-700/30 p-3 rounded-full shadow-lg z-20 transition-all duration-300 transform hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6 text-[#011936] dark:text-[#e3d985]" />
                  </button>
                  {/* Right Arrow */}
                  <button
                    onClick={() => updateSliderIndex(index, (sliderIndex[index] + 1) % project.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/30 dark:bg-gray-800/30 hover:bg-gray-50/30 dark:hover:bg-gray-700/30 p-3 rounded-full shadow-lg z-20 transition-all duration-300 transform hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6 text-[#011936] dark:text-[#e3d985]" />
                  </button>
                </div>

                {/* Dots */}
                <div className="flex justify-center items-center gap-2 mt-4">
                  {project.images.map((_, dotIdx) => (
                    <span
                      key={dotIdx}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        sliderIndex[index] === dotIdx
                          ? 'bg-theme-accent scale-125'
                          : 'bg-gray-300 dark:bg-gray-600 hover:bg-theme-accent-soft'
                      }`}
                    ></span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-5/12 mx-auto md:mx-0 max-w-[90%] md:max-w-none flex flex-col justify-start space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 tracking-tight">
                    {project.name}
                  </h3>
                  <div className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base space-y-2">
                    {Array.isArray(project.brief) ? (
                      project.brief.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))
                    ) : (
                      <p>{project.brief}</p>
                    )}
                  </div>
                  
                  {/* Key Achievements */}
                  {project.keyAchievements && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                        Key Achievements
                      </h4>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        {project.keyAchievements.map((achievement, idx) => (
                          <li key={idx}>• {achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-fira-code">
                    {project.techStack?.join(', ')}
                  </div>
                </div>

                {/* Links */}
                <div className={`flex gap-4 ${index === 0 || index === 2 ? 'md:ml-auto md:self-end' : ''}`}>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-300 border border-gray-200 dark:border-gray-600"
                  >
                    <Github className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200">Code</span>
                  </a>

                   {/* live demo */}
                  {/* <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2 bg-gray-800 dark:bg-gray-200 hover:bg-gray-600 dark:hover:bg-white text-white dark:text-gray-800 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span className="text-sm font-medium">Live Demo</span>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProjects;