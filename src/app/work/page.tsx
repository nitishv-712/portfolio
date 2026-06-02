"use client";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const TAG_COLORS = ["tag-purple", "tag-blue", "tag-cyan", "tag-pink", "tag-green", "tag-orange"];

const PROJECTS = [
  { title: "DigitalHero", tech: ["React", "Node.js", "Firebase", "Google Auth"], desc: "Full-stack platform with Razorpay donations, golf score tracking, lottery management, and an admin dashboard.", href: "https://github.com/nitishv-712", color: "#7c3aed" },
  { title: "Attendance System", tech: ["Flutter", "Firebase", "FCM"], desc: "Mobile solution with admin controls to track attendance, trigger push notifications via FCM, and export to Excel.", href: "https://github.com/nitishv-712", color: "#2563eb" },
  { title: "Hierarchy Management System", tech: ["React", "Node.js", "Express"], desc: "Multi-role tree-based platform with automated parent-child assignment and restricted visibility.", href: "https://github.com/nitishv-712", color: "#06b6d4" },
  { title: "TalkToss", tech: ["Flutter", "Node.js", "WebRTC"], desc: "Random voice calling app with TURN server integration for seamless peer-to-peer communication.", href: "https://github.com/nitishv-712", color: "#ec4899" },
  { title: "Messaging Engine", tech: ["Node.js", "RabbitMQ", "Nodemailer"], desc: "Async backend service triggering automated WhatsApp and Email communications via message queuing.", href: "https://github.com/nitishv-712", color: "#10b981" },
];

const EXPERIENCE = [
  {
    period: "Jan 2026 — Present",
    role: "Full-Stack Developer",
    company: "99HomeBazaar",
    location: "Noida, U.P",
    color: "#7c3aed",
    points: [
      "Built full-stack ecosystem using Next.js, Flutter, and Node.js with RBAC, Google Auth, and CDN.",
      "Optimized scalable operations via Dockerized services and RabbitMQ with automated testing.",
    ],
  },
  {
    period: "Sept 2024 — Sept 2025",
    role: "Application Developer",
    company: "SampurnaKart Innovations Pvt Ltd",
    location: "Jalandhar, Punjab",
    color: "#2563eb",
    points: [
      "Built full-stack repair platform with React, Node.js, Flutter, and Firebase with FCM real-time features.",
      "Deployed Dockerized apps on DigitalOcean with automated testing and Agile collaboration.",
    ],
  },
  {
    period: "June 2024 — Aug 2024",
    role: "Flutter Developer Intern",
    company: "SampurnaKart Innovations Pvt Ltd",
    location: "Jalandhar, Punjab",
    color: "#06b6d4",
    points: [
      "Built frontends for a repair service app using Flutter with Firebase Auth and Firestore real-time data sync.",
    ],
  },
];

export default function WorkPage() {
  useReveal();
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "140px 40px 80px", position: "relative", overflow: "hidden" }}>
        <div className="hero-gradient" />
        <div className="dot-grid" />
        <div className="orb" style={{ width: 500, height: 500, background: "rgba(124,58,237,0.07)", top: "-150px", right: "-100px" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="section-label fade-up" style={{ marginBottom: 16, animationDelay: "0.05s", opacity: 0 }}>Portfolio</div>
          <h1 className="fade-up" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 20, animationDelay: "0.15s", opacity: 0 }}>
            My <span className="gradient-text">Work</span>
          </h1>
          <p className="fade-up" style={{ color: "var(--text-muted)", fontSize: 18, maxWidth: 520, lineHeight: 1.75, animationDelay: "0.25s", opacity: 0 }}>
            A selection of projects I've built — from full-stack platforms to mobile apps and backend services.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section style={{ padding: "0 40px 100px", position: "relative", overflow: "hidden" }}>
        <div className="orb" style={{ width: 400, height: 400, background: "rgba(236,72,153,0.05)", bottom: "-80px", left: "-80px" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {PROJECTS.map((p, i) => (
              <div key={p.title} className="card reveal" style={{ padding: 28, display: "flex", flexDirection: "column", transitionDelay: `${i * 0.07}s` }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${p.color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 5, background: p.color }} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: "var(--text)" }}>{p.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 20, flex: 1 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                  {p.tech.map((t, j) => <span key={t} className={`tag ${TAG_COLORS[j % TAG_COLORS.length]}`}>{t}</span>)}
                </div>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 13, fontWeight: 600, color: p.color, textDecoration: "none", transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  View on GitHub →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section style={{ padding: "100px 40px 120px", background: "var(--bg-subtle)", position: "relative", overflow: "hidden" }}>
        <div className="orb" style={{ width: 400, height: 400, background: "rgba(16,185,129,0.05)", bottom: "-100px", left: "-80px" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="section-label reveal" style={{ marginBottom: 16 }}>Experience</div>
          <h2 className="reveal reveal-delay-1" style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 52 }}>
            Where I've <span className="gradient-text">worked</span>
          </h2>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="reveal" style={{ display: "flex", gap: 32, paddingBottom: i < EXPERIENCE.length - 1 ? 44 : 0, transitionDelay: `${i * 0.1}s` }}>
                {/* Timeline */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20, flexShrink: 0 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: exp.color, flexShrink: 0, marginTop: 5, boxShadow: `0 0 10px ${exp.color}88` }} />
                  {i < EXPERIENCE.length - 1 && (
                    <div style={{ width: 2, flex: 1, background: `linear-gradient(${exp.color}, ${EXPERIENCE[i+1].color})`, marginTop: 8, opacity: 0.3, borderRadius: 1 }} />
                  )}
                </div>
                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: exp.color, fontWeight: 700, letterSpacing: 0.5, marginBottom: 6 }}>{exp.period}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{exp.role}</h3>
                  <div style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 600, marginBottom: 16 }}>
                    {exp.company} · {exp.location}
                  </div>
                  <ul style={{ paddingLeft: 16 }}>
                    {exp.points.map((pt, j) => (
                      <li key={j} style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.8, marginBottom: 6 }}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
