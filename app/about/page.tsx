import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="placeholder-page">
      <h1 className="placeholder-title">
        <span className="line-mask"><span>About</span></span>
      </h1>
    </main>
  );
}
