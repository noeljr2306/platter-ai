import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge"

import {
  Calendar,
  TrendingUp,
  ChefHat,
  Target,
  RefreshCw,
  Settings,
  ShoppingCart,
  Zap,
} from "lucide-react";

const Dashboard = () => {
  const currentHour = new Date().getHours();

  const getGreeting = () => {
    if (currentHour < 12) return "Good morning";
    if (currentHour < 17) return "Good afternoon";
    return "Good evening";
  };

  const mealPlan = {
    Mon: {
      breakfast: {
        name: "Overnight Oats",
        calories: 320,
        protein: 12,
        carbs: 45,
        fats: 8,
        image: "🥣",
      },
      lunch: {
        name: "Grilled Chicken Salad",
        calories: 450,
        protein: 35,
        carbs: 15,
        fats: 25,
        image: "🥗",
      },
      dinner: {
        name: "Salmon & Quinoa",
        calories: 520,
        protein: 40,
        carbs: 35,
        fats: 22,
        image: "🐟",
      },
    },
    Tue: {
      breakfast: {
        name: "Greek Yogurt Bowl",
        calories: 280,
        protein: 20,
        carbs: 25,
        fats: 12,
        image: "🥛",
      },
      lunch: {
        name: "Turkey Wrap",
        calories: 380,
        protein: 28,
        carbs: 32,
        fats: 16,
        image: "🌯",
      },
      dinner: {
        name: "Beef Stir Fry",
        calories: 480,
        protein: 38,
        carbs: 28,
        fats: 24,
        image: "🥘",
      },
    },
    Wed: {
      breakfast: {
        name: "Avocado Toast",
        calories: 350,
        protein: 8,
        carbs: 35,
        fats: 22,
        image: "🥑",
      },
      lunch: {
        name: "Quinoa Buddha Bowl",
        calories: 420,
        protein: 16,
        carbs: 55,
        fats: 18,
        image: "🍲",
      },
      dinner: {
        name: "Grilled Shrimp",
        calories: 380,
        protein: 45,
        carbs: 12,
        fats: 15,
        image: "🍤",
      },
    },
  };

  const suggestions = [
    {
      name: "High-Protein Smoothie",
      reason: "Based on your fitness goals",
      calories: 280,
      type: "breakfast",
    },
    {
      name: "Mediterranean Salad",
      reason: "Heart-healthy option",
      calories: 350,
      type: "lunch",
    },
    {
      name: "Lentil Curry",
      reason: "Using pantry ingredients",
      calories: 420,
      type: "dinner",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <Card
          className="bg-gradient-to-r"
          style={{
            background: "linear-gradient(to right, #00dea3, #00dea3cc)",
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {getGreeting()}, Alex!
                </h1>
                <p className="text-primary-foreground/90 mt-1">
                  Ready to fuel your day with healthy choices?
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Meal Plan - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" style={{ color: "#00dea3" }} />
                  Weekly Meal Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
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
                          className="text-xs"
                          style={{ borderColor: "#00dea3", color: "#00dea3" }}
                        >
                          {Object.values(meals).reduce(
                            (total, meal) => total + meal.calories,
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
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">{meal.image}</span>
                              <div className="flex-1">
                                <p className="font-medium text-sm">
                                  {meal.name}
                                </p>
                                <p className="text-xs text-gray-500 capitalize">
                                  {mealType}
                                </p>
                              </div>
                            </div>
                            <div className="text-xs text-gray-600 grid grid-cols-2 gap-1">
                              <span>{meal.calories} cal</span>
                              <span>{meal.protein}g protein</span>
                              <span>{meal.carbs}g carbs</span>
                              <span>{meal.fats}g fats</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right sidebar with Smart Suggestions and Progress */}
          <div className="space-y-6">
            {/* Smart Suggestions Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" style={{ color: "#00dea3" }} />
                  Smart Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-3 bg-gray-50/50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{suggestion.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {suggestion.calories} cal
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {suggestion.reason}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs"
                      style={{ borderColor: "#00dea3", color: "#00dea3" }}
                    >
                      Add to {suggestion.type}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Progress Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" style={{ color: "#00dea3" }} />
                  Progress Tracker
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Weekly Adherence</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress
                    value={85}
                    className="h-2"
                    style={{ backgroundColor: "#00dea3" }}
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Caloric Goals</span>
                    <span className="font-medium">1,850 / 2,000</span>
                  </div>
                  <Progress
                    value={92.5}
                    className="h-2"
                    style={{ backgroundColor: "#00dea3" }}
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Protein Target</span>
                    <span className="font-medium">120g / 150g</span>
                  </div>
                  <Progress
                    value={80}
                    className="h-2"
                    style={{ backgroundColor: "#00dea3" }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5" style={{ color: "#00dea3" }} />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <Button
                variant="outline"
                className="flex flex-col gap-2 h-auto py-4"
              >
                <Calendar className="h-5 w-5" style={{ color: "#00dea3" }} />
                <span className="text-xs">Edit Plan</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col gap-2 h-auto py-4"
              >
                <RefreshCw className="h-5 w-5" style={{ color: "#00dea3" }} />
                <span className="text-xs">Regenerate</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col gap-2 h-auto py-4"
              >
                <Settings className="h-5 w-5" style={{ color: "#00dea3" }} />
                <span className="text-xs">Preferences</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col gap-2 h-auto py-4"
              >
                <ShoppingCart
                  className="h-5 w-5"
                  style={{ color: "#00dea3" }}
                />
                <span className="text-xs">Grocery List</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col gap-2 h-auto py-4"
              >
                <TrendingUp className="h-5 w-5" style={{ color: "#00dea3" }} />
                <span className="text-xs">Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
