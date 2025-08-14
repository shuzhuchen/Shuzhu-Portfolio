import React from 'react';
import FeaturedProjects from '../components/projects/FeaturedProjects';
import MoreProjects from '../components/projects/MoreProjects';
import { projects } from '../assets/data.js';

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4">

      <div className="max-w-6xl mx-auto">
        <div className="relative mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 sm:mb-12 text-center tracking-wider relative overflow-visible pt-4 pb-6">
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]">P</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.1s'}}>r</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.2s'}}>o</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.3s'}}>j</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.4s'}}>e</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.5s'}}>c</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.6s'}}>t</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.7s'}}>s</span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 h-1 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-300 rounded-full animate-pulse shadow-md"></span>
          </h2>
          <p className="text-center text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            The ideas I brought to life through hands-on experience
          </p>
        </div>

        {/* Featured Projects */}
        <FeaturedProjects projects={projects} />

        {/* More Projects */}
        <MoreProjects projects={projects} />
      </div>
    </section>
  );
};

export default Projects;