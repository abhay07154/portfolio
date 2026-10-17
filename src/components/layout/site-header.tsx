"use client";

import { useRef, useState } from "react";
import { ThemeControl } from "@/components/ui/theme-control";
import { profile } from "@/data/homepage";

export function SiteHeader({ role }: { role: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setMenuOpen(false);
      }}
    >
      <div className="header-capsule">
        <a
          href="#top"
          aria-label="Abhay Upadhyay, back to top"
          onClick={() => setMenuOpen(false)}
          className="mr-auto flex min-h-11 min-w-0 items-center gap-3 rounded-full"
        >
          <span className="flex size-10.5 shrink-0 items-center justify-center rounded-full border border-control font-display text-xl">
            AU.
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[0.8125rem] font-semibold sm:text-sm">
              {profile.name}
            </span>
            <span className="hidden text-xs text-muted sm:block">{role}</span>
          </span>
        </a>
        <button
          ref={menuButton}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="order-4 flex size-11 shrink-0 items-center justify-center rounded-full bg-surface hover:bg-hairline lg:hidden"
        >
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path
              d={menuOpen ? "m6 6 12 12M6 18 18 6" : "M4 7h16M4 12h16M4 17h16"}
            />
          </svg>
        </button>
        <nav
          id="primary-navigation"
          aria-label="Primary"
          className="header-nav"
          data-open={menuOpen}
          onClick={() => setMenuOpen(false)}
        >
          <ul>
            {[
              ["work", "Work"],
              ["experience", "Experience"],
              ["about", "About"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-link flex min-h-11 items-center text-sm text-secondary hover:text-primary"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="header-availability">
          <i aria-hidden="true" />
          Availability unconfirmed
        </span>
        <ThemeControl />
      </div>
    </header>
  );
}
