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

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-blur" : ""}`}
      style={{ padding: "16px 40px" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none", fontWeight: 800, fontSize: 17, letterSpacing: "-0.5px", background: "linear-gradient(135deg,#7c3aed,#2563eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          Nitish<span style={{ WebkitTextFillColor: "#7c3aed" }}>.</span>
        </Link>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {LINKS.map((l) => {
            const isActive = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href.replace("/#about", "")));
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  color: isActive ? "#7c3aed" : "var(--text-muted)",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "var(--text)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "var(--text-muted)"; }}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href="mailto:nitishv712@gmail.com"
            className="btn-primary btn-glow"
            style={{ padding: "8px 20px", fontSize: 13 }}
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}
