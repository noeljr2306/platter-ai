import React from 'react';
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'outline' | 'secondary';
  className?: string;
}
export const Badge: React.FC<BadgeProps> = ({ children, variant = 'outline', className = '' }) => {
  const base = 'inline-block px-2 py-0.5 rounded text-xs font-semibold';
  let style = '';
  if (variant === 'outline') style = 'border border-primary text-primary bg-white';
  else if (variant === 'secondary') style = 'bg-primary text-white';
  return <span className={`${base} ${style} ${className}`}>{children}</span>;
};
export default Badge;
