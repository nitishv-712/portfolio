"use client";
import { useEffect, useState } from "react";
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

export default function ContactPage() {
  useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      <section className="hero-pad" style={{ position: "relative", overflow: "hidden" }}>
        <div className="hero-gradient" />
        <div className="dot-grid" />
        <div className="orb" style={{ width: 500, height: 500, background: "rgba(124,58,237,0.07)", top: "-150px", left: "-100px" }} />
        <div className="orb" style={{ width: 400, height: 400, background: "rgba(6,182,212,0.06)", bottom: "-100px", right: "-80px", animationDelay: "-5s" }} />

        {/* Responsive 2-col → 1-col */}
        <div className="grid-2col-contact" style={{ maxWidth: 1100, margin: "0 auto", alignItems: "start", position: "relative", zIndex: 1 }}>

          {/* Left */}
          <div>
            <div className="section-label fade-up" style={{ marginBottom: 16, animationDelay: "0.05s", opacity: 0 }}>Contact</div>
            <h1 className="fade-up" style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, marginBottom: 16, lineHeight: 1.15, animationDelay: "0.15s", opacity: 0 }}>
              Let's work<br /><span className="gradient-text">together</span>
            </h1>
            <p className="fade-up" style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: "clamp(14px,1.5vw,16px)", marginBottom: 36, animationDelay: "0.25s", opacity: 0 }}>
              I'm open to freelance projects, full-time roles, and collaborations. Drop me a message and I'll get back to you quickly.
            </p>

            <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
              {[
                { label: "Email", value: "nitishv712@gmail.com", href: "mailto:nitishv712@gmail.com", color: "#7c3aed", icon: "✉️" },
                { label: "Phone", value: "+91-6006708141", href: "tel:+916006708141", color: "#2563eb", icon: "📱" },
                { label: "Location", value: "Jammu, J&K, India", href: null, color: "#06b6d4", icon: "📍" },
              ].map((item) => (
                <div key={item.label} className="contact-info-card" style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", border: "1px solid var(--border)", borderRadius: 12, background: "var(--bg)", transition: "border-color 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = item.color; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 20px ${item.color}18`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                >
                  <div style={{ fontSize: 18, width: 36, height: 36, borderRadius: 9, background: `${item.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 2 }}>{item.label}</div>
                    {item.href ? (
                      <a href={item.href} style={{ fontSize: 13, fontWeight: 600, color: item.color, textDecoration: "none", wordBreak: "break-all" }}>{item.value}</a>
                    ) : (
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal reveal-delay-2" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                { label: "GitHub", href: "https://github.com/nitishv-712" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/nk-vishwakarma" },
              ].map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: "10px 22px", fontSize: 13 }}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="card reveal reveal-delay-1" style={{ padding: "clamp(24px,5vw,40px)", border: "1px solid rgba(124,58,237,0.15)", boxShadow: "0 8px 40px rgba(124,58,237,0.06)" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
                  <span className="gradient-text">Message sent!</span>
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>Thanks for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Send a message</h2>
                  <p style={{ fontSize: 13, color: "var(--text-muted)" }}>I usually respond within 24 hours.</p>
                </div>
                <div>
                  <label htmlFor="name" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 7 }}>Name</label>
                  <input id="name" type="text" className="clean-input" placeholder="Your name" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <label htmlFor="email" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 7 }}>Email</label>
                  <input id="email" type="email" className="clean-input" placeholder="your@email.com" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div>
                  <label htmlFor="message" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 7 }}>Message</label>
                  <textarea id="message" className="clean-input" placeholder="Tell me about your project..." rows={5}
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required style={{ resize: "vertical", minHeight: 110 }} />
                </div>
                <button type="submit" className="btn-primary btn-glow" style={{ width: "100%", padding: "14px", fontSize: 15 }}>
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
