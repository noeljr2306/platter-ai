import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between py-5 px-5">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-gradient text-3xl">Platter AI</span>
          </Link>
        </div>
        <div>
          <Link href="/auth/signup">
            <div className="border px-5 py-2 border-[#00DEA3] rounded-2xl cursor-pointer active:scale-75 transition-all text-[#00DEA3]">
              Sign Up
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
