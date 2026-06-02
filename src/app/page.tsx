"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ── Scroll reveal hook ── */
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

/* ── Animated counter ── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = Math.ceil(target / 40);
        const t = setInterval(() => {
          start = Math.min(start + step, target);
          setCount(start);
          if (start >= target) clearInterval(t);
        }, 30);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <div ref={ref}>{count}{suffix}</div>;
}

const TAG_COLORS = ["tag-purple", "tag-blue", "tag-cyan", "tag-pink", "tag-green", "tag-orange"];

const PROJECTS = [
  { title: "DigitalHero", tech: ["React", "Node.js", "Firebase"], desc: "Full-stack platform with Razorpay donations, golf score tracking, lottery management, and admin dashboard.", color: "#7c3aed" },
  { title: "Attendance System", tech: ["Flutter", "Firebase", "FCM"], desc: "Mobile app with admin controls to track attendance, push notifications via FCM, and Excel exports.", color: "#2563eb" },
  { title: "Hierarchy Management", tech: ["React", "Node.js", "Express"], desc: "Multi-role tree-based platform with automated parent-child assignment and restricted visibility.", color: "#06b6d4" },
  { title: "TalkToss", tech: ["Flutter", "Node.js", "WebRTC"], desc: "Random voice calling app with TURN server integration for seamless P2P communication.", color: "#ec4899" },
  { title: "Messaging Engine", tech: ["Node.js", "RabbitMQ", "Nodemailer"], desc: "Async backend service triggering automated WhatsApp and Email communications via message queuing.", color: "#10b981" },
];

const SKILLS = [
  { group: "Languages", color: "#7c3aed", items: ["JavaScript", "TypeScript", "Dart", "C/C++"] },
  { group: "Frontend", color: "#2563eb", items: ["React", "Next.js", "Flutter", "HTML", "CSS"] },
  { group: "Backend", color: "#06b6d4", items: ["Node.js", "Express"] },
  { group: "Infra & DevOps", color: "#10b981", items: ["Docker", "DigitalOcean", "Nginx", "Git", "Vercel"] },
  { group: "Databases", color: "#f59e0b", items: ["MongoDB", "MySQL", "Firebase", "Redis"] },
  { group: "Messaging", color: "#ec4899", items: ["RabbitMQ"] },
];

function Hero() {
  const [typed, setTyped] = useState("");
  const roles = ["Full-Stack Developer", "Flutter Engineer", "Node.js Architect"];
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const role = roles[roleIdx];
    let i = 0;
    setTyped("");
    const t = setInterval(() => {
      i++;
      setTyped(role.slice(0, i));
      if (i >= role.length) {
        clearInterval(t);
        setTimeout(() => setRoleIdx((r) => (r + 1) % roles.length), 2200);
      }
    }, 55);
    return () => clearInterval(t);
  }, [roleIdx]);

  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 40px", position: "relative", overflow: "hidden" }}>
      <div className="hero-gradient" />
      <div className="dot-grid" />

      {/* Floating orbs */}
      <div className="orb" style={{ width: 500, height: 500, background: "rgba(124,58,237,0.08)", top: "-100px", left: "-100px", animationDuration: "10s" }} />
      <div className="orb" style={{ width: 400, height: 400, background: "rgba(37,99,235,0.07)", bottom: "-80px", right: "-80px", animationDuration: "13s", animationDelay: "-4s" }} />
      <div className="orb" style={{ width: 250, height: 250, background: "rgba(6,182,212,0.07)", top: "30%", right: "15%", animationDuration: "9s", animationDelay: "-2s" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div className="fade-up" style={{ animationDelay: "0.05s", opacity: 0 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", background: "linear-gradient(135deg,rgba(124,58,237,0.1),rgba(37,99,235,0.1))", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 50, marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block", boxShadow: "0 0 6px #10b981", animation: "glow-pulse 1.5s ease-in-out infinite" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#7c3aed", letterSpacing: 0.5 }}>Available for work</span>
          </div>
        </div>

        <div className="fade-up" style={{ animationDelay: "0.15s", opacity: 0 }}>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 76px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-2px", marginBottom: 12 }}>
            Hi, I'm{" "}
            <span className="shimmer-text">Nitish Vishwakarma</span>
          </h1>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 700, letterSpacing: "-1px", marginBottom: 24, color: "var(--text-muted)", minHeight: "1.3em" }}>
            <span style={{ color: "var(--accent)" }}>{typed}</span>
            <span className="cursor-blink" />
          </h2>
        </div>

        <div className="fade-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
          <p style={{ fontSize: 18, color: "var(--text-muted)", maxWidth: 560, lineHeight: 1.75, marginBottom: 40 }}>
            Skilled in Node.js, Flutter, and Next.js. I build responsive web and mobile applications, design robust APIs, and deploy scalable servers on DigitalOcean.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 56 }}>
            <a href="/work" className="btn-primary btn-glow">View My Work →</a>
            <a href="/contact" className="btn-outline">Get In Touch</a>
          </div>
        </div>

        <div className="fade-up" style={{ animationDelay: "0.45s", opacity: 0, borderTop: "1px solid var(--border)", paddingTop: 40, display: "flex", gap: 40, flexWrap: "wrap" }}>
          {[
            { target: 2, suffix: "+", label: "Years Experience", color: "#7c3aed" },
            { target: 5, suffix: "+", label: "Projects Shipped", color: "#2563eb" },
            { target: 3, suffix: "",  label: "Companies Worked", color: "#06b6d4" },
          ].map((s) => (
            <div key={s.label} className="stat-card" style={{ minWidth: 140 }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: s.color, letterSpacing: "-1px", lineHeight: 1 }}>
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 8, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  useReveal();
  return (
    <section id="about" style={{ padding: "100px 40px", background: "var(--bg-subtle)", position: "relative", overflow: "hidden" }}>
      <div className="orb" style={{ width: 400, height: 400, background: "rgba(37,99,235,0.05)", top: "-100px", right: "-100px" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 80, alignItems: "center", position: "relative", zIndex: 1 }}>
        <div>
          <div className="section-label reveal" style={{ marginBottom: 16 }}>About Me</div>
          <h2 className="reveal reveal-delay-1" style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 20, lineHeight: 1.2 }}>
            Building things that<br /><span className="gradient-text">live on the web</span>
          </h2>
          <p className="reveal reveal-delay-2" style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 16 }}>
            I'm a Full-Stack Developer at 99HomeBazaar, Noida. I specialize in high-performance web and mobile apps using Node.js, Flutter, and Next.js.
          </p>
          <p className="reveal reveal-delay-2" style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 32 }}>
            Completed BCA from DAVIET Jalandhar (CGPA: 8.2). I deploy Dockerized applications on DigitalOcean and ship production-quality code following Agile practices.
          </p>
          <div className="reveal reveal-delay-3" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="https://github.com/nitishv-712" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "10px 22px", fontSize: 13 }}>GitHub</a>
            <a href="https://www.linkedin.com/in/nk-vishwakarma" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: "10px 22px", fontSize: 13 }}>LinkedIn</a>
          </div>
        </div>

        <div className="reveal reveal-delay-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { label: "Location", value: "Jammu, J&K", icon: "📍", color: "#7c3aed" },
            { label: "Education", value: "BCA — DAVIET ✓", icon: "🎓", color: "#2563eb" },
            { label: "CGPA", value: "8.2 / 10", icon: "⭐", color: "#f59e0b" },
            { label: "Current Role", value: "Dev @ 99HomeBazaar", icon: "💼", color: "#10b981" },
          ].map((item) => (
            <div key={item.label} className="card" style={{ padding: 24 }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: item.color }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding: "100px 40px", position: "relative", overflow: "hidden" }}>
      <div className="orb" style={{ width: 500, height: 500, background: "rgba(236,72,153,0.05)", bottom: "-100px", left: "-100px" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="section-label reveal" style={{ marginBottom: 12 }}>Projects</div>
            <h2 className="reveal reveal-delay-1" style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, letterSpacing: "-0.5px" }}>
              Things I've <span className="gradient-text">built</span>
            </h2>
          </div>
          <a href="https://github.com/nitishv-712" target="_blank" rel="noopener noreferrer" className="btn-outline reveal" style={{ padding: "10px 22px", fontSize: 13 }}>All on GitHub →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {PROJECTS.map((p, i) => (
            <div key={p.title} className="card reveal" style={{ padding: 28, animationDelay: `${i * 0.08}s` }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${p.color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: p.color }} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: "var(--text)" }}>{p.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tech.map((t, j) => <span key={t} className={`tag ${TAG_COLORS[j % TAG_COLORS.length]}`}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: "100px 40px", background: "var(--bg-subtle)", position: "relative", overflow: "hidden" }}>
      <div className="orb" style={{ width: 450, height: 450, background: "rgba(6,182,212,0.06)", top: "-80px", right: "10%" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="section-label reveal" style={{ marginBottom: 12 }}>Skills</div>
        <h2 className="reveal reveal-delay-1" style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 52 }}>
          Technologies I <span className="gradient-text">work with</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 20 }}>
          {SKILLS.map((group, i) => (
            <div key={group.group} className="card reveal" style={{ padding: 28, animationDelay: `${i * 0.07}s` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: group.color, boxShadow: `0 0 8px ${group.color}` }} />
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: group.color }}>{group.group}</div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {group.items.map((skill) => <span key={skill} className="skill-pill">{skill}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ padding: "100px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div className="orb" style={{ width: 600, height: 300, background: "rgba(124,58,237,0.06)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      <div style={{ maxWidth: 600, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="section-label reveal" style={{ marginBottom: 16 }}>Let's work together</div>
        <h2 className="reveal reveal-delay-1" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 16 }}>
          Have a project <span className="gradient-text">in mind?</span>
        </h2>
        <p className="reveal reveal-delay-2" style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 36, fontSize: 16 }}>
          I'm open to freelance projects and full-time opportunities. Let's build something great together.
        </p>
        <div className="reveal reveal-delay-3">
          <a href="/contact" className="btn-primary btn-glow" style={{ fontSize: 15, padding: "15px 36px" }}>Get In Touch →</a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useReveal();
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <CTA />
      <Footer />
    </main>
  );
}
