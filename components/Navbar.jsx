"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger effect slightly earlier for smoother feel
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkStyle = "text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:text-accent";
  const activeStyle = "text-accent line-through decoration-1";

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-6 py-6 md:px-10 z-50 flex flex-col md:flex-row justify-between items-center md:items-start transition-all duration-500 ${
        scrolled
          ? "bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-lg" // Apple Glass Effect
          : "bg-transparent border-b border-transparent mix-blend-difference" // Transparent
      }`}
    >

      {/* Logo */}
      <Link href="/">
        <div className={`font-display text-3xl md:text-4xl font-bold uppercase leading-[0.8] text-center md:text-left mb-4 md:mb-0 hover:text-accent transition-colors cursor-pointer text-white`}>
          SURYA<br/>GUPTA
        </div>
      </Link>

      {/* Menu */}
      <div className={`flex flex-row md:flex-col gap-6 md:gap-2 font-display text-xs md:text-xl items-center md:items-end text-white`}>
        <Link href="/viewer/video" className={`${linkStyle} ${pathname.includes('video') ? activeStyle : ''}`}>
          Video
        </Link>
        <Link href="/viewer/design" className={`${linkStyle} ${pathname.includes('design') ? activeStyle : ''}`}>
          Design
        </Link>
        <Link href="mailto:surya@example.com" className={linkStyle}>
          Contact
        </Link>
      </div>
    </nav>
  );
}