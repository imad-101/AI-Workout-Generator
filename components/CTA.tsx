"use client";

import { Button } from "@/components/ui/button";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef } from "react";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Enhanced green gradient with a luxurious touch
  const background = useMotionTemplate`radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.08) 40%, transparent 80%)`;

  return (
    <section
      className="relative py-10 md:py-24 mt-11 border-gray-800 mb-16 md:mb-24 rounded-2xl md:rounded-3xl overflow-hidden"
      ref={sectionRef}
    >
      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 md:mb-7 text-gray-50 px-4 leading-tight">
            Start Your Fitness Journey
            <motion.span
              className="block mt-3 text-3xl md:mt-4 bg-gradient-to-r from-teal-300 via-green-300 to-emerald-400 bg-clip-text text-transparent"
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Generate Your Personalized Plan
            </motion.span>
          </h2>

          <motion.div
            whileHover={{ scale: 1.06, rotate: 1 }}
            whileTap={{ scale: 0.94 }}
            className="flex justify-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-teal-500 via-green-500 to-emerald-600 text-white hover:from-teal-600 hover:via-green-600 hover:to-emerald-700 text-lg md:text-xl px-8 py-5 md:px-10 md:py-6 rounded-xl md:rounded-2xl relative overflow-hidden group w-full sm:w-auto shadow-xl transition-all duration-300"
            >
              <span className="relative z-10 font-semibold tracking-wide">
                Ignite Your Transformation
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/25 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.4 }}
              />
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1), transparent 70%)`,
                  opacity: [0, 0.2, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
