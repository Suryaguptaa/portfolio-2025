"use client";
import Navbar from '@/components/Navbar';
import { useRef, useState, useEffect } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

// --- DATA ---
const horizontalProjects = [
  { id: 1, title: "Nike Commercial", tools: ["Premiere"], video: "/showreel.mp4" },
  { id: 2, title: "Cyberpunk City", tools: ["Blender"], video: "/showreel.mp4" },
  { id: 3, title: "Music Video", tools: ["DaVinci"], video: "/showreel.mp4" },
  { id: 4, title: "Car Commercial", tools: ["After Effects"], video: "/showreel.mp4" },
  { id: 5, title: "Travel Vlog", tools: ["Premiere"], video: "/showreel.mp4" },
];

const verticalProjects = [
  { id: 6, title: "Tylor The Creator", tools: ["After Effects"], video: "/TylorthecreatorComp.mp4" },
  { id: 7, title: "Peso Pluma", tools: ["After Effects"], video: "/PesoplumaComp.mp4" },
  { id: 8, title: "Casey", tools: ["After Effects"], video: "/CaseyComp.mp4" },
  { id: 9, title: "Gym Edit", tools: ["CapCut"], video: "/showreel.mp4" },
  { id: 10, title: "Lifestyle", tools: ["Premiere"], video: "/showreel.mp4" },
];

/* --- COMPONENT: VIDEO CARD --- */
function ProjectCard({ proj, type }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobileActive, setIsMobileActive] = useState(false);

  // Desktop Hover Logic
  const handleMouseEnter = () => {
    if(window.innerWidth > 768 && videoRef.current) {
      videoRef.current.play();
      videoRef.current.style.opacity = 1;
      videoRef.current.style.filter = "grayscale(0%)";
    }
  };

  const handleMouseLeave = () => {
    if(window.innerWidth > 768 && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.style.opacity = 0.7;
      videoRef.current.style.filter = "grayscale(100%)";
      setIsMuted(true);
      videoRef.current.muted = true;
    }
  };

  // Mobile Tap Logic
  const handleMobileClick = () => {
    if(window.innerWidth < 768 && videoRef.current) {
      if(videoRef.current.paused) {
        videoRef.current.play();
        setIsMobileActive(true);
      } else {
        videoRef.current.pause();
        setIsMobileActive(false);
      }
    }
  }

  const toggleSound = (e) => {
    e.stopPropagation();
    if(videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      if(window.innerWidth < 768 && videoRef.current.paused) {
          videoRef.current.play();
          setIsMobileActive(true);
      }
    }
  };

  const cardClass = type === "vertical"
    ? "aspect-[9/16] w-[65vw] md:w-[35vh]"
    : "aspect-video w-full md:w-[70vh] mb-8 md:mb-0";

  const mobileVisualClass = isMobileActive ? "opacity-100 grayscale-0" : "opacity-70 grayscale";

  return (
    <div
      className={`group cursor-pointer flex-shrink-0 relative snap-center ${cardClass} bg-neutral-900 border border-white/10 overflow-hidden rounded-lg md:rounded-2x1`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMobileClick}
    >
         <video
            ref={videoRef}
            src={proj.video}
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            className={`w-full h-full object-cover transition-all duration-500
                       ${mobileVisualClass}
                       md:opacity-70 md:grayscale md:group-hover:opacity-100 md:group-hover:grayscale-0`}
         />

         {/* Sound Button */}
         <button
            onClick={toggleSound}
            className={`absolute bottom-4 right-4 z-30 p-2 rounded-full
                       bg-black/50 backdrop-blur-md border border-white/20 text-white transition-opacity duration-300
                       ${isMobileActive ? 'opacity-100' : 'opacity-100 md:opacity-0'}
                       md:group-hover:opacity-100`}
         >
            {isMuted ? <FaVolumeMute size={12} /> : <FaVolumeUp size={12} />}
         </button>

         {/* Title & Text */}
         <div className={`absolute inset-0 flex flex-col justify-end p-4 md:p-6 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300 pointer-events-none
                         ${isMobileActive ? 'opacity-100' : 'opacity-100 md:opacity-0'}
                         md:group-hover:opacity-100`}>
            <h3 className="font-display text-xl md:text-2xl uppercase text-white drop-shadow-md leading-none">{proj.title}</h3>
            <p className="font-sans text-[10px] md:text-xs text-gray-300 uppercase tracking-widest mt-2">{proj.tools.join(" / ")}</p>
         </div>
    </div>
  );
}

/* --- MAIN PAGE --- */
export default function VideoPage() {
  const [activeMode, setActiveMode] = useState('social');

  const scrollRef = useRef(0);
  const x = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleWheel = (e) => {
      if (window.innerWidth < 768) return;

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
         scrollRef.current -= e.deltaY;
      } else {
         scrollRef.current -= e.deltaX;
      }

      if (scrollRef.current > 0) scrollRef.current = 0;
      const maxScroll = -2500;
      if (scrollRef.current < maxScroll) scrollRef.current = maxScroll;

      x.set(scrollRef.current);
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeMode]);

  const switchMode = (mode) => {
    if (activeMode === mode) return;
    setActiveMode(mode);
    scrollRef.current = 0;
    x.set(0);
  };

  return (
    <main className="bg-background h-screen w-screen overflow-hidden text-paper selection:bg-accent selection:text-black flex flex-col">
      <Navbar />

      <section className="pt-48 md:pt-32 px-6 md:px-8 bg-background z-20 flex flex-col items-start border-b border-white/5 pb-6 flex-shrink-0">

        <h1 className="font-display text-xs md:text-sm text-gray-500 uppercase tracking-[0.3em] mb-4 md:mb-6">
          Motion Library
        </h1>

        <div className="flex items-baseline gap-6 md:gap-12">
          <button
            onClick={() => switchMode('social')}
            className={`font-display uppercase transition-all duration-300 leading-none
              ${activeMode === 'social'
                ? "text-4xl md:text-7xl text-accent"
                : "text-4xl md:text-7xl text-white/30 hover:text-white"
              }
            `}
          >
            Socials
          </button>

          <button
            onClick={() => switchMode('cinematic')}
            className={`font-display uppercase transition-all duration-300 leading-none
              ${activeMode === 'cinematic'
                ? "text-4xl md:text-7xl text-accent"
                : "text-4xl md:text-7xl text-white/30 hover:text-white"
              }
            `}
          >
            Cinematic
          </button>
        </div>

        {/* --- NEW MOBILE GUIDE TEXT --- */}
        <p className="md:hidden text-[10px] text-gray-500 uppercase tracking-widest mt-4 animate-pulse">
          Tap video to preview
        </p>

      </section>

      <div className="flex-grow relative flex flex-col md:flex-row items-start md:items-center overflow-hidden bg-black/20">

        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`w-full h-full
              ${activeMode === 'cinematic' ? 'overflow-y-auto md:overflow-hidden' : 'absolute left-0 flex items-center'}
            `}
          >

            <div
              className={`
                px-6 py-8
                ${activeMode === 'cinematic'
                   ? "flex flex-col pb-32"
                   : "flex gap-6 items-center h-full w-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
                 }
                md:absolute md:left-0 md:pl-[5vw] md:flex-row md:gap-8 md:items-center md:h-full md:overflow-visible md:py-0
              `}
            >
              <motion.div
                className={`contents md:flex md:gap-8 md:items-center`}
                style={{ x: typeof window !== 'undefined' && window.innerWidth > 768 ? x : 0 }}
              >
                {activeMode === 'cinematic'
                  ? horizontalProjects.map((proj) => <ProjectCard key={proj.id} proj={proj} type="horizontal" />)
                  : verticalProjects.map((proj) => <ProjectCard key={proj.id} proj={proj} type="vertical" />)
                }
                <div className="hidden md:block w-[20vw] flex-shrink-0"></div>
              </motion.div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>

      <div className="hidden md:block absolute bottom-8 right-8 text-xs uppercase tracking-widest text-gray-600">
        Scroll to Pan ↔
      </div>

    </main>
  );
}