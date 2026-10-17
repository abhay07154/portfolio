"use client";

import { useId, useSyncExternalStore } from "react";
import {
  isThemePreference,
  themeChangeEvent,
  themeStorageKey,
} from "@/lib/theme";

function getPreference() {
  const preference = document.documentElement.dataset.theme;
  return isThemePreference(preference) ? preference : "system";
}

function getServerPreference() {
  return "system" as const;
}

function setPreference(value: "system" | "light" | "dark") {
  document.documentElement.dataset.theme = value;
  try {
    localStorage.setItem(themeStorageKey, value);
  } catch {
    /* Applies for this visit when storage is blocked. */
  }
  window.dispatchEvent(new Event(themeChangeEvent));
}

function subscribe(onChange: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key !== themeStorageKey && event.key !== null) return;
    document.documentElement.dataset.theme = isThemePreference(event.newValue)
      ? event.newValue
      : "system";
    onChange();
  }

  function onKey(event: KeyboardEvent) {
    if (
      event.key.toLowerCase() !== "t" ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      (event.target instanceof HTMLElement &&
        (event.target.isContentEditable ||
          event.target.closest("input,textarea,select,dialog")))
    )
      return;
    const dark =
      getComputedStyle(document.documentElement).colorScheme === "dark" ||
      (getPreference() === "system" &&
        matchMedia("(prefers-color-scheme: dark)").matches);
    setPreference(dark ? "light" : "dark");
  }
  window.addEventListener("keydown", onKey);
  window.addEventListener(themeChangeEvent, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener("keydown", onKey);
    window.removeEventListener(themeChangeEvent, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function ThemeControl() {
  const id = useId();
  const preference = useSyncExternalStore(
    subscribe,
    getPreference,
    getServerPreference,
  );

  return (
    <div className="relative order-3 size-11 shrink-0">
      <label htmlFor={id} className="sr-only">
        Theme
      </label>
      <select
        id={id}
        value={preference}
        onChange={(event) => {
          const value = event.target.value;
          if (!isThemePreference(value)) return;
          setPreference(value);
        }}
        title={`Theme: ${preference}. Choose System, Light, or Dark.`}
        className="size-11 cursor-pointer appearance-none rounded-full border border-transparent bg-surface text-transparent hover:bg-hairline"
      >
        <option className="text-primary" value="system">
          System (device preference)
        </option>
        <option className="text-primary" value="light">
          Light
        </option>
        <option className="text-primary" value="dark">
          Dark
        </option>
      </select>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 text-primary"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {preference === "system" ? (
          <path d="M4 4h16v12H4zM8 20h8M12 16v4" />
        ) : preference === "dark" ? (
          <path d="M20 13.2A8 8 0 0 1 10.8 4a8 8 0 1 0 9.2 9.2Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" />
          </>
        )}
      </svg>
    </div>
  );
}
