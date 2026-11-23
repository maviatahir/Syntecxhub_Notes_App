const NOTES_KEY = "noteflow_notes";
const THEME_KEY = "noteflow_theme";
const SEEDED_KEY = "noteflow_seeded";

// Returns saved notes. Sample notes are used only on the very first run,
// so deleting everything later never brings them back.
export function loadNotes(sampleNotes) {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    }
    if (localStorage.getItem(SEEDED_KEY)) return [];
    return sampleNotes;
  } catch {
    return [];
  }
}

export function saveNotes(notes) {
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    localStorage.setItem(SEEDED_KEY, "true");
  } catch {
    // Storage can be full or blocked; the app keeps working in memory.
  }
}

export function loadTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // ignore and fall back to the system preference
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // ignore
  }
}
