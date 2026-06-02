"use client";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "clamp(20px,4vw,32px) clamp(16px,5vw,40px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
          © 2025 Nitish Vishwakarma
        </span>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {[
            { label: "GitHub", href: "https://github.com/nitishv-712" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/nk-vishwakarma" },
            { label: "Email", href: "mailto:nitishv712@gmail.com" },
          ].map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
