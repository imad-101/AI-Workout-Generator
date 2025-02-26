"use client";
import { useState } from "react";
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

  const handleChange = (key: keyof WorkoutFormData, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Handle success
    }, 1500);
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
