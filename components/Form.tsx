"use client";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface WorkoutFormData {
  goal: string;
  gender: string;
  age: string;
  weight: string;
  height: string;
  experienceLevel: string;
  trainingMethod: string;
  workoutType: string;
  strengthLevel: string;
  preferredWorkoutTime: string;
}

export default function WorkoutForm() {
  const [formData, setFormData] = useState<WorkoutFormData>({
    goal: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
    experienceLevel: "",
    trainingMethod: "",
    workoutType: "",
    strengthLevel: "",
    preferredWorkoutTime: "",
  });

  const handleChange = (key: keyof WorkoutFormData, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className="flex flex-col items-center text-center bg-gray-900 rounded-2xl w-full max-w-6xl mx-auto my-20 p-6">
      <h2 className="text-6xl font-bold text-white mb-14">
        🏋️Free Personalized Workout Plan
      </h2>
      <p className="text-gray-400 mb-6">
        Fill in your details to get a custom AI-powered workout plan.
      </p>
      <Card className="w-full bg-gray-800 border-gray-900  rounded-lg py-16">
        <CardContent className="flex flex-col gap-4">
          <label className="text-white  text-left">
            What is your fitness goal?
          </label>
          <Input
            placeholder="e.g., Lose weight, Gain muscle, Improve endurance"
            value={formData.goal}
            onChange={(e) => handleChange("goal", e.target.value)}
            className="bg-gray-700 text-white outline-none border-none placeholder-gray-400"
          />

          <label className="text-white text-left ">How old are you?</label>
          <Input
            type="number"
            placeholder="e.g., 25"
            value={formData.age}
            onChange={(e) => handleChange("age", e.target.value)}
            className="bg-gray-700 text-white placeholder-gray-400 outline-none border-none"
          />

          <label className="text-white text-left">
            What is your weight (kg)?
          </label>
          <Input
            type="number"
            placeholder="e.g., 70"
            value={formData.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
            className="bg-gray-700 text-white placeholder-gray-400 outline-none border-none"
          />

          <label className="text-white text-left">
            What is your height (cm)?
          </label>
          <Input
            type="number"
            placeholder="e.g., 175"
            value={formData.height}
            onChange={(e) => handleChange("height", e.target.value)}
            className="bg-gray-700 text-white placeholder-gray-400 outline-none border-none"
          />

          <label className="text-white text-left">Select your gender</label>
          <Select onValueChange={(value) => handleChange("gender", value)}>
            <SelectTrigger className="bg-gray-700 outline-none border-none text-white">
              <SelectValue placeholder="Choose gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <label className="text-white text-left">
            What is your experience level?
          </label>
          <Select
            onValueChange={(value) => handleChange("experienceLevel", value)}
          >
            <SelectTrigger className="bg-gray-700 outline-none border-none text-white">
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>

          <label className="text-white text-left">
            Preferred training method?
          </label>
          <Select
            onValueChange={(value) => handleChange("trainingMethod", value)}
          >
            <SelectTrigger className="bg-gray-700 outline-none border-none text-white">
              <SelectValue placeholder="Select training method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bodyweight">Bodyweight</SelectItem>
              <SelectItem value="weights">Weights</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
            </SelectContent>
          </Select>

          <label className="text-white text-left text-left">
            Preferred workout type?
          </label>
          <Select onValueChange={(value) => handleChange("workoutType", value)}>
            <SelectTrigger className="bg-gray-700 outline-none border-none text-white">
              <SelectValue placeholder="Select workout type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="strength">Strength</SelectItem>
              <SelectItem value="cardio">Cardio</SelectItem>
              <SelectItem value="endurance">Endurance</SelectItem>
            </SelectContent>
          </Select>

          <label className="text-white text-left text-left">
            Current strength level?
          </label>
          <Select
            onValueChange={(value) => handleChange("strengthLevel", value)}
          >
            <SelectTrigger className="bg-gray-700 outline-none border-none text-white">
              <SelectValue placeholder="Select strength level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>

          <label className="text-white text-left text-left">
            Preferred workout time?
          </label>
          <Select
            onValueChange={(value) =>
              handleChange("preferredWorkoutTime", value)
            }
          >
            <SelectTrigger className="bg-gray-700 outline-none border-none text-white">
              <SelectValue placeholder="Select workout time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="afternoon">Afternoon</SelectItem>
              <SelectItem value="evening">Evening</SelectItem>
            </SelectContent>
          </Select>

          <Button className="mt-4 bg-pink-600 hover:bg-pink-700 text-white text-lg py-3">
            Generate My Workout Plan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
