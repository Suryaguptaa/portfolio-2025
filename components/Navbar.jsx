"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const isVideo = pathname.includes('/video');

  return (
    <nav className={`fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference text-white`}>
      {/* Logo - Now Clickable! */}
      <Link href="/">
        <div className="text-2xl font-black tracking-tighter uppercase cursor-pointer hover:opacity-80 transition-opacity">
          SURYA<span className="text-neon">.PORT</span>
        </div>
      </Link>

      {/* Switcher */}
      <div className="flex gap-6 text-sm font-bold tracking-widest bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
        <Link
          href="/viewer/video"
          className={`${isVideo ? 'text-neon' : 'text-gray-400'} hover:text-white transition-colors`}
        >
          VIDEO
        </Link>
        <span className="text-gray-600">|</span>
        <Link
          href="/viewer/design"
          className={`${!isVideo ? 'text-neon' : 'text-gray-400'} hover:text-white transition-colors`}
        >
          DESIGN
        </Link>
      </div>
    </nav>
  );
}