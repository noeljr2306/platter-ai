import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAHMALY6UQWmbYqkJtmf0wzXbJagmZrRjI",
  authDomain: "platter-ai-43101.firebaseapp.com",
  projectId: "platter-ai-43101",
  storageBucket: "platter-ai-43101.firebasestorage.app",
  messagingSenderId: "693120868466",
  appId: "1:693120868466:web:74f4ab53c8b4bb14cc22eb",
  measurementId: "G-GKVYZCYV16"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
