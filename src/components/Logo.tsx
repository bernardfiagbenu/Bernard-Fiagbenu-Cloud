import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 40 }: LogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="100" height="100" rx="20" className="fill-indigo-600 dark:fill-indigo-500" />
      <text 
        x="50%" 
        y="50%" 
        dominantBaseline="central" 
        textAnchor="middle" 
        fontFamily="Inter, sans-serif" 
        fontSize="50" 
        fontWeight="900" 
        fill="white"
      >
        BF
      </text>
    </svg>
  );
}
