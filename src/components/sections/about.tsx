import { SectionHeading } from "@/components/ui/section-heading";
import { experience, profile } from "@/data/homepage";

export function About() {
  return (
    <section
      id="about"
      tabIndex={-1}
      aria-labelledby="about-heading"
      className="section"
      data-reveal
    >
      <SectionHeading id="about-heading" title="a bit about me" />
      <div className="about-inner">
        <div>
          <figure className="about-portrait">
            <span aria-hidden="true">AU.</span>
            <figcaption>TODO: verified portrait</figcaption>
          </figure>
          <dl className="about-facts">
            <div>
              <dt>Education</dt>
              <dd>B.Tech ECE</dd>
            </div>
            <div>
              <dt>Institute</dt>
              <dd>IIIT Allahabad</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Backend &amp; AI</dd>
            </div>
            <div>
              <dt>Currently</dt>
              <dd>Pocket FM</dd>
            </div>
          </dl>
        </div>
        <div className="about-body">
          <p>
            I’m {profile.name}, a software engineer building the systems{" "}
            <em>behind the experience.</em>
          </p>
          <p>
            I studied {profile.education}. My experience spans backend services
            at Amazon, distributed database testing at Yugabyte, and AI-powered
            content workflows at Pocket FM.
          </p>
          <p>
            The work here is labelled honestly: employment experience is
            employment experience. Public project case studies will be added
            when their details and links are verified.
          </p>
          <div id="experience" tabIndex={-1}>
            <h3 className="experience-heading">where I’ve worked</h3>
            <ol className="experience-list">
              {Object.values(experience).map((entry) => (
                <li key={entry.company}>
                  <div>
                    <h4>{entry.company}</h4>
                    <p>{entry.role}</p>
                  </div>
                  <time>{entry.period}</time>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
