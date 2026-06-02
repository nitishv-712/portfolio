"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && !href.includes("#") && pathname.startsWith(href));

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "0 clamp(16px, 5vw, 40px)",
        height: 64,
        display: "flex", alignItems: "center",
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
        background: scrolled || menuOpen ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid rgba(124,58,237,0.1)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 20px rgba(124,58,237,0.06)" : "none",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{
              fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px",
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Nitish<span style={{ WebkitTextFillColor: "#7c3aed", fontWeight: 900 }}>.</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: 36 }} className="desktop-nav">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} style={{
                color: isActive(l.href) ? "#7c3aed" : "var(--text-muted)",
                textDecoration: "none", fontSize: 14, fontWeight: 500,
                transition: "color 0.2s", position: "relative", paddingBottom: 2,
              }}
                onMouseEnter={(e) => { if (!isActive(l.href)) e.currentTarget.style.color = "var(--text)"; }}
                onMouseLeave={(e) => { if (!isActive(l.href)) e.currentTarget.style.color = "var(--text-muted)"; }}
              >
                {l.label}
                {isActive(l.href) && (
                  <span style={{
                    position: "absolute", bottom: -2, left: 0, right: 0, height: 2,
                    background: "linear-gradient(90deg,#7c3aed,#2563eb)", borderRadius: 2,
                  }} />
                )}
              </Link>
            ))}
            <a href="mailto:nitishv712@gmail.com" className="btn-primary" style={{ padding: "9px 22px", fontSize: 13, boxShadow: "0 4px 14px rgba(124,58,237,0.3)" }}>
              Hire Me
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: "none", flexDirection: "column", justifyContent: "center",
              alignItems: "center", gap: 5, width: 40, height: 40,
              background: "transparent", border: "none", cursor: "pointer",
              borderRadius: 8, padding: 8,
            }}
            className="hamburger-btn"
          >
            <span style={{
              display: "block", width: 22, height: 2, borderRadius: 2,
              background: "var(--text)",
              transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              transition: "transform 0.25s",
            }} />
            <span style={{
              display: "block", width: 22, height: 2, borderRadius: 2,
              background: "var(--text)",
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 0.2s",
            }} />
            <span style={{
              display: "block", width: 22, height: 2, borderRadius: 2,
              background: "var(--text)",
              transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              transition: "transform 0.25s",
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer — outside nav to avoid stacking context issues */}
      <div style={{
        position: "fixed", top: 64, left: 0, right: 0, zIndex: 999,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(24px) saturate(180%)",
        borderBottom: "1px solid rgba(124,58,237,0.1)",
        boxShadow: "0 8px 32px rgba(124,58,237,0.08)",
        overflow: "hidden",
        maxHeight: menuOpen ? 320 : 0,
        opacity: menuOpen ? 1 : 0,
        transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s",
        pointerEvents: menuOpen ? "auto" : "none",
      }}>
        <div style={{ padding: "24px 24px 28px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              width: "100%", textAlign: "center",
              padding: "14px 0",
              borderBottom: "1px solid rgba(0,0,0,0.05)",
              color: isActive(l.href) ? "#7c3aed" : "var(--text)",
              textDecoration: "none", fontSize: 16, fontWeight: 600,
              transition: "color 0.2s",
            }}>
              {l.label}
            </Link>
          ))}
          <a href="mailto:nitishv712@gmail.com" className="btn-primary" onClick={() => setMenuOpen(false)}
            style={{ marginTop: 16, width: "100%", textAlign: "center", padding: "13px", fontSize: 15 }}>
            Hire Me
          </a>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{
          position: "fixed", inset: 0, zIndex: 998,
          background: "rgba(0,0,0,0.2)",
          backdropFilter: "blur(2px)",
        }} />
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
