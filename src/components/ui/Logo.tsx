// src/components/ui/Logo.tsx
// SVG logo — adapts to dark/light via currentColor (Tailwind text classes)

import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Coin icon — inherits text color from parent */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Outer ring */}
        <circle
          cx="16"
          cy="16"
          r="14"
          className="stroke-blue-500"
          strokeWidth="2"
          fill="none"
        />
        {/* Inner coin face */}
        <circle
          cx="16"
          cy="16"
          r="10"
          className="fill-blue-500/10 stroke-blue-500"
          strokeWidth="1.5"
        />
        {/* Currency symbol — ₿ simplified as two vertical bars + horizontal strokes */}
        <text
          x="16"
          y="21"
          textAnchor="middle"
          className="fill-blue-500"
          style={{
            fontSize: "13px",
            fontWeight: 700,
            fontFamily: "system-ui, sans-serif",
          }}
          fill="currentColor"
        >
          ₿
        </text>
      </svg>

      {/* Wordmark */}
      <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        Crypto
        <span className="text-blue-500">Insight</span>
      </span>
    </div>
  );
};

export default Logo;
