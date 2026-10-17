export const themePreferences = ["system", "light", "dark"] as const;
export type ThemePreference = (typeof themePreferences)[number];

export const themeStorageKey = "portfolio-theme";
export const themeChangeEvent = "portfolio-theme-change";

export function isThemePreference(value: unknown): value is ThemePreference {
  return themePreferences.some((preference) => preference === value);
}

// Runs in the document head before body content can paint. CSS handles system mode.
export const themeInitScript = `(() => {
  try {
    const preference = localStorage.getItem(${JSON.stringify(themeStorageKey)});
    if (${JSON.stringify(themePreferences)}.includes(preference)) {
      document.documentElement.dataset.theme = preference;
    }
  } catch {
    // Storage may be unavailable; retain the server's system preference.
  }
})();`;
