import { SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/data/homepage";
import { ButtonLink } from "@/components/ui/button";

export function Contact() {
  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-heading"
      className="section contact"
      data-reveal
    >
      <SectionHeading
        id="contact-heading"
        align="center"
        eyebrow="feel free to reach out"
        title="building something that needs reliable systems?"
        description="Backend, AI workflows, or the connections between them — find my public work and professional profile on GitHub."
      />
      <ButtonLink href={profile.github} pill>
        find me on GitHub <span aria-hidden="true">↗</span>
      </ButtonLink>
      <div className="contact-links">
        <a href={profile.github}>GitHub ↗</a>
        <a href="#top">Back to top ↑</a>
      </div>
      <p className="content-todo">
        TODO: verified email, LinkedIn, and résumé.
      </p>
    </section>
  );
}
