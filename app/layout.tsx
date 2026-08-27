import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  IBM_Plex_Sans_Condensed,
  Instrument_Sans,
} from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { HeavyScroll } from "./components/HeavyScroll";
import { SiteIntro } from "./components/SiteIntro";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const ibmPlexSansCondensed = IBM_Plex_Sans_Condensed({
  variable: "--font-ibm-plex-sans-condensed",
  subsets: ["latin"],
  weight: ["400", "500"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amaleng.com"),
  title: {
    default: "Amal E — Full-Stack Developer",
    template: "%s | Amal E",
  },
  alternates: {
    canonical: "/",
  },
  description:
    "Experience, selected projects, and education by Amal E, a full-stack developer and digital product builder based in Seattle, Washington.",
  openGraph: {
    type: "website",
    url: "/",
    title: "Amal E — Full-Stack Developer",
    description:
      "Experience, selected projects, and education by full-stack developer Amal E.",
    siteName: "Amal E",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amal E — Full-Stack Developer",
    description:
      "Experience, selected projects, and education by full-stack developer Amal E.",
  },
};

const introFailsafe = `
  window.setTimeout(function () {
    document.documentElement.removeAttribute("data-intro");
    var loader = document.querySelector(".site-loader");
    if (loader) loader.remove();
    window.dispatchEvent(new Event("amal:site-intro-lock"));
  }, 4200);
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} ${instrumentSans.variable} ${ibmPlexSansCondensed.variable}`}
      >
        <script dangerouslySetInnerHTML={{ __html: introFailsafe }} />
        <SiteIntro />
        <HeavyScroll>{children}</HeavyScroll>
      </body>
    </html>
  );
}
