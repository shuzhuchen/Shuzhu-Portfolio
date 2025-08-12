import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, Plus } from 'lucide-react';
import { education, courses } from '../../assets/data.js';

const AcademicTimeline = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [educationVisible, setEducationVisible] = useState(false);
  const educationSectionRef = useRef(null);

  useEffect(() => {
    const eduObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setEducationVisible(true);
            eduObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (educationSectionRef.current) {
      eduObserver.observe(educationSectionRef.current);
    }

    return () => {
      if (educationSectionRef.current) {
        eduObserver.unobserve(educationSectionRef.current);
      }
    };
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="mb-20 max-w-4xl mx-auto" ref={educationSectionRef}>
      <h3 className="text-3xl font-semibold mb-16 text-center text-gray-800 dark:text-gray-100 font-serif">
        Academic Timeline & Courses
      </h3>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div
            key={index}
            className={`border border-gray-200 dark:border-[#333] rounded-xl shadow-sm transform transition-all duration-700 ease-out cursor-pointer overflow-hidden bg-white dark:bg-[#1e1f1e]
                       ${educationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
            onClick={() => toggleExpand(index)}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-8 transition-colors duration-300">
              <div className="flex items-center space-x-4">
                {edu.icon && (
                  <div className="w-14 h-14 rounded-full bg-white shadow-sm overflow-hidden flex-shrink-0">
                    <img 
                      src={edu.icon} 
                      alt={`${edu.school} logo`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}

                <div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    {edu.school}
                  </h4>
                  {edu.degree && (
                    <p className="text-base text-gray-600 dark:text-gray-300 mt-1 font-medium">
                      {edu.degree}
                    </p>
                  )}
                </div>
              </div>

              <div
                className="w-[clamp(40px,5vw,48px)] h-[clamp(40px,5vw,48px)] aspect-square flex items-center justify-center rounded-full bg-gradient-to-r from-gray-400 to-gray-600 dark:from-[#444] dark:to-[#666] text-white shadow-lg transition-all duration-500 ease-in-out hover:scale-110 shrink-0"
                style={{
                  transform: expandedIndex === index ? 'rotate(45deg)' : 'rotate(0deg)'
                }}
              >
                <Plus className="w-[clamp(16px,2vw,20px)] h-[clamp(16px,2vw,20px)]" />
              </div>
            </div>

            {/* Collapsible Content with smoother animation */}
            <div
              className="transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] bg-white dark:bg-[#1e1f1e]"
              style={{
                maxHeight: expandedIndex === index ? '800px' : '0px',
                opacity: expandedIndex === index ? 1 : 0,
                overflow: 'hidden',
                transform: expandedIndex === index ? 'translateY(0)' : 'translateY(-20px)'
              }}
            >
              <div className="px-8 pb-8 pt-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
                  {edu.major && (
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-800 dark:text-gray-100">Major:</span>
                      <span className="text-gray-600 dark:text-gray-300">{edu.major}</span>
                    </div>
                  )}

                  {edu.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      <span className="text-gray-600 dark:text-gray-300">{edu.location}</span>
                    </div>
                  )}                  
                  
                  {edu.advisor && (
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-800 dark:text-gray-100">Advisor:</span>
                      {edu.advisorLink ? (
                        <a
                          href={edu.advisorLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-300 underline decoration-gray-400/60 hover:text-[#C96342] dark:hover:text-[#E5B2A1] transition-colors"
                        >
                          {edu.advisor}
                        </a>
                      ) : (
                        <span className="text-gray-600 dark:text-gray-300">{edu.advisor}</span>
                      )}
                    </div>
                  )}

                  {edu.period && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      <span className="text-gray-600 dark:text-gray-300">{edu.period}</span>
                    </div>
                  )}

                  {edu.gpa && (
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-800 dark:text-gray-100">GPA:</span>
                      <span className="text-gray-600 dark:text-gray-300">{edu.gpa}</span>
                    </div>
                  )}

                </div>

                {edu.description && (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                    {edu.description}
                  </p>
                )}

                {(courses[edu.key || (edu.degree && edu.degree.toLowerCase().includes('graduate') ? 'graduate' : 'undergraduate')] || []).length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-100 text-lg">Key Courses:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(courses[edu.key || (edu.degree && edu.degree.toLowerCase().includes('graduate') ? 'graduate' : 'undergraduate')] || []).map((course, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 dark:from-[#444] dark:to-[#666] mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {edu.involvement && (
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-100 text-lg">Involvement:</h4>
                    {Array.isArray(edu.involvement) ? (
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                        {edu.involvement.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">{edu.involvement}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicTimeline;