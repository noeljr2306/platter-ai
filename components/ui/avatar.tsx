import React from "react";
import Image from "next/image";

export const Avatar: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = "", children }) => (
  <div
    className={`inline-flex items-center justify-center rounded-full bg-gray-200 overflow-hidden ${className}`}
  >
    {children}
  </div>
);

export const AvatarImage: React.FC<{
  src: string;
  alt?: string;
  className?: string;
}> = ({ src, alt = "", className = "" }) => (
  <Image
    src={src}
    alt={alt}
    className={`object-cover w-full h-full ${className}`}
    width={40}
    height={40}
  />
);

export const AvatarFallback: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = "", children }) => (
  <span
    className={`flex items-center justify-center w-full h-full text-gray-500 ${className}`}
  >
    {children}
  </span>
);
