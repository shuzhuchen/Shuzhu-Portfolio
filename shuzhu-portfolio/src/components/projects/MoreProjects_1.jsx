import React, { useState } from 'react';
import { Github, ExternalLink, ChevronRight } from 'lucide-react';
import ProjectModal from './ProjectModal';

const MoreProjects = ({ projects }) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProjectForModal(project);
  };

  const handleCloseModal = () => {
    setSelectedProjectForModal(null);
  };

  return (
    <>
      <div className="relative">
        <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 font-serif md:text-3xl mb-12 text-center tracking-wide">
          More Projects
        </h3>

      {/* Projects Grid */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto px-4">            
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.slice(3, showAll ? projects.length : 9).map((project) => (
            <div
              key={project.id}
              className="group bg-[#ffffff] dark:bg-[#1e1f1e] rounded-2xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl border border-[#d9d9d9] dark:border-[#757779]"
              onClick={() => handleProjectClick(project)}
            >
              {/* <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                  <span className="text-white font-semibold text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-colors duration-300">
                    View Details
                  </span>
                </div>
              </div> */}
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-[#3D3D3A] dark:text-[#F5F4ED] group-hover:text-[#3D3D3A] dark:group-hover:text-[#F5F4ED] transition-colors">
                  {project.name}
                </h3>
                <p className="mb-4 text-sm text-[#5A5A58] dark:text-[#A9ABAD] leading-relaxed line-clamp-3">
                  {Array.isArray(project.brief) ? project.brief[0] : project.brief}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-[#F0EEE6] dark:bg-[#3b3d3e] text-[#3D3D3A] dark:text-[#F5F4ED] border border-[#d9d9d9] dark:border-[#757779] hover:bg-[#e8eaeb] dark:hover:bg-[#4c4e50] transition-colors rounded-md text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Action Icons */}
                <div className="flex justify-between items-center pt-4 border-t border-[#d9d9d9] dark:border-[#757779]">
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-5 h-5 text-[#A9ABAD] hover:text-[#3D3D3A] dark:hover:text-[#F5F4ED] cursor-pointer transition-colors" />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-5 h-5 text-[#A9ABAD] hover:text-[#3D3D3A] dark:hover:text-[#F5F4ED] cursor-pointer transition-colors" />
                    </a>
                  </div>
                  <span className="text-xs text-[#A9ABAD] dark:text-[#A9ABAD] font-medium">
                    Click to view
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Show More/Less Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group px-8 py-3 bg-gray-800 dark:bg-gray-200 hover:bg-gray-600 dark:hover:bg-white text-white dark:text-gray-800 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className="flex items-center gap-2">
              {showAll ? 'Show Less' : 'Show More'}
              <div className={`transform transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}>
                <ChevronRight className="w-4 h-4" />
              </div>
            </span>
          </button>
        </div>
      </div>
      
      {/* Project Modal - Rendered outside of relative container */}
      {selectedProjectForModal && (
        <ProjectModal
          project={selectedProjectForModal}
          onClose={handleCloseModal}
        />
      )}
      </div>
    </>
  );
};

export default MoreProjects;