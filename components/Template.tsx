import { Button } from "./ui/button";
export default function StaticWorkoutExample() {
  const examplePlan = {
    weeklySchedule: {
      Monday: "Full Body Strength Training",
      Tuesday: "Cardio & Core",
      Wednesday: "Active Recovery",
      Thursday: "Upper Body Focus",
      Friday: "Lower Body Focus",
      Saturday: "HIIT Circuit",
      Sunday: "Rest Day",
    },
    dailyWorkouts: {
      Monday: {
        warmUp: "10 min dynamic stretching + 5 min jump rope",
        exercises: [
          {
            name: "Barbell Squats",
            sets: 4,
            reps: "8-10",
            rest: "90s",
            modification: "Use bodyweight if needed",
          },
          {
            name: "Bench Press",
            sets: 4,
            reps: "8-10",
            rest: "90s",
          },
          {
            name: "Pull-Ups",
            sets: 3,
            reps: "6-8",
            rest: "120s",
          },
        ],
        coolDown: "5 min static stretching + foam rolling",
      },
      Tuesday: {
        warmUp: "10 min brisk walk or light jog",
        exercises: [
          {
            name: "Running Intervals",
            sets: 6,
            reps: "1 min sprint/2 min walk",
            rest: "None between intervals",
          },
          {
            name: "Plank Circuit",
            sets: 3,
            reps: "30s front/30s each side",
            rest: "60s",
          },
        ],
        coolDown: "Deep breathing exercises",
      },
    },
    progressionPlan: {
      strengthTraining: "Increase weight 2.5kg weekly",
      cardio: "Reduce rest intervals by 10s each week",
      mobility: "Add 5min stretching daily",
    },
    nutritionalAdvice: {
      proteinIntake: "1.6g per kg bodyweight daily",
      hydration: "3L water minimum",
      mealTiming: "Pre-workout snack 60min before training",
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 border-b border-gray-700 pb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
              Example Workout Plan
            </h1>
            <div className="flex gap-2">
              <Button disabled className="opacity-50 cursor-not-allowed">
                Copy Plan
              </Button>
              <Button disabled className="opacity-50 cursor-not-allowed">
                Download PDF
              </Button>
            </div>
          </div>
          <p className="text-gray-400 mt-2">
            This is a preview of what your generated plan will look like
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-green-500 mb-4">
              Weekly Schedule
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(examplePlan.weeklySchedule).map(
                ([day, focus]) => (
                  <div key={day} className=" p-4 rounded-lg">
                    <p className="font-medium text-green-400">{day}</p>
                    <p className="text-gray-300">{focus}</p>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-green-500 mb-6">
              Daily Workouts
            </h3>
            {Object.entries(examplePlan.dailyWorkouts).map(([day, workout]) => (
              <div key={day} className="mb-8">
                <h4 className="text-lg font-bold text-green-400 mb-4">{day}</h4>
                <div className="space-y-4">
                  <div className=" p-4 rounded-lg">
                    <p className="font-medium text-green-400">Warm-up</p>
                    <p className="text-gray-300">{workout.warmUp}</p>
                  </div>

                  {workout.exercises.map((exercise, index) => (
                    <div key={index} className="p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-green-300">
                            {exercise.name}
                          </p>
                          <p className="text-gray-300">
                            {exercise.sets} sets × {exercise.reps} reps
                          </p>
                          <p className="text-sm text-gray-400">
                            Rest: {exercise.rest}
                          </p>
                        </div>
                      </div>
                      {exercise.modification && (
                        <div className="mt-2 text-sm bg-green-900/30 p-2 rounded">
                          <span className="text-green-400">Modification:</span>{" "}
                          {exercise.modification}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className=" p-4 rounded-lg">
                    <p className="font-medium text-green-400">Cool Down</p>
                    <p className="text-gray-300">{workout.coolDown}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-green-500 mb-4">
                Progression Plan
              </h3>
              <ul className="space-y-3">
                {Object.entries(examplePlan.progressionPlan).map(
                  ([key, value]) => (
                    <li key={key} className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      <div>
                        <span className="font-medium">{key}:</span>{" "}
                        <span className="text-gray-300">{value}</span>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-green-500 mb-4">
                Nutritional Advice
              </h3>
              <ul className="space-y-3">
                {Object.entries(examplePlan.nutritionalAdvice).map(
                  ([key, value]) => (
                    <li key={key} className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      <div>
                        <span className="font-medium">{key}:</span>{" "}
                        <span className="text-gray-300">{value}</span>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-green-900/20 rounded-xl text-center">
          <p className="text-gray-400">
            This is a static example. Generate your own plan to get personalized
            recommendations!
          </p>
        </div>
      </div>
    </div>
  );
}
