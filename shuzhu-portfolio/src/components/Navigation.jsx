import React, { useEffect, useState } from 'react';
import { Moon, Sun, Menu, X} from 'lucide-react';
import resumePDF from '../assets/pdf/resume.pdf';

const Navigation = ({ isDark, setIsDark, activeSection, scrollToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F4ED]/50 dark:bg-[#3D3D3A]/50 shadow-lg backdrop-blur-md transition-all duration-300">      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => scrollToSection('home')}
          >
            <img src="/logo.png" alt="Shuzhu logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-fira-code text-[#3D3D3A] dark:text-[#F5F4ED] transition-all hover:underline hover:underline-offset-4 hover:-translate-y-0.5 duration-200">
              Shuzhu
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-6">
              {['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium font-fira-code transition-colors text-[#3D3D3A] dark:text-[#F5F4ED] hover:text-[#C96342] dark:hover:text-[#C96342] ${
                    activeSection === item.toLowerCase() ? 'font-bold underline underline-offset-4' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
              <a
                href={resumePDF}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium font-fira-code transition-colors text-[#3D3D3A] dark:text-[#F5F4ED] hover:text-[#C96342] dark:hover:text-[#C96342]"
              >
                Resume
              </a>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full bg-[#F0EEE6] hover:bg-[#E5B2A1] dark:bg-[#3D3D3A] dark:hover:bg-[#C96342] transition-colors text-[#3D3D3A] dark:text-[#F5F4ED] shadow-md flex items-center justify-center"
              >
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <Menu
                    className={`absolute w-5 h-5 transform transition-all duration-300 ${
                      isMobileMenuOpen ? 'rotate-180 opacity-0 scale-75' : 'rotate-0 opacity-100 scale-100'
                    }`}
                  />
                  <X
                    className={`absolute w-5 h-5 transform transition-all duration-300 ${
                      isMobileMenuOpen ? 'rotate-0 opacity-100 scale-100' : 'rotate-180 opacity-0 scale-75'
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full bg-[#F0EEE6] hover:bg-[#E5B2A1] dark:bg-[#3D3D3A] dark:hover:bg-[#C96342] transition-colors shadow-md"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-[#3D3D3A] dark:text-[#F5F4ED]" />
              ) : (
                <Moon className="w-5 h-5 text-[#3D3D3A] dark:text-[#F5F4ED]" />
              )}
            </button>
          </div>
        </div>
        <div
          className={`md:hidden fixed top-16 right-0 w-3/4 max-w-xs h-screen bg-[#F0EEE6]/95 dark:bg-[#3D3D3A]/95 shadow-lg z-40 px-6 py-8 flex flex-col justify-start transition-transform duration-500 ease-in-out transform ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="space-y-6">
            {['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  scrollToSection(item.toLowerCase());
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-center py-3 text-base font-medium font-fira-code transition-colors text-[#3D3D3A] dark:text-[#F5F4ED] hover:text-[#C96342] dark:hover:text-[#C96342] ${
                  activeSection === item.toLowerCase() ? 'font-bold underline underline-offset-4' : ''
                }`}
              >
                {item}
              </button>
            ))}
            <a
              href={resumePDF}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 text-base font-medium font-fira-code text-[#3D3D3A] dark:text-[#F5F4ED] hover:text-[#C96342] dark:hover:text-[#C96342] transition-colors"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;