const sections = [
  { id: "top", label: "Hero", headingLevel: "h1" },
  { id: "work", label: "Work", headingLevel: "h2" },
  { id: "about", label: "About", headingLevel: "h2" },
  { id: "contact", label: "Contact", headingLevel: "h2" },
] as const;

export default function Home() {
  return (
    <main className="site-structure">
      {sections.map(({ id, label, headingLevel }) => (
        <section className="structure-section" id={id} key={id} aria-label={`${label} section`}>
          {headingLevel === "h1" ? <PageTitle>{label}</PageTitle> : <h2>{label}</h2>}
        </section>
      ))}
    </main>
  );
}
import { PageTitle } from "./components/PageTitle";
