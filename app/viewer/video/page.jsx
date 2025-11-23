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

  // Desktop Hover Logic
  const handleMouseEnter = () => {
    // Only needed for Desktop behavior
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

  const toggleSound = (e) => {
    e.stopPropagation();
    if(videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  // RESPONSIVE SIZING:
  // Mobile: Uses 'vw' (Screen Width) to look big and clear.
  // Desktop: Uses 'vh' (Screen Height) to keep proportion.
  const cardClass = type === "vertical"
    ? "aspect-[9/16] w-[65vw] md:w-[35vh]"
    : "aspect-video w-[85vw] md:w-[70vh]";

  return (
    <div
      className={`group cursor-pointer flex-shrink-0 relative snap-center ${cardClass} bg-neutral-900 border border-white/10 overflow-hidden rounded-lg md:rounded-none`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
         <video
            ref={videoRef}
            src={proj.video}
            loop
            muted={isMuted}
            playsInline
            autoPlay // Force Autoplay on Mobile
            preload="metadata"
            // MOBILE: opacity-100 grayscale-0 (Always visible & color)
            // DESKTOP: md:opacity-70 md:grayscale (Hidden/B&W until hover)
            className="w-full h-full object-cover transition-all duration-500
                       opacity-100 grayscale-0
                       md:opacity-70 md:grayscale md:group-hover:opacity-100 md:group-hover:grayscale-0"
         />

         <button
            onClick={toggleSound}
            className="absolute bottom-4 right-4 z-30 p-2 rounded-full
                       bg-black/50 backdrop-blur-md border border-white/20 text-white
                       opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
         >
            {isMuted ? <FaVolumeMute size={12} /> : <FaVolumeUp size={12} />}
         </button>

         <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 bg-gradient-to-t from-black/90 to-transparent
                         opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <h3 className="font-display text-xl md:text-2xl uppercase text-white drop-shadow-md leading-none">{proj.title}</h3>
            <p className="font-sans text-[10px] md:text-xs text-gray-300 uppercase tracking-widest mt-2">{proj.tools.join(" / ")}</p>
         </div>
    </div>
  );
}

/* --- MAIN PAGE --- */
export default function VideoPage() {
  const [activeMode, setActiveMode] = useState('cinematic');

  const scrollRef = useRef(0);
  const x = useSpring(0, { stiffness: 50, damping: 20 });

  // Desktop Scroll Logic
  useEffect(() => {
    const handleWheel = (e) => {
      // Disable this logic on mobile to allow natural swipe
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

      {/* HEADER AREA */}
      <section className="pt-24 md:pt-32 px-6 md:px-8 bg-background z-20 flex flex-col items-start border-b border-white/5 pb-6">

        <h1 className="font-display text-xs md:text-sm text-gray-500 uppercase tracking-[0.3em] mb-4 md:mb-6">
          Motion Library
        </h1>

        {/* TAB SWITCHER - Responsive Text Sizes */}
        <div className="flex items-baseline gap-6 md:gap-12">
          <button
            onClick={() => switchMode('cinematic')}
            className={`font-display uppercase transition-all duration-300 leading-none
              ${activeMode === 'cinematic'
                ? "text-4xl md:text-7xl text-accent" // Mobile: 4xl, Desktop: 7xl
                : "text-4xl md:text-7xl text-white/30 hover:text-white"
              }
            `}
          >
            Cinematic
          </button>

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
        </div>
      </section>

      {/* CONTENT AREA */}
      <div className="flex-grow relative flex items-center overflow-hidden bg-black/20">

        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 w-full h-full flex items-center"
          >

            {/* MOBILE: Native horizontal scrolling (overflow-x-auto) with Snapping
                DESKTOP: Framer Motion 'x' translation
            */}
            <div
              className="flex gap-6 md:gap-8 items-center h-full w-full px-6 md:pl-[5vw]
                         overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar"
            >
              {/* Desktop Animation Wrapper (Only applies effect on desktop) */}
              <motion.div
                className="flex gap-6 md:gap-8 items-center"
                style={{ x: typeof window !== 'undefined' && window.innerWidth > 768 ? x : 0 }}
              >
                {activeMode === 'cinematic'
                  ? horizontalProjects.map((proj) => <ProjectCard key={proj.id} proj={proj} type="horizontal" />)
                  : verticalProjects.map((proj) => <ProjectCard key={proj.id} proj={proj} type="vertical" />)
                }
                {/* Spacer */}
                <div className="w-[10vw] md:w-[20vw] flex-shrink-0"></div>
              </motion.div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>

      {/* FOOTER HINT */}
      <div className="hidden md:block absolute bottom-8 right-8 text-xs uppercase tracking-widest text-gray-600">
        Scroll to Pan ↔
      </div>

    </main>
  );
}