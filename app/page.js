"use client";
import Link from 'next/link';
import { FaFilm, FaPenNib } from 'react-icons/fa'; // Importing icons

export default function Home() {
  return (
    <main className="h-screen w-full bg-dark text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-neon/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Introduction Text */}
      <div className="z-10 text-center mb-16 max-w-2xl px-6">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase">
          I am <span className="text-neon">Surya</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl tracking-wide leading-relaxed">
          A creative technologist bridging the gap between motion and design.
          <br />
          Select a universe to explore below.
        </p>
      </div>

      {/* The Two Choices */}
      <div className="z-10 flex flex-col md:flex-row gap-8 md:gap-16">
        
        {/* Option 1: Video Editing */}
        <Link href="/viewer/video" className="group relative">
          <div className="w-64 h-64 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center gap-6 transition-all duration-500 group-hover:border-neon group-hover:shadow-[0_0_30px_rgba(0,255,197,0.3)] group-hover:-translate-y-2">
            <div className="text-5xl text-gray-500 group-hover:text-neon transition-colors duration-300">
              <FaFilm />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold uppercase tracking-widest">Motion</h2>
              <p className="text-xs text-gray-500 mt-2 group-hover:text-neon">Video Editor Portfolio</p>
            </div>
          </div>
        </Link>

        {/* Option 2: Graphic Design */}
        <Link href="/viewer/design" className="group relative">
          <div className="w-64 h-64 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center gap-6 transition-all duration-500 group-hover:border-purple-400 group-hover:bg-cream group-hover:shadow-[0_0_30px_rgba(250,247,242,0.5)] group-hover:-translate-y-2">
            <div className="text-5xl text-gray-500 group-hover:text-black transition-colors duration-300">
              <FaPenNib />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold uppercase tracking-widest group-hover:text-black">Design</h2>
              <p className="text-xs text-gray-500 mt-2 group-hover:text-black">Graphic Design Portfolio</p>
            </div>
          </div>
        </Link>

      </div>

      <footer className="absolute bottom-8 text-xs text-gray-600 uppercase tracking-widest">
        Choose your experience
      </footer>
    </main>
  );
}