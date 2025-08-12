import React from 'react';
import { skills } from '../assets/data';
import backendGifDark from '../assets/icons_white/backend.gif';
import backendGifLight from '../assets/icons_dark/backend.gif';
import bigdataGifDark from '../assets/icons_white/bigdata.gif';
import bigdataGifLight from '../assets/icons_dark/bigdata.gif';
import cloudGifDark from '../assets/icons_white/cloud.gif';
import cloudGifLight from '../assets/icons_dark/cloud.gif';
import databaseGifDark from '../assets/icons_white/database.gif';
import databaseGifLight from '../assets/icons_dark/database.gif';
import dsmlGifDark from '../assets/icons_white/dsml.gif';
import dsmlGifLight from '../assets/icons_dark/dsml.gif';
import frontendGifDark from '../assets/icons_white/frontend.gif';
import frontendGifLight from '../assets/icons_dark/frontend.gif';
import projectGifDark from '../assets/icons_white/project.gif';
import projectGifLight from '../assets/icons_dark/project.gif';
import programmerGifDark from '../assets/icons_white/programmer.gif';
import programmerGifLight from '../assets/icons_dark/programmer.gif';

// Helper function to map category to GIF icon based on theme
const gifIcons = (isDark) => ({
  'Backend': isDark ? backendGifDark : backendGifLight,
  'Big Data': isDark ? bigdataGifDark : bigdataGifLight,
  'Cloud & DevOps': isDark ? cloudGifDark : cloudGifLight,
  'Databases': isDark ? databaseGifDark : databaseGifLight,
  'Data Science & Machine Learning': isDark ? dsmlGifDark : dsmlGifLight,
  'Frontend': isDark ? frontendGifDark : frontendGifLight,
  'Project Management': isDark ? projectGifDark : projectGifLight,
  'Programming Languages': isDark ? programmerGifDark : programmerGifLight,
});

const Skills = ({ isDark }) => {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="relative mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 sm:mb-12 text-center font-cursive tracking-[0.15em] relative overflow-visible pt-4 pb-6">
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]">S</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.1s'}}>k</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.2s'}}>i</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.3s'}}>l</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.4s'}}>l</span>
            <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.5s'}}>s</span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 h-1 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-300 rounded-full animate-pulse shadow-md"></span>
          </h2>
          <p className="text-center text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            The tools I have used to create innovative solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 items-stretch">
          {Object.entries(skills).map(([category, skillList]) => {
            const icons = gifIcons(isDark);
            const iconSrc = icons[category];
            return (
              <div
                key={category}
                className="flex items-center p-4 rounded-xl shadow-sm border border-gray-200 dark:border-[#757779] transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 h-full"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-white dark:bg-[#545454] rounded-lg flex items-center justify-center mr-4">
                  <img src={iconSrc} alt={`${category} Icon`} className="w-12 h-12 object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">{category}</h3>
                  <p className="text-gray-600 dark:text-gray-400 font-light text-xs leading-relaxed" style={{ fontFamily: "'Fira Code', monospace" }}>
                    {skillList.join(', ')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;