"use client";
import Navbar from '@/components/Navbar';
import Image from 'next/image'; // <--- IMPORT THIS

// --- YOUR DATA ---
const projects = [
  {
    id: 1,
    title: "Nike Air Max",
    tools: ["Premiere Pro", "After Effects"],
    media: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 2,
    title: "Cyberpunk City",
    tools: ["Blender", "DaVinci Resolve"],
    media: "https://images.unsplash.com/photo-1535498730771-e735b998cd64",
  },
  {
    id: 3,
    title: "Fashion Week",
    tools: ["Premiere Pro"],
    media: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
  },
];

export default function VideoPage() {
  return (
    <main className="bg-background min-h-screen text-paper">
      <Navbar />

      <section className="pt-40 px-8 pb-20 border-b border-white/10">
        <h1 className="font-display text-[12vw] leading-[0.85] uppercase">
          Motion<br/><span className="text-accent">Pictures</span>
        </h1>
      </section>

      <section className="px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
          {projects.map((proj, index) => (
            <div key={proj.id} className={`group cursor-pointer ${index % 2 === 1 ? 'md:mt-32' : ''}`}>

              {/* Image Container */}
              <div className="relative overflow-hidden aspect-[16/9] bg-neutral-900 mb-6 border border-white/5">
                 {/* OPTIMIZED IMAGE COMPONENT */}
                 <Image
                   src={proj.media}
                   alt={proj.title}
                   fill
                   className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                   sizes="(max-width: 768px) 100vw, 50vw" // Loads smaller image on mobile
                 />
                 <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300 mix-blend-overlay"></div>
              </div>

              {/* Text Details */}
              <div className="border-t border-white/20 pt-4 flex justify-between items-start">
                <div>
                  <h2 className="font-display text-4xl uppercase mb-1 group-hover:text-accent transition-colors">{proj.title}</h2>
                  <p className="font-sans text-sm text-gray-500 uppercase tracking-widest">{proj.tools.join(" / ")}</p>
                </div>
                <span className="font-sans text-xs border border-white/20 text-gray-500 rounded-full px-3 py-1">0{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}