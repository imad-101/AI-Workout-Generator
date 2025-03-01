"use client";

import { motion } from "framer-motion";
import WorkoutDemo from "./Animation";

import { ArrowRight, Rocket, Globe, CreditCard, Star } from "lucide-react";

const features = [
  {
    icon: <Rocket className="h-5 w-5 text-green-400" />,
    text: "Powered by best AI models",
  },
  {
    icon: <Globe className="h-5 w-5 text-blue-400" />,
    text: "Supports 40+ languages",
  },
  {
    icon: <CreditCard className="h-5 w-5 text-green-400" />,
    text: "No credit card required",
  },
  {
    icon: <Star className="h-5 w-5 text-yellow-400" />,
    text: "5-star ratings",
  },
];

export default function Hero() {
  return (
    <section className="flex flex-col md:gap-36 gap-20 min-h-screen">
      <section className="relative  flex items-center mt-24 md:mt-48 ">
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7x  font-bold mb-6 bg-clip-text text-center sm:text-left text-transparent bg-gradient-to-r from-green-400 to-green-600"
            >
              Free AI Workout Plan Generator{" "}
              <span className="hidden md:block text-white">
                Generate Highly Personalized Workouts
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl mb-8 text-gray-300 text-center sm:text-left"
            >
              Experience the future of fitness with our cutting-edge AI
              technology. Create personalized workout plans that evolve with
              you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap gap-4 justify-center sm:justify-start"
            >
              <a
                href="#workout-form"
                className="inline-flex items-center  bg-gradient-to-r from-green-500 to-green-500 text-white font-bold py-3 px-4 sm:px-8 rounded-full hover:from-green-600 hover:to-green-600 transition duration-300 transform hover:scale-105"
              >
                Get Started
                <ArrowRight className="ml-2" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center bg-gray-700 text-white font-bold py-3 px-4 sm:px-8 rounded-full hover:bg-gray-600 transition duration-300 transform hover:scale-105"
              >
                Learn More
              </a>
            </motion.div>
          </div>
        </div>
        <div className="right hidden md:block">
          <WorkoutDemo />
        </div>
      </section>
      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-4 mb- sm:mb-8 mx-auto justify-center flex-col sm:flex-row"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm rounded-full px-20 sm:px-4 py-2"
            >
              {feature.icon}
              <span className="text-sm text-gray-300">{feature.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
