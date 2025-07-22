import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
export interface Preferences {
  dietType?: string;
  allergies?: string[];
  goal?: string;
  mealsPerDay?: number;
}
export async function savePreferences(
  userId: string,
  preferences: Preferences
) {
  await setDoc(doc(db, "preferences", userId), preferences);
}

export async function getPreferences(userId: string) {
  const docRef = doc(db, "preferences", userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}
