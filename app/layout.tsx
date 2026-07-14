import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteShell } from "./components/SiteShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amal-engulatov-portfolio.vercel.app"),
  title: {
    default: "Amal Engulatov — AI Software Engineer",
    template: "%s — Amal Engulatov",
  },
  description:
    "AI software engineer building agents and intelligent products for real businesses.",
  openGraph: {
    title: "Amal Engulatov — AI Software Engineer",
    description: "I build AI agents and intelligent products that make complicated work feel simple.",
    url: "/",
    siteName: "Amal Engulatov Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amal Engulatov — AI Software Engineer",
    description: "I build AI agents and intelligent products that make complicated work feel simple.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
