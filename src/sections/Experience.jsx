import React, { useState } from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { experiences } from '../assets/data.js';
import { motion } from 'framer-motion';

const Experience = ({ isDark }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <section id="experience" className="py-20 px-4">
      <div className="mx-auto flex flex-col w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
        {/* Header - Fixed Position */}
        <div className="relative mb-16 flex-shrink-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 sm:mb-12 text-center tracking-wider relative overflow-visible pt-4 pb-6">
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]">W</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.1s'}}>o</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.2s'}}>r</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.3s'}}>k</span>
            <span className="inline-block mx-2 sm:mx-3"></span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.4s'}}>E</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.5s'}}>x</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.6s'}}>p</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.7s'}}>e</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.8s'}}>r</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.9s'}}>i</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '1.0s'}}>e</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '1.1s'}}>n</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '1.2s'}}>c</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '1.3s'}}>e</span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 h-1 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-300 rounded-full animate-pulse shadow-md"></span>
          </h2>
          <p className="text-center text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            The journeys where I applied my skills to make an impact
          </p>
        </div>

        {/* Main Content - Flexible Height */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-start">
          {/* Mobile Tab Navigation */}
          <div className="lg:hidden">
            <div className="flex overflow-x-auto scrollbar-hide border-b border-[#C96342] dark:border-[#E5B2A1] mb-6">
              <div className="flex min-w-max">
                {experiences.map((exp, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`whitespace-nowrap px-4 py-3 text-sm font-mono transition-all duration-200 ${
                      index === activeIndex
                        ? 'text-[#C96342] border-b-2 border-[#C96342] dark:text-[#E5B2A1] dark:border-[#E5B2A1] bg-[#F0EEE6]/30 dark:bg-[#3b3d3e]/30'
                        : 'text-gray-500 dark:text-[#A9ABAD] hover:text-[#C96342] dark:hover:text-[#E5B2A1] hover:bg-[#F0EEE6]/20 dark:hover:bg-[#3b3d3e]/20'
                    }`}
                  >
                    {exp.company}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Sidebar Navigation */}
          <div className="hidden lg:block flex-shrink-0">
            <div className="w-48 border-l-2 border-[#C96342] dark:border-[#E5B2A1]">
              {experiences.map((exp, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left px-4 py-3 font-mono text-sm transition-all duration-200 border-l-2 -ml-0.5 ${
                    index === activeIndex
                      ? 'bg-[#F0EEE6] text-[#C96342] dark:bg-[#3b3d3e] dark:text-[#E5B2A1] border-[#C96342] dark:border-[#E5B2A1]'
                      : 'text-gray-500 dark:text-[#A9ABAD] hover:bg-[#F0EEE6]/60 dark:hover:bg-[#4c4e50]/60 hover:text-[#C96342] dark:hover:text-[#E5B2A1] border-transparent'
                  }`}
                >
                  <div className="truncate pr-2" title={exp.company}>
                    {exp.company}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            <motion.div
              key={activeIndex}
              className="p-6 sm:p-8 lg:pt-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Position and Company */}
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#C96342] dark:text-[#F5F4ED] mb-2 leading-tight">
                  {experiences[activeIndex].position}
                </h3>
                <div className="text-base sm:text-lg text-[#C96342] dark:text-[#E5B2A1] font-medium">
                  @ {experiences[activeIndex].company}
                </div>
              </div>

              {/* Date and Location */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6 text-sm text-gray-600 dark:text-[#A9ABAD]">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{experiences[activeIndex].period}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{experiences[activeIndex].location}</span>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="mb-6">
                <ul className="space-y-3 text-sm sm:text-base leading-relaxed text-[#3D3D3A] dark:text-[#F5F4ED]">
                  {experiences[activeIndex].responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#C96342] dark:text-[#E5B2A1] mr-3 mt-0.5 flex-shrink-0">▹</span>
                      <span className="flex-1">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              {experiences[activeIndex].skills && (
                <div className="pt-4">
                  <h4 className="text-sm font-medium text-gray-600 dark:text-[#A9ABAD] mb-3">
                    Technologies & Skills:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experiences[activeIndex].skills.map((skill, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-[#F0EEE6] dark:bg-[#3b3d3e] text-[#C96342] dark:text-[#F5F4ED] rounded-full border border-[#d9d9d9] dark:border-[#757779] hover:bg-gray-200 dark:hover:bg-[#4c4e50] transition-colors duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default Experience;