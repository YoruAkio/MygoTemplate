import { Fragment } from "react";
import { motion } from "motion/react";
import { Icon, type IconName } from "./Icon";
import { fade, snappy } from "../motion";
import { Dropdown } from "./Dropdown";
import { THEME_IDS, type Appearance, type ThemeId } from "../settings";
import { THEMES, THEME_LABELS, resolveTheme, type Theme } from "../theme";

const OPTIONS: readonly Appearance[] = ["light", "dark"];
const LABELS: Record<Appearance, string> = { light: "Light", dark: "Dark" };
const ICONS: Record<Appearance, IconName> = { light: "sun", dark: "moon" };

// light/dark appearance selector rendered as live mini-shell swatches
export function AppearancePicker({
  value,
  onChange,
  theme,
  themeId,
}: {
  value: Appearance;
  onChange: (appearance: Appearance) => void;
  theme: Theme;
  themeId: ThemeId;
}) {
  return (
    <div className="flex gap-4 w-full">
      {OPTIONS.map((option) => (
        <motion.button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={value === option}
          className="flex flex-1 flex-col items-center gap-2.5 p-1.5 border-0 rounded-[10px] cursor-pointer bg-transparent"
          whileTap={{ scale: 0.98 }}
          transition={snappy}
        >
          <Swatch
            theme={resolveTheme(themeId, option)}
            selected={value === option}
            selectedColor={theme.primary}
          />
          <motion.span
            className="flex items-center gap-1.5 text-sm font-medium"
            animate={{
              color: value === option ? theme.primary : theme.mutedForeground,
            }}
            transition={fade}
          >
            <Icon
              name={ICONS[option]}
              size={15}
              color={value === option ? theme.primary : theme.mutedForeground}
            />
            {LABELS[option]}
          </motion.span>
        </motion.button>
      ))}
    </div>
  );
}

// per-appearance palette dropdown rows
export function ThemePicker({
  lightTheme,
  darkTheme,
  onLight,
  onDark,
  theme,
}: {
  lightTheme: ThemeId;
  darkTheme: ThemeId;
  onLight: (id: ThemeId) => void;
  onDark: (id: ThemeId) => void;
  theme: Theme;
}) {
  const rows = [
    { label: "Light theme", value: lightTheme, onChange: onLight, variant: "light" as const },
    { label: "Dark theme", value: darkTheme, onChange: onDark, variant: "dark" as const },
  ];

  return (
    <div className="flex flex-col w-full">
      {rows.map((row, index) => (
        <Fragment key={row.label}>
          <div
            className="flex items-center justify-between gap-4 py-2.5"
            style={index > 0 ? { borderTop: `1px solid ${theme.border}` } : undefined}
          >
            <span className="text-sm font-medium" style={{ color: theme.foreground }}>
              {row.label}
            </span>
            <Dropdown
              className="w-[220px]"
              value={row.value}
              options={THEME_IDS}
              render={(id) => THEME_LABELS[id]}
              renderLeading={(id) => <ThemeChip theme={THEMES[id][row.variant]} />}
              onChange={row.onChange}
              theme={theme}
            />
          </div>
        </Fragment>
      ))}
    </div>
  );
}

function ThemeChip({ theme: t }: { theme: Theme }) {
  return (
    <span
      className="shrink-0 w-4 h-4 rounded-[4px]"
      style={{
        background: `linear-gradient(90deg, ${t.background} 0% 50%, ${t.primary} 50% 100%)`,
        boxShadow: `inset 0 0 0 1px ${t.border}`,
      }}
    />
  );
}

function Swatch({
  theme: t,
  selected,
  selectedColor,
}: {
  theme: Theme;
  selected: boolean;
  selectedColor: string;
}) {
  return (
    <div
      className="w-full h-[96px] rounded-[10px] flex overflow-hidden transition-shadow"
      style={{
        background: t.sidebar,
        boxShadow: selected ? `0 0 0 2px ${selectedColor}` : `inset 0 0 0 1px ${t.border}`,
      }}
    >
      <div
        className="w-9 shrink-0 flex flex-col items-center gap-2 py-3"
        style={{ background: t.sidebar }}
      >
        <span className="size-3.5 rounded-full" style={{ background: t.primary }} />
        <span className="size-3 rounded" style={{ background: t.sidebarAccent }} />
        <span className="size-3 rounded opacity-50" style={{ background: t.mutedForeground }} />
      </div>
      <div
        className="flex-1 mt-3 rounded-tl-lg p-3 flex flex-col gap-2"
        style={{ background: t.background }}
      >
        <div
          className="h-2.5 w-20 rounded-full"
          style={{ background: t.foreground, opacity: 0.75 }}
        />
        <div className="flex gap-2 flex-1">
          <div
            className="flex-1 rounded-md p-2 flex flex-col gap-1.5"
            style={{ background: t.card }}
          >
            <span className="h-1.5 w-10 rounded-full" style={{ background: t.primary }} />
            <span
              className="h-1.5 w-14 rounded-full opacity-40"
              style={{ background: t.mutedForeground }}
            />
          </div>
          <div className="w-12 rounded-md" style={{ background: t.secondary }} />
        </div>
      </div>
    </div>
  );
}
