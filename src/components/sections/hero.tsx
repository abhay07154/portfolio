"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { profile, type DomainContent, type PortfolioId } from "@/data/homepage";
import { ButtonLink } from "@/components/ui/button";

export function Hero({
  description,
  domain,
}: Pick<DomainContent, "description"> & { domain: PortfolioId }) {
  const [verbIndex, setVerbIndex] = useState(0);
  const verbs = ["building", "connecting", "testing"];
  const verb =
    domain === "all"
      ? verbs[verbIndex]
      : domain === "frontend"
        ? "testing"
        : "building";

  useEffect(() => {
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;
    function sync() {
      clearInterval(timer);
      if (domain === "all" && !reducedMotion.matches)
        timer = setInterval(
          () => setVerbIndex((index) => (index + 1) % 3),
          2600,
        );
    }
    sync();
    reducedMotion.addEventListener("change", sync);
    return () => {
      clearInterval(timer);
      reducedMotion.removeEventListener("change", sync);
    };
  }, [domain]);
  return (
    <section id="domain-hero" aria-labelledby="hero-heading" className="hero">
      <div className="hero-guides" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <b />
        <b />
        <b />
        <b />
      </div>
      <div className="hero-foliage" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="hero-stickers" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <i key={i} />
        ))}
        <span className="glyph-stack">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="page-container hero-inner">
        <p className="hero-greeting">
          Hi, I’m <em>Abhay</em>
        </p>
        <h1 id="hero-heading" className="hero-headline">
          {[
            "I",
            "build",
            "the",
            "systems",
            "—",
            "and",
            "connect",
            "ideas",
            "that",
            "work.",
          ].map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="hero-word"
              style={{ "--word-index": index } as CSSProperties}
            >
              <span className="hero-word-text">
                {[1, 6].includes(index) ? <em>{word}</em> : word}
              </span>
              {[2, 5, 7].includes(index) ? (
                <>
                  <br className="desktop-break" />{" "}
                </>
              ) : (
                " "
              )}
            </span>
          ))}
        </h1>
        <p className="hero-current">
          <span className="sr-only">Currently building at Pocket FM.</span>
          <span aria-hidden="true">
            right now, I’m{" "}
            <em key={verb} className="hero-verb">
              {verb}.
            </em>
          </span>
        </p>
        <p data-domain-change className="hero-pitch">
          {description}
        </p>
        <p className="hero-note">
          <svg
            aria-hidden="true"
            width="54"
            height="44"
            viewBox="0 0 54 44"
            fill="none"
          >
            <path
              d="M2 42C10 26 13 12 29 11C39 10 36 25 30 20C25 15 35 4 48 6M41 2L49 6L44 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span>currently {profile.currentWork}</span>
        </p>
        <div className="hero-actions">
          <ButtonLink href="#work" pill data-magnetic>
            see the work <span aria-hidden="true">→</span>
          </ButtonLink>
          <ButtonLink href="#contact" variant="secondary" pill>
            let’s connect
          </ButtonLink>
        </div>
        <figure className="portrait-stamp">
          <div className="stamp-art">
            <span className="stamp-top">ENGINEERING / SYSTEMS</span>
            <span className="stamp-monogram" aria-hidden="true">
              AU.
            </span>
            <span className="stamp-signature">{profile.name}</span>
            <span className="stamp-bottom">Backend &amp; AI Systems</span>
          </div>
          <figcaption>TODO: verified portrait</figcaption>
        </figure>
      </div>
    </section>
  );
}
