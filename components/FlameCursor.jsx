"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function FlameCursor() {
  const bigCircleRef = useRef(null);
  const smallDotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const bigCircle = bigCircleRef.current;
    const smallDot = smallDotRef.current;

    // Check if elements exist (safety check)
    if (!bigCircle || !smallDot) return;

    // 1. Move Small Dot instantly
    const xToDot = gsap.quickTo(smallDot, "x", { duration: 0.1, ease: "power3" });
    const yToDot = gsap.quickTo(smallDot, "y", { duration: 0.1, ease: "power3" });

    // 2. Move Big Circle with delay (smooth lag)
    const xToCircle = gsap.quickTo(bigCircle, "x", { duration: 0.5, ease: "power3" });
    const yToCircle = gsap.quickTo(bigCircle, "y", { duration: 0.5, ease: "power3" });

    const moveCursor = (e) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToCircle(e.clientX);
      yToCircle(e.clientY);
    };

    // 3. Hover Detection
    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' ||
          e.target.closest('a') ||
          e.target.tagName.toLowerCase() === 'button') {
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

  // 4. Hover Animation (Ring gets bigger, Dot disappears)
  useEffect(() => {
    if (!bigCircleRef.current || !smallDotRef.current) return;

    if (isHovering) {
      gsap.to(bigCircleRef.current, { scale: 3, opacity: 0.5, borderWidth: '1px' });
      gsap.to(smallDotRef.current, { opacity: 0 }); // Hide dot on hover
    } else {
      gsap.to(bigCircleRef.current, { scale: 1, opacity: 1, borderWidth: '2px' });
      gsap.to(smallDotRef.current, { opacity: 1 });
    }
  }, [isHovering]);

  return (
    <>
      {/* The Trailing Ring - HIDDEN ON MOBILE (md:block) */}
      <div
        ref={bigCircleRef}
        className="hidden md:block fixed top-0 left-0 w-8 h-8 border-2 border-white rounded-full pointer-events-none z-[9990] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      {/* The Center Dot - HIDDEN ON MOBILE (md:block) */}
      <div
        ref={smallDotRef}
        className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9991] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}