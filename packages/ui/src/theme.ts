import type { Appearance, ThemeId } from "./settings";

// palette keys matching tailwind v4 / shadcn css variables
export type Theme = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  radius: string;
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
  success: string;
};

const defaultDark: Theme = {
  background: "#18181b",
  foreground: "#f4f4f5",
  card: "#222226",
  cardForeground: "#f4f4f5",
  popover: "#222226",
  popoverForeground: "#f4f4f5",
  primary: "#e4e4e7",
  primaryForeground: "#18181b",
  secondary: "#2b2b30",
  secondaryForeground: "#e4e4e7",
  muted: "#2b2b30",
  mutedForeground: "#a1a1aa",
  accent: "#2e2e34",
  accentForeground: "#f4f4f5",
  destructive: "#e05a5a",
  destructiveForeground: "#fafafa",
  border: "#323238",
  input: "#2b2b30",
  ring: "#71717a",
  radius: "0.5rem",
  sidebar: "#131316",
  sidebarForeground: "#f4f4f5",
  sidebarPrimary: "#fafafa",
  sidebarPrimaryForeground: "#18181b",
  sidebarAccent: "#27272c",
  sidebarAccentForeground: "#f4f4f5",
  sidebarBorder: "#27272c",
  sidebarRing: "#71717a",
  success: "#22c55e",
};

const defaultLight: Theme = {
  background: "#f6f5f3",
  foreground: "#18181b",
  card: "#ffffff",
  cardForeground: "#18181b",
  popover: "#ffffff",
  popoverForeground: "#18181b",
  primary: "#18181b",
  primaryForeground: "#fafafa",
  secondary: "#eceae6",
  secondaryForeground: "#18181b",
  muted: "#eceae6",
  mutedForeground: "#63636b",
  accent: "#e8e6e1",
  accentForeground: "#18181b",
  destructive: "#cc3b3b",
  destructiveForeground: "#ffffff",
  border: "#dfddd7",
  input: "#eceae6",
  ring: "#71717a",
  radius: "0.5rem",
  sidebar: "#efede9",
  sidebarForeground: "#18181b",
  sidebarPrimary: "#18181b",
  sidebarPrimaryForeground: "#fafafa",
  sidebarAccent: "#e4e1db",
  sidebarAccentForeground: "#18181b",
  sidebarBorder: "#dfddd7",
  sidebarRing: "#71717a",
  success: "#16a34a",
};

const catppuccinDark: Theme = {
  background: "#1e1e2e",
  foreground: "#cdd6f4",
  card: "#262637",
  cardForeground: "#cdd6f4",
  popover: "#262637",
  popoverForeground: "#cdd6f4",
  primary: "#cba6f7",
  primaryForeground: "#1e1e2e",
  secondary: "#313244",
  secondaryForeground: "#cdd6f4",
  muted: "#313244",
  mutedForeground: "#a2a6c1",
  accent: "#313244",
  accentForeground: "#cdd6f4",
  destructive: "#f38ba8",
  destructiveForeground: "#1e1e2e",
  border: "#45475a",
  input: "#313244",
  ring: "#b4befe",
  radius: "0.5rem",
  sidebar: "#181825",
  sidebarForeground: "#cdd6f4",
  sidebarPrimary: "#cba6f7",
  sidebarPrimaryForeground: "#181825",
  sidebarAccent: "#262637",
  sidebarAccentForeground: "#cdd6f4",
  sidebarBorder: "#2a2a3c",
  sidebarRing: "#b4befe",
  success: "#a6e3a1",
};

const catppuccinLight: Theme = {
  background: "#eff1f5",
  foreground: "#4c4f69",
  card: "#e6e9ef",
  cardForeground: "#4c4f69",
  popover: "#e6e9ef",
  popoverForeground: "#4c4f69",
  primary: "#8839ef",
  primaryForeground: "#eff1f5",
  secondary: "#ccd0da",
  secondaryForeground: "#4c4f69",
  muted: "#ccd0da",
  mutedForeground: "#5c5f6d",
  accent: "#ccd0da",
  accentForeground: "#4c4f69",
  destructive: "#d20f39",
  destructiveForeground: "#eff1f5",
  border: "#bcc0cc",
  input: "#ccd0da",
  ring: "#7287fd",
  radius: "0.5rem",
  sidebar: "#e6e9ef",
  sidebarForeground: "#4c4f69",
  sidebarPrimary: "#8839ef",
  sidebarPrimaryForeground: "#eff1f5",
  sidebarAccent: "#ccd0da",
  sidebarAccentForeground: "#4c4f69",
  sidebarBorder: "#d4d8e2",
  sidebarRing: "#7287fd",
  success: "#40a02b",
};

const rosePineDark: Theme = {
  background: "#191724",
  foreground: "#e0def4",
  card: "#1f1d2e",
  cardForeground: "#e0def4",
  popover: "#1f1d2e",
  popoverForeground: "#e0def4",
  primary: "#c4a7e7",
  primaryForeground: "#191724",
  secondary: "#26233a",
  secondaryForeground: "#e0def4",
  muted: "#26233a",
  mutedForeground: "#9891b5",
  accent: "#26233a",
  accentForeground: "#e0def4",
  destructive: "#eb6f92",
  destructiveForeground: "#191724",
  border: "#403d52",
  input: "#26233a",
  ring: "#c4a7e7",
  radius: "0.5rem",
  sidebar: "#151320",
  sidebarForeground: "#e0def4",
  sidebarPrimary: "#c4a7e7",
  sidebarPrimaryForeground: "#191724",
  sidebarAccent: "#26233a",
  sidebarAccentForeground: "#e0def4",
  sidebarBorder: "#2b2744",
  sidebarRing: "#c4a7e7",
  success: "#31748f",
};

const rosePineLight: Theme = {
  background: "#faf4ed",
  foreground: "#575279",
  card: "#fffaf3",
  cardForeground: "#575279",
  popover: "#fffaf3",
  popoverForeground: "#575279",
  primary: "#286983",
  primaryForeground: "#faf4ed",
  secondary: "#f2e9e1",
  secondaryForeground: "#575279",
  muted: "#f2e9e1",
  mutedForeground: "#736f87",
  accent: "#f2e9e1",
  accentForeground: "#575279",
  destructive: "#b4637a",
  destructiveForeground: "#faf4ed",
  border: "#e0dcd8",
  input: "#f2e9e1",
  ring: "#907aa9",
  radius: "0.5rem",
  sidebar: "#f4ede8",
  sidebarForeground: "#575279",
  sidebarPrimary: "#286983",
  sidebarPrimaryForeground: "#faf4ed",
  sidebarAccent: "#ece3db",
  sidebarAccentForeground: "#575279",
  sidebarBorder: "#e4dcd4",
  sidebarRing: "#907aa9",
  success: "#56949f",
};

const darkPlusDark: Theme = {
  background: "#1e1e1e",
  foreground: "#cccccc",
  card: "#252526",
  cardForeground: "#cccccc",
  popover: "#252526",
  popoverForeground: "#cccccc",
  primary: "#569cd6",
  primaryForeground: "#141414",
  secondary: "#2d2d30",
  secondaryForeground: "#cccccc",
  muted: "#2d2d30",
  mutedForeground: "#9d9d9d",
  accent: "#2d2d30",
  accentForeground: "#cccccc",
  destructive: "#f14c4c",
  destructiveForeground: "#1e1e1e",
  border: "#3c3c3c",
  input: "#313131",
  ring: "#4fc1ff",
  radius: "0.5rem",
  sidebar: "#181818",
  sidebarForeground: "#cccccc",
  sidebarPrimary: "#569cd6",
  sidebarPrimaryForeground: "#141414",
  sidebarAccent: "#2d2d30",
  sidebarAccentForeground: "#cccccc",
  sidebarBorder: "#333333",
  sidebarRing: "#4fc1ff",
  success: "#4ec9b0",
};

const darkPlusLight: Theme = {
  background: "#ffffff",
  foreground: "#3b3b3b",
  card: "#f8f8f8",
  cardForeground: "#3b3b3b",
  popover: "#f8f8f8",
  popoverForeground: "#3b3b3b",
  primary: "#005fb8",
  primaryForeground: "#ffffff",
  secondary: "#e8e8e8",
  secondaryForeground: "#3b3b3b",
  muted: "#e8e8e8",
  mutedForeground: "#616161",
  accent: "#e8e8e8",
  accentForeground: "#3b3b3b",
  destructive: "#cd3131",
  destructiveForeground: "#ffffff",
  border: "#d4d4d4",
  input: "#e9e9e9",
  ring: "#0092d8",
  radius: "0.5rem",
  sidebar: "#f3f3f3",
  sidebarForeground: "#3b3b3b",
  sidebarPrimary: "#005fb8",
  sidebarPrimaryForeground: "#ffffff",
  sidebarAccent: "#e4e4e4",
  sidebarAccentForeground: "#3b3b3b",
  sidebarBorder: "#e4e4e4",
  sidebarRing: "#0092d8",
  success: "#107c10",
};

const draculaDark: Theme = {
  background: "#282a36",
  foreground: "#f8f8f2",
  card: "#343746",
  cardForeground: "#f8f8f2",
  popover: "#343746",
  popoverForeground: "#f8f8f2",
  primary: "#bd93f9",
  primaryForeground: "#282a36",
  secondary: "#44475a",
  secondaryForeground: "#f8f8f2",
  muted: "#44475a",
  mutedForeground: "#a9adc8",
  accent: "#44475a",
  accentForeground: "#f8f8f2",
  destructive: "#ff5555",
  destructiveForeground: "#282a36",
  border: "#4a4d63",
  input: "#44475a",
  ring: "#ff79c6",
  radius: "0.5rem",
  sidebar: "#21222c",
  sidebarForeground: "#f8f8f2",
  sidebarPrimary: "#bd93f9",
  sidebarPrimaryForeground: "#21222c",
  sidebarAccent: "#343746",
  sidebarAccentForeground: "#f8f8f2",
  sidebarBorder: "#2f3140",
  sidebarRing: "#ff79c6",
  success: "#50fa7b",
};

const draculaLight: Theme = {
  background: "#f8f8f2",
  foreground: "#525564",
  card: "#eaeae3",
  cardForeground: "#525564",
  popover: "#eaeae3",
  popoverForeground: "#525564",
  primary: "#5d5a80",
  primaryForeground: "#f8f8f2",
  secondary: "#e3e3db",
  secondaryForeground: "#525564",
  muted: "#e3e3db",
  mutedForeground: "#64677a",
  accent: "#e3e3db",
  accentForeground: "#525564",
  destructive: "#c8424e",
  destructiveForeground: "#f8f8f2",
  border: "#d9d9d1",
  input: "#e3e3db",
  ring: "#8867c7",
  radius: "0.5rem",
  sidebar: "#efefe7",
  sidebarForeground: "#525564",
  sidebarPrimary: "#5d5a80",
  sidebarPrimaryForeground: "#f8f8f2",
  sidebarAccent: "#e3e3db",
  sidebarAccentForeground: "#525564",
  sidebarBorder: "#e0e0d8",
  sidebarRing: "#8867c7",
  success: "#2f855a",
};

const tokyoNightDark: Theme = {
  background: "#1a1b26",
  foreground: "#c0caf5",
  card: "#1f2335",
  cardForeground: "#c0caf5",
  popover: "#1f2335",
  popoverForeground: "#c0caf5",
  primary: "#7aa2f7",
  primaryForeground: "#16161e",
  secondary: "#2f334d",
  secondaryForeground: "#c0caf5",
  muted: "#2f334d",
  mutedForeground: "#9aa5ce",
  accent: "#2f334d",
  accentForeground: "#c0caf5",
  destructive: "#f7768e",
  destructiveForeground: "#1a1b26",
  border: "#3b4261",
  input: "#2f334d",
  ring: "#bb9af7",
  radius: "0.5rem",
  sidebar: "#16161e",
  sidebarForeground: "#c0caf5",
  sidebarPrimary: "#7aa2f7",
  sidebarPrimaryForeground: "#16161e",
  sidebarAccent: "#1f2335",
  sidebarAccentForeground: "#c0caf5",
  sidebarBorder: "#292e42",
  sidebarRing: "#bb9af7",
  success: "#9ece6a",
};

const tokyoNightLight: Theme = {
  background: "#e1e2e7",
  foreground: "#3760bf",
  card: "#eaeaf2",
  cardForeground: "#3760bf",
  popover: "#eaeaf2",
  popoverForeground: "#3760bf",
  primary: "#2458b8",
  primaryForeground: "#ffffff",
  secondary: "#c4c8da",
  secondaryForeground: "#3760bf",
  muted: "#c4c8da",
  mutedForeground: "#52619a",
  accent: "#c4c8da",
  accentForeground: "#3760bf",
  destructive: "#d3355c",
  destructiveForeground: "#ffffff",
  border: "#b4b7cc",
  input: "#c4c8da",
  ring: "#2e7de9",
  radius: "0.5rem",
  sidebar: "#d5d7e2",
  sidebarForeground: "#3760bf",
  sidebarPrimary: "#2458b8",
  sidebarPrimaryForeground: "#ffffff",
  sidebarAccent: "#c4c8da",
  sidebarAccentForeground: "#3760bf",
  sidebarBorder: "#c0c3d6",
  sidebarRing: "#2e7de9",
  success: "#587539",
};

const defaultPalettes: Record<Appearance, Theme> = {
  dark: defaultDark,
  light: defaultLight,
};

export const THEMES: Record<ThemeId, Record<Appearance, Theme>> = {
  default: defaultPalettes,
  catppuccin: { dark: catppuccinDark, light: catppuccinLight },
  rose_pine: { dark: rosePineDark, light: rosePineLight },
  dark_plus: { dark: darkPlusDark, light: darkPlusLight },
  dracula: { dark: draculaDark, light: draculaLight },
  tokyo_night: { dark: tokyoNightDark, light: tokyoNightLight },
};

export const THEME_LABELS: Record<ThemeId, string> = {
  default: "Default",
  catppuccin: "Catppuccin",
  rose_pine: "Rosé Pine",
  dark_plus: "Dark+",
  dracula: "Dracula",
  tokyo_night: "Tokyo Night",
};

// resolveTheme returns the theme tokens for a theme id and appearance, falling back to default
export function resolveTheme(id: string | undefined, appearance: Appearance): Theme {
  return THEMES[(id as ThemeId) ?? "default"]?.[appearance] ?? defaultPalettes[appearance];
}

// fontFamily resolves a font preference to a css font-family stack
export function fontFamily(preference: string | undefined): string {
  if (!preference || preference === "default") {
    return 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  }
  return `"${preference}", system-ui, -apple-system, sans-serif`;
}
