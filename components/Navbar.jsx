"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  // Common style for links
  const linkStyle = "text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:text-accent";
  const activeStyle = "text-accent line-through decoration-1"; // Strikethrough for active page

  return (
    <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-start mix-blend-difference text-white">

      {/* Logo - Big and Bold */}
      <Link href="/">
        <div className="font-display text-4xl font-bold uppercase leading-[0.8]">
          SURYA<br/>GUPTA
        </div>
      </Link>

      {/* Menu */}
      <div className="flex flex-col text-right gap-2 font-display text-xl">
        <Link href="/viewer/video" className={`${linkStyle} ${pathname.includes('video') ? activeStyle : ''}`}>
          Selected Works (Video)
        </Link>
        <Link href="/viewer/design" className={`${linkStyle} ${pathname.includes('design') ? activeStyle : ''}`}>
          Visual Design
        </Link>
        <Link href="mailto:surya@example.com" className={linkStyle}>
          Contact
        </Link>
      </div>
    </nav>
  );
}