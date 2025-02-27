import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      goal,
      gender,
      age,
      weight,
      height,
      experienceLevel,
      trainingMethod,
      workoutType,
      strengthLevel,
      preferredWorkoutTime,
    } = body;

    // Validate required fields
    const requiredFields = [
      "goal",
      "gender",
      "age",
      "weight",
      "height",
      "experienceLevel",
      "trainingMethod",
      "workoutType",
      "strengthLevel",
      "preferredWorkoutTime",
    ];

    const missingFields = requiredFields.filter((field) => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const prompt = `
Generate a personalized workout plan based on the following details:

Goal: ${goal}
Gender: ${gender}
Age: ${age} years old
Weight: ${weight} kg
Height: ${height} cm
Experience Level: ${experienceLevel}
Training Method: ${trainingMethod}
Workout Type Preference: ${workoutType}
Current Strength Level: ${strengthLevel}
Preferred Workout Time: ${preferredWorkoutTime}

### Output Requirements:
1. Return valid JSON format only
2. Structure should include:
- weeklySchedule: { "Monday": "Full Body Strength", ... }
- dailyWorkouts: {
  "Monday": {
    "warmUp": "5-10 minute dynamic stretches...",
    "exercises": [
      {
        "name": "Exercise Name",
        "sets": 3,
        "reps": "8-12",
        "rest": "60s",
        "modification": "Optional modification"
      }, ...
    ],
    "coolDown": "5-10 minute static stretching..."
  }, ...
}
- progressionPlan: { "progressiveOverload": "...", ... }
- additionalTips: { "warmup": "...", ... }
- nutritionalAdvice: { "proteinIntake": "...", ... }

3. Keep explanations clear and concise
4. Ensure exercises match the user's experience level and available equipment
5. Include practical progression strategies
6. Provide actionable nutritional guidelines
`;

    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();

    // Clean and parse the JSON response
    const jsonString = textResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      const workoutPlan = JSON.parse(jsonString);
      return NextResponse.json({ workoutPlan });
    } catch (error) {
      console.error("JSON Parsing Error:", error);
      return NextResponse.json(
        { error: "Failed to parse workout plan" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error generating workout plan:", error);
    return NextResponse.json(
      { error: "Failed to generate workout plan" },
      { status: 500 }
    );
  }
}
