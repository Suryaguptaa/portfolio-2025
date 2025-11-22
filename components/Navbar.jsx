"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const linkStyle = "text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:text-accent";
  const activeStyle = "text-accent line-through decoration-1";

  return (
    // CHANGED: Added 'bg-background/80 backdrop-blur-md border-b border-white/5'
    // REMOVED: 'mix-blend-difference' (It causes the visual clash)
    <nav className="fixed top-0 left-0 w-full p-6 md:p-8 z-50 flex flex-col md:flex-row justify-between items-center md:items-start bg-background/90 backdrop-blur-md border-b border-white/5 text-white transition-all duration-300">

      {/* Logo */}
      <Link href="/">
        <div className="font-display text-3xl md:text-4xl font-bold uppercase leading-[0.8] text-center md:text-left mb-4 md:mb-0 hover:text-accent transition-colors cursor-pointer">
          SURYA<br/>GUPTA
        </div>
      </Link>

      {/* Menu */}
      <div className="flex flex-row md:flex-col gap-6 md:gap-2 font-display text-xs md:text-xl items-center md:items-end">
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