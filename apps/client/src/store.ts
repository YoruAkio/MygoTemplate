import { useCallback, useEffect, useState } from "react";
import { isMyGo } from "mygo-runtime";
import {
  DEFAULT_FONT,
  DEFAULT_SETTINGS,
  MAX_FONT_SIZE,
  MAX_ZOOM,
  MIN_FONT_SIZE,
  MIN_ZOOM,
  THEME_IDS,
  type FontChoice,
  type Settings,
  type SystemSummary,
} from "@mygo/ui";
import { AppService, SettingsService, SystemService, events } from "./mygo";

const STORAGE_KEY = "mygo.settings";
const APPEARANCES = ["dark", "light"] as const;

// normalizes untrusted settings payloads against allowed bounds and enum values
function sanitizeSettings(loaded: Partial<Settings>): Settings {
  const appearance =
    APPEARANCES.find((opt) => opt === loaded.appearance) ?? DEFAULT_SETTINGS.appearance;
  const lightTheme =
    THEME_IDS.find((id) => id === loaded.lightTheme) ?? DEFAULT_SETTINGS.lightTheme;
  const darkTheme = THEME_IDS.find((id) => id === loaded.darkTheme) ?? DEFAULT_SETTINGS.darkTheme;

  return {
    appearance,
    lightTheme,
    darkTheme,
    font: loaded.font?.trim() ? loaded.font : DEFAULT_FONT,
    fontSize: Math.min(
      MAX_FONT_SIZE,
      Math.max(MIN_FONT_SIZE, Math.round(Number(loaded.fontSize) || DEFAULT_SETTINGS.fontSize)),
    ),
    zoom: Math.min(
      MAX_ZOOM,
      Math.max(MIN_ZOOM, Math.round(Number(loaded.zoom) || DEFAULT_SETTINGS.zoom)),
    ),
  };
}

function readBrowserSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return sanitizeSettings(JSON.parse(raw) as Partial<Settings>);
  } catch {
    return DEFAULT_SETTINGS;
  }
}

// manages persisted settings and installed host fonts with browser-preview fallback
export function useSettings() {
  const desktop = isMyGo();
  const [settings, setSettings] = useState<Settings>(() =>
    desktop ? DEFAULT_SETTINGS : readBrowserSettings(),
  );
  const [fonts, setFonts] = useState<FontChoice[]>([DEFAULT_FONT]);

  useEffect(() => {
    if (!desktop) return;

    let cancelled = false;
    SettingsService.loadSettings()
      .then((loaded) => {
        if (!cancelled) {
          setSettings(sanitizeSettings(loaded as Partial<Settings>));
        }
      })
      .catch(() => {});

    SystemService.listFonts()
      .then((list) => {
        if (!cancelled && list.length > 0) {
          setFonts(list);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [desktop]);

  const update = useCallback(
    (patch: Partial<Settings>) => {
      setSettings((prev) => {
        const next = sanitizeSettings({ ...prev, ...patch });
        if (desktop) {
          void SettingsService.saveSettings(next).catch(() => {});
        } else {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          } catch {
            // ignore storage errors in restricted contexts
          }
        }
        return next;
      });
    },
    [desktop],
  );

  const reset = useCallback(() => {
    update(DEFAULT_SETTINGS);
  }, [update]);

  return { settings, fonts, update, reset };
}

// exposes host runtime info, app data directory, live go clock event, and sample rpc
export function useAppRuntime() {
  const desktop = isMyGo();
  const [systemInfo, setSystemInfo] = useState<SystemSummary | null>(null);
  const [dataDir, setDataDir] = useState("");
  const [clockText, setClockText] = useState("");

  useEffect(() => {
    if (!desktop) {
      const updateLocalClock = () => setClockText(new Date().toLocaleTimeString());
      updateLocalClock();
      const id = window.setInterval(updateLocalClock, 1000);
      return () => window.clearInterval(id);
    }

    let cancelled = false;
    SystemService.getInfo()
      .then((info) => {
        if (!cancelled) setSystemInfo(info);
      })
      .catch(() => {});

    AppService.getDataDir()
      .then((dir) => {
        if (!cancelled) setDataDir(dir);
      })
      .catch(() => {});

    const unlisten = events.tick.on((isoTime) => {
      setClockText(new Date(isoTime).toLocaleTimeString());
    });

    return () => {
      cancelled = true;
      unlisten();
    };
  }, [desktop]);

  const greet = useCallback(
    async (name: string): Promise<string> => {
      if (!desktop) {
        const target = name.trim() || "stranger";
        return `Hello, ${target}! (Web preview fallback)`;
      }
      return AppService.greet(name);
    },
    [desktop],
  );

  return { desktop, systemInfo, dataDir, clockText, greet };
}
