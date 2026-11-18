import { AppearancePicker, ThemePicker } from "./Appearance";
import { Dropdown } from "./Dropdown";
import { Icon } from "./Icon";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import type { SettingsTab } from "./PageHeader";
import {
  APP_VERSION,
  DEFAULT_FONT,
  DEFAULT_ZOOM,
  MAX_ZOOM,
  MIN_ZOOM,
  type Appearance,
  type FontChoice,
  type Settings,
  type ThemeId,
} from "../settings";
import type { Theme } from "../theme";

// full-page settings split into general and appearance tabs
export function SettingsPage({
  appName = "Mygo",
  activeTab = "general",
  settings,
  fonts,
  theme,
  onFont,
  onZoom,
  onAppearance,
  onLightTheme,
  onDarkTheme,
  onReset,
}: {
  appName?: string;
  activeTab?: SettingsTab;
  settings: Settings;
  fonts: readonly FontChoice[];
  theme: Theme;
  onFont: (font: FontChoice) => void;
  onZoom: (zoom: number) => void;
  onAppearance: (appearance: Appearance) => void;
  onLightTheme: (themeId: ThemeId) => void;
  onDarkTheme: (themeId: ThemeId) => void;
  onReset: () => void;
}) {
  const activeThemeId = settings.appearance === "dark" ? settings.darkTheme : settings.lightTheme;
  const zoomPercent = Math.max(
    0,
    Math.min(100, ((settings.zoom - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)) * 100),
  );

  return (
    <div className="p-6 max-w-3xl mx-auto flex flex-col gap-6">
      {activeTab === "general" ? (
        <>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight m-0">General</h1>
            <p className="text-sm m-0" style={{ color: theme.mutedForeground }}>
              Core preferences and application metadata.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Interface Scale</CardTitle>
              <CardDescription>
                Adjust zoom level (shortcuts: Ctrl/Cmd +, -, and 0).
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <input
                type="range"
                min={MIN_ZOOM}
                max={MAX_ZOOM}
                step={5}
                value={settings.zoom}
                onChange={(e) => onZoom(Number(e.target.value))}
                className="settings-slider flex-1 h-1.5 rounded-full bg-secondary outline-none appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${theme.primary} 0%, ${theme.primary} ${zoomPercent}%, ${theme.secondary} ${zoomPercent}%, ${theme.secondary} 100%)`,
                }}
                aria-label="Interface zoom"
              />
              <span className="text-sm font-mono tabular-nums w-12 text-right">
                {settings.zoom}%
              </span>
              {settings.zoom !== DEFAULT_ZOOM && (
                <Button variant="ghost" size="sm" onClick={() => onZoom(DEFAULT_ZOOM)}>
                  <Icon name="reset" size={14} />
                  Reset
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">About {appName}</CardTitle>
              <CardDescription>
                Version {APP_VERSION} · Built with MyGo, React 19, and Tailwind CSS v4.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <span className="text-xs" style={{ color: theme.mutedForeground }}>
                Reset all preferences back to factory defaults.
              </span>
              <Button variant="outline" size="sm" onClick={onReset}>
                <Icon name="reset" size={14} />
                Reset Preferences
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight m-0">Appearance</h1>
            <p className="text-sm m-0" style={{ color: theme.mutedForeground }}>
              Customize mode, color palettes, and typography.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Mode</CardTitle>
              <CardDescription>Choose between light and dark appearance.</CardDescription>
            </CardHeader>
            <CardContent>
              <AppearancePicker
                value={settings.appearance}
                onChange={onAppearance}
                theme={theme}
                themeId={activeThemeId}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Themes & Typography</CardTitle>
              <CardDescription>Pick separate palettes for light and dark mode.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <ThemePicker
                lightTheme={settings.lightTheme}
                darkTheme={settings.darkTheme}
                onLight={onLightTheme}
                onDark={onDarkTheme}
                theme={theme}
              />
              <Separator />
              <div className="flex items-center justify-between gap-4 pt-1">
                <span className="text-sm font-medium" style={{ color: theme.foreground }}>
                  Font family
                </span>
                <Dropdown
                  className="w-[220px]"
                  value={settings.font}
                  options={fonts.length > 0 ? fonts : [DEFAULT_FONT]}
                  render={(font) => (font === DEFAULT_FONT ? "System Default" : font)}
                  onChange={onFont}
                  theme={theme}
                  searchPlaceholder="Search fonts..."
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
