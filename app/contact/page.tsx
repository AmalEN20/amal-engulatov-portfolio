import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="placeholder-page placeholder-page-dark">
      <h1 className="placeholder-title">
        <span className="line-mask"><span>Contact</span></span>
      </h1>
    </main>
  );
}
