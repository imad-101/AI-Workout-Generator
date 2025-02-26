"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Dumbbell,
  Zap,
  CheckCircle2,
  Bolt,
  Flame,
  HeartPulseIcon,
  BicepsFlexed,
} from "lucide-react";

const WorkoutPlan = () => {
  const days = [
    {
      title: "Day 1: Upper Body Strength",
      icon: <Dumbbell className="w-5 h-5" />,
      exercises: [
        "Bench Press: 4×6-8 reps",
        "Incline Dumbbell Press: 3×8-10",
        "Pull-ups/Lat Pulldowns: 3×8-10",
        "Overhead Shoulder Press: 3×8-10",
        "Bicep Curls: 3×10-12",
        "Triceps Dips: 3×10-12",
        "Core: Hanging Leg Raises + Planks",
      ],
      intensity: "High",
      duration: "75min",
    },
    {
      title: "Day 2: Lower Body Strength",
      icon: <Zap className="w-5 h-5" />,
      exercises: [
        "Squats: 4×6-8 reps",
        "Leg Press: 3×8-10",
        "Romanian Deadlifts: 3×8-10",
        "Calf Raises: 3×12-15",
        "Core: Russian Twists + Knee Raises",
      ],
      intensity: "High",
      duration: "65min",
    },
    {
      title: "Day 3: Active Recovery",
      icon: <HeartPulseIcon className="w-5 h-5" />,
      exercises: ["Light stretching/yoga", "30-minute walk"],
      intensity: "Low",
      duration: "45min",
    },
    {
      title: "Day 4: Upper Body Hypertrophy",
      icon: <BicepsFlexed className="w-5 h-5" />,
      exercises: [
        "Dumbbell Bench Press: 4×10-12",
        "Bent-over Rows: 4×8-10",
        "Seated Shoulder Press: 3×10-12",
        "Hammer Curls: 3×12-15",
        "Triceps Pushdowns: 3×12-15",
      ],
      intensity: "Moderate",
      duration: "70min",
    },
    {
      title: "Day 5: Lower Body Hypertrophy",
      icon: <Flame className="w-5 h-5" />,
      exercises: [
        "Leg Extensions: 4×12-15",
        "Hamstring Curls: 4×12-15",
        "Bulgarian Split Squats: 3×10/leg",
        "Calf Raises: 3×15-20",
        "Core: Knee Raises + Twists",
      ],
      intensity: "Moderate",
      duration: "65min",
    },
    {
      title: "Day 6: Full Body Power",
      icon: <Bolt className="w-5 h-5" />,
      exercises: [
        "Deadlifts: 4×6-8 reps",
        "Push Press: 3×8",
        "Weighted Pull-ups: 3×6-8",
        "Core: Leg Raises + Ab Rollouts",
      ],
      intensity: "High",
      duration: "60min",
    },

    {
      title: "Day 7: Complete Rest",
      icon: <HeartPulseIcon className="w-5 h-5" />,
      exercises: ["Full muscle recovery"],
      intensity: "Rest",
      duration: "-",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-6">
            Your AI-Crafted Fitness Masterpiece
          </h1>
          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex-1 border-t border-purple-400/30" />
              <span className="text-purple-300 text-lg">
                Sample Plan Preview
              </span>
              <div className="flex-1 border-t border-purple-400/30" />
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-purple-300 mb-2">
                User Input Summary
              </h2>
              <div className="flex justify-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full" />
                  Goal: Muscle Gain
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-400 rounded-full" />
                  Level: Intermediate
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  Equipment: Full Gym
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {days.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-purple-400/30 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                    {day.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-100">
                    {day.title}
                  </h3>
                </div>
                <span className="text-sm bg-gray-700 px-2 py-1 rounded-md">
                  {day.duration}
                </span>
              </div>
              <div className="mb-4 flex items-center gap-2">
                <span
                  className={`text-sm font-medium ${
                    day.intensity === "High"
                      ? "text-red-400"
                      : day.intensity === "Moderate"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {day.intensity} Intensity
                </span>
                <div className="flex gap-1">
                  {[
                    ...Array(
                      day.intensity === "High"
                        ? 3
                        : day.intensity === "Moderate"
                        ? 2
                        : 0
                    ),
                  ].map((_, i) => (
                    <span
                      key={i}
                      className="w-2 h-2 bg-purple-400 rounded-full"
                    />
                  ))}
                </div>
              </div>
              <ul className="space-y-3">
                {day.exercises.map((exercise, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-gray-300"
                  >
                    <span className="text-purple-400 mt-1">•</span>
                    <span className="flex-1">{exercise}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gray-800/50 p-8 rounded-2xl border border-purple-400/20 mb-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-100 mb-4">
              🚀 Transform Your Body in 8 Weeks
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="text-purple-400 text-2xl font-bold">92%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="text-pink-400 text-2xl font-bold">4.9★</div>
                <div className="text-sm text-gray-400">User Rating</div>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="text-blue-400 text-2xl font-bold">18k+</div>
                <div className="text-sm text-gray-400">Transformations</div>
              </div>
            </div>
            <button className="relative group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-purple-500/20">
              <span className="relative z-10">Create My Free Plan Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            </button>
            <p className="text-gray-400 text-sm mt-4">
              Start your journey risk-free • No credit card required
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 text-gray-400">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              Personalized Nutrition Plan
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              Progress Tracking
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkoutPlan;
