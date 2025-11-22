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

    if (!bigCircle || !smallDot) return;

    // 1. Move Small Dot (Instant)
    const xToDot = gsap.quickTo(smallDot, "x", { duration: 0.1, ease: "power3" });
    const yToDot = gsap.quickTo(smallDot, "y", { duration: 0.1, ease: "power3" });

    // 2. Move Big Ring (Delayed/Smooth)
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

  // 4. Scale Animation on Hover
  useEffect(() => {
    if (!bigCircleRef.current || !smallDotRef.current) return;

    if (isHovering) {
      // Hover: Ring gets big and faint, Dot disappears
      gsap.to(bigCircleRef.current, { scale: 3, opacity: 0.4, borderWidth: '1px' });
      gsap.to(smallDotRef.current, { opacity: 0 });
    } else {
      // Normal: Ring normal size, Dot visible
      gsap.to(bigCircleRef.current, { scale: 1, opacity: 1, borderWidth: '2px' });
      gsap.to(smallDotRef.current, { opacity: 1 });
    }
  }, [isHovering]);

  return (
    <>
      {/* The Trailing Ring - HIDDEN ON MOBILE */}
      <div
        ref={bigCircleRef}
        className="hidden md:block fixed top-0 left-0 w-10 h-10 border-2 border-white rounded-full pointer-events-none z-[9990] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      {/* The Center Dot - HIDDEN ON MOBILE */}
      <div
        ref={smallDotRef}
        className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9991] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}