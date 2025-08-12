import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { certifications } from '../../assets/data.js';

// 根据窗口宽度计算布局参数
const getLayout = () => {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
  if (w < 640) {
    // 小屏（手机）
    return {
      cardWidth: 260,
      cardHeight: 360,
      containerHeight: 380,
      sideOffset: 180,
      farOffset: 300,
      centerScale: 1,
      sideScale: 0.8,
      farScale: 0.68,
    };
  } else if (w < 1024) {
    // 中屏（平板）
    return {
      cardWidth: 320,
      cardHeight: 420,
      containerHeight: 440,
      sideOffset: 280,
      farOffset: 440,
      centerScale: 1,
      sideScale: 0.85,
      farScale: 0.72,
    };
  }
  // 大屏（桌面）
  return {
    cardWidth: 384,
    cardHeight: 460,
    containerHeight: 500,
    sideOffset: 340,
    farOffset: 520,
    centerScale: 1,
    sideScale: 0.85,
    farScale: 0.72,
  };
};

const Certifications = () => {
  const [certCurrentIndex, setCertCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [certsSectionVisible, setCertsSectionVisible] = useState(false);
  const autoPlayRef = useRef(null);
  const certificationsSectionRef = useRef(null);
  const [layout, setLayout] = useState(getLayout());

  // 监听窗口尺寸变化，更新布局
  useEffect(() => {
    const onResize = () => setLayout(getLayout());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Auto-play functionality for certifications
  useEffect(() => {
    if (isAutoPlaying && certifications.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCertCurrentIndex(prev => (prev + 1) % certifications.length);
      }, 3000);
    }
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [isAutoPlaying]);

  useEffect(() => {
    const certsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCertsSectionVisible(true);
            certsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (certificationsSectionRef.current) {
      certsObserver.observe(certificationsSectionRef.current);
    }

    return () => {
      if (certificationsSectionRef.current) {
        certsObserver.unobserve(certificationsSectionRef.current);
      }
    };
  }, []);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const goToNextCert = () => {
    setCertCurrentIndex((prev) => (prev + 1) % certifications.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 6000);
  };

  const goToPrevCert = () => {
    setCertCurrentIndex((prev) => (prev - 1 + certifications.length) % certifications.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 6000);
  };

  const goToCert = (index) => {
    setCertCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 6000);
  };

  return (
    <div className="mb-20 max-w-5xl mx-auto" ref={certificationsSectionRef}>
      <div className="text-center mb-16">
        <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 font-serif">
          Certifications
        </h3>
      </div>
      
      {certifications.length > 0 && (
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Cards Container */}
          <div className="relative flex items-center justify-center" style={{ height: `${layout.containerHeight}px` }}>
            {certifications.map((cert, index) => {
              const offset = (index - certCurrentIndex + certifications.length) % certifications.length;
              let position, scale, zIndex, opacity, blur;

              if (offset === 0) {
                position = 'translateX(0)';
                scale = layout.centerScale;
                zIndex = 30;
                opacity = 1;
                blur = 'blur(0px)';
              } else if (offset === 1 || offset === certifications.length - 1) {
                const isRight = offset === 1;
                position = `translateX(${isRight ? layout.sideOffset : -layout.sideOffset}px)`;
                scale = layout.sideScale;
                zIndex = 20;
                opacity = 0.6;
                blur = 'blur(1px)';
              } else if (offset === 2 || offset === certifications.length - 2) {
                const isRight = offset === 2;
                position = `translateX(${isRight ? layout.farOffset : -layout.farOffset}px)`;
                scale = layout.farScale;
                zIndex = 10;
                opacity = 0.3;
                blur = 'blur(2px)';
              } else {
                position = 'translateX(0)';
                scale = 0.6;
                zIndex = 0;
                opacity = 0;
                blur = 'blur(4px)';
              }

              return (
                <div
                  key={index}
                  className={`absolute cursor-pointer transition-all duration-[1200ms] ease-[cubic-bezier(0.33,1,0.68,1)] ${certsSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{
                    width: `${layout.cardWidth}px`,
                    transform: `${position} scale(${scale})`,
                    zIndex,
                    opacity: certsSectionVisible ? opacity : 0,
                    filter: blur,
                  }}
                  onClick={() => offset === 0 ? null : goToCert(index)}
                >
                  {/* Card */}
                  <div
                    className="bg-white dark:bg-[#1e1f1e] rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-500 border border-gray-200 dark:border-[#333] hover:border-gray-300 dark:hover:border-gray-400"
                    style={{ height: `${layout.cardHeight}px` }}
                  >
                    <div className="text-center">
                      {cert.icon && (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-6 sm:mb-8 md:mb-10 bg-gray-100 dark:bg-[#1E1E1E] rounded-2xl flex items-center justify-center overflow-hidden shadow-md transition-transform duration-300 hover:scale-110">
                          <img src={cert.icon} alt={`${cert.organization} logo`} className="max-w-full max-h-full object-contain" />
                        </div>
                      )}
                      <h4 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-5 md:mb-6 text-gray-800 dark:text-gray-100 leading-tight font-serif tracking-tight">
                        {cert.name}
                      </h4>
                      <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 font-semibold mb-3 sm:mb-4">
                        {cert.organization}
                      </p>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 md:mb-10 font-light">
                        {cert.date}
                      </p>
                    </div>

                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 bg-gray-800 dark:bg-gray-200 hover:bg-gray-600 dark:hover:bg-white text-white dark:text-gray-800 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center mx-auto inline-block"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Credential
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          {certifications.length > 1 && (
            <>
              <button
                onClick={goToPrevCert}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/30 dark:bg-[#121212]/30 hover:bg-gray-200/30 dark:hover:bg-[#1E1E1E]/30 p-3 rounded-full shadow-lg z-40 transition-all duration-300 transform hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-gray-100" />
              </button>
              <button
                onClick={goToNextCert}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/30 dark:bg-[#121212]/30 hover:bg-gray-200/30 dark:hover:bg-[#1E1E1E]/30 p-3 rounded-full shadow-lg z-40 transition-all duration-300 transform hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-gray-800 dark:text-gray-100" />
              </button>
            </>
          )}

          {/* Dots */}
          {certifications.length > 1 && (
            <div className="flex justify-center items-center gap-3 mt-8">
              {certifications.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToCert(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === certCurrentIndex
                      ? 'bg-gray-600 dark:bg-gray-400 scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Certifications;