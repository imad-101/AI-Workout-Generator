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

// NEW imports
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

type Field =
  | {
      label: string;
      key: keyof WorkoutFormData;
      type: "input";
      placeholder: string;
      inputType?: string;
    }
  | {
      label: string;
      key: keyof WorkoutFormData;
      type: "select";
      options: { value: string; label: string }[];
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

  // NEW: reference to the output container for PDF capture
  const pdfRef = useRef<HTMLDivElement>(null);

  // ------------------ HANDLERS ------------------

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

  // ------------------ FORM STEPS ------------------

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

  // ------------------ PROGRESS CALCULATION ------------------

  const calculateProgress = () => {
    const filledFields = Object.values(formData).filter(
      (value) => value !== ""
    ).length;
    const totalFields = Object.keys(formData).length;
    return (filledFields / totalFields) * 100;
  };

  // ------------------ COPY & PDF GENERATION ------------------

  // We still keep a text version for the "Copy" button:
  const generatePlanDocumentText = () => {
    if (!workoutPlan) return "";
    let text = "Workout Plan Templates & Examples\n\n";

    text += "INPUT:\n";
    text += `• Goal: ${formData.goal || "N/A"}\n\n`;

    text += "OUTPUT:\n";
    // Weekly schedule
    text += "Weekly Schedule:\n";
    for (const [day, focus] of Object.entries(workoutPlan.weeklySchedule)) {
      text += `- ${day}: ${focus}\n`;
    }
    text += "\nDaily Workouts:\n";
    for (const [day, workout] of Object.entries(workoutPlan.dailyWorkouts)) {
      text += `\n${day}:\n`;
      text += `  Warm-up: ${workout.warmUp}\n`;
      text += "  Exercises:\n";
      workout.exercises.forEach((exercise, index) => {
        text += `    ${index + 1}. ${exercise.name} - ${exercise.sets} sets x ${
          exercise.reps
        } reps (Rest: ${exercise.rest})\n`;
        if (exercise.modification) {
          text += `       Modification: ${exercise.modification}\n`;
        }
      });
      text += `  Cool Down: ${workout.coolDown}\n`;
    }
    text += "\nProgression Plan:\n";
    for (const [key, value] of Object.entries(workoutPlan.progressionPlan)) {
      text += `- ${key.replace(/([A-Z])/g, " $1").trim()}: ${value}\n`;
    }
    text += "\nAdditional Tips:\n";
    for (const [key, value] of Object.entries(workoutPlan.additionalTips)) {
      text += `- ${key.replace(/([A-Z])/g, " $1").trim()}: ${value}\n`;
    }
    if (workoutPlan.nutritionalAdvice) {
      text += "\nNutritional Advice:\n";
      for (const [key, value] of Object.entries(
        workoutPlan.nutritionalAdvice
      )) {
        text += `- ${key.replace(/([A-Z])/g, " $1").trim()}: ${value}\n`;
      }
    }

    return text;
  };

  // Copy button (just copies text version)
  const handleCopy = async () => {
    const text = generatePlanDocumentText();
    try {
      await navigator.clipboard.writeText(text);
      alert("Workout plan copied to clipboard!");
    } catch (err) {
      alert("Failed to copy workout plan.");
    }
  };

  // NEW: Download PDF that looks like the on-screen styling
  const handleDownloadPdf = async () => {
    if (!pdfRef.current) return;

    try {
      // 1) Capture the PDF container as a canvas
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2, // Higher scale = sharper text but larger file
      });

      // 2) Initialize jsPDF
      const pdf = new jsPDF("p", "pt", "a4");

      // 3) Convert the canvas to an image
      const imgData = canvas.toDataURL("image/png");

      // 4) Calculate dimensions to fit A4 page
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // We'll scale it down to fit, preserving aspect ratio
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;

      // 5) Add image to PDF
      pdf.addImage(imgData, "PNG", 0, 0, newWidth, newHeight);

      // 6) Save the PDF
      pdf.save("workout-plan.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. See console for details.");
    }
  };

  // ------------------ RENDER: RESULT OR FORM ------------------

  if (workoutPlan) {
    return (
      <div className="flex flex-col items-center text-center bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl w-full max-w-5xl mx-auto my-10 p-6 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full text-gray-100"
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-3xl font-bold mb-4 md:mb-0">
              Workout Plan Templates & Examples
            </h2>
            <div className="flex space-x-2">
              <Button
                onClick={handleCopy}
                className="bg-gray-700 hover:bg-gray-600 text-white"
              >
                Copy
              </Button>
              <Button
                onClick={handleDownloadPdf}
                className="bg-gray-700 hover:bg-gray-600 text-white"
              >
                Download as PDF
              </Button>
              <Button
                onClick={() => setWorkoutPlan(null)}
                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white"
              >
                Generate New Plan
              </Button>
            </div>
          </div>

          {/* This is the section we want to "print" to PDF */}
          <div
            ref={pdfRef} // reference for PDF capture
            className="bg-gray-800/40 p-6 rounded-lg text-left"
          >
            {/* INPUT Section */}
            <h3 className="text-lg font-bold uppercase text-gray-400 mb-2">
              INPUT
            </h3>
            <p className="mb-6">
              <span className="font-semibold">Goal:</span>{" "}
              {formData.goal || "N/A"}
            </p>

            {/* OUTPUT Section */}
            <h3 className="text-lg font-bold uppercase text-gray-400 mb-2">
              OUTPUT
            </h3>

            {/* Weekly Schedule */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-pink-500 mb-2">
                Weekly Schedule
              </h4>
              <ul className="list-disc ml-6 space-y-1">
                {Object.entries(workoutPlan.weeklySchedule).map(
                  ([day, focus]) => (
                    <li key={day}>
                      <span className="font-semibold">{day}:</span> {focus}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Daily Workouts */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-purple-400 mb-2">
                Daily Workouts
              </h4>
              {Object.entries(workoutPlan.dailyWorkouts).map(
                ([day, workout]) => (
                  <div key={day} className="mb-4">
                    <h5 className="font-bold text-pink-500">{day}</h5>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>
                        <span className="font-semibold">Warm-up:</span>{" "}
                        {workout.warmUp}
                      </li>
                      <li>
                        <span className="font-semibold">Exercises:</span>
                        <ul className="list-disc ml-6 mt-1 space-y-1">
                          {workout.exercises.map((exercise, index) => (
                            <li key={index}>
                              <span className="font-semibold">
                                {exercise.name}
                              </span>
                              : {exercise.sets} sets × {exercise.reps} reps (
                              Rest: {exercise.rest})
                              {exercise.modification && (
                                <div className="ml-4 text-sm text-pink-300">
                                  Modification: {exercise.modification}
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li>
                        <span className="font-semibold">Cool Down:</span>{" "}
                        {workout.coolDown}
                      </li>
                    </ul>
                  </div>
                )
              )}
            </div>

            {/* Progression Plan */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-pink-500 mb-2">
                Progression Plan
              </h4>
              <ul className="list-disc ml-6 space-y-1">
                {Object.entries(workoutPlan.progressionPlan).map(
                  ([key, value]) => (
                    <li key={key}>
                      <span className="font-semibold">
                        {key.replace(/([A-Z])/g, " $1").trim()}:
                      </span>{" "}
                      {value}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Additional Tips */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-purple-400 mb-2">
                Additional Tips
              </h4>
              <ul className="list-disc ml-6 space-y-1">
                {Object.entries(workoutPlan.additionalTips).map(
                  ([key, value]) => (
                    <li key={key}>
                      <span className="font-semibold">
                        {key.replace(/([A-Z])/g, " $1").trim()}:
                      </span>{" "}
                      {value}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Nutritional Advice (if present) */}
            {workoutPlan.nutritionalAdvice && (
              <div>
                <h4 className="text-xl font-semibold text-pink-500 mb-2">
                  Nutritional Advice
                </h4>
                <ul className="list-disc ml-6 space-y-1">
                  {Object.entries(workoutPlan.nutritionalAdvice).map(
                    ([key, value]) => (
                      <li key={key}>
                        <span className="font-semibold">
                          {key.replace(/([A-Z])/g, " $1").trim()}:
                        </span>{" "}
                        {value}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // ------------------ FORM UI (NO WORKOUT PLAN YET) ------------------
  return (
    <div className="flex flex-col items-center text-center bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl w-full max-w-6xl mx-auto my-10 p-4 md:p-8 shadow-2xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="flex items-center justify-center mb-6">
          <span className="text-4xl mr-3 hidden sm:block">🏋️</span>
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
            Your Free Custom Workout Plan
          </h2>
        </div>

        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Answer a few quick questions and our AI will create a personalized
          workout plan designed specifically for your goals and lifestyle.
        </p>

        <Card className="w-full bg-gray-800/50 border border-gray-700 rounded-xl backdrop-blur-sm shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 h-1">
            <div
              className="h-full bg-gradient-to-r from-pink-600 to-purple-600 transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>

          <CardContent className="pt-6 pb-8 px-6">
            <Tabs
              defaultValue="step0"
              value={`step${currentStep}`}
              className="w-full"
            >
              <div className="flex justify-between mb-6">
                <TabsList className="hidden md:grid md:grid-cols-3 bg-gray-700/30">
                  {formSteps.map((step, index) => (
                    <TabsTrigger
                      key={`tab-${index}`}
                      value={`step${index}`}
                      onClick={() => setCurrentStep(index)}
                      className={`data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600/80 data-[state=active]:to-purple-600/80 ${
                        index <= currentStep ? "text-white" : "text-gray-400"
                      }`}
                    >
                      <span className="mr-2">{index + 1}</span>
                      {step.title}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <div className="md:hidden text-sm font-medium text-gray-300">
                  Step {currentStep + 1} of {formSteps.length}
                </div>

                <div className="flex items-center space-x-1 text-sm font-medium text-gray-300">
                  <span>Progress:</span>
                  <span className="text-pink-500">
                    {Math.round(calculateProgress())}%
                  </span>
                </div>
              </div>

              {formSteps.map((step, stepIndex) => (
                <TabsContent
                  key={`content-${stepIndex}`}
                  value={`step${stepIndex}`}
                  className="mt-0"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 mb-6">{step.description}</p>

                    <div className="space-y-5">
                      {step.fields.map((field, fieldIndex) => (
                        <motion.div
                          key={`field-${stepIndex}-${fieldIndex}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: fieldIndex * 0.1 }}
                          className="text-left"
                        >
                          <label className="block text-white font-medium mb-2">
                            {field.label}
                          </label>
                          {field.type === "input" ? (
                            <Input
                              type={field.inputType || "text"}
                              placeholder={field.placeholder}
                              value={formData[field.key]}
                              onChange={(e) =>
                                handleChange(field.key, e.target.value)
                              }
                              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-pink-500 focus:ring focus:ring-pink-500/20 transition-all"
                            />
                          ) : (
                            <Select
                              onValueChange={(value) =>
                                handleChange(field.key, value)
                              }
                              value={formData[field.key]}
                            >
                              <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-pink-500 focus:ring focus:ring-pink-500/20 transition-all">
                                <SelectValue
                                  placeholder={`Select ${field.label.toLowerCase()}`}
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-700 border-gray-600">
                                {field.options?.map(
                                  (option: {
                                    value: string;
                                    label: string;
                                  }) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                      className="text-white focus:bg-pink-500"
                                    >
                                      {option.label}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button
                        variant="outline"
                        onClick={() =>
                          setCurrentStep(Math.max(0, currentStep - 1))
                        }
                        disabled={currentStep === 0}
                        className="bg-transparent border border-gray-600 text-white hover:bg-gray-700"
                      >
                        Previous
                      </Button>

                      {currentStep < formSteps.length - 1 ? (
                        <Button
                          onClick={() =>
                            setCurrentStep(
                              Math.min(formSteps.length - 1, currentStep + 1)
                            )
                          }
                          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white border-0"
                        >
                          Continue
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white border-0 min-w-32"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center">
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </span>
                          ) : (
                            "Create My Workout Plan"
                          )}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center mt-6 text-gray-400 text-sm">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            ></path>
          </svg>
          <span>Your data is secure and will never be shared</span>
        </div>
      </motion.div>
    </div>
  );
}
