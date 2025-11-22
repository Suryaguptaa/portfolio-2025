"use client";
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Image from 'next/image'; // Import Image
import HyperText from '@/components/HyperText'; // <--- IMPORT THIS
import MagneticButton from '@/components/MagneticButton'; // <--- IMPORT THIS
import Typewriter from '@/components/Typewriter'; // <--- IMPORT THIS

gsap.registerPlugin(ScrollTrigger);

// ... keep your services array exactly the same ...
const services = [
  { title: "Typography Reels", desc: "Kinetic typography and lyric videos that sync perfectly with the beat." },
  { title: "Motion Graphics Reels", desc: "Complex 2D/3D animation showreels." },
  { title: "SaaS Style Videos", desc: "Clean, modern product explainers." },
  { title: "Trailer Editing", desc: "Cinematic pacing, sound design, and dramatic cuts." },
  { title: "Box / Docu-Style", desc: "Information-heavy edits with paper textures." },
  { title: "UI Animation", desc: "Micro-interactions and interface walkthroughs." },
  { title: "Advertisements", desc: "High-conversion social media ads." },
  { title: "Logo Animation", desc: "Brand reveals and sonic branding." }
];

export default function Home() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    // 1. Marquee
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "linear",
    });

    // 2. Fade Up
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
          <video
            className="w-full h-full object-cover"
            src="/showreel.mp4"
            autoPlay loop muted playsInline preload="none" poster="/poster.jpg"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 mt-10 md:mt-0">
          <h1 className="font-display text-[19vw] md:text-[18vw] leading-[0.8] font-bold uppercase tracking-tighter text-paper mix-blend-overlay fade-up text-center md:text-left cursor-default">
            <HyperText text="CREATIVE" className="block" /> {/* <--- HACKER EFFECT */}
            <span className="md:pl-[10vw] text-outline text-white mix-blend-normal block">
              <HyperText text="DEVELOPER" className="text-outline" /> {/* <--- HACKER EFFECT */}
            </span>
          </h1>
          <div className="flex justify-between mt-10 text-xs md:text-sm uppercase tracking-widest text-gray-300 fade-up font-bold px-2">
            <p>Based in India</p>
            <p>Scroll for more ↓</p>
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
            <section className="py-32 px-4 md:px-20 max-w-6xl mx-auto relative z-10">
              <h2 className="text-accent text-xs md:text-sm uppercase tracking-[0.3em] mb-8 fade-up">01. About Me</h2>

              {/* REPLACED STATIC TEXT WITH ANIMATED TYPEWRITER */}
              <Typewriter
                text="I am a multi-disciplinary creative bridging the gap between visual storytelling and technical execution. I don't just edit videos; I craft narratives that capture attention."
                className="font-display text-2xl md:text-6xl uppercase leading-tight md:indent-20 text-justify md:text-left"
              />

            </section>

      {/* SECTION 4: SERVICES */}
      <section className="py-20 px-4 md:px-20 border-t border-white/10 relative z-10">
        <h2 className="text-accent text-xs md:text-sm uppercase tracking-[0.3em] mb-16 fade-up">02. Services</h2>
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

      {/* SECTION 5: FOOTER WITH MAGNETIC BUTTON */}
      <section className="h-[50vh] md:h-[70vh] flex flex-col justify-center items-center text-center px-4 bg-white text-black mt-20 relative z-10">
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 md:mb-8">Have a project in mind?</p>

        {/* MAGNETIC BUTTON IMPLEMENTATION */}
        <MagneticButton
          href="mailto:surya@example.com"
          className="inline-block"
        >
          <span className="font-display text-[12vw] md:text-[10vw] leading-none uppercase font-bold hover:text-accent transition-colors block">
            Let's Talk
          </span>
        </MagneticButton>

        <div className="flex flex-col md:flex-row gap-4 md:gap-10 mt-10 md:mt-20 font-sans text-xs md:text-sm uppercase font-bold tracking-widest">
          <Link href="/viewer/video" className="hover:underline">Instagram</Link>
          <Link href="/viewer/design" className="hover:underline">LinkedIn</Link>
          <Link href="#" className="hover:underline">Twitter</Link>
        </div>
      </section>
    </main>
  );
}