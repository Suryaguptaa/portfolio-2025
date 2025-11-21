"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FlameCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // 1. QuickTo is a GSAP feature for high-performance mouse following
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });

    // 2. Listen for mouse movement
    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 bg-neon rounded-full pointer-events-none z-[9999] mix-blend-difference blur-[2px]"
      style={{
        transform: 'translate(-50%, -50%)', // Center the div on the mouse
        boxShadow: '0 0 20px 5px #00FFC5'    // The "Flame" glow effect
      }}
    />
  );
}