"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsFinished(true), // Remove from DOM when done
    });

    // 1. Text Fades In
    tl.to(textRef.current, {
      opacity: 1,
      duration: 1,
      delay: 0.5,
    })
    // 2. Text Slides Up and Vanishes
    .to(textRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.in",
    })
    // 3. The Black Curtain Slides Up
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
    });
  }, []);

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-[99999] flex items-center justify-center"
    >
      <h1
        ref={textRef}
        className="font-display text-6xl md:text-8xl font-bold uppercase text-white opacity-0 tracking-tighter"
      >
        Surya<span className="text-accent">.Port</span>
      </h1>
    </div>
  );
}