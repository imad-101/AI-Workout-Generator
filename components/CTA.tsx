"use client";

import { Button } from "@/components/ui/button";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef } from "react";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const background = useMotionTemplate`radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(236, 72, 153, 0.1) 0%, rgba(124, 58, 237, 0.05) 30%, transparent 80%)`;

  return (
    <section
      className="relative py-16 md:py-20 bg-gray-950 border-t border-gray-800 mb-16 md:mb-24 rounded-xl md:rounded-2xl"
      onMouseMove={handleMouseMove}
      ref={sectionRef}
    >
      {/* Main animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-10 md:opacity-15 pointer-events-none"
        style={{ background }}
      />

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Responsive rotating circles */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full blur-lg md:blur-xl"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: `radial-gradient(circle at center, 
                rgba(236, 72, 153, 0.${i}) 0%, 
                rgba(124, 58, 237, 0.0${i}) 50%, 
                transparent 100%)`,
              left: `${i * 10}%`,
              top: `${i * 5}%`,
              width: `${i * 50}px`,
              height: `${i * 50}px`,
            }}
            initial={false}
          />
        ))}
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-100 px-4">
            Start Your AI Fitness Journey
            <motion.span
              className="block mt-2 md:mt-3 bg-gradient-to-r from-pink-300 to-purple-400 bg-clip-text text-transparent"
              animate={{ opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Free Forever
            </motion.span>
          </h2>

          <p className="text-base md:text-lg text-gray-400 mb-6 md:mb-8 max-w-md mx-auto px-2">
            Experience personalized workout plans powered by AI. No credit card
            required.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 text-base md:text-lg px-6 py-4 md:px-8 md:py-6 rounded-lg md:rounded-xl relative overflow-hidden group w-full sm:w-auto"
            >
              <span className="relative z-10">Create Free Account</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </motion.div>

          <motion.div
            className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
