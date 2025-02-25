"use client";

import { motion } from "framer-motion";
import { ArrowRight, Rocket, Globe, CreditCard, Star } from "lucide-react";

const features = [
  {
    icon: <Rocket className="h-5 w-5 text-purple-400" />,
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
    <section className="relative min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2"
              >
                {feature.icon}
                <span className="text-sm text-gray-300">{feature.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          >
            AI-Powered Workout Revolution
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl mb-8 text-gray-300"
          >
            Experience the future of fitness with our cutting-edge AI
            technology. Create personalized workout plans that evolve with you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#workout-form"
              className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="ml-2" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center bg-gray-700 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-600 transition duration-300 transform hover:scale-105"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-full z-0">right</div>
    </section>
  );
}
