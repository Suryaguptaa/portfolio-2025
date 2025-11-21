"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import axios from 'axios';
import Navbar from '@/components/Navbar';

export default function DesignPage() {
  const [projects, setProjects] = useState([]);
  const heroRef = useRef(null);

  // 1. Fetch Design Projects
  useEffect(() => {
     axios.get('/api/projects/add?category=design').then(res => setProjects(res.data));
  }, []);

  // 2. Mouse Parallax Effect (The text moves slightly when you move your mouse)
  useEffect(() => {
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20; // Move 20px max
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        if (heroRef.current) {
            gsap.to(heroRef.current, {
                x: xPos,
                y: yPos,
                duration: 1,
                ease: "power2.out"
            });
        }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="bg-cream text-black min-h-screen selection:bg-black selection:text-white">
       <Navbar />

       {/* EDITORIAL HERO SECTION */}
       <section className="h-[80vh] flex items-center justify-center relative overflow-hidden">
          <div ref={heroRef} className="text-center z-10 relative mix-blend-multiply">
             <h1 className="text-[10vw] font-serif italic leading-none text-gray-800">Visual</h1>
             <h1 className="text-[10vw] font-black leading-none -mt-4 tracking-tighter">STORYTELLING.</h1>
          </div>

          {/* Abstract background shapes */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-50 z-0"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-50 z-0"></div>
       </section>

       {/* MASONRY GRID (Pinterest Style) */}
       <section className="px-4 md:px-20 py-20 min-h-screen">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">

             {projects.length > 0 ? projects.map((proj) => (
                <div key={proj._id} className="break-inside-avoid group cursor-pointer">
                   <div className="overflow-hidden rounded-sm relative">
                      {proj.media[0] ? (
                         <img
                            src={proj.media[0]}
                            alt={proj.title}
                            className="w-full h-auto transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                         />
                      ) : (
                         <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                   </div>

                   {/* Card Text */}
                   <div className="mt-4 flex justify-between items-baseline border-b border-black/10 pb-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-xl font-serif font-bold">{proj.title}</h3>
                      <span className="text-xs uppercase tracking-widest">{proj.tags[0] || 'DESIGN'}</span>
                   </div>
                </div>
             )) : (
                <div className="col-span-full text-center text-gray-400 py-20">
                    No designs added yet. Go to Admin Dashboard to add one!
                </div>
             )}

          </div>
       </section>

       <footer className="py-10 text-center text-xs uppercase tracking-widest text-gray-400">
          © 2025 Surya Design Portfolio
       </footer>
    </main>
  );
}