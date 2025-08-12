import React, { useEffect, useState } from 'react';
import { Github, Linkedin } from 'lucide-react';

const Home = () => {
  // Typewriter effect for subtitle only
  const [subtitle, setSubtitle] = useState('');
  const [showHello, setShowHello] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const subtitleFullText = 'Data Scientist & Software Developer';

  useEffect(() => {
    setTimeout(() => setShowHello(true), 300);
    setTimeout(() => setShowName(true), 800);
    setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setSubtitle(subtitleFullText.slice(0, i));
        i++;
        if (i > subtitleFullText.length) clearInterval(interval);
      }, 75);
    }, 1300);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center pt-20 pb-8">
      
      <style>{`
        .gradient-text {
          background: linear-gradient(45deg, #C96342, #E5B2A1, #C96342, #E5B2A1);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease-in-out infinite;
        }
        
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Left: Text Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
            <div className="mb-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-space-grotesk-bold font-bold leading-tight">
                <div className={`mb-2 transform transition-all duration-700 ease-out gradient-text ${
                  showHello ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  Hello! 👋 
                </div>
                <div className={`transform transition-all duration-700 ease-out gradient-text ${
                  showName ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  I'm Shuzhu Chen
                </div>
              </h1>
            </div>
            
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-outfit-semibold mb-6 text-[#3D3D3A] dark:text-[#F5F4ED] min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem]">
              {subtitle}
              <span className="inline-block w-2 h-5 sm:h-6 md:h-7 align-middle bg-[#3D3D3A] dark:bg-[#F5F4ED] animate-pulse ml-1" style={{ opacity: subtitle.length < subtitleFullText.length ? 1 : 0 }}></span>
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-outfit-semibold text-[#3D3D3A] dark:text-[#F0EEE6] mb-8 leading-relaxed max-w-xl">
              Love building great web experiences and developing AI apps, especially love building with amazing people.
            </p>
            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-4">
              <a href="https://github.com/shuzhuchen" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 rounded-full bg-[#F0EEE6] hover:bg-[#E5B2A1] dark:bg-[#3D3D3A] dark:hover:bg-[#C96342] transition-colors shadow-md hover:shadow-lg">
                <Github className="w-5 h-5 sm:w-6 sm:h-6 text-[#3D3D3A] dark:text-[#F5F4ED]" />
              </a>
              <a href="https://www.linkedin.com/in/shuzhu-chen-9419b6228/" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 rounded-full bg-[#F0EEE6] hover:bg-[#E5B2A1] dark:bg-[#3D3D3A] dark:hover:bg-[#C96342] transition-colors shadow-md hover:shadow-lg">
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-[#3D3D3A] dark:text-[#F5F4ED]" />
              </a>
            </div>
          </div>
          
          {/* Right: Profile Image */}
          <div className="flex-shrink-0 flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div
              className="relative w-48 sm:w-56 md:w-64 lg:w-72 aspect-[3/4] shadow-xl"
              onMouseEnter={() => setShowPhoto(true)}
              onMouseLeave={() => setShowPhoto(false)}
            >
              {/* default picture */}
              <img
                src={'/pixel-picture.png'}
                alt="Shuzhu Chen (pixel)"
                className="absolute inset-0 w-full h-full object-cover rounded-lg border border-[#e5e3de]"
                style={{ opacity: showPhoto ? 0 : 1, transition: 'opacity 200ms ease' }}
              />
              {/* hover picture */}
              <img
                src={'/picture.png'}
                alt="Shuzhu Chen"
                className="absolute inset-0 w-full h-full object-cover rounded-lg border border-[#e5e3de]"
                style={{ opacity: showPhoto ? 1 : 0, transition: 'opacity 200ms ease' }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="w-full flex justify-center mt-8 mb-4">
        <a
          href="#about"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#F0EEE6] hover:bg-[#E5B2A1] dark:bg-[#3D3D3A] dark:hover:bg-[#C96342] transition-all duration-300 shadow-lg hover:shadow-xl animate-bounce border-2 border-[#3D3D3A] dark:border-[#F5F4ED] hover:scale-110"
          aria-label="Scroll to About Me"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#3D3D3A] dark:text-[#F5F4ED]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Home;