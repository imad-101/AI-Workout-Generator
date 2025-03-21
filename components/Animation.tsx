import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const workouts = [
  {
    title: "Full Body Blast",
    exercises: ["Push-ups", "Squats", "Burpees", "Plank"],
  },
  {
    title: "Strength Training",
    exercises: ["Deadlifts", "Bench Press", "Pull-ups", "Lunges"],
  },
  {
    title: "Cardio Burn",
    exercises: ["Jump Rope", "Sprints", "Mountain Climbers", "High Knees"],
  },
];

export default function WorkoutDemo() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % workouts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col  text-center p-6 bg-gray-800  rounded-xl ">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 flex items-center gap-2"
      >
        <h2 className="text-2xl font-bold text-white">AI-Generated Workout</h2>
      </motion.div>
      <Card className="w-72 bg-gray-800 border-none">
        <CardContent className="p-4 text-left ">
          <motion.h3
            key={workouts[index].title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-semibold text-green-400 "
          >
            {workouts[index].title}
          </motion.h3>
          <ul className="mt-2 text-gray-300">
            {workouts[index].exercises.map((exercise, i) => (
              <motion.li
                key={exercise}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="text-sm"
              >
                • {exercise}
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Link href="#workout-form">
        <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
          Generate Your Workout
        </Button>
      </Link>
    </div>
  );
}
