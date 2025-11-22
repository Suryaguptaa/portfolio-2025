"use client";
import Navbar from '@/components/Navbar';

// --- YOUR DATA GOES HERE ---
const projects = [
  {
    id: 1,
    title: "Minimalist Poster",
    tag: "Print Design",
    media: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
  },
  {
    id: 2,
    title: "Tech Brand Identity",
    tag: "Branding",
    media: "https://images.unsplash.com/photo-1600607686527-6fb886090705",
  },
  {
    id: 3,
    title: "Music Album Cover",
    tag: "Typography",
    media: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17",
  },
  // Copy/Paste to add more...
];

export default function DesignPage() {
  return (
    <main className="bg-background min-h-screen text-paper">
      <Navbar />

      <section className="pt-40 px-8 pb-20 border-b border-white/10">
        <h1 className="font-display text-[12vw] leading-[0.85] uppercase">
          Visual<br/><span className="text-gray-600">Design</span>
        </h1>
      </section>

      <section className="px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-16">
          {projects.map((proj, index) => (
            <div key={proj.id} className="group cursor-pointer">
              <div className="relative overflow-hidden aspect-[3/4] bg-neutral-900 mb-6 border border-white/5">
                 <img
                   src={proj.media}
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                 />
              </div>

              <div className="border-t border-white/20 pt-4">
                <h2 className="font-display text-2xl uppercase mb-1 group-hover:text-accent transition-colors">{proj.title}</h2>
                <p className="font-sans text-xs text-gray-500 uppercase tracking-widest">{proj.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}