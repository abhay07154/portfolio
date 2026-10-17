"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate } from "motion/mini";
import { getMotionTiming } from "@/lib/motion";
import {
  disciplines,
  portfolioContent,
  portfolioIds,
  type PortfolioId,
} from "@/data/homepage";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { Expertise } from "@/components/sections/expertise";
import { DomainSelector } from "@/components/ui/domain-selector";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export function DomainPortfolio({ children }: { children: ReactNode }) {
  const [domain, setDomain] = useState<PortfolioId>("all");
  const content = portfolioContent[domain];
  const previousDomain = useRef(domain);

  useEffect(() => {
    const url = new URL(location.href);
    let initial = url.searchParams.get("domain");
    if (!initial) {
      try {
        initial = localStorage.getItem("portfolio-domain");
      } catch {
        /* Query filters work without storage. */
      }
    }
    if (portfolioIds.includes(initial as PortfolioId)) {
      // Apply a shareable filter after hydration without changing the server markup.
      const frame = requestAnimationFrame(() =>
        setDomain(initial as PortfolioId),
      );
      return () => cancelAnimationFrame(frame);
    }
  }, []);

  function selectDomain(next: PortfolioId) {
    setDomain(next);
    try {
      localStorage.setItem("portfolio-domain", next);
    } catch {
      /* Selection still works for this visit. */
    }
    const url = new URL(location.href);
    url.searchParams.set("domain", next);
    history.replaceState(null, "", url);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        (event.target instanceof HTMLElement &&
          (event.target.isContentEditable ||
            event.target.closest("input,select,textarea,dialog")))
      )
        return;
      const next = portfolioIds[Number(event.key) - 1];
      if (next) selectDomain(next);
    }
    function onPopState() {
      const value = new URL(location.href).searchParams.get("domain");
      setDomain(
        portfolioIds.includes(value as PortfolioId)
          ? (value as PortfolioId)
          : "all",
      );
    }
    addEventListener("keydown", onKey);
    addEventListener("popstate", onPopState);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    if (previousDomain.current === domain) return;
    previousDomain.current = domain;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const animation = animate(
      "[data-domain-change]",
      { opacity: [0.5, 1], transform: ["translateY(8px)", "none"] },
      getMotionTiming(),
    );
    const complete = () => animation.complete();
    preference.addEventListener("change", complete);
    return () => {
      complete();
      preference.removeEventListener("change", complete);
    };
  }, [domain]);

  return (
    <div className="portfolio" data-domain={domain}>
      <SiteHeader
        role={content.positioning.replace("Software Engineer — ", "")}
      />
      <main id="main-content" tabIndex={-1}>
        <Hero description={content.description} domain={domain} />
        <DomainSelector selected={domain} onChange={selectDomain} />
        <p className="sr-only" role="status">
          Showing {content.label}: {content.experienceIds.length} experience
          entries.
        </p>
        <div className="discipline-marquee" aria-hidden="true">
          <div>
            {[0, 1].map((copy) => (
              <span className="marquee-copy" key={copy}>
                {disciplines.map((item) => (
                  <span key={item}>
                    {item}
                    <b>✦</b>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
        <div className="page-container">
          <dl className="impact">
            <div>
              <dt>Domains</dt>
              <dd>3</dd>
            </div>
            <div>
              <dt>Companies</dt>
              <dd>3</dd>
            </div>
            <div>
              <dt>IIIT Allahabad</dt>
              <dd>ECE</dd>
            </div>
          </dl>
          <Work
            key={domain}
            ids={content.experienceIds}
            label={content.label}
          />
          <Expertise areas={content.expertise} />
          {children}
        </div>
      </main>
      <SiteFooter domain={content.label} />
    </div>
  );
}
