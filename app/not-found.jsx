"use client";
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-center p-4">
      <h1 className="font-display text-[15vw] leading-none text-accent font-bold animate-pulse">
        404
      </h1>
      <p className="font-display text-2xl uppercase tracking-widest text-white mb-8">
        Signal Lost. Page Not Found.
      </p>
      <Link
        href="/"
        className="border border-white/20 bg-white/5 px-8 py-4 text-sm uppercase tracking-[0.3em] hover:bg-accent hover:text-black hover:border-accent transition-all duration-300"
      >
        Return to Base
      </Link>
    </div>
  );
}