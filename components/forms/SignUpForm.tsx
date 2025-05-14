"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Eye, EyeOff } from "lucide-react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Button } from "../ui/button";
import { auth, db } from "@/lib/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    birthdate: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
      setLoading(false);
      return;
    }

    try {
      setPasswordMatchError(false);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        gender: formData.gender,
        birthdate: formData.birthdate,
        phoneNumber: formData.phoneNumber,
        uid: user.uid,
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        gender: "",
        birthdate: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
      });
    } catch (error: any) {
      console.error(error);
      setFirebaseError(error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 space-y-12">
      <section className="">
        <h1 className="header">Welcome👋</h1>
        <p className="text-zinc-700">Join us for a healthier you!</p>
      </section>
      <section className="space-y-4">
        <div className="space-y-2">
          <div>
            <Label htmlFor="fullName" className="shad-input-label">
              Full Name
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              placeholder="Chiswex Joy"
              className="shad-input"
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />
          </div>

          <div className="flex justify-between flex-col gap-4 xl:flex-row">
            <div>
              <Label htmlFor="email" className="shad-input-label">
                Email
              </Label>
              <Input
                type="email"
                className="shad-input w-[420px]"
                placeholder="chiswexjoy@gmail.com"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="phone" className="shad-input-label">
                Phone Number
              </Label>
              <PhoneInput
                placeholder="Enter phone number"
                defaultCountry="NG"
                international
                withCountryCallingCode
                className="input-phone w-[420px]"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e || "" })
                }
                required
              />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 xl:flex-row">
            <div className="w-[420px]">
              <Label className="shad-input-label">Gender</Label>
              <RadioGroup
                onValueChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }
                className="flex h-11 gap-2 xl:justify-between"
              >
                <div className="radio-div">
                  <RadioGroupItem
                    value="male"
                    id="male"
                    className="radio-group"
                  />
                  <Label htmlFor="male" className="cursor-pointer">
                    Male
                  </Label>
                </div>
                <div className="radio-div">
                  <RadioGroupItem
                    value="female"
                    id="female"
                    className="radio-group"
                  />
                  <Label htmlFor="female" className="cursor-pointer">
                    Female
                  </Label>
                </div>
                <div className="radio-div">
                  <RadioGroupItem
                    value="other"
                    id="other"
                    className="radio-group"
                  />
                  <Label htmlFor="other" className="cursor-pointer">
                    Other
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="w-[410px]">
              <Label htmlFor="birthdate" className="shad-input-label">
                Birthdate
              </Label>
              <Input
                type="date"
                id="birthdate"
                value={formData.birthdate}
                className="h-11"
                onChange={(e) =>
                  setFormData({ ...formData, birthdate: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="shad-input-label">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="shad-input-label">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordMatchError && (
              <p className="text-red-600 text-sm mt-1">
                Passwords do not match
              </p>
            )}
            {firebaseError && (
              <p className="text-red-600 text-sm mt-1">{firebaseError}</p>
            )}
          </div>
        </div>
        <Button type="submit" className="btn" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </section>
    </form>
  );
}
