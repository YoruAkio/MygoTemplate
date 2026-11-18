export const APP_VERSION = "0.1.0";

export type Appearance = "dark" | "light";

export type ThemeId =
  | "default"
  | "catppuccin"
  | "rose_pine"
  | "dark_plus"
  | "dracula"
  | "tokyo_night";

export const DEFAULT_THEME: ThemeId = "default";

export const THEME_IDS: readonly ThemeId[] = [
  "default",
  "catppuccin",
  "rose_pine",
  "dark_plus",
  "dracula",
  "tokyo_night",
];

export const DEFAULT_FONT = "default";
export type FontChoice = string;

export const DEFAULT_FONT_SIZE = 16;
export const MIN_FONT_SIZE = 12;
export const MAX_FONT_SIZE = 20;

export const DEFAULT_ZOOM = 100;
export const MIN_ZOOM = 70;
export const MAX_ZOOM = 150;

// persisted user preferences mirrored by internal/settings/settings.go
export type Settings = {
  appearance: Appearance;
  lightTheme: ThemeId;
  darkTheme: ThemeId;
  font: FontChoice;
  fontSize: number;
  zoom: number;
};

export const DEFAULT_SETTINGS: Settings = {
  appearance: "dark",
  lightTheme: DEFAULT_THEME,
  darkTheme: DEFAULT_THEME,
  font: DEFAULT_FONT,
  fontSize: DEFAULT_FONT_SIZE,
  zoom: DEFAULT_ZOOM,
};
