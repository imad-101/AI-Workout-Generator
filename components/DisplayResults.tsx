import React from "react";
import { Button } from "@/components/ui/button";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  modification?: string;
}

interface DailyWorkout {
  warmUp: string;
  exercises: Exercise[];
  coolDown: string;
}

interface WorkoutPlanData {
  weeklySchedule: Record<string, string>;
  dailyWorkouts: Record<string, DailyWorkout>;
  progressionPlan: Record<string, string>;
  additionalTips: Record<string, string>;
  nutritionalAdvice?: Record<string, string>;
}

interface WorkoutPlanDisplayProps {
  data: WorkoutPlanData;
  onReset: () => void;
}

export function WorkoutPlanDisplay({ data, onReset }: WorkoutPlanDisplayProps) {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-4xl text-white font-bold">
          Your Custom Workout Plan
        </h2>
        <Button
          onClick={onReset}
          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
        >
          Create Another Plan
        </Button>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-2xl text-pink-500 font-bold mb-4">
          Weekly Schedule
        </h3>
        <ul className="list-disc ml-6">
          {Object.entries(data.weeklySchedule).map(([day, workout]) => (
            <li key={day} className="text-white mb-1">
              <span className="font-semibold">{day}:</span> {workout}
            </li>
          ))}
        </ul>
      </div>

      {/* Daily Workouts */}
      <div className="space-y-6">
        {Object.entries(data.dailyWorkouts).map(([day, details]) => (
          <div key={day} className="bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-2xl text-pink-500 font-bold mb-2">{day}</h3>
            <p className="text-gray-300">
              <strong>Warm-up:</strong> {details.warmUp}
            </p>
            <div className="mt-2">
              <p className="text-gray-300 font-semibold">Exercises:</p>
              <ul className="list-disc ml-6">
                {details.exercises.map((exercise, index) => (
                  <li key={index} className="text-white mb-1">
                    <div>
                      <strong>{exercise.name}</strong>
                    </div>
                    <div className="text-gray-300 text-sm">
                      Sets: {exercise.sets}, Reps: {exercise.reps}, Rest:{" "}
                      {exercise.rest}
                    </div>
                    {exercise.modification && (
                      <div className="text-gray-400 text-xs">
                        Modification: {exercise.modification}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-2 text-gray-300">
              <strong>Cool-down:</strong> {details.coolDown}
            </p>
          </div>
        ))}
      </div>

      {/* Progression Plan */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-2xl text-pink-500 font-bold mb-4">
          Progression Plan
        </h3>
        <ul className="list-disc ml-6">
          {Object.entries(data.progressionPlan).map(
            ([strategy, description]) => (
              <li key={strategy} className="text-white mb-1">
                <span className="font-semibold">{strategy}:</span> {description}
              </li>
            )
          )}
        </ul>
      </div>

      {/* Additional Tips */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-2xl text-pink-500 font-bold mb-4">
          Additional Tips
        </h3>
        <ul className="list-disc ml-6">
          {Object.entries(data.additionalTips).map(([tip, advice]) => (
            <li key={tip} className="text-white mb-1">
              <span className="font-semibold">{tip}:</span> {advice}
            </li>
          ))}
        </ul>
      </div>

      {/* Nutritional Advice (if available) */}
      {data.nutritionalAdvice && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-2xl text-pink-500 font-bold mb-4">
            Nutritional Advice
          </h3>
          <ul className="list-disc ml-6">
            {Object.entries(data.nutritionalAdvice).map(([key, value]) => (
              <li key={key} className="text-white mb-1">
                <span className="font-semibold">{key}:</span> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
