import { motion } from "motion/react";
import { Icon } from "./Icon";
import { snappy } from "../motion";
import type { Appearance } from "../settings";
import type { Theme } from "../theme";

// top shell bar showing active section title and quick theme toggle
export function AppHeader({
  title,
  theme,
  appearance,
  onToggleTheme,
}: {
  title: string;
  theme: Theme;
  appearance: Appearance;
  onToggleTheme: () => void;
}) {
  return (
    <header
      className="h-11 flex items-center justify-between px-5 border-0 outline-none shrink-0 z-20 select-none"
      style={{ background: theme.sidebar }}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className="text-xs font-semibold tracking-wide truncate"
          style={{ color: theme.sidebarForeground }}
        >
          {title}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          type="button"
          className="inline-flex items-center justify-center size-7 p-0 border-0 rounded-md bg-transparent cursor-pointer transition-colors hover:bg-sidebar-accent"
          style={{ color: theme.mutedForeground }}
          whileTap={{ scale: 0.9 }}
          transition={snappy}
          onClick={onToggleTheme}
          title={appearance === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          aria-label={appearance === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          <Icon name={appearance === "dark" ? "sun" : "moon"} size={16} color="currentColor" />
        </motion.button>
      </div>
    </header>
  );
}
