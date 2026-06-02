"use client";
import { useEffect, useRef } from "react";
import SpiderLogo from "@/components/SpiderLogo";

interface ThemeColors {
  dot: string;
  ring: string;
  glowColor: string;
}

const THEME_MAP: Record<string, ThemeColors> = {
  "/": {
    dot: "#e23636",
    ring: "rgba(226, 54, 54, 0.6)",
    glowColor: "#e23636",
  },
  "/work": {
    dot: "#e23636",
    ring: "rgba(226, 54, 54, 0.6)",
    glowColor: "#e23636",
  },
  "/contact": {
    dot: "#e23636",
    ring: "rgba(226, 54, 54, 0.6)",
    glowColor: "#e23636",
  },
};

export default function CustomCursor({ pathname }: { pathname: string }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const ring = useRef({ x: -100, y: -100 });
  const mouse = useRef({ x: -100, y: -100 });
  const spider = useRef({ x: -100, y: -100, angle: 0 });
  const raf = useRef<number>(0);

  const colors = THEME_MAP[pathname] || THEME_MAP["/"];

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Initialize position to prevent jumping from (-100, -100)
    const onFirstMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      ring.current = { x: e.clientX, y: e.clientY };
      spider.current = { x: e.clientX, y: e.clientY, angle: 0 };
      
      window.removeEventListener("mousemove", onFirstMove);
    };
    window.addEventListener("mousemove", onFirstMove);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const loop = () => {
      // 1. Smoothly interpolate the outer ring
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }

      // 2. Smoothly interpolate the spider cursor position
      const dx = mouse.current.x - spider.current.x;
      const dy = mouse.current.y - spider.current.y;
      const speed = Math.hypot(dx, dy);

      // Follow speed
      spider.current.x += dx * 0.18;
      spider.current.y += dy * 0.18;

      // 3. Smoothly interpolate rotation angle to face movement direction
      if (speed > 1.5) {
        // SVG faces Up natively. Atan2 returns angle where East is 0. Add PI/2 to align.
        const targetRad = Math.atan2(dy, dx) + Math.PI / 2;
        let targetDeg = targetRad * (180 / Math.PI);

        // Normalize angle difference to prevent 360 wrap-around spinning
        let diff = targetDeg - spider.current.angle;
        while (diff < -180) diff += 360;
        while (diff > 180) diff -= 360;

        spider.current.angle += diff * 0.2;
      }

      if (dotRef.current) {
        // Center the spider (width: 30px, height: 30px => offset by 15px)
        dotRef.current.style.transform = `translate(${spider.current.x - 15}px, ${spider.current.y - 15}px) rotate(${spider.current.angle}deg)`;
        
        // Add crawling class for faster leg movement when actively moving
        if (speed > 1.0) {
          dotRef.current.classList.add("crawling");
        } else {
          dotRef.current.classList.remove("crawling");
        }
      }

      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onFirstMove);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Spider cursor container */}
      <div
        ref={dotRef}
        className="spider-cursor"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 30,
          height: 30,
          pointerEvents: "none",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translate(-100px, -100px)",
          filter: `drop-shadow(0 0 4px ${colors.glowColor})`,
        }}
      >
        <SpiderLogo size={34} />
      </div>

      {/* Target reticle ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          border: `1.5px solid ${colors.ring}`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-100px, -100px)",
          transition: "border-color 0.5s",
        }}
      />
    </>
  );
}
