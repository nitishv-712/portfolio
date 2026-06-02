"use client";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "32px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <span style={{ fontSize: 14, color: "var(--text-muted)" }}>
          © 2025 Nitish Vishwakarma
        </span>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "GitHub", href: "https://github.com/nitishv-712" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/nk-vishwakarma" },
            { label: "Email", href: "mailto:nitishv712@gmail.com" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 14, color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
