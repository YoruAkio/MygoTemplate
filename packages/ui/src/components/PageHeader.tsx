import { motion } from "motion/react";
import { Icon, type IconName } from "./Icon";
import { railLabel } from "../motion";
import type { Theme } from "../theme";

export type SettingsTab = "general" | "appearance";

export interface SettingsNavItem {
  id: SettingsTab;
  label: string;
  icon: IconName;
}

export const SETTINGS_TABS: readonly SettingsNavItem[] = [
  { id: "general", label: "General", icon: "settings" },
  { id: "appearance", label: "Appearance", icon: "palette" },
];

// expanded sidebar content when settings are active
export function SettingsRailNav({
  tabs = SETTINGS_TABS,
  activeTab,
  onSelectTab,
  theme,
  onBack,
}: {
  tabs?: readonly SettingsNavItem[];
  activeTab: SettingsTab;
  onSelectTab: (tab: SettingsTab) => void;
  theme: Theme;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col min-h-0 w-full">
      <div className="flex flex-col gap-1 mt-2 w-full">
        {tabs.map((tab) => {
          const active = tab.id === activeTab;
          return (
            <motion.button
              key={tab.id}
              type="button"
              className="flex items-center gap-2.5 w-full px-2.5 py-2 border-0 rounded-lg text-sm font-medium text-left cursor-pointer bg-transparent transition-colors duration-120 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              onClick={() => onSelectTab(tab.id)}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={railLabel}
              style={{
                background: active ? theme.sidebarAccent : "transparent",
                color: active ? theme.sidebarPrimary : theme.mutedForeground,
              }}
            >
              <Icon name={tab.icon} size={18} color="currentColor" />
              <span
                className="whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ fontWeight: active ? 600 : 500 }}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <motion.button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 mt-auto px-3 py-2 border-0 rounded-lg text-sm font-medium text-left cursor-pointer bg-transparent transition-colors duration-120 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        style={{ color: theme.mutedForeground }}
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -6 }}
        transition={railLabel}
      >
        <Icon name="arrowLeft" size={18} color={theme.mutedForeground} />
        <span>Back</span>
      </motion.button>
    </div>
  );
}

// reusable expanded sidebar header for single-page drilldown views
export function PageHeader({
  icon,
  label,
  theme,
  onBack,
  backLabel = "Back",
}: {
  icon: IconName;
  label: string;
  theme: Theme;
  onBack: () => void;
  backLabel?: string;
}) {
  return (
    <div className="flex flex-1 flex-col min-h-0 w-full">
      <motion.div
        className="flex items-center gap-2 mt-1.5 px-2.5 py-2 rounded-lg"
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -6 }}
        transition={railLabel}
        style={{ background: theme.sidebarAccent }}
      >
        <Icon name={icon} size={18} color={theme.sidebarPrimary} />
        <span className="text-sm font-semibold" style={{ color: theme.sidebarPrimary }}>
          {label}
        </span>
      </motion.div>

      <motion.button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 mt-auto px-3 py-2 border-0 rounded-lg text-sm font-medium text-left cursor-pointer bg-transparent transition-colors duration-120 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        style={{ color: theme.mutedForeground }}
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -6 }}
        transition={railLabel}
      >
        <Icon name="arrowLeft" size={18} color={theme.mutedForeground} />
        <span>{backLabel}</span>
      </motion.button>
    </div>
  );
}
