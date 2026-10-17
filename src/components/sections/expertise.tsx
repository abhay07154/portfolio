import { SectionHeading } from "@/components/ui/section-heading";
import type { ExpertiseArea } from "@/data/homepage";

export function Expertise({ areas }: { areas: readonly ExpertiseArea[] }) {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="section"
      data-reveal
    >
      <SectionHeading id="expertise-heading" title="what I bring to the work" />
      <ol className="capability-grid" data-domain-change>
        {areas.map((area, index) => (
          <li key={area.title} className="capability">
            <span className="capability-number">0{index + 1}</span>
            <h3>{area.title}</h3>
            <p>{area.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
