"use client";
import { useEffect, useRef } from "react";

type ParticleType = "bubble" | "ember" | "snowflake";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  color: string;
  wobble: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  life: number;
  maxLife: number;
}

function createParticle(
  type: ParticleType,
  w: number,
  h: number
): Particle {
  const base = {
    wobble: Math.random() * Math.PI * 2,
    life: 0,
  };

  switch (type) {
    case "bubble": {
      const maxOpacity = Math.random() * 0.35 + 0.08;
      return {
        ...base,
        x: Math.random() * w,
        y: h + Math.random() * 60,
        size: Math.random() * 4 + 1.5,
        speedX: 0,
        speedY: -(Math.random() * 0.6 + 0.25),
        opacity: 0,
        maxOpacity,
        color: `rgba(0, ${180 + Math.floor(Math.random() * 75)}, 255, `,
        wobbleSpeed: Math.random() * 0.015 + 0.005,
        wobbleAmp: Math.random() * 30 + 10,
        maxLife: h + 100,
      };
    }
    case "ember": {
      const maxOpacity = Math.random() * 0.7 + 0.25;
      const isYellow = Math.random() > 0.6;
      return {
        ...base,
        x: Math.random() * w,
        y: h + Math.random() * 40,
        size: Math.random() * 3 + 0.8,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -(Math.random() * 1.2 + 0.5),
        opacity: 0,
        maxOpacity,
        color: isYellow
          ? `rgba(255, ${200 + Math.floor(Math.random() * 55)}, 0, `
          : `rgba(255, ${80 + Math.floor(Math.random() * 80)}, ${Math.floor(Math.random() * 30)}, `,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
        wobbleAmp: Math.random() * 20 + 5,
        maxLife: h + 80,
      };
    }
    case "snowflake": {
      const maxOpacity = Math.random() * 0.45 + 0.15;
      return {
        ...base,
        x: Math.random() * w,
        y: -(Math.random() * 80),
        size: Math.random() * 3.5 + 0.8,
        speedX: 0,
        speedY: Math.random() * 0.5 + 0.15,
        opacity: 0,
        maxOpacity,
        color: `rgba(${200 + Math.floor(Math.random() * 55)}, ${230 + Math.floor(Math.random() * 25)}, 255, `,
        wobbleSpeed: Math.random() * 0.01 + 0.003,
        wobbleAmp: Math.random() * 40 + 15,
        maxLife: h + 100,
      };
    }
  }
}

interface Props {
  type: ParticleType;
  count?: number;
}

export default function ParticleCanvas({ type, count = 60 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let raf = 0;

    const particles: Particle[] = [];

    // Stagger initial creation
    for (let i = 0; i < count; i++) {
      const p = createParticle(type, w, h);
      // Distribute some particles already in view
      if (type === "bubble") {
        p.y = Math.random() * h;
      } else if (type === "ember") {
        p.y = Math.random() * h;
      } else {
        p.y = Math.random() * h;
      }
      p.life = Math.random() * p.maxLife * 0.8;
      p.opacity = p.maxOpacity * Math.random();
      particles.push(p);
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        p.wobble += p.wobbleSpeed;

        // Movement
        const wobbleOffset = Math.sin(p.wobble) * p.wobbleAmp * 0.02;
        p.x += p.speedX + wobbleOffset;
        p.y += p.speedY;

        // Fade in/out
        const fadeIn = Math.min(p.life / 60, 1);
        const distanceTraveled = Math.abs(p.life * p.speedY);
        const fadeOut = Math.max(0, 1 - distanceTraveled / p.maxLife);
        p.opacity = p.maxOpacity * fadeIn * fadeOut;

        // Reset when off screen
        const isOffScreen =
          type === "snowflake"
            ? p.y > h + 20
            : p.y < -20;

        if (isOffScreen || p.opacity <= 0.01) {
          const np = createParticle(type, w, h);
          Object.assign(p, np);
          continue;
        }

        // Draw
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = p.color + p.opacity + ")";
        ctx!.fill();

        // Extra glow for embers
        if (type === "ember" && p.size > 1.5) {
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx!.fillStyle = p.color + (p.opacity * 0.15) + ")";
          ctx!.fill();
        }

        // Subtle glow for snowflakes
        if (type === "snowflake" && p.size > 2) {
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx!.fillStyle = p.color + (p.opacity * 0.1) + ")";
          ctx!.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [type, count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
