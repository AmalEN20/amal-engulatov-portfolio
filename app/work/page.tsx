import type { Metadata } from "next";

export const metadata: Metadata = { title: "Projects" };

export default function WorkPage() {
  return (
    <main className="placeholder-page">
      <h1 className="placeholder-title">
        <span className="line-mask"><span>Projects</span></span>
      </h1>
    </main>
  );
}
