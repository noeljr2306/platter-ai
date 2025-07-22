import React from "react";
interface ProgressProps {
  value: number;
  className?: string;
}
export const Progress: React.FC<ProgressProps> = ({ value, className }) => (
  <div
    className={`w-full bg-gray-200 rounded-full h-2 ${className || ""}`}
    role="progressbar"
    aria-valuenow={value}
    aria-valuemin={0}
    aria-valuemax={100}
  >
    <div
      className="bg-[#00dea3] h-2 rounded-full transition-all duration-300"
      style={{ width: `${value}%` }}
    />
  </div>
);
export default Progress;
