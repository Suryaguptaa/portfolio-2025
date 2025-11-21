"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import Navbar from '@/components/Navbar';

// Register the animation plugin
gsap.registerPlugin(ScrollTrigger);

export default function VideoPage() {
  const containerRef = useRef(null); // The invisible wrapper
  const sliderRef = useRef(null);    // The long horizontal strip
  const [projects, setProjects] = useState([]);

  // 1. Fetch Projects from DB
  useEffect(() => {
    axios.get('/api/projects/add?category=video').then(res => setProjects(res.data));
  }, []);

  // 2. Setup Animation (Only runs when projects are loaded)
  useEffect(() => {
    if (projects.length === 0) return;

    // Create a GSAP Context (cleaner way to use GSAP in React)
    let ctx = gsap.context(() => {

      // Calculate how wide the slider needs to be
      // We want to move the slider to the left by (TotalWidth - ScreenWidth)
      const totalWidth = sliderRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const amountToScroll = totalWidth - windowWidth;

      gsap.to(sliderRef.current, {
        x: -amountToScroll, // Move left
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,     // Lock the screen
          scrub: 1,      // Link animation to scroll speed
          end: "+=" + amountToScroll, // How long to scroll for
        }
      });

    }, containerRef);

    return () => ctx.revert(); // Cleanup when leaving page
  }, [projects]);

  return (
    <main className="bg-dark text-white overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="h-screen flex flex-col items-center justify-center z-10 relative">
        <h1 className="text-[12vw] font-black leading-none tracking-tighter text-transparent stroke-text hover:text-neon transition-colors duration-500 cursor-default">
          EDITOR
        </h1>
        <p className="text-gray-500 tracking-[0.5em] mt-4 uppercase text-sm">Scroll to scrub timeline</p>
        <div className="mt-10 animate-bounce text-neon text-2xl">↓</div>
      </section>

      {/* HORIZONTAL TIMELINE SECTION */}
      {/* This div gets "pinned" (locked) by GSAP while we scroll */}
      <div ref={containerRef} className="h-screen w-full overflow-hidden relative bg-neutral-900 flex items-center">

        {/* The Long Strip that moves left */}
        <div ref={sliderRef} className="flex flex-nowrap h-full items-center pl-[10vw] pr-[10vw]">

            {/* TIMELINE START MARKER */}
            <div className="flex-shrink-0 w-[20vw] h-full flex items-center justify-center border-r border-white/10 relative">
                <span className="text-neon font-mono -rotate-90 tracking-widest">00:00:00:00</span>
            </div>

            {/* PROJECT CARDS */}
            {projects.length > 0 ? projects.map((proj, i) => (
                <div key={proj._id} className="flex-shrink-0 w-[80vw] md:w-[50vw] h-full flex flex-col justify-center px-10 border-r border-white/5 relative group">

                    {/* Time Marker */}
                    <div className="absolute top-10 left-4 text-xs font-mono text-gray-600">
                        00:0{i + 1}:00:00
                    </div>

                    {/* Video Thumbnail / Screen */}
                    <div className="w-full aspect-video bg-black border border-gray-800 rounded-lg overflow-hidden relative group-hover:border-neon transition-colors duration-300 shadow-2xl">
                        {proj.media[0] ? (
                            <img src={proj.media[0]} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={proj.title} />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-700">NO MEDIA</div>
                        )}

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-16 h-16 bg-neon rounded-full flex items-center justify-center text-black font-bold">▶</div>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="mt-8">
                        <h2 className="text-4xl font-bold uppercase text-white">{proj.title}</h2>
                        <div className="flex gap-2 mt-3">
                            {proj.tags.map(tag => (
                                <span key={tag} className="text-xs border border-neon/30 text-neon px-2 py-1 rounded-full uppercase">{tag}</span>
                            ))}
                        </div>
                    </div>

                </div>
            )) : (
                <div className="w-[50vw] flex items-center justify-center text-gray-500">
                    Add projects in Admin Dashboard to see them here...
                </div>
            )}

             {/* TIMELINE END MARKER */}
             <div className="flex-shrink-0 w-[20vw] h-full flex items-center justify-center border-l border-white/10">
                <span className="text-gray-500 font-mono -rotate-90 tracking-widest">END OF REEL</span>
            </div>

        </div>
      </div>

      <section className="h-[50vh] flex items-center justify-center bg-black text-gray-600">
        <p>Footer / Contact Info</p>
      </section>


    </main>
  );
}