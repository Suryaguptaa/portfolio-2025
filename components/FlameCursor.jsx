"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function FlameCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;

    // 1. Setup GSAP for smooth movement
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

    // 2. Move Cursor
    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // 3. Detect Hover over clickable items
    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' ||
          e.target.tagName.toLowerCase() === 'button' ||
          e.target.closest('a') ||
          e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // 4. Animate Scale based on Hover State
  useEffect(() => {
    if (isHovering) {
      gsap.to(cursorRef.current, { scale: 4, duration: 0.3 }); // Grow big
    } else {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.3 }); // Shrink back
    }
  }, [isHovering]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}