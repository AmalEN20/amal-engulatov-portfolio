import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    "Portfolio of Amal Engulatov, a full-stack developer and digital product builder based in Seattle, Washington.",
  openGraph: {
    type: "website",
    title: "Amal Engulatov — Full-Stack Developer",
    description:
      "Selected full-stack work, capabilities, and contact information for Amal Engulatov.",
    siteName: "Amal Engulatov",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amal Engulatov — Full-Stack Developer",
    description:
      "Selected full-stack work, capabilities, and contact information for Amal Engulatov.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.motion="enabled"}}catch(e){}',
          }}
        />
      </head>
      <body className={`${geist.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
