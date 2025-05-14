"use client";

export default function Footer() {
  return (
    <footer className="bg-zinc-600 bottom-0 left-0 right-0">
      <div className="container py-4 px-8 border-t">
        <div className="mt-8 text-center pb-8 text-sm text-white">
          <p>© {new Date().getFullYear()} HealthyMeal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
