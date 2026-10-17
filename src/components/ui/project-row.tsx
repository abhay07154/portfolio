import { Badge } from "@/components/ui/badge";
import { experience, type ExperienceId } from "@/data/homepage";

export function ProjectRow({
  id,
  onOpen,
}: {
  id: ExperienceId;
  onOpen: () => void;
}) {
  const entry = experience[id];
  return (
    <li className="work-entry" data-company={id}>
      <button
        type="button"
        className="work-card"
        onClick={onOpen}
        aria-label={`View experience: ${entry.company}`}
      >
        <span className="work-frame">
          <span className="washi-tape" aria-hidden="true" />
          <span className="work-art">
            <span className="art-category">Employment</span>
            <span className="art-year">{entry.period}</span>
            <span className="art-company">
              {entry.company}
              <small>{entry.role}</small>
            </span>
            <span className="art-caption">EXPERIENCE / ENGINEERING</span>
          </span>
          <span className="work-sticker">experience</span>
        </span>
        <span className="work-body">
          <span className="work-meta">
            <Badge>Employment</Badge>
            <span>{entry.role}</span>
          </span>
          <span role="heading" aria-level={3} className="work-title">
            {entry.company} — {entry.headline}
          </span>
          <span className="work-description">{entry.responsibilities[0]}</span>
          <span className="work-foot">
            <span>{entry.period}</span>
            <span className="text-link">read the experience ↗</span>
          </span>
        </span>
      </button>
    </li>
  );
}
