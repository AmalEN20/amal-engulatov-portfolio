import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "Amal Engulatov — Full-Stack Developer",
    template: "%s | Amal Engulatov",
  },
  description:
    "Bio, notes, projects, and experiments by Amal Engulatov, a full-stack developer and digital product builder based in Seattle, Washington.",
  openGraph: {
    type: "website",
    title: "Amal Engulatov — Full-Stack Developer",
    description:
      "Bio, notes, projects, and experiments by full-stack developer Amal Engulatov.",
    siteName: "Amal Engulatov",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amal Engulatov — Full-Stack Developer",
    description:
      "Bio, notes, projects, and experiments by full-stack developer Amal Engulatov.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(location.pathname==="/"&&!matchMedia("(prefers-reduced-motion: reduce)").matches){var n=performance.getEntriesByType("navigation")[0];var t=n&&n.type;var s=history.state||{};if(t==="reload"||!s.__amalEntryPlayed){document.documentElement.dataset.entryMotion="armed";history.replaceState(Object.assign({},s,{__amalEntryPlayed:true}),"");setTimeout(function(){delete document.documentElement.dataset.entryMotion},2600)}}}catch(e){}`,
          }}
        />
      </head>
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <HeavyScroll>{children}</HeavyScroll>
      </body>
    </html>
  );
}
