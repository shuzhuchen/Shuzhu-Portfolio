import React, { useState, useEffect } from 'react';
import './App.css';

// Components
import Navigation from './components/Navigation';
import ChatWidget from './components/ChatWidget';
import SpotlightCursor from './components/SpotlightCursor';

// Sections
import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Contact from './sections/Contact';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle URL changes
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.slice(1); 
      const validSections = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      
      if (path === '' || path === '/') {
        setActiveSection('home');
        scrollToSection('home');
      } else if (validSections.includes(path)) {
        setActiveSection(path);
        scrollToSection(path);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    handlePopState();

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (activeSection !== section) {
              setActiveSection(section);
              window.history.pushState(null, '', `/${section}`);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Effect to apply dark mode class to body or HTML root
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      // 更新URL
      window.history.pushState(null, '', `/${sectionId}`);
    }
  };

  return (
    <div>
      <Navigation
        isDark={isDark}
        setIsDark={setIsDark}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <SpotlightCursor isDark={isDark} />
      <div className="h-auto bg-[#F5F4ED] text-[#3D3D3A] dark:bg-[#3D3D3A] dark:text-[#F5F4ED] font-body animate-default">
        <div className="w-full">
          <div id="app-content" className="pt-16">
            {/* Pass the isDark prop to all relevant sections */}
            <Home isDark={isDark} />
            <About isDark={isDark} />
            <Skills isDark={isDark} />
            <Experience isDark={isDark} />
            <Projects isDark={isDark} />
            <Education isDark={isDark} />
            <Contact isDark={isDark} />
          </div>
        </div>
      </div>
      {/* <div className="fixed bottom-6 right-6 z-50">
        <ChatWidget />
      </div> */}
    </div>
  );
}

export default App;