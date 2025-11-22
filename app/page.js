"use client";
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';

gsap.registerPlugin(ScrollTrigger);

// --- EDIT YOUR SERVICES HERE ---
const services = [
  {
    title: "Typography Reels",
    desc: "Kinetic typography and lyric videos that sync perfectly with the beat. High energy, fast-paced text animation."
  },
  {
    title: "Motion Graphics Reels",
    desc: "Complex 2D/3D animation showreels. Bringing static assets to life with fluid movement and physics."
  },
  {
    title: "SaaS Style Videos",
    desc: "Clean, modern product explainers. Showcasing software and apps with smooth UI mockups and clear messaging."
  },
  {
    title: "Trailer Editing",
    desc: "Cinematic pacing, sound design, and dramatic cuts. Creating hype for films, games, or events."
  },
  {
    title: "Box / Docu-Style",
    desc: "Information-heavy edits with paper textures, collages, and map animations. Perfect for documentaries and YouTube essays."
  },
  {
    title: "UI Animation",
    desc: "Micro-interactions and interface walkthroughs. Making app designs look clickable and interactive."
  },
  {
    title: "Advertisements",
    desc: "High-conversion social media ads. Short, punchy, and designed to stop the scroll on Instagram and TikTok."
  },
  {
    title: "Logo Animation",
    desc: "Brand reveals and sonic branding. Turn a static logo into a memorable intro/outro sequence."
  }
];

export default function Home() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    // 1. Marquee Animation
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "linear",
    });

    // 2. Fade Up Elements
    const elements = document.querySelectorAll(".fade-up");
    elements.forEach((el) => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  return (
    <main className="min-h-screen bg-background text-paper overflow-x-hidden">
      <Navbar />

      {/* SECTION 1: HERO */}
      <section className="h-screen flex flex-col justify-center px-8 pt-20 relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            className="w-full h-full object-cover"
            src="/showreel.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="font-display text-[18vw] leading-[0.8] font-bold uppercase tracking-tighter text-paper mix-blend-overlay fade-up">
            Creative<br />
            <span className="pl-[10vw] text-outline text-white mix-blend-normal">Developer</span>
          </h1>
          <div className="flex justify-between mt-10 text-sm uppercase tracking-widest text-gray-300 fade-up font-bold">
            <p>Based in India</p>
            <p>Scroll for more ↓</p>
          </div>
        </div>
      </section>

      {/* SECTION 2: MARQUEE */}
      <section className="py-10 border-y border-white/10 overflow-hidden bg-white text-black relative z-10">
        <div ref={marqueeRef} className="whitespace-nowrap flex gap-10 font-display text-6xl md:text-8xl uppercase font-bold leading-none">
          <span>Video Editing</span> • <span>Graphic Design</span> • <span>Motion Graphics</span> • <span>Brand Identity</span> •
          <span>Video Editing</span> • <span>Graphic Design</span> • <span>Motion Graphics</span> • <span>Brand Identity</span> •
        </div>
      </section>

      {/* SECTION 3: ABOUT */}
      <section className="py-32 px-8 md:px-20 max-w-6xl mx-auto relative z-10">
        <h2 className="text-accent text-sm uppercase tracking-[0.3em] mb-10 fade-up">01. About Me</h2>
        <p className="font-display text-4xl md:text-6xl uppercase leading-tight indent-20 fade-up">
          I am a multi-disciplinary creative bridging the gap between <span className="text-accent">visual storytelling</span> and technical execution.
          I don't just edit videos; I craft narratives that capture attention in a noisy digital world.
        </p>
      </section>

      {/* SECTION 4: SERVICES (Updated Dynamic List) */}
      <section className="py-20 px-8 md:px-20 border-t border-white/10 relative z-10">
        <h2 className="text-accent text-sm uppercase tracking-[0.3em] mb-16 fade-up">02. Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24">
          {services.map((service, index) => (
            <div key={index} className="fade-up group cursor-pointer">
              {/* Divider Line */}
              <div className="h-[1px] w-full bg-white/20 mb-6 group-hover:bg-accent transition-colors duration-500"></div>

              {/* Title */}
              <h3 className="font-display text-4xl uppercase mb-4 group-hover:translate-x-2 transition-transform duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-md">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: FOOTER */}
      <section className="h-[70vh] flex flex-col justify-center items-center text-center px-4 bg-white text-black mt-20 relative z-10">
        <p className="text-sm uppercase tracking-[0.3em] mb-8">Have a project in mind?</p>
        <a href="mailto:surya@example.com" className="font-display text-[8vw] md:text-[10vw] leading-none uppercase font-bold hover:text-accent transition-colors">
          Let's Talk
        </a>
        <div className="flex gap-10 mt-20 font-sans text-sm uppercase font-bold tracking-widest">
          <Link href="/viewer/video" className="hover:underline">Instagram</Link>
          <Link href="/viewer/design" className="hover:underline">LinkedIn</Link>
          <Link href="#" className="hover:underline">Twitter</Link>
        </div>
      </section>
    </main>
  );
}