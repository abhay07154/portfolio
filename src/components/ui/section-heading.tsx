import type { ReactNode } from "react";

type SectionHeadingProps = {
  id?: string;
  align?: "left" | "center";
  eyebrow?: string;
  title: ReactNode;
  description?: string;
};

export function SectionHeading({
  id,
  align = "left",
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div
      className={`section-heading ${align === "center" ? "section-heading--center" : ""}`}
    >
      {eyebrow && <p className="hand">{eyebrow}</p>}
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
