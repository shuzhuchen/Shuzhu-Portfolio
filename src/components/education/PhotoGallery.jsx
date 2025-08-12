import React, { useState, useEffect, useRef } from 'react';
import Img1 from '../../assets/education1.jpg';
import Img2 from '../../assets/education2.png';
import Img3 from '../../assets/education3.jpg';
import Img4 from '../../assets/education4.png';
import Img5 from '../../assets/education5.jpg';

const PhotoGallery = () => {
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

  const educationCards = [
    {
      image: Img1,
      title: "Start with Economics",
      description: "My journey began with Mathematical Economics, where I built my analytical mindset and foundation for my whole career.",
    },
    {
      image: Img2,
      title: "First Steps",
      description: "My first step into the real working world, learning to turn ideas into impact.",
    },
    {
      image: Img5,
      title: "Milestone",
      description: "A new chapter built on growth, perseverance, and endless learning.",
    },
    {
      image: Img3,
      title: "City of Possibilities",
      description: "Shanghai opened my eyes and inspired my ambitions, setting the stage for my future in tech.",
    },
    {
      image: Img4,
      title: "Reaching Higher",
      description: "I always believe in chasing new heights, on trails, in life, and in everything I do.",
    },
  ];

  return (
    <div className="relative mx-auto mb-24" style={{ width: '100%', maxWidth: '720px', aspectRatio: '1/1' }} ref={educationSectionRef}>
      <div className="relative inset-0 grid grid-cols-3 grid-rows-3 gap-4 p-4">
        {/* Top Left (2:1) */}
        <div className="col-span-2 row-span-1 aspect-[2/1]">
          {educationCards[0] && (
            <div
              className={`group cursor-pointer transform transition-all duration-1000 ease-out h-full w-full
                         ${educationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}
              style={{
                transitionDelay: educationVisible ? `0ms` : '0ms'
              }}
            >
              <div className="relative h-full w-full overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] group-hover:scale-[1.02] group-hover:-rotate-1">
                <img
                  src={educationCards[0].image}
                  alt={educationCards[0].title}
                  className="block w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="text-2xl font-bold mb-4 font-serif tracking-tight">{educationCards[0].title}</h4>
                    <p className="text-sm leading-relaxed opacity-95 font-light">
                      {educationCards[0].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Top Right (1:2) */}
        <div className="col-span-1 row-span-2 aspect-[1/2.1]">
          {educationCards[1] && (
            <div
              className={`group cursor-pointer transform transition-all duration-1000 ease-out h-full w-full
                         ${educationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}
              style={{
                transitionDelay: educationVisible ? `200ms` : '0ms'
              }}
            >
              <div className="relative h-full w-full overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] group-hover:scale-[1.02] group-hover:-rotate-1">
                <img
                  src={educationCards[1].image}
                  alt={educationCards[1].title}
                  className="block w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="text-2xl font-bold mb-4 font-serif tracking-tight">{educationCards[1].title}</h4>
                    <p className="text-sm leading-relaxed opacity-95 font-light">
                      {educationCards[1].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Center (1:1) */}
        <div className="col-start-2 row-start-2 aspect-square">
          {educationCards[2] && (
            <div
              className={`group cursor-pointer transform transition-all duration-1000 ease-out h-full w-full
                         ${educationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}
              style={{
                transitionDelay: educationVisible ? `400ms` : '0ms'
              }}
            >
              <div className="relative h-full w-full overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] group-hover:scale-[1.02] group-hover:-rotate-1">
                <img
                  src={educationCards[2].image}
                  alt={educationCards[2].title}
                  className="block w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="text-2xl font-bold mb-4 font-serif tracking-tight">{educationCards[2].title}</h4>
                    <p className="text-sm leading-relaxed opacity-95 font-light">
                      {educationCards[2].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Left (was Bottom Right, now swapped) */}
        <div className="col-start-1 row-start-1 row-span-2 aspect-[1/2.1]">
          {educationCards[4] && (
            <div
              className={`group cursor-pointer transform transition-all duration-1000 ease-out h-full w-full
                         ${educationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}
              style={{
                transitionDelay: educationVisible ? `600ms` : '0ms'
              }}
            >
              <div className="relative h-full w-full overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] group-hover:scale-[1.02] group-hover:-rotate-1">
                <img
                  src={educationCards[4].image}
                  alt={educationCards[4].title}
                  className="block w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="text-2xl font-bold mb-4 font-serif tracking-tight">{educationCards[4].title}</h4>
                    <p className="text-sm leading-relaxed opacity-95 font-light">
                      {educationCards[4].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Right (was Bottom Left, now swapped) */}
        <div className="col-span-2 row-start-3 aspect-[2.1/1]">
          {educationCards[3] && (
            <div
              className={`group cursor-pointer transform transition-all duration-1000 ease-out h-full w-full
                         ${educationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}
              style={{
                transitionDelay: educationVisible ? `800ms` : '0ms'
              }}
            >
              <div className="relative h-full w-full overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] group-hover:scale-[1.02] group-hover:-rotate-1">
                <img
                  src={educationCards[3].image}
                  alt={educationCards[3].title}
                  className="block w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="text-2xl font-bold mb-4 font-serif tracking-tight">{educationCards[3].title}</h4>
                    <p className="text-sm leading-relaxed opacity-95 font-light">
                      {educationCards[3].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;