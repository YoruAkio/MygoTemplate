// inline tabler-style svg paths so every icon inherits currentColor
const paths = {
  home: [
    "M5 12l-2 0l9 -9l9 9l-2 0",
    "M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7",
    "M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6",
  ],
  components: [
    "M4 4h6v6h-6z",
    "M14 4h6v6h-6z",
    "M4 14h6v6h-6z",
    "M14 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
  ],
  settings: [
    "M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065",
    "M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0",
  ],
  palette: [
    "M12 3a9 9 0 0 0 0 18h1.5a1.5 1.5 0 0 0 0 -3h-1a1.5 1.5 0 0 1 0 -3h2a4.5 4.5 0 0 0 4.5 -4.5c0 -4.142 -4.03 -7.5 -9 -7.5",
    "M7.5 11.5a1 1 0 1 0 0 -2a1 1 0 0 0 0 2",
    "M10.5 7.5a1 1 0 1 0 0 -2a1 1 0 0 0 0 2",
    "M15 7.5a1 1 0 1 0 0 -2a1 1 0 0 0 0 2",
  ],
  sun: [
    "M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
    "M3 12h1M12 3v1M20 12h1M12 20v1M5.6 5.6l.7 .7M18.4 5.6l-.7 .7M17.7 18.4l.7 .7M6.3 18.4l-.7 .7",
  ],
  moon: [
    "M12 3a9 9 0 1 0 9 9c0 -.46 -.04 -.92 -.1 -1.36a5.39 5.39 0 0 1 -4.4 2.26a5.4 5.4 0 0 1 -5.4 -5.4c0 -1.81 .9 -3.4 2.26 -4.4c-.44 -.06 -.9 -.1 -1.36 -.1",
  ],
  arrowLeft: ["M5 12l14 0", "M5 12l6 6", "M5 12l6 -6"],
  arrowRight: ["M5 12l14 0", "M13 18l6 -6", "M13 6l6 6"],
  chevronDown: ["M6 9l6 6l6 -6"],
  x: ["M18 6l-12 12", "M6 6l12 12"],
  check: ["M5 12l5 5l10 -10"],
  reset: ["M9 14l-4 -4l4 -4", "M5 10h8a6 6 0 0 1 6 6v4"],
  terminal: ["M5 7l5 5l-5 5", "M12 19l7 0"],
  cpu: [
    "M5 5m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z",
    "M9 9h6v6h-6z",
    "M3 10h2M3 14h2M10 3v2M14 3v2M21 10h-2M21 14h-2M14 21v-2M10 21v-2",
  ],
  clock: ["M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "M12 7v5l3 3"],
  folder: ["M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2"],
  sparkles: [
    "M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z",
  ],
} as const;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  size = 18,
  color = "currentColor",
  strokeWidth = 1.9,
  className,
}: {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
