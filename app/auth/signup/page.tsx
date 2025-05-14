import SignUpForm from "@/components/forms/SignUpForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-5">
          <h1 className="text-3xl font-bold text-gradient mb-4">Platter AI</h1>
          <SignUpForm />
          <div className="flex flex-row justify-between">
            <p className="copyright py-12">
              © {new Date().getFullYear()} Platter AI
            </p>
            <p className="py-11 copyright">
              Already have an account?{"  "}
              <Link
                href="/auth/login"
                className="text-[#00dea3] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Image
        src="/signupbg.jpg"
        height={1000}
        width={1000}
        alt="Sign Up"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default page;
