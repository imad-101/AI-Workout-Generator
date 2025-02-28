"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

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

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  modification?: string;
}

interface DailyWorkout {
  warmUp: string;
  exercises: Exercise[];
  coolDown: string;
}

interface WorkoutPlan {
  weeklySchedule: Record<string, string>;
  dailyWorkouts: Record<string, DailyWorkout>;
  progressionPlan: Record<string, string>;
  additionalTips: Record<string, string>;
  nutritionalAdvice?: Record<string, string>;
}

type Field = {
  label: string;
  key: keyof WorkoutFormData;
  type: "input" | "select";
  placeholder?: string;
  inputType?: string;
  options?: { value: string; label: string }[];
};

interface FormStep {
  title: string;
  description: string;
  fields: Field[];
}

export default function WorkoutForm() {
  const [error, setError] = useState("");
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
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

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleChange = (key: keyof WorkoutFormData, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/generate-workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setWorkoutPlan(data.workoutPlan);
        setError("");
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to fetch the workout plan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formSteps: FormStep[] = [
    {
      title: "Your Goals",
      description: "Let's start with your fitness objectives",
      fields: [
        {
          label: "What is your primary fitness goal?",
          key: "goal",
          type: "input",
          placeholder: "e.g., Lose weight, Build muscle, Run a marathon",
        },
      ],
    },
    {
      title: "About You",
      description: "Tell us a bit about yourself",
      fields: [
        {
          label: "Gender",
          key: "gender",
          type: "select",
          options: [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ],
        },
        {
          label: "Age",
          key: "age",
          type: "input",
          inputType: "number",
          placeholder: "e.g., 25",
        },
        {
          label: "Weight (kg)",
          key: "weight",
          type: "input",
          inputType: "number",
          placeholder: "e.g., 70",
        },
        {
          label: "Height (cm)",
          key: "height",
          type: "input",
          inputType: "number",
          placeholder: "e.g., 175",
        },
      ],
    },
    {
      title: "Experience & Preferences",
      description: "Help us customize your workout",
      fields: [
        {
          label: "Experience Level",
          key: "experienceLevel",
          type: "select",
          options: [
            { value: "beginner", label: "Beginner" },
            { value: "intermediate", label: "Intermediate" },
            { value: "advanced", label: "Advanced" },
          ],
        },
        {
          label: "Current Strength Level",
          key: "strengthLevel",
          type: "select",
          options: [
            { value: "beginner", label: "Beginner" },
            { value: "intermediate", label: "Intermediate" },
            { value: "advanced", label: "Advanced" },
          ],
        },
        {
          label: "Preferred Training Method",
          key: "trainingMethod",
          type: "select",
          options: [
            { value: "bodyweight", label: "Bodyweight Exercises" },
            { value: "weights", label: "Weight Training" },
            { value: "mixed", label: "Mixed (Weights & Bodyweight)" },
          ],
        },
        {
          label: "Workout Type",
          key: "workoutType",
          type: "select",
          options: [
            { value: "strength", label: "Strength Training" },
            { value: "cardio", label: "Cardio" },
            { value: "endurance", label: "Endurance" },
            { value: "flexibility", label: "Flexibility & Mobility" },
            { value: "hybrid", label: "Hybrid Training" },
          ],
        },
        {
          label: "Preferred Workout Time",
          key: "preferredWorkoutTime",
          type: "select",
          options: [
            { value: "morning", label: "Morning" },
            { value: "afternoon", label: "Afternoon" },
            { value: "evening", label: "Evening" },
          ],
        },
      ],
    },
  ];

  const calculateProgress = () => {
    const filledFields = Object.values(formData).filter(
      (value) => value !== ""
    ).length;
    const totalFields = Object.keys(formData).length;
    return (filledFields / totalFields) * 100;
  };

  const handleDownloadPdf = async () => {
    if (!pdfRef.current) return;

    try {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 3,
        useCORS: true,
        logging: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("workout-plan.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. See console for details.");
    }
  };

  if (workoutPlan) {
    return (
      <div className="flex flex-col items-center bg-gradient-to-b from-gray-50 to-white rounded-3xl w-full max-w-5xl mx-auto my-10 p-6 shadow-lg">
        <div ref={pdfRef} className="w-full bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b pb-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
              Your Personal Workout Plan
            </h2>
            <div className="flex gap-2">
              {/* <Button onClick={handleCopy} variant="outline">
                📋 Copy Plan
              </Button> */}
              <Button
                onClick={handleDownloadPdf}
                className="bg-blue-600 hover:bg-blue-700"
              >
                📥 Download PDF
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Your Goal
              </h3>
              <p className="text-blue-700">{formData.goal}</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Weekly Schedule
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(workoutPlan.weeklySchedule).map(
                  ([day, focus]) => (
                    <div
                      key={day}
                      className="bg-white p-4 rounded-lg shadow-sm border"
                    >
                      <h4 className="font-semibold text-blue-600">{day}</h4>
                      <p className="text-gray-700">{focus}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Daily Workouts
              </h3>
              {Object.entries(workoutPlan.dailyWorkouts).map(
                ([day, workout]) => (
                  <div key={day} className="mb-8 bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold text-blue-600 mb-4">
                      {day}
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h5 className="font-semibold mb-2">Warm-up</h5>
                        <p className="text-gray-700">{workout.warmUp}</p>
                      </div>

                      {workout.exercises.map((exercise, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-lg shadow-sm"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-semibold">{exercise.name}</h5>
                              <p className="text-sm text-gray-600">
                                {exercise.sets} sets × {exercise.reps} reps
                                (Rest: {exercise.rest})
                              </p>
                            </div>
                          </div>
                          {exercise.modification && (
                            <div className="mt-2 text-sm text-blue-600">
                              💡 Modification: {exercise.modification}
                            </div>
                          )}
                        </div>
                      ))}

                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h5 className="font-semibold mb-2">Cool Down</h5>
                        <p className="text-gray-700">{workout.coolDown}</p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">
                  Progression Plan
                </h3>
                <ul className="space-y-3">
                  {Object.entries(workoutPlan.progressionPlan).map(
                    ([key, value]) => (
                      <li key={key} className="flex items-start">
                        <span className="text-blue-500 mr-2">▶</span>
                        <div>
                          <span className="font-medium">{key}:</span> {value}
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800 mb-4">
                  Nutritional Advice
                </h3>
                <ul className="space-y-3">
                  {Object.entries(workoutPlan.nutritionalAdvice || {}).map(
                    ([key, value]) => (
                      <li key={key} className="flex items-start">
                        <span className="text-green-500 mr-2">🍎</span>
                        <div>
                          <span className="font-medium">{key}:</span> {value}
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={() => setWorkoutPlan(null)}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white"
        >
          🏋️ Create New Plan
        </Button>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center  bg-gray-800 rounded-lg py-12 px-4"
      id="workout-form"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            Build Your Perfect Workout Plan
          </h1>
          <p className="text-gray-200 text-lg">
            Answer 8 simple questions to get your personalized fitness program
          </p>
        </div>

        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden  ">
          <div className="bg-green-600 h-2 w-full">
            <div
              className="h-full bg-yellow-500 transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>

          <CardContent className="p-6 md:p-8">
            <Tabs value={`step${currentStep}`} className="w-full">
              {formSteps.map((step, index) => (
                <TabsContent
                  key={index}
                  value={`step${index}`}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <div className="text-blue-600 text-sm font-semibold mb-2">
                      Step {index + 1} of {formSteps.length}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {step.title}
                    </h2>
                    <p className="text-gray-600 mt-2">{step.description}</p>
                  </div>

                  <div className="space-y-5">
                    {step.fields.map((field) => (
                      <div key={field.key} className="space-y-2">
                        <label className="block text-gray-700 font-medium">
                          {field.label}
                        </label>
                        {field.type === "input" ? (
                          <Input
                            type={field.inputType}
                            placeholder={field.placeholder}
                            value={formData[field.key]}
                            onChange={(e) =>
                              handleChange(field.key, e.target.value)
                            }
                            className="py-6 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <Select
                            value={formData[field.key]}
                            onValueChange={(value) =>
                              handleChange(field.key, value)
                            }
                          >
                            <SelectTrigger className="py-6 rounded-lg border-gray-300 text-left">
                              <SelectValue
                                placeholder={`Select ${field.label.toLowerCase()}`}
                              />
                            </SelectTrigger>
                            <SelectContent className="rounded-lg shadow-xl">
                              {field.options?.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                  className="py-3 hover:bg-blue-50"
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      disabled={currentStep === 0}
                      className="gap-2"
                    >
                      ← Previous
                    </Button>

                    {currentStep < formSteps.length - 1 ? (
                      <Button
                        onClick={() => setCurrentStep(currentStep + 1)}
                        className="bg-green-600 hover:bg-green-700 gap-2"
                      >
                        Next Step →
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-green-800 hover:bg-green-800 gap-2 py-6 text-lg"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin h-5 w-5 mr-3"
                              viewBox="0 0 24 24"
                            >
                              {/* Spinner SVG */}
                            </svg>
                            Generating Your Plan...
                          </span>
                        ) : (
                          <>🚀 Generate My Workout Plan</>
                        )}
                      </Button>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-6 text-sm text-gray-100 flex items-center justify-center gap-2">
          🔒 Your information is safe and secure
        </div>
      </motion.div>
    </div>
  );
}
