"use client";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  { title: "Web Slinger API", tech: "Node.js · Express", desc: "High-performance REST API with JWT auth and rate limiting.", color: "#e23636" },
  { title: "Spider Sense UI", tech: "React · TypeScript", desc: "Real-time dashboard with WebSocket alerts and live charts.", color: "#1a3a6b" },
  { title: "Daily Bugle App", tech: "Next.js · Prisma", desc: "Full-stack news platform with SSR, search, and CMS.", color: "#e23636" },
  { title: "Oscorp ML", tech: "Python · TensorFlow", desc: "Image classification model with 97% accuracy on custom dataset.", color: "#1a3a6b" },
  { title: "Shield Auth SDK", tech: "TypeScript", desc: "OAuth2 / OIDC library with PKCE support and refresh rotation.", color: "#e23636" },
  { title: "Multiverse Deploy", tech: "Docker · AWS", desc: "CI/CD pipeline with blue-green deployments on ECS Fargate.", color: "#1a3a6b" },
];

const SKILLS = ["React", "Next.js", "TypeScript", "Node.js", "Python", "AWS", "Docker", "PostgreSQL", "Redis", "GraphQL"];

// Animated web SVG background
function WebBackground() {
  return (
    <svg className="web-bg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      {/* Radial web from top-right */}
      {[0,20,40,60,80,100,120,140,160,180].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x2 = 1440 + Math.cos(rad) * 1200;
        const y2 = 0 + Math.sin(rad) * 1200;
        return (
          <line key={i} x1="1440" y1="0" x2={x2} y2={y2}
            stroke="#e23636" strokeWidth="1"
            className="web-line"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        );
      })}
      {/* Concentric arcs */}
      {[150, 300, 450, 600, 750, 900].map((r, i) => (
        <circle key={i} cx="1440" cy="0" r={r}
          fill="none" stroke="#e23636" strokeWidth="0.8"
          className="web-line"
          style={{ animationDelay: `${1 + i * 0.2}s` }}
        />
      ))}
      {/* Bottom-left web */}
      {[200,220,240,260,280,300,320,340,360,380].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x2 = 0 + Math.cos(rad) * 900;
        const y2 = 900 + Math.sin(rad) * 900;
        return (
          <line key={`bl-${i}`} x1="0" y1="900" x2={x2} y2={y2}
            stroke="#1a3a6b" strokeWidth="0.8"
            className="web-line"
            style={{ animationDelay: `${2 + i * 0.1}s` }}
          />
        );
      })}
      {[120, 240, 360, 480].map((r, i) => (
        <circle key={`blc-${i}`} cx="0" cy="900" r={r}
          fill="none" stroke="#1a3a6b" strokeWidth="0.6"
          className="web-line"
          style={{ animationDelay: `${3 + i * 0.2}s` }}
        />
      ))}
    </svg>
  );
}

// Marvel-style spider symbol
function SpiderLogo({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Glow filter */}
      <defs>
        <filter id="spiderGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="bodyGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ff4444" />
          <stop offset="100%" stopColor="#8b0000" />
        </radialGradient>
      </defs>
      {/* Upper body */}
      <path d="M100 60 C75 60 55 75 52 95 C49 115 60 130 100 135 C140 130 151 115 148 95 C145 75 125 60 100 60Z"
        fill="url(#bodyGrad)" filter="url(#spiderGlow)" />
      {/* Lower body */}
      <path d="M100 135 C70 135 58 150 60 168 C62 182 78 192 100 192 C122 192 138 182 140 168 C142 150 130 135 100 135Z"
        fill="url(#bodyGrad)" filter="url(#spiderGlow)" />
      {/* Head */}
      <ellipse cx="100" cy="48" rx="18" ry="20" fill="url(#bodyGrad)" filter="url(#spiderGlow)" />
      {/* Eyes */}
      <path d="M82 44 C78 38 70 36 66 40 C62 44 64 52 70 54 C78 56 86 52 82 44Z" fill="white" opacity="0.95" />
      <path d="M118 44 C122 38 130 36 134 40 C138 44 136 52 130 54 C122 56 114 52 118 44Z" fill="white" opacity="0.95" />
      {/* Web lines on body */}
      <path d="M60 90 Q100 82 140 90" stroke="#6b0000" strokeWidth="1.5" fill="none" />
      <path d="M56 105 Q100 97 144 105" stroke="#6b0000" strokeWidth="1.5" fill="none" />
      <path d="M58 120 Q100 112 142 120" stroke="#6b0000" strokeWidth="1.5" fill="none" />
      <line x1="100" y1="60" x2="100" y2="135" stroke="#6b0000" strokeWidth="1.5" />
      {/* Upper legs — 3 per side */}
      <path d="M58 85 L10 55 L5 45" stroke="url(#bodyGrad)" strokeWidth="5" strokeLinecap="round" fill="none" filter="url(#spiderGlow)" />
      <path d="M55 100 L5 95 L0 85" stroke="url(#bodyGrad)" strokeWidth="5" strokeLinecap="round" fill="none" filter="url(#spiderGlow)" />
      <path d="M58 118 L15 130 L8 145" stroke="url(#bodyGrad)" strokeWidth="5" strokeLinecap="round" fill="none" filter="url(#spiderGlow)" />
      <path d="M142 85 L190 55 L195 45" stroke="url(#bodyGrad)" strokeWidth="5" strokeLinecap="round" fill="none" filter="url(#spiderGlow)" />
      <path d="M145 100 L195 95 L200 85" stroke="url(#bodyGrad)" strokeWidth="5" strokeLinecap="round" fill="none" filter="url(#spiderGlow)" />
      <path d="M142 118 L185 130 L192 145" stroke="url(#bodyGrad)" strokeWidth="5" strokeLinecap="round" fill="none" filter="url(#spiderGlow)" />
    </svg>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "Projects", "Skills", "Contact"];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-blur" : ""}`}
      style={{ padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <SpiderLogo size={36} />
        <span className="bebas" style={{ fontSize: 22, letterSpacing: 2, color: "#e23636" }}>Peter Parker</span>
      </div>
      <div style={{ display: "flex", gap: 32 }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`}
            style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#e23636")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
          >{l}</a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "0 40px" }}>
      {/* Radial red spotlight */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, background: "radial-gradient(circle, rgba(226,54,54,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Spider drop-in with web string */}
        <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", marginBottom: 32 }}>
          <div className="web-string" style={{ width: 2, height: 90, background: "linear-gradient(to bottom, rgba(226,54,54,0.15), rgba(226,54,54,0.7))" }} />
          <div className="spider-drop" style={{ filter: "drop-shadow(0 0 24px rgba(226,54,54,0.7)) drop-shadow(0 0 60px rgba(226,54,54,0.3))" }}>
            <div className="spider-float">
              <SpiderLogo size={140} />
            </div>
          </div>
        </div>

        <div className="fade-up" style={{ animationDelay: "0.8s", opacity: 0 }}>
          <div style={{ fontSize: 11, letterSpacing: 7, color: "#e23636", textTransform: "uppercase", marginBottom: 16, opacity: 0.9 }}>
            ◆ &nbsp; Your Friendly Neighborhood Developer &nbsp; ◆
          </div>
          <h1 className="bebas glow" style={{ fontSize: "clamp(64px, 13vw, 150px)", lineHeight: 0.88, marginBottom: 28 }}>
            Peter<br />
            <span style={{ color: "#e23636", WebkitTextStroke: "1px rgba(226,54,54,0.3)" }}>Parker</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 460, margin: "0 auto 44px", lineHeight: 1.8, fontWeight: 400 }}>
            Full-stack developer swinging through the web —<br />building fast, scalable, and beautiful digital experiences.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#projects"
              style={{ background: "linear-gradient(135deg,#e23636,#b01c1c)", color: "white", padding: "15px 40px", borderRadius: 50, fontWeight: 700, textDecoration: "none", fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", boxShadow: "0 0 30px rgba(226,54,54,0.45), inset 0 1px 0 rgba(255,255,255,0.15)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 12px 50px rgba(226,54,54,0.65), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 0 30px rgba(226,54,54,0.45), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
            >View My Work</a>
            <a href="#contact"
              style={{ border: "1px solid rgba(226,54,54,0.4)", color: "rgba(255,255,255,0.85)", padding: "15px 40px", borderRadius: 50, fontWeight: 700, textDecoration: "none", fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", transition: "all 0.2s", backdropFilter: "blur(10px)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#e23636"; e.currentTarget.style.background = "rgba(226,54,54,0.12)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(226,54,54,0.4)"; e.currentTarget.style.background = ""; e.currentTarget.style.transform = ""; }}
            >Contact Me</a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.35 }}>
        <span style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom, #e23636, transparent)" }} />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: 4, color: "#e23636", textTransform: "uppercase", marginBottom: 16 }}>About Me</div>
          <h2 className="bebas" style={{ fontSize: 64, lineHeight: 1, marginBottom: 24 }}>
            With Great Power<br /><span style={{ color: "#e23636" }}>Comes Great Code</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 20 }}>
            I'm a full-stack developer with a passion for crafting high-performance web applications. Like Spider-Man, I thrive under pressure and always deliver — on time, on budget, bug-free.
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
            5+ years building products used by thousands. I specialize in React ecosystems, Node.js backends, and cloud-native deployments on AWS.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { num: "50+", label: "Projects Shipped" },
            { num: "5+", label: "Years Experience" },
            { num: "99%", label: "Uptime Delivered" },
            { num: "∞", label: "Web Swings" },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div className="bebas" style={{ fontSize: 54, color: "#e23636", lineHeight: 1, textShadow: "0 0 20px rgba(226,54,54,0.5)" }}>{s.num}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 8, letterSpacing: 2, textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <div style={{ fontSize: 12, letterSpacing: 4, color: "#e23636", textTransform: "uppercase", marginBottom: 16 }}>Portfolio</div>
        <h2 className="bebas" style={{ fontSize: 72 }}>My <span style={{ color: "#e23636" }}>Projects</span></h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
        {PROJECTS.map((p, i) => (
          <div key={p.title} className="card" style={{ padding: 32, cursor: "pointer" }}>
            <div style={{ width: 40, height: 4, background: p.color, borderRadius: 2, marginBottom: 20 }} />
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{p.title}</h3>
            <p style={{ fontSize: 12, color: p.color, fontWeight: 600, letterSpacing: 1, marginBottom: 16, textTransform: "uppercase" }}>{p.tech}</p>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7 }}>{p.desc}</p>
            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
              <a href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#e23636")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >GitHub →</a>
              <a href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#e23636")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >Live →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <div style={{ fontSize: 12, letterSpacing: 4, color: "#e23636", textTransform: "uppercase", marginBottom: 16 }}>Arsenal</div>
        <h2 className="bebas" style={{ fontSize: 72 }}>My <span style={{ color: "#e23636" }}>Skills</span></h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
        {SKILLS.map((skill) => (
          <div key={skill} className="skill-pill">{skill}</div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ padding: "100px 40px 160px", maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
      <div style={{ fontSize: 12, letterSpacing: 4, color: "#e23636", textTransform: "uppercase", marginBottom: 16 }}>Get In Touch</div>
      <h2 className="bebas" style={{ fontSize: 72, marginBottom: 24 }}>
        Let's <span style={{ color: "#e23636" }}>Connect</span>
      </h2>
      <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 48, fontSize: 16 }}>
        Whether you need a full-stack developer, a technical co-founder, or just want to talk code — my web is always open.
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
        {[
          { label: "GitHub", href: "#" },
          { label: "LinkedIn", href: "#" },
          { label: "Twitter", href: "#" },
        ].map(l => (
          <a key={l.label} href={l.href}
            style={{ padding: "12px 28px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 50, color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#e23636"; e.currentTarget.style.color = "#e23636"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
          >{l.label}</a>
        ))}
      </div>
      <a href="mailto:peter@dailybugle.com"
        style={{ display: "inline-block", background: "#e23636", color: "white", padding: "16px 48px", borderRadius: 50, fontWeight: 700, textDecoration: "none", fontSize: 15, letterSpacing: 1, textTransform: "uppercase", boxShadow: "0 0 40px rgba(226,54,54,0.4)", transition: "transform 0.2s, box-shadow 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 50px rgba(226,54,54,0.6)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 0 40px rgba(226,54,54,0.4)"; }}
      >Send a Message</a>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <SpiderLogo size={24} />
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: 1 }}>Peter Parker © 2025</span>
      </div>
      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>With great power comes great responsibility.</span>
    </footer>
  );
}

// Fast cursor — zero-lag via direct DOM refs
function WebCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ring = useRef({ x: -100, y: -100 });
  const mouse = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
      }
    };
    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Instant dot */}
      <div ref={dotRef} style={{ position: "fixed", top: 0, left: 0, width: 10, height: 10, background: "#e23636", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, boxShadow: "0 0 10px #e23636, 0 0 20px #e23636" }} />
      {/* Lagging ring */}
      <div ref={ringRef} style={{ position: "fixed", top: 0, left: 0, width: 40, height: 40, border: "1.5px solid rgba(226,54,54,0.7)", borderRadius: "50%", pointerEvents: "none", zIndex: 9998 }} />
    </>
  );
}

export default function Home() {
  return (
    <main style={{ background: "#0a0a0f", minHeight: "100vh", cursor: "none" }}>
      <WebBackground />
      <WebCursor />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
