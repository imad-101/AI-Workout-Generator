"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "Create a free account",
    description: "Sign up in seconds, no credit card required.",
  },
  {
    number: 2,
    title: "Find the Workout Plan Generator",
    description:
      "Once you've logged in, find the Workout Plan Generator template amongst our 200+ templates.",
  },
  {
    number: 3,
    title: "Set your fitness goals",
    description:
      "Fill out what are your fitness goals. For example: Lose weight, Gain muscle",
  },
  {
    number: 4,
    title: "Specify your gender",
    description: "Fill out Gender. For Gender",
  },
  {
    number: 5,
    title: "Choose training method",
    description: "Fill out Training method. For Training method",
  },
  {
    number: 6,
    title: "Select workout type",
    description: "Fill out Workout type. For Workout type",
  },
  {
    number: 7,
    title: "Set strength level",
    description: "Fill out Strength level. For Strength level",
  },
  {
    number: 8,
    title: "Enable advanced AI",
    description:
      "Enable the 'Use advanced AI model?' toggle to leverage our cutting-edge AI technology for superior performance and more accurate results! Powered by GPT-4.",
  },
];

export default function HowToUse() {
  return (
    <section className="py-12 md:py-20 bg-gray-900" id="how-it-works">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-green-400"
        >
          How to use the Workout Plan Generator
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          {/* Desktop version (visible on md and up) */}
          <div className="hidden md:block relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-500/20" />
            {steps.map((step, index) => (
              <motion.div
                key={`desktop-${index}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative mb-8"
              >
                <div className="flex items-center">
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0
                        ? "pr-8 text-right"
                        : "pl-8 text-left ml-auto"
                    }`}
                  >
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg hover:shadow-green-500/10 transition-shadow duration-300">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/20">
                      {step.number}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile version (vertical timeline, visible only on sm and down) */}
          <div className="md:hidden relative">
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-green-500/20" />
            {steps.map((step, index) => (
              <motion.div
                key={`mobile-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative pl-12 mb-8 last:mb-0"
              >
                <div className="absolute left-0 top-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/20">
                  {step.number}
                </div>
                <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 shadow-lg">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
