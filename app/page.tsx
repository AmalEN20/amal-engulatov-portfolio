import { HomeHero } from "./components/HomeHero";

const sections = [
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export default function Home() {
  return (
    <main className="site-structure">
      <HomeHero />
      {sections.map(({ id, label }) => (
        <section className="structure-section" id={id} key={id} aria-label={`${label} section`}>
          <h2>{label}</h2>
        </section>
      ))}
    </main>
  );
}
