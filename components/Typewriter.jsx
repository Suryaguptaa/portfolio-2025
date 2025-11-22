"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Typewriter({ text, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  // Split text into individual words
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 }, // Adjust speed here
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <motion.span variants={child} className="mr-3 md:mr-4" key={index}>
          {/* Handle highlighted words (optional logic) */}
          {word === "visual" || word === "storytelling" ? (
             <span className="text-accent">{word}</span>
          ) : (
             word
          )}
        </motion.span>
      ))}
    </motion.div>
  );
}