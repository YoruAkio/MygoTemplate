import type { Transition } from "motion/react";

// fast spring for small controls and popovers
export const snappy: Transition = { type: "spring", stiffness: 620, damping: 38, mass: 0.6 };

// opacity cross-fade for page and label transitions
export const fade: Transition = { duration: 0.16, ease: "easeOut" };

// sidebar rail width transition between collapsed icon rail and expanded nav
export const rail: Transition = { type: "spring", stiffness: 340, damping: 34, mass: 0.8 };

// delayed entrance for rail labels so they appear after the rail widens
export const railLabel: Transition = {
  opacity: { duration: 0.14, delay: 0.08, ease: "easeOut" },
  x: { type: "spring", stiffness: 500, damping: 34 },
};

// subtle opacity transition for page swaps
export const pageFade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
