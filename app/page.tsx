import Footer from "@/layout/footer";
import Navbar from "@/layout/navbar";
import { ArrowRight, Calendar, Salad, Smile, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const Feature = [
    {
      id: 1,
      desc: "Smart Meal Suggestions",
      subdesc:
        "AI-powered recommendations based on your preferences, dietary restrictions, and nutritional goals.",
      icon: <Utensils className="h-6 w-6 text-blue-600" />,
    },
    {
      id: 2,
      desc: "Drag & Drop Meal Planner",
      subdesc:
        " Easily plan your meals for the week with our intuitive drag-and-drop calendar interface.",
      icon: <Calendar className="h-6 w-6 text-orange-600" />,
    },
    {
      id: 3,
      desc: "Personalized Profile",
      subdesc:
        "Create your profile with dietary preferences, allergies, and fitness goals for tailored recommendations.",
      icon: <Salad className="h-6 w-6 text-green-600" />,
    },
    {
      id: 4,
      desc: "User-Friendly",
      subdesc: "A user-friendly interface that makes meal planning a breeze",
      icon: <Smile className="h-6 w-6 text-yellow-600" />,
    },
  ];
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <section className="flex flex-col xl:flex-row relative z-0 max-w-[1440px] mx-auto">
        <div className="pt-25 flex-1 px-5 sm:px-10 sm:py-40 py-5">
          <h1 className="xl:text-[70px] sm:text-[64px] text-[50px] font-bold">
            Your Personal{" "}
            <span className="bg-gradient-to-r from-[#02a507] to-[#00bfa5] bg-clip-text text-transparent">
              Meal Planning
            </span>{" "}
            <br />
            Assistant
          </h1>
          <p className="xl:text-[20px] text-black-100 font-light mt-5 text-zinc-700">
            Plan your meals, track your nutrition, and achieve your health goals
            with our AI-powered meal planning platform.
            <br /> Smart suggestions based on your preferences and dietary
            needs.
          </p>
          <div className="mt-10 flex flex-col items-start justify-start gap-4 sm:flex-row">
            <Link
              href="/auth/login"
              className="flex gap-3 rounded-xl bg-gradient-to-r from-[#16f806] to-[#071c05] px-6 py-3 text-sm font-medium text-white"
            >
              Get Started <ArrowRight />
            </Link>
          </div>
        </div>
        <div className="xl:flex-[1.5] flex sm:justify-end sm:items-end w-full xl:h-screen h-[300px] justify-center">
          <div className="relative xl:w-full w-[70%] xl:h-[700px] h-[250px] z-0">
            <Image
              src="/bg-hero.png"
              alt="hero"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>
      <section className="py-24 bg-muted sm:py-20 px-8 sm:px-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Smart Features for a Healthy Living
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to plan your meals, track nutrition, and
              achieve your fitness goals.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-2">
            {Feature.map(({ id, icon, desc, subdesc }) => (
              <div
                className="group flex-col flex rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                key={id}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border bg-[#00DEA3]/30  text-black">
                  {icon}
                </div>
                <h3 className="text-xl font-semibold">{desc}</h3>
                <p className="mt-2 text-muted-foreground">{subdesc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-r from-[#05e54c] to-[#00bfa5] py-24 sm:py-32 px-8 sm:px-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-800 sm:text-4xl">
            Ready to Start Your Health Journey?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Sign Up now and take that bold step towards towards better meal
            planning and healthier eating habits.
          </p>
          <div className="mt-10">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center bg-gradient-to-r from-[#16f806] to-[#071c05] px-6 py-3 text-sm font-medium text-white rounded-2xl"
            >
              Create Your Profile <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
