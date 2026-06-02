"use client";

export default function WebBackground() {
  return (
    <svg className="web-bg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      {/* ── CENTRAL DRIFT & PAINT DRIP ── */}
      {/* Vertical central dripping lines */}
      <path 
        d="M 720 0 L 720 350 M 720 550 L 720 900" 
        stroke="#e23636" 
        strokeWidth="3.5" 
        strokeLinecap="round"
        opacity="0.8" 
      />
      <path 
        d="M 716 120 L 716 280 M 724 450 L 724 720" 
        stroke="#e23636" 
        strokeWidth="1.5" 
        strokeLinecap="round"
        opacity="0.65" 
      />
      
      {/* Tear-drop paint drips sliding down the lines */}
      <circle cx="720" cy="180" r="6" fill="#e23636" opacity="0.9" />
      <path d="M 720 180 Q 720 170 716 174 Q 720 178 720 180" fill="#e23636" />
      
      <circle cx="720" cy="310" r="5" fill="#e23636" opacity="0.9" />
      <circle cx="716" cy="275" r="3" fill="#e23636" opacity="0.7" />
      
      <circle cx="720" cy="620" r="7.5" fill="#e23636" opacity="0.95" />
      <path d="M 720 620 Q 720 610 714 612 Q 720 616 720 620" fill="#e23636" />
      
      <circle cx="724" cy="700" r="4.5" fill="#e23636" opacity="0.8" />
      <circle cx="720" cy="820" r="5" fill="#e23636" opacity="0.9" />

      {/* ── ORGANIC CRIMSON PAINT SPLATTERS ── */}
      {/* Center splatter cluster (sits behind the spider logo on home page) */}
      <g opacity="0.9">
        {/* Main central blast blob */}
        <path 
          d="M 720 380 C 740 370 755 350 770 370 C 785 390 810 380 800 410 C 790 440 820 460 790 480 C 760 500 740 470 725 450 C 710 430 680 420 690 395 C 700 370 700 390 720 380 Z" 
          fill="#e23636" 
        />
        {/* Scattered droplets radiating outwards from center */}
        <circle cx="670" cy="380" r="4" fill="#e23636" />
        <circle cx="660" cy="420" r="6" fill="#e23636" />
        <circle cx="680" cy="460" r="3" fill="#e23636" />
        <circle cx="760" cy="330" r="5.5" fill="#e23636" />
        <circle cx="795" cy="345" r="3" fill="#e23636" />
        <circle cx="830" cy="400" r="4" fill="#e23636" />
        <circle cx="820" cy="445" r="5" fill="#e23636" />
        <circle cx="835" cy="480" r="3.5" fill="#e23636" />
        <circle cx="790" cy="510" r="4.5" fill="#e23636" />
        <circle cx="740" cy="520" r="3" fill="#e23636" />
        <circle cx="700" cy="505" r="5" fill="#e23636" />
        <circle cx="650" cy="480" r="2.5" fill="#e23636" />
      </g>

      {/* Top Left splatter cluster */}
      <g opacity="0.75" transform="translate(-100, -50)">
        <path 
          d="M 250 180 C 270 160 290 140 310 160 C 330 180 350 165 340 195 C 330 225 360 240 330 260 C 300 280 280 250 265 230 C 250 210 230 200 250 180 Z" 
          fill="#e23636" 
        />
        <circle cx="210" cy="180" r="4" fill="#e23636" />
        <circle cx="225" cy="220" r="5.5" fill="#e23636" />
        <circle cx="205" cy="250" r="3" fill="#e23636" />
        <circle cx="280" cy="120" r="5" fill="#e23636" />
        <circle cx="360" cy="140" r="3.5" fill="#e23636" />
        <circle cx="380" cy="210" r="4" fill="#e23636" />
        <circle cx="365" cy="275" r="5" fill="#e23636" />
        {/* Dripping tail from top left splatter */}
        <path d="M 330 260 L 330 350" stroke="#e23636" strokeWidth="2" strokeLinecap="round" />
        <circle cx="330" cy="355" r="3.5" fill="#e23636" />
      </g>

      {/* Bottom Right splatter cluster */}
      <g opacity="0.8" transform="translate(150, 100)">
        <path 
          d="M 1150 580 C 1170 560 1195 540 1210 560 C 1225 580 1250 570 1240 600 C 1230 630 1260 650 1230 670 C 1200 690 1180 660 1165 640 C 1150 620 1130 600 1150 580 Z" 
          fill="#e23636" 
        />
        <circle cx="1100" cy="590" r="3.5" fill="#e23636" />
        <circle cx="1120" cy="630" r="5" fill="#e23636" />
        <circle cx="1270" cy="540" r="4.5" fill="#e23636" />
        <circle cx="1285" cy="610" r="3" fill="#e23636" />
        <circle cx="1260" cy="690" r="5.5" fill="#e23636" />
        {/* Dripping tail from bottom right splatter */}
        <path d="M 1230 670 L 1230 790" stroke="#e23636" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="1230" cy="798" r="4.5" fill="#e23636" />
        <circle cx="1230" cy="740" r="3" fill="#e23636" />
      </g>

      {/* Fine-line background geometry linking Spiderweb style */}
      <g stroke="#e23636" strokeWidth="0.75" opacity="0.25" strokeDasharray="3, 3">
        {/* Subtle geometric circles */}
        <circle cx="720" cy="430" r="220" fill="none" />
        <circle cx="720" cy="430" r="380" fill="none" />
        
        {/* Diagonal axis lines */}
        <line x1="0" y1="0" x2="1440" y2="900" />
        <line x1="1440" y1="0" x2="0" y2="900" />
      </g>
    </svg>
  );
}
