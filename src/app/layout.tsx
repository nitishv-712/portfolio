import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ParticleField from "@/components/ParticleField";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Nitish Vishwakarma — Full-Stack Developer",
  description: "Full-Stack Developer skilled in Node.js, Flutter, and Next.js. Building responsive web and mobile applications.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ParticleField />
        {children}
      </body>
    </html>
  );
}
