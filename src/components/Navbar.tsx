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

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || menuOpen ? "nav-blur" : ""
        } px-6 md:px-10 py-4`}
    >
      <div className="max-w-[1100px] mx-auto flex items-center justify-between">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          style={{
            textDecoration: "none",
            fontWeight: 800,
            fontSize: 17,
            letterSpacing: "-0.5px",
            background: "linear-gradient(135deg,#7c3aed,#2563eb)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Nitish<span style={{ WebkitTextFillColor: "#7c3aed" }}>.</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {LINKS.map((l) => {
            const isActive =
              pathname === l.href ||
              (l.href !== "/" && pathname.startsWith(l.href.replace("/#about", "")));
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
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = "var(--text-muted)";
                }}
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

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 bg-transparent border-0 cursor-pointer z-50 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`w-6 h-0.5 bg-neutral-800 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[8px]" : ""
              }`}
          />
          <span
            className={`w-6 h-0.5 bg-neutral-800 transition-all duration-300 ${menuOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`w-6 h-0.5 bg-neutral-800 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[8px]" : ""
              }`}
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-x-0 top-[60px] bg-white/95 backdrop-blur-xl border-b border-violet-500/10 transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-[300px] opacity-100 py-6 px-6 shadow-lg" : "max-h-0 opacity-0 py-0 px-6 pointer-events-none"
          }`}
      >
        <div className="flex flex-col gap-6 items-center">
          {LINKS.map((l) => {
            const isActive =
              pathname === l.href ||
              (l.href !== "/" && pathname.startsWith(l.href.replace("/#about", "")));
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: isActive ? "#7c3aed" : "var(--text-muted)",
                  textDecoration: "none",
                  fontSize: 16,
                  fontWeight: 600,
                  transition: "color 0.2s",
                }}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href="mailto:nitishv712@gmail.com"
            className="btn-primary btn-glow w-full text-center"
            style={{ padding: "12px 20px", fontSize: 14 }}
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}
