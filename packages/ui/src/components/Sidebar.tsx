import { motion } from "motion/react";
import { Icon, type IconName } from "./Icon";
import type { Theme } from "../theme";
import { snappy } from "../motion";

export const RAIL_WIDTH = 68;
export const RAIL_OPEN_WIDTH = 204;

type Section = "main" | "footer";

export type NavItem = {
  id: string;
  icon: IconName;
  label: string;
  section: Section;
};

// default template navigation items; customize or pass your own array
export const NAV: NavItem[] = [
  { id: "home", icon: "home", label: "Home", section: "main" },
  { id: "components", icon: "components", label: "Components", section: "main" },
  { id: "settings", icon: "settings", label: "Settings", section: "footer" },
];

export function RailLogo({
  src,
  alt = "App logo",
  theme,
}: {
  src?: string;
  alt?: string;
  theme: Theme;
}) {
  if (src) {
    return <img src={src} alt={alt} width={28} height={28} className="rounded-md object-contain" />;
  }
  return (
    <div
      className="size-7 rounded-md flex items-center justify-center shrink-0 font-bold text-xs"
      style={{ background: theme.primary, color: theme.primaryForeground }}
    >
      M
    </div>
  );
}

// collapsed icon rail with main links centered and footer links pinned to the bottom
export function RailIcons({
  items = NAV,
  selected,
  onSelect,
  theme,
}: {
  items?: readonly NavItem[];
  selected: number;
  onSelect: (index: number) => void;
  theme: Theme;
}) {
  const bySection = (section: Section) =>
    items.map((item, index) => ({ item, index })).filter((entry) => entry.item.section === section);

  const renderButton = ({ item, index }: { item: NavItem; index: number }) => (
    <NavButton
      key={item.id}
      item={item}
      selected={index === selected}
      theme={theme}
      onClick={() => onSelect(index)}
    />
  );

  return (
    <div className="flex flex-1 flex-col items-center gap-2.5 w-full py-1">
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        {bySection("main").map(renderButton)}
      </div>
      <div className="flex flex-col items-center gap-2">
        {bySection("footer").map(renderButton)}
      </div>
    </div>
  );
}

function NavButton({
  item,
  selected,
  theme,
  onClick,
}: {
  item: NavItem;
  selected: boolean;
  theme: Theme;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      data-label={item.label}
      aria-label={item.label}
      aria-current={selected ? "page" : undefined}
      className="relative flex items-center justify-center size-11 rounded-[10px] border-0 cursor-pointer transition-colors duration-120 hover:bg-sidebar-accent after:content-[attr(data-label)] after:absolute after:left-[calc(100%+8px)] after:top-1/2 after:-translate-y-1/2 after:px-2.5 after:py-1 after:rounded-md after:bg-card after:text-foreground after:text-xs after:font-medium after:whitespace-nowrap after:opacity-0 after:pointer-events-none after:transition-opacity after:duration-120 after:z-50 after:shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:after:opacity-100"
      style={{ background: selected ? theme.sidebarAccent : "transparent" }}
      whileTap={{ scale: 0.92 }}
      transition={snappy}
    >
      <Icon
        name={item.icon}
        size={22}
        color={selected ? theme.sidebarPrimary : theme.mutedForeground}
      />
    </motion.button>
  );
}
