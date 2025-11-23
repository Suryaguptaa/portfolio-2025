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
  { id: 6, title: "Fashion Reel", tools: ["After Effects"], video: "/showreel.mp4" },
  { id: 7, title: "TikTok Trend", tools: ["CapCut"], video: "/showreel.mp4" },
  { id: 8, title: "Wide Source", tools: ["Premiere"], video: "/showreel.mp4" },
  { id: 9, title: "Gym Edit", tools: ["CapCut"], video: "/showreel.mp4" },
  { id: 10, title: "Lifestyle", tools: ["Premiere"], video: "/showreel.mp4" },
];

/* --- COMPONENT: VIDEO CARD --- */
function ProjectCard({ proj, type }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const handleMouseEnter = () => {
    if(videoRef.current) {
      videoRef.current.play();
      videoRef.current.style.opacity = 1;
      videoRef.current.style.filter = "grayscale(0%)";
    }
  };

  const handleMouseLeave = () => {
    if(videoRef.current) {
      videoRef.current.pause();
      videoRef.current.style.opacity = 0.7;
      videoRef.current.style.filter = "grayscale(100%)";
      setIsMuted(true);
      videoRef.current.muted = true;
    }
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    if(videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const cardClass = type === "vertical"
    ? "aspect-[9/16] w-[35vh]"
    : "aspect-video w-[70vh]";

  return (
    <div
      className={`group cursor-pointer flex-shrink-0 relative ${cardClass} bg-neutral-900 border border-white/10 overflow-hidden`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
         <video
            ref={videoRef}
            src={proj.video}
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            className="w-full h-full object-cover opacity-70 grayscale transition-all duration-500"
         />
         <button onClick={toggleSound} className="absolute bottom-4 right-4 z-30 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent hover:text-black">
            {isMuted ? <FaVolumeMute size={12} /> : <FaVolumeUp size={12} />}
         </button>
         <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <h3 className="font-display text-2xl uppercase text-white drop-shadow-md leading-none">{proj.title}</h3>
            <p className="font-sans text-xs text-gray-300 uppercase tracking-widest mt-2">{proj.tools.join(" / ")}</p>
         </div>
    </div>
  );
}

/* --- MAIN PAGE --- */
export default function VideoPage() {
  const [activeMode, setActiveMode] = useState(null); // Starts as NULL (Cover Page)

  const scrollRef = useRef(0);
  const x = useSpring(0, { stiffness: 50, damping: 20 });

  // Horizontal Scroll Logic
  useEffect(() => {
    const handleWheel = (e) => {
      if (!activeMode) return;

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
    <main className="bg-background h-screen w-screen overflow-hidden text-paper selection:bg-accent selection:text-black flex flex-col relative">
      <Navbar />

      <AnimatePresence mode="wait">

        {/* STATE 1: COVER SCREEN (Centered) */}
        {!activeMode && (
          <motion.section
            key="cover"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }} // Clean fade out
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-30 flex flex-col justify-center items-center text-center bg-background"
          >
            <h1 className="font-display text-[10vw] md:text-[8vw] uppercase leading-none tracking-tighter text-white mb-6">
              Motion Library
            </h1>
            <p className="text-sm md:text-xl text-gray-500 uppercase tracking-widest mb-16 max-w-lg">
              A curated archive of commercial work & visual experiments.
            </p>

            <div className="flex gap-10 md:gap-20">
              <button
                onClick={() => switchMode('cinematic')}
                className="font-display text-4xl md:text-6xl uppercase text-white hover:text-accent transition-colors duration-300"
              >
                Cinematic
              </button>
              <button
                onClick={() => switchMode('social')}
                className="font-display text-4xl md:text-6xl uppercase text-white hover:text-accent transition-colors duration-300"
              >
                Socials
              </button>
            </div>

            <p className="absolute bottom-10 text-accent text-xs uppercase tracking-[0.3em] animate-pulse">
              ↓ Select a Category to Enter ↓
            </p>
          </motion.section>
        )}

        {/* STATE 2: GALLERY SCREEN (Top Aligned) */}
        {activeMode && (
          <motion.section
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-20 flex flex-col"
          >
            {/* GALLERY HEADER */}
            <div className="pt-32 px-8 pb-8 border-b border-white/5 bg-background flex flex-col items-start">
              <h1 className="font-display text-sm text-gray-500 uppercase tracking-[0.5em] mb-6">
                Motion Library
              </h1>

              <div className="flex items-baseline gap-8 md:gap-12">
                <button
                  onClick={() => switchMode('cinematic')}
                  className={`font-display text-5xl md:text-7xl uppercase leading-none transition-colors duration-300 ${activeMode === 'cinematic' ? "text-accent" : "text-white/30 hover:text-white"}`}
                >
                  Cinematic
                </button>
                <button
                  onClick={() => switchMode('social')}
                  className={`font-display text-5xl md:text-7xl uppercase leading-none transition-colors duration-300 ${activeMode === 'social' ? "text-accent" : "text-white/30 hover:text-white"}`}
                >
                  Socials
                </button>
              </div>
            </div>

            {/* GALLERY CONTENT */}
            <div className="flex-grow relative flex items-center overflow-hidden bg-black/20">
              <motion.div
                key={activeMode + "-list"} // Re-trigger fade when switching lists
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute left-0 pl-[5vw] h-full flex items-center"
                style={{ x }}
              >
                <div className="flex gap-8 items-center h-full">
                  {activeMode === 'cinematic'
                    ? horizontalProjects.map((proj) => <ProjectCard key={proj.id} proj={proj} type="horizontal" />)
                    : verticalProjects.map((proj) => <ProjectCard key={proj.id} proj={proj} type="vertical" />)
                  }
                  <div className="w-[20vw] flex-shrink-0"></div>
                </div>
              </motion.div>
            </div>

            {/* FOOTER HINT */}
            <div className="absolute bottom-8 right-8 text-xs uppercase tracking-widest text-gray-600">
              Scroll to Pan ↔
            </div>

          </motion.section>
        )}

      </AnimatePresence>
    </main>
  );
}