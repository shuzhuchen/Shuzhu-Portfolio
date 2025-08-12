import React, { useState, useEffect } from 'react';

const About = () => {
  // Assuming images are used elsewhere or just for context, keeping this line.
  const images = import.meta.glob('../assets/photo*.jpg', { eager: true, import: 'default' });
  const imageList = Object.values(images); // This variable is not used in the return, but kept for consistency.

  const lines = [
    "# Welcome! Thanks for taking the time to check out my portfolio.",
    "## About Me",
    "* My name is Shuzhu Chen. You can call me Shuzhu or Suzy. I recently graduated in May with",
    "* an M.S. in Engineering with Data Science Specialization from San Jose State University.",
    "* I'm currently working as an AI/ML Data Scientist at Kismet.xyz.",
    "## Career Focus",
    "* I love building data-driven products, including data pipelines, experimentation, and",
    "* deploying machine learning models in production. Recently focused on LLM applications,",
    "* agentic AI, and machine learning models.",
    "## Current Interests",
    "* When I'm not coding, you'll probably find me...",
    "* On the #badminton/tennis/pickleball court",
    "* Or out #hiking #filmPhotography #liveMusic #museumHopping",
    "* Or #caringForTheWorld #exploringNewIdeas",
    "## Always looking to connect with fellow tech/non-tech enthusiasts!"
  ];
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (!startTyping) return;
    if (currentLineIndex < lines.length) {
      const currentLine = lines[currentLineIndex];
      
      if (currentCharIndex < currentLine.length) {
        const timer = setTimeout(() => {
          setDisplayedLines(prev => {
            const newLines = [...prev];
            if (newLines.length <= currentLineIndex) {
              newLines.push('');
            }
            newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
            return newLines;
          });
          setCurrentCharIndex(prev => prev + 1);
        }, 10); 

        return () => clearTimeout(timer);
      } else {
        // Current line completed, move to the next line
        const timer = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 200); // Delay between lines

        return () => clearTimeout(timer);
      }
    }
  }, [currentLineIndex, currentCharIndex, lines, startTyping]);

  // --- START: MODIFIED getLineColor FOR MD FILE SIMULATION ---
  const getLineColor = (line, index) => {
    // Simulate real .md file syntax highlighting
    if (line.startsWith('# ')) { // H1 - Main title
      return 'text-blue-600 dark:text-blue-400 font-semibold'; 
    }
    if (line.startsWith('## ')) { // H2 - Section headers
      return 'text-blue-600 dark:text-blue-400 font-semibold'; 
    }
    if (line.startsWith('* ') || line.startsWith('- ')) { // List items
      return 'text-gray-800 dark:text-gray-200'; 
    }
    if (line.trim() === '---') { // Horizontal rule
      return 'text-purple-500 dark:text-purple-400 font-bold'; 
    }
    // For regular text
    return 'text-gray-800 dark:text-gray-200'; // Consistent text color
  };
  // --- END: MODIFIED getLineColor ---

  return (
    <section id="about" className="mt-10 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F4ED] dark:bg-[#3D3D3A] text-[#3D3D3A] dark:text-[#F5F4ED]">
      <div className="max-w-4xl mx-auto">
        {/* Claude UI inspired animated title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 sm:mb-12 text-center tracking-wider relative overflow-visible pt-4 pb-6">
          <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]">A</span>
          <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.1s'}}>b</span>
          <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.2s'}}>o</span>
          <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.3s'}}>u</span>
          <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.4s'}}>t</span>
          <span className="inline-block mx-2 sm:mx-3"></span>
          <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.5s'}}>M</span>
          <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.6s'}}>e</span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 h-1 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-300 rounded-full animate-pulse shadow-md"></span>
        </h2>

        {/* Enhanced Mac-style terminal container */}
        <div className="bg-[#ffffff] dark:bg-[#1e1f1e] border border-[#d9d9d9] dark:border-[#757779] shadow-2xl rounded-xl overflow-hidden">
          {/* Enhanced Mac terminal header */}
          <div className="bg-[#e8eaeb] dark:bg-[#3b3d3e] px-6 py-2 border-b border-[#d9d9d9] dark:border-[#757779] flex items-center gap-3">
            {/* Mac window controls */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm hover:bg-red-600 transition-colors cursor-pointer"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm hover:bg-yellow-600 transition-colors cursor-pointer"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm hover:bg-green-600 transition-colors cursor-pointer"></div>
            </div>
            
            {/* File name and path */}
            <div className="flex items-center ml-4 text-sm text-[#1e1f1e] dark:text-[#ffffff] font-mono">

              <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              about_me.md
            </div>
          </div>

          {/* Enhanced terminal content */}
          <div className="p-4 font-mono text-sm leading-snug min-h-[320px] bg-[#ffffff] dark:bg-[#1e1f1e]">
            {displayedLines.map((line, index) => (
              <div key={index} className="flex items-start mb-1 group hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded px-2 py-1 -mx-2 transition-colors">
                <span className="text-gray-500 dark:text-gray-400 mr-4 select-none min-w-[2rem] text-right text-xs font-medium">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={`${getLineColor(line, index)} whitespace-pre-wrap flex-1`}>
                  {line}
                  {/* Enhanced cursor with better visibility */}
                  {index === currentLineIndex && currentCharIndex <= lines[currentLineIndex]?.length && (
                    <span className="animate-pulse bg-amber-500 dark:bg-amber-400 inline-block w-2 h-5 ml-1 rounded-sm shadow-sm"></span>
                  )}
                </span>
              </div>
            ))}
            
            {/* Terminal bottom spacing */}
            <div className="h-8"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default () => (
  <>
    <About />
    {/* <FilmStripWrapper /> */}
  </>
);



// const FilmStripWrapper = () => {
//   const images = import.meta.glob('../assets/photo*.jpg', { eager: true, import: 'default' });
//   const imageList = Object.values(images);

//   return (
//     <section id="about" className="py-20 px-4 dark:bg-gray-900">
//       <div className="relative bg-amber-900/80 py-8 mt-20 mb-32">
//         <div className="absolute top-0 left-0 right-0">
//           <div className="flex justify-between px-6 mb-4">
//             {Array.from({ length: 30 }).map((_, i) => (
//               <div key={`top-dot-${i}`} className="mt-8 w-3 h-2 bg-amber-300 dark:bg-amber-200 rounded-sm opacity-60" />
//             ))}
//           </div>
//         </div>

//         <div className="max-w-none overflow-hidden px-6 ">
//           <div>
//             <div className="animate-slide flex gap-4 w-max py-4">
//               {[...imageList, ...imageList].map((src, i) => (
//                 <img
//                   key={i}
//                   src={src}
//                   alt={`Shuzhu photography ${i + 1}`}
//                   className="mt-6 h-40 w-auto object-cover rounded shadow-md border-2 border-amber-600/20 dark:border-orange-600 dark:shadow-yellow-600 opacity-90"
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="bottom-0 left-0 right-0 ">
//           <div className="flex justify-between px-6 mt-4">
//             {Array.from({ length: 30 }).map((_, i) => (
//               <div key={`bottom-dot-${i}`} className="w-3 h-2 bg-amber-300 dark:bg-amber-200 rounded-sm opacity-60" />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };