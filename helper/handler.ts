import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

export const generateWeeklyPlan = async (preferences: {
  hasPersonalized: boolean;
  dietType: string | null;
  allergies: string[];
  goal: string | null;
  mealsPerDay: number | null;
}) => {
  try {
    const response = await fetch("/api/generateWeeklyPlan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ preferences }),
    });
    if (!response.ok) {
      const error = await response.json();
      console.error("API error:", error);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error calling generateWeeklyPlan API:", err);
    return null;
  }
};

function removeUndefined(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(removeUndefined);
  } else if (obj && typeof obj === "object") {
    return Object.entries(obj as Record<string, unknown>)
      .filter(([, v]) => v !== undefined)
      .reduce((acc, [k, v]) => {
        acc[k] = removeUndefined(v);
        return acc;
      }, {} as Record<string, unknown>);
  }
  return obj;
}

export async function writeWeeklyPlan(userId: string, data: object) {
  if (!userId) throw new Error("userId is required");
  if (typeof data !== "object" || data === null)
    throw new Error("Data must be a non-null object");
  const db = getFirestore();
  const sanitizedData = removeUndefined(data);
  try {
    await setDoc(doc(db, "users", userId, "weeklyPlan", "data"), sanitizedData);
  } catch (err) {
    console.error("Firestore write error in writeWeeklyPlan:", err);
    throw err;
  }
}

export async function readWeeklyPlan(userId: string) {
  if (!userId) throw new Error("userId is required");
  const db = getFirestore();
  const planRef = doc(db, "users", userId, "weeklyPlan", "data");
  const planSnap = await getDoc(planRef);
  return planSnap.exists() ? planSnap.data() : null;
}
