"use client";

export default function SpiderLogo({ size = 80 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Red spray/ink glow outline, mimicking the paint in Spidy.jpeg */}
        <filter id="spiderGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#e23636" floodOpacity="0.85" />
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Metallic black/charcoal gradient for the spider body */}
        <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a3a45" />
          <stop offset="35%" stopColor="#1c1c22" />
          <stop offset="70%" stopColor="#0a0a0f" />
          <stop offset="100%" stopColor="#25252d" />
        </linearGradient>
      </defs>

      {/* Legs (4 on each side, total 8) */}
      {/* Left Legs */}
      <path 
        className="leg-left-1" 
        d="M62 75 L15 35 L12 20" 
        stroke="url(#metalGrad)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        fill="none" 
        filter="url(#spiderGlow)" 
        style={{ transformOrigin: "100px 100px" }}
      />
      <path 
        className="leg-left-2" 
        d="M58 90 L8 60 L0 50" 
        stroke="url(#metalGrad)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        fill="none" 
        filter="url(#spiderGlow)" 
        style={{ transformOrigin: "100px 100px" }}
      />
      <path 
        className="leg-left-3" 
        d="M56 110 L5 105 L2 120" 
        stroke="url(#metalGrad)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        fill="none" 
        filter="url(#spiderGlow)" 
        style={{ transformOrigin: "100px 100px" }}
      />
      <path 
        className="leg-left-4" 
        d="M60 128 L18 145 L12 165" 
        stroke="url(#metalGrad)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        fill="none" 
        filter="url(#spiderGlow)" 
        style={{ transformOrigin: "100px 100px" }}
      />

      {/* Right Legs */}
      <path 
        className="leg-right-1" 
        d="M138 75 L185 35 L188 20" 
        stroke="url(#metalGrad)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        fill="none" 
        filter="url(#spiderGlow)" 
        style={{ transformOrigin: "100px 100px" }}
      />
      <path 
        className="leg-right-2" 
        d="M142 90 L192 60 L200 50" 
        stroke="url(#metalGrad)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        fill="none" 
        filter="url(#spiderGlow)" 
        style={{ transformOrigin: "100px 100px" }}
      />
      <path 
        className="leg-right-3" 
        d="M144 110 L195 105 L198 120" 
        stroke="url(#metalGrad)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        fill="none" 
        filter="url(#spiderGlow)" 
        style={{ transformOrigin: "100px 100px" }}
      />
      <path 
        className="leg-right-4" 
        d="M140 128 L182 145 L188 165" 
        stroke="url(#metalGrad)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        fill="none" 
        filter="url(#spiderGlow)" 
        style={{ transformOrigin: "100px 100px" }}
      />

      {/* Upper body / Chest */}
      <path 
        d="M100 60 C75 60 55 75 52 95 C49 115 60 130 100 135 C140 130 151 115 148 95 C145 75 125 60 100 60Z"
        fill="url(#metalGrad)" 
        filter="url(#spiderGlow)" 
      />
      {/* Lower body / Abdomen */}
      <path 
        d="M100 135 C70 135 58 150 60 168 C62 182 78 192 100 192 C122 192 138 182 140 168 C142 150 130 135 100 135Z"
        fill="url(#metalGrad)" 
        filter="url(#spiderGlow)" 
      />
      {/* Head */}
      <ellipse 
        cx="100" 
        cy="48" 
        rx="18" 
        ry="20" 
        fill="url(#metalGrad)" 
        filter="url(#spiderGlow)" 
      />

      {/* Web design outlines on the metallic carapace */}
      <path d="M60 90 Q100 82 140 90" stroke="#ff2a2a" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M56 105 Q100 97 144 105" stroke="#ff2a2a" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M58 120 Q100 112 142 120" stroke="#ff2a2a" strokeWidth="1" fill="none" opacity="0.3" />
      <line x1="100" y1="60" x2="100" y2="135" stroke="#ff2a2a" strokeWidth="1.2" opacity="0.35" />
    </svg>
  );
}
