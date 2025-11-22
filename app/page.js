"use client";
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: "Typography Reels", desc: "Kinetic typography and lyric videos that sync perfectly with the beat." },
  { title: "Motion Graphics", desc: "Complex 2D/3D animation showreels. Bringing static assets to life." },
  { title: "SaaS Videos", desc: "Clean, modern product explainers with smooth UI mockups." },
  { title: "Trailer Editing", desc: "Cinematic pacing, sound design, and dramatic cuts." },
  { title: "Docu-Style", desc: "Information-heavy edits with paper textures and map animations." },
  { title: "UI Animation", desc: "Micro-interactions and interface walkthroughs." },
  { title: "Advertisements", desc: "High-conversion social media ads for Instagram and TikTok." },
  { title: "Logo Animation", desc: "Brand reveals and sonic branding." }
];

export default function Home() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "linear",
    });

    const elements = document.querySelectorAll(".fade-up");
    elements.forEach((el) => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" }
        }
      );
    });
  }, []);

  return (
    <main className="min-h-screen bg-background text-paper overflow-x-hidden">
      <Navbar />

      {/* SECTION 1: HERO */}
      <section className="h-screen flex flex-col justify-center px-4 md:px-8 pt-20 relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <video className="w-full h-full object-cover" src="/showreel.mp4" autoPlay loop muted playsInline />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 mt-10 md:mt-0">
          {/* CHANGED: Adjusted font size for mobile */}
          <h1 className="font-display text-[19vw] md:text-[18vw] leading-[0.8] font-bold uppercase tracking-tighter text-paper mix-blend-overlay fade-up text-center md:text-left">
            Creative<br />
            <span className="md:pl-[10vw] text-outline text-white mix-blend-normal">Developer</span>
          </h1>
          <div className="flex justify-between mt-10 text-xs md:text-sm uppercase tracking-widest text-gray-300 fade-up font-bold px-2">
            <p>Based in India</p>
            <p>Scroll ↓</p>
          </div>
        </div>
      </section>

      {/* SECTION 2: MARQUEE */}
      <section className="py-6 md:py-10 border-y border-white/10 overflow-hidden bg-white text-black relative z-10">
        <div ref={marqueeRef} className="whitespace-nowrap flex gap-8 md:gap-10 font-display text-4xl md:text-8xl uppercase font-bold leading-none">
          <span>Video Editing</span> • <span>Graphic Design</span> • <span>Motion Graphics</span> • <span>Brand Identity</span> •
          <span>Video Editing</span> • <span>Graphic Design</span> • <span>Motion Graphics</span> • <span>Brand Identity</span> •
        </div>
      </section>

      {/* SECTION 3: ABOUT */}
      {/* CHANGED: px-4 instead of px-20 for mobile */}
      <section className="py-20 px-4 md:px-20 max-w-6xl mx-auto relative z-10">
        <h2 className="text-accent text-xs md:text-sm uppercase tracking-[0.3em] mb-8 fade-up">01. About Me</h2>
        {/* CHANGED: Smaller text on mobile */}
        <p className="font-display text-2xl md:text-6xl uppercase leading-tight md:indent-20 fade-up text-justify md:text-left">
          I am a multi-disciplinary creative bridging the gap between <span className="text-accent">visual storytelling</span> and technical execution.
          I don't just edit videos; I craft narratives that capture attention.
        </p>
      </section>

      {/* SECTION 4: SERVICES */}
      <section className="py-20 px-4 md:px-20 border-t border-white/10 relative z-10">
        <h2 className="text-accent text-xs md:text-sm uppercase tracking-[0.3em] mb-16 fade-up">02. Services</h2>

        {/* CHANGED: grid-cols-1 for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 md:gap-y-24">
          {services.map((service, index) => (
            <div key={index} className="fade-up group cursor-pointer">
              <div className="h-[1px] w-full bg-white/20 mb-4 md:mb-6 group-hover:bg-accent transition-colors duration-500"></div>
              <h3 className="font-display text-2xl md:text-4xl uppercase mb-2 md:mb-4 group-hover:translate-x-2 transition-transform duration-300">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-md">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: FOOTER */}
      <section className="h-[50vh] md:h-[70vh] flex flex-col justify-center items-center text-center px-4 bg-white text-black mt-20 relative z-10">
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 md:mb-8">Have a project in mind?</p>
        <a href="mailto:surya@example.com" className="font-display text-[12vw] md:text-[10vw] leading-none uppercase font-bold hover:text-accent transition-colors">
          Let's Talk
        </a>
        <div className="flex flex-col md:flex-row gap-4 md:gap-10 mt-10 md:mt-20 font-sans text-xs md:text-sm uppercase font-bold tracking-widest">
          <Link href="/viewer/video" className="hover:underline">Instagram</Link>
          <Link href="/viewer/design" className="hover:underline">LinkedIn</Link>
          <Link href="#" className="hover:underline">Twitter</Link>
        </div>
      </section>
    </main>
  );
}