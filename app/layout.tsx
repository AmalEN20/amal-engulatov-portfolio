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

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  preload: false,
});

const ibmPlexSansCondensed = IBM_Plex_Sans_Condensed({
  variable: "--font-ibm-plex-sans-condensed",
  subsets: ["latin"],
  weight: ["400", "500"],
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Amal E — Full-Stack Developer",
    template: "%s | Amal E",
  },
  description:
    "Experience, selected projects, and education by Amal E, a full-stack developer and digital product builder based in Seattle, Washington.",
  openGraph: {
    type: "website",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(location.pathname==="/"&&!matchMedia("(prefers-reduced-motion: reduce)").matches){var n=performance.getEntriesByType("navigation")[0];var t=n&&n.type;var s=history.state||{};if(t==="reload"||!s.__amalEntryPlayed){document.documentElement.dataset.entryMotion="armed";history.replaceState(Object.assign({},s,{__amalEntryPlayed:true}),"");setTimeout(function(){delete document.documentElement.dataset.entryMotion},4100)}}}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} ${instrumentSans.variable} ${ibmPlexSansCondensed.variable}`}
      >
        <HeavyScroll>{children}</HeavyScroll>
      </body>
    </html>
  );
}
