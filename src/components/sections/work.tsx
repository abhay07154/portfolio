"use client";

import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";
import { experience, type ExperienceId } from "@/data/homepage";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectRow } from "@/components/ui/project-row";

export function Work({
  ids,
  label,
}: {
  ids: readonly ExperienceId[];
  label: string;
}) {
  const [filter, setFilter] = useState<ExperienceId | "all">("all");
  const [selected, setSelected] = useState<ExperienceId | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const visible = filter === "all" ? ids : ids.filter((id) => id === filter);
  const entry = selected ? experience[selected] : null;
  const selectedIndex = selected ? visible.indexOf(selected) : -1;

  useEffect(() => {
    const element = dialog.current;
    if (selected && element && !element.open) element.showModal();
    if (!selected && element?.open) element.close();
  }, [selected]);

  function step(direction: number) {
    setSelected(
      visible[(selectedIndex + direction + visible.length) % visible.length],
    );
    dialog.current?.scrollTo({ top: 0, behavior: "instant" });
    closeButton.current?.focus({ preventScroll: true });
  }

  return (
    <section
      id="work"
      tabIndex={-1}
      aria-labelledby="work-heading"
      className="section work-section"
      data-reveal
    >
      <SectionHeading
        id="work-heading"
        title={
          label === "Everything"
            ? "everything, in one place"
            : `${label.toLowerCase()}, in practice`
        }
        description={`${ids.length} experience ${ids.length === 1 ? "entry" : "entries"} · explore the work, or switch domain above.`}
      />
      <div className="role-chips">
        <span className="hand">Roles</span>
        {[...new Set(ids.map((id) => experience[id].role))].map((role) => (
          <span key={role}>{role}</span>
        ))}
      </div>
      <div className="work-filters" role="group" aria-label="Filter by company">
        <button
          type="button"
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
        >
          All <small>{ids.length}</small>
        </button>
        {ids.length > 1 &&
          ids.map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
            >
              <i aria-hidden="true" />
              {experience[id].company} <small>1</small>
            </button>
          ))}
      </div>
      <p className="work-disclosure">
        Employment highlights, not public project case studies. TODO: verified
        public projects and approved artwork.
      </p>
      <ul className="work-wall" data-domain-change>
        {visible.map((id) => (
          <ProjectRow key={id} id={id} onOpen={() => setSelected(id)} />
        ))}
      </ul>
      <dialog
        ref={dialog}
        className="experience-drawer"
        aria-labelledby="detail-heading"
        data-lenis-prevent
        onCancel={() => setSelected(null)}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (
            event.target === event.currentTarget &&
            event.clientX < event.currentTarget.getBoundingClientRect().left
          )
            setSelected(null);
        }}
      >
        <button
          ref={closeButton}
          type="button"
          className="drawer-close"
          aria-label="Close experience"
          onClick={() => setSelected(null)}
        >
          ×
        </button>
        {entry && (
          <div className="drawer-content">
            <p className="drawer-breadcrumb">Experience › {entry.company}</p>
            <div className="work-meta">
              <Badge>Employment</Badge>
              <span>{entry.period}</span>
            </div>
            <h2 id="detail-heading">
              {entry.company} — {entry.role}
            </h2>
            <p className="drawer-lead">{entry.responsibilities[0]}</p>
            <h3>the work</h3>
            <ul className="responsibilities">
              {entry.responsibilities.slice(1).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3>tools &amp; skills</h3>
            <ul className="technology-chips">
              {entry.technologies.split(", ").map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <p className="drawer-privacy">
              Employment summary only. Private project details and internal
              systems are intentionally omitted.
            </p>
            {visible.length > 1 && (
              <nav className="drawer-pagination" aria-label="Other experience">
                <button type="button" onClick={() => step(-1)}>
                  ← previous
                  <strong>
                    {
                      experience[
                        visible[
                          (selectedIndex - 1 + visible.length) % visible.length
                        ]
                      ].company
                    }
                  </strong>
                </button>
                <button type="button" onClick={() => step(1)}>
                  next →
                  <strong>
                    {
                      experience[visible[(selectedIndex + 1) % visible.length]]
                        .company
                    }
                  </strong>
                </button>
              </nav>
            )}
          </div>
        )}
      </dialog>
    </section>
  );
}
