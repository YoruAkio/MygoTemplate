import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import {
  APP_VERSION,
  AppHeader,
  ComponentsPage,
  DEFAULT_ZOOM,
  HomePage,
  MAX_ZOOM,
  MIN_ZOOM,
  NAV,
  RAIL_OPEN_WIDTH,
  RAIL_WIDTH,
  RailIcons,
  RailLogo,
  SettingsPage,
  SettingsRailNav,
  Toaster,
  fade,
  fontFamily,
  pageFade,
  rail,
  railLabel,
  resolveTheme,
  toast,
  type Appearance,
  type SettingsTab,
  type ThemeId,
} from "@mygo/ui";
import { useAppRuntime, useSettings } from "./store";

const APP_NAME = "Mygo";
const SETTINGS_PAGE_INDEX = NAV.findIndex((item) => item.id === "settings");

export default function App() {
  const { settings, fonts, update, reset } = useSettings();
  const { desktop, systemInfo, dataDir, clockText, greet } = useAppRuntime();

  const [page, setPage] = useState(0);
  const [settingsTab, setSettingsTab] = useState<SettingsTab>("general");

  const theme = resolveTheme(
    settings.appearance === "dark" ? settings.darkTheme : settings.lightTheme,
    settings.appearance,
  );
  const isRailOpen = page === SETTINGS_PAGE_INDEX;
  const activeNav = NAV[page] ?? NAV[0];

  // keyboard shortcuts for ui scaling
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const modifier = e.metaKey || e.ctrlKey;
      if (!modifier) return;

      const isZoomIn =
        (e.shiftKey && (e.key === "+" || e.key === "=" || e.code === "Equal")) ||
        e.key === "+" ||
        e.code === "NumpadAdd";
      const isZoomOut =
        (e.shiftKey && (e.key === "_" || e.key === "-" || e.code === "Minus")) ||
        e.key === "-" ||
        e.code === "NumpadSubtract";
      const isZoomReset = e.key === "0" || e.code === "Numpad0";

      if (isZoomIn) {
        e.preventDefault();
        update({ zoom: Math.min(MAX_ZOOM, settings.zoom + 5) });
      } else if (isZoomOut) {
        e.preventDefault();
        update({ zoom: Math.max(MIN_ZOOM, settings.zoom - 5) });
      } else if (isZoomReset) {
        e.preventDefault();
        update({ zoom: DEFAULT_ZOOM });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [settings.zoom, update]);

  // apply ui scale to root element
  useEffect(() => {
    document.documentElement.style.zoom = `${settings.zoom}%`;
  }, [settings.zoom]);

  // sync active theme tokens to documentElement so tailwind utilities and portals match
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.appearance = settings.appearance;
    root.classList.toggle("dark", settings.appearance === "dark");

    for (const [key, value] of Object.entries(theme)) {
      const kebab = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      root.style.setProperty(`--${kebab}`, value);
      root.style.setProperty(`--color-${kebab}`, value);
    }
  }, [theme, settings.appearance]);

  const themeVars = Object.fromEntries(
    Object.entries(theme).flatMap(([key, value]) => {
      const kebab = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      return [
        [`--${kebab}`, value],
        [`--color-${kebab}`, value],
      ];
    }),
  );

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative flex h-full overflow-hidden select-none"
        style={
          {
            ...themeVars,
            fontFamily: fontFamily(settings.font),
            color: theme.foreground,
            background: theme.background,
          } as CSSProperties
        }
      >
        <motion.nav
          className="relative z-30 shrink-0 flex flex-col items-center gap-2 px-2.5 pt-3.5 pb-3"
          animate={{ width: isRailOpen ? RAIL_OPEN_WIDTH : RAIL_WIDTH }}
          transition={rail}
          style={{ background: theme.sidebar }}
        >
          <div className="flex items-center gap-3 w-full h-[30px] pl-[10px]">
            <RailLogo src="/icon.png" alt={APP_NAME} theme={theme} />
            <AnimatePresence>
              {isRailOpen && (
                <motion.div
                  key="wordmark"
                  className="inline-flex items-baseline gap-1.5 whitespace-nowrap"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={railLabel}
                >
                  <span
                    className="text-[0.95rem] font-bold whitespace-nowrap"
                    style={{ color: theme.sidebarForeground }}
                  >
                    {APP_NAME}
                  </span>
                  <span
                    className="text-[0.72rem] font-normal opacity-80 whitespace-nowrap"
                    style={{ color: theme.mutedForeground }}
                  >
                    v{APP_VERSION}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {isRailOpen ? (
              <motion.div
                key="settings-rail"
                {...pageFade}
                transition={fade}
                className="flex flex-1 flex-col w-full min-h-0"
              >
                <SettingsRailNav
                  activeTab={settingsTab}
                  onSelectTab={setSettingsTab}
                  theme={theme}
                  onBack={() => setPage(0)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="icons"
                {...pageFade}
                transition={fade}
                className="flex flex-1 flex-col w-full min-h-0"
              >
                <RailIcons selected={page} onSelect={setPage} theme={theme} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        <div
          className="flex-1 min-w-0 h-full flex flex-col overflow-hidden"
          style={{ background: theme.sidebar }}
        >
          <AppHeader
            title={activeNav?.label ?? APP_NAME}
            theme={theme}
            appearance={settings.appearance}
            onToggleTheme={() =>
              update({ appearance: settings.appearance === "dark" ? "light" : "dark" })
            }
          />

          <div
            className="flex-1 min-w-0 min-h-0 h-full relative rounded-tl-[14px] overflow-hidden"
            style={{ background: theme.background }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.main
                key={activeNav?.id ?? "home"}
                {...pageFade}
                animate={{ opacity: 1 }}
                exit={pageFade.exit}
                transition={fade}
                className="flex-1 min-w-0 min-h-0 h-full overflow-y-auto select-text"
              >
                {page === SETTINGS_PAGE_INDEX ? (
                  <SettingsPage
                    appName={APP_NAME}
                    activeTab={settingsTab}
                    settings={settings}
                    fonts={fonts}
                    theme={theme}
                    onFont={(font) => update({ font })}
                    onZoom={(zoom) => update({ zoom })}
                    onAppearance={(appearance: Appearance) => update({ appearance })}
                    onLightTheme={(lightTheme: ThemeId) => update({ lightTheme })}
                    onDarkTheme={(darkTheme: ThemeId) => update({ darkTheme })}
                    onReset={() => {
                      reset();
                      toast.success("Preferences reset to defaults");
                    }}
                  />
                ) : activeNav?.id === "components" ? (
                  <ComponentsPage theme={theme} />
                ) : (
                  <HomePage
                    appName={APP_NAME}
                    theme={theme}
                    systemInfo={systemInfo}
                    dataDir={dataDir}
                    clockText={clockText}
                    isDesktop={desktop}
                    onGreet={greet}
                    onOpenComponents={() => setPage(1)}
                    onOpenSettings={() => setPage(SETTINGS_PAGE_INDEX)}
                  />
                )}
              </motion.main>
            </AnimatePresence>
          </div>
        </div>

        <Toaster
          position="bottom-right"
          theme={settings.appearance}
          toastOptions={{
            style: {
              background: theme.card,
              color: theme.foreground,
              border: `1px solid ${theme.border}`,
            },
          }}
        />
      </div>
    </MotionConfig>
  );
}
