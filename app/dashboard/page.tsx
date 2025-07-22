"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Calendar } from "lucide-react";
import { auth } from "@/lib/firebaseConfig";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { writeWeeklyPlan } from "@/helper/handler";
import { generateWeeklyPlan } from "@/helper/handler";

interface Meal {
  name: string;
  ingredients: string[];
  portion: string;
  calories: number;
}
interface DayMeals {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}
type MealPlan = Record<string, DayMeals>;

const Dashboard = () => {
  const currentHour = new Date().getHours();
  const [mealPlan, setMealPlan] = React.useState<MealPlan | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [userName, setUserName] = React.useState<string>("User");

  const regenerateWeeklyPlan = async () => {
    setLoading(true);
    const user = auth.currentUser;
    if (!user) return;
    const preferencesRef = doc(db, "users", user.uid, "preferences", "data");
    const preferencesSnap = await getDoc(preferencesRef);
    if (!preferencesSnap.exists()) return;
    const preferences = preferencesSnap.data() as {
      hasPersonalized: boolean;
      dietType: string | null;
      allergies: string[];
      goal: string | null;
      mealsPerDay: number | null;
    };
    const generated = await generateWeeklyPlan(preferences);
    if (generated?.mealPlan) {
      setMealPlan(generated.mealPlan);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    const fetchMealPlan = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }
      setUserName(user.displayName || "User");
      const planRef = doc(db, "users", user.uid, "weeklyPlan", "data");
      const planSnap = await getDoc(planRef);
      if (planSnap.exists()) {
        setMealPlan(planSnap.data().meals);
      } else {
        const defaultPlan = {
          meals: {
            Monday: {
              breakfast: {
                name: "",
                ingredients: [],
                portion: "",
                calories: 0,
              },
              lunch: { name: "", ingredients: [], portion: "", calories: 0 },
              dinner: { name: "", ingredients: [], portion: "", calories: 0 },
            },
            Tuesday: {
              breakfast: {
                name: "",
                ingredients: [],
                portion: "",
                calories: 0,
              },
              lunch: { name: "", ingredients: [], portion: "", calories: 0 },
              dinner: { name: "", ingredients: [], portion: "", calories: 0 },
            },
            Wednesday: {
              breakfast: {
                name: "",
                ingredients: [],
                portion: "",
                calories: 0,
              },
              lunch: { name: "", ingredients: [], portion: "", calories: 0 },
              dinner: { name: "", ingredients: [], portion: "", calories: 0 },
            },
            Thursday: {
              breakfast: {
                name: "",
                ingredients: [],
                portion: "",
                calories: 0,
              },
              lunch: { name: "", ingredients: [], portion: "", calories: 0 },
              dinner: { name: "", ingredients: [], portion: "", calories: 0 },
            },
            Friday: {
              breakfast: {
                name: "",
                ingredients: [],
                portion: "",
                calories: 0,
              },
              lunch: { name: "", ingredients: [], portion: "", calories: 0 },
              dinner: { name: "", ingredients: [], portion: "", calories: 0 },
            },
            Saturday: {
              breakfast: {
                name: "",
                ingredients: [],
                portion: "",
                calories: 0,
              },
              lunch: { name: "", ingredients: [], portion: "", calories: 0 },
              dinner: { name: "", ingredients: [], portion: "", calories: 0 },
            },
            Sunday: {
              breakfast: {
                name: "",
                ingredients: [],
                portion: "",
                calories: 0,
              },
              lunch: { name: "", ingredients: [], portion: "", calories: 0 },
              dinner: { name: "", ingredients: [], portion: "", calories: 0 },
            },
          },
          groceryList: {
            Vegetables: [],
            Proteins: [],
            Grains: [],
            Dairy: [],
            Fruits: [],
            Others: [],
          },
          createdAt: Timestamp.now(),
        };
        await writeWeeklyPlan(user.uid, defaultPlan);
        setMealPlan(defaultPlan.meals);
      }
      setLoading(false);
    };
    fetchMealPlan();
  }, []);

  const getGreeting = () => {
    if (currentHour < 12) return "Good morning";
    if (currentHour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        
        <Card className="bg-gradient-to-r from-[#16f806] to-[#071c05] text-white">
          <CardContent className="p-6">
            <h1 className="text-2xl md:text-3xl font-bold">
              {getGreeting()}, {userName}!
            </h1>
            <p className="text-primary-foreground/90 mt-1">
              Here is your weekly diet plan.
            </p>
          </CardContent>
        </Card>

        
        <div className="flex gap-4 justify-end">
          <Button variant="outline" className="border-[#00dea3] text-[#00dea3]">
            Generate Grocery List
          </Button>
          <Button
            onClick={regenerateWeeklyPlan}
            variant="outline"
            className="border-[#00dea3] text-[#00dea3]"
          >
            Regenerate Plan
          </Button>
        </div>

        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" style={{ color: "#00dea3" }} />
              Weekly Meal Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading meal plan...</div>
            ) : !mealPlan ? (
              <div className="text-center py-8">No meal plan found.</div>
            ) : (
              <div className="space-y-4">
                {Object.entries(mealPlan).map(([day, meals]) => (
                  <div
                    key={day}
                    className="border rounded-lg p-4 bg-gray-50/50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{day}</h3>
                      <Badge
                        variant="outline"
                        className="text-xs border-[#00dea3] text-[#00dea3]"
                      >
                        {Object.values(meals).reduce(
                          (total, meal) => total + (meal.calories || 0),
                          0
                        )}{" "}
                        cal
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {Object.entries(meals).map(([mealType, meal]) => (
                        <div
                          key={mealType}
                          className="bg-white rounded-lg p-3 border border-gray-100"
                        >
                          <div className="mb-2">
                            <p className="font-medium text-sm">{meal.name}</p>
                            <p className="text-xs text-gray-500 capitalize">
                              {mealType}
                            </p>
                          </div>
                          <div className="text-xs text-gray-600 mb-1">
                            Portion: {meal.portion}
                          </div>
                          <div className="text-xs text-gray-600 mb-1">
                            Ingredients: {meal.ingredients.join(", ")}
                          </div>
                          {meal.calories && (
                            <div className="text-xs text-gray-600">
                              {meal.calories} cal
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
