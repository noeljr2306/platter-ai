"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";


export function SignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("Signed up as:", userCredential.user.email);
      router.push("/personalize")
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error(err);
      } else {
        setError("An unknown error occurred.");
        console.error(err);
      }
    }
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Signed up with Google as:", result.user.email);
      // Optionally redirect
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Google sign-in failed.");
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-gradient">
            Platter AI
          </CardTitle>
          <CardDescription className="text-gray-600">
            Create an account to start planning your meals.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-9"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-9"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-9"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center space-x-2 pt-2">
              <div className="h-px flex-1 bg-gray-300" />
              <p className="text-sm text-gray-500">or continue with Google</p>
              <div className="h-px flex-1 bg-gray-300" />
            </div>

            <div className="pt-2">
              <Button
                type="button"
                onClick={handleGoogleSignup}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <FcGoogle className="h-5 w-5" />
                Continue with Google
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="btn w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>

            <div className="flex w-full justify-between text-sm text-gray-600 pt-4">
              <p>© {new Date().getFullYear()} Platter AI</p>
              <p>
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-[#00dea3] hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
