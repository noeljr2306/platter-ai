"use client";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { auth } from "@/lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
// Animation
import { AnimatePresence, motion } from "framer-motion";

const diets = ["Vegetarian", "Keto", "Halal", "Pescatarian", "No Preference"];
const goals = ["Weight Loss", "Muscle Gain", "Maintain Weight"];
const allergies = ["Dairy", "Gluten", "Nuts", "Eggs", "Soy"];
const steps = ["Diet", "Allergies", "Goal", "Meals"];
const accent = "#00dea3";

export default function PersonalizeForm() {
  const [step, setStep] = useState(1);
  const [selectedDiet, setSelectedDiet] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const db = getFirestore();

  const toggleAllergy = (item: string) => {
    if (selectedAllergies.includes(item)) {
      setSelectedAllergies(selectedAllergies.filter((a) => a !== item));
    } else {
      setSelectedAllergies([...selectedAllergies, item]);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    const userDoc = doc(db, "users", user.uid);
    await setDoc(
      userDoc,
      {
        hasPersonalized: true,
        dietType: selectedDiet,
        allergies: selectedAllergies,
        goal: selectedGoal,
        mealsPerDay,
      },
      { merge: true }
    );
    router.push("/dashboard");
  };

  
  const Stepper = () => (
    <div className="flex items-center justify-between mb-8 px-4">
      {steps.map((label, idx) => {
        const current = idx + 1 === step;
        const completed = idx + 1 < step;
        return (
          <div
            key={label}
            className="flex-1 flex flex-col items-center relative"
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                current
                  ? `border-[${accent}] bg-[${accent}] text-white`
                  : completed
                  ? `border-[${accent}] bg-white text-[${accent}]`
                  : "border-gray-300 bg-white text-gray-400"
              } transition-colors duration-300`}
              style={
                current || completed
                  ? {
                      borderColor: accent,
                      color: current ? "#fff" : accent,
                      background: current ? accent : "#fff",
                    }
                  : {}
              }
            >
              {completed ? <span className="text-lg">✓</span> : idx + 1}
            </div>
            <span
              className="text-xs mt-2"
              style={current ? { color: accent, fontWeight: 600 } : {}}
            >
              {label}
            </span>
            {idx < steps.length - 1 && (
              <div
                className="absolute top-4 left-full w-full h-1"
                style={{
                  background: completed ? accent : "#e5e7eb",
                  zIndex: -1,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  // Animation variants
  const variants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-white to-[#e6fff6]">
      <Card className="w-full max-w-lg text-center shadow-2xl rounded-2xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-2">
            Personalize Your Meal Plan
          </CardTitle>
          <Stepper />
        </CardHeader>
        <CardContent className="space-y-6 min-h-[220px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  What&#39;s your diet type?
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {diets.map((diet) => (
                    <Button
                      key={diet}
                      variant={selectedDiet === diet ? "default" : "outline"}
                      style={
                        selectedDiet === diet
                          ? { background: accent, borderColor: accent }
                          : { borderColor: accent, color: accent }
                      }
                      className={`py-3 text-base font-medium transition-all duration-200 ${
                        selectedDiet === diet
                          ? "text-white"
                          : "hover:bg-[#e6fff6]"
                      }`}
                      onClick={() => setSelectedDiet(diet)}
                    >
                      {diet}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-xl font-semibold mb-4">Any allergies?</h2>
                <div className="grid grid-cols-2 gap-3">
                  {allergies.map((allergy) => (
                    <Button
                      key={allergy}
                      variant={
                        selectedAllergies.includes(allergy)
                          ? "default"
                          : "outline"
                      }
                      style={
                        selectedAllergies.includes(allergy)
                          ? { background: accent, borderColor: accent }
                          : { borderColor: accent, color: accent }
                      }
                      className={`py-3 text-base font-medium transition-all duration-200 ${
                        selectedAllergies.includes(allergy)
                          ? "text-white"
                          : "hover:bg-[#e6fff6]"
                      }`}
                      onClick={() => toggleAllergy(allergy)}
                    >
                      {allergy}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  What&#39;s your meal goal?
                </h2>
                <div className="flex flex-col gap-3">
                  {goals.map((goal) => (
                    <Button
                      key={goal}
                      variant={selectedGoal === goal ? "default" : "outline"}
                      style={
                        selectedGoal === goal
                          ? { background: accent, borderColor: accent }
                          : { borderColor: accent, color: accent }
                      }
                      className={`py-3 text-base font-medium transition-all duration-200 ${
                        selectedGoal === goal
                          ? "text-white"
                          : "hover:bg-[#e6fff6]"
                      }`}
                      onClick={() => setSelectedGoal(goal)}
                    >
                      {goal}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
            {step === 4 && (
              <motion.div
                key="step4"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  How many meals per day?
                </h2>
                <input
                  type="range"
                  min={1}
                  max={6}
                  value={mealsPerDay}
                  onChange={(e) => setMealsPerDay(parseInt(e.target.value))}
                  className="w-full accent-[#00dea3]"
                  style={{ accentColor: accent }}
                />
                <p
                  className="text-lg mt-2 font-medium"
                  style={{ color: accent }}
                >
                  {mealsPerDay} meals/day
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="justify-between mt-2">
          {step > 1 && (
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
              className="text-gray-500 hover:text-black"
            >
              Back
            </Button>
          )}
          {step < 4 ? (
            <Button
              onClick={() => setStep(step + 1)}
              style={{ background: accent, borderColor: accent }}
              className="text-white px-8 py-2 text-base font-semibold shadow-md hover:scale-105 transition-transform"
              disabled={
                (step === 1 && !selectedDiet) || (step === 3 && !selectedGoal)
              }
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              style={{ background: accent, borderColor: accent }}
              className="text-white px-8 py-2 text-base font-semibold shadow-md hover:scale-105 transition-transform"
            >
              Finish
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
