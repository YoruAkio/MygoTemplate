import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "../Icon";
import type { Theme } from "../../theme";
import { snappy } from "../../motion";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: number | string;
  className?: string;
  contentClassName?: string;
  showCloseButton?: boolean;
}

// modal dialog with backdrop blur and escape key handling
export function Modal({
  isOpen,
  onClose,
  theme,
  title,
  children,
  footer,
  maxWidth = 480,
  className = "",
  contentClassName,
  showCloseButton = true,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[1000] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            className={`w-full rounded-[14px] border shadow-[0_16px_40px_rgba(0,0,0,0.4)] flex flex-col ${className.includes("overflow-") ? "" : "overflow-hidden"} ${className}`}
            style={{
              background: theme.card,
              borderColor: theme.border,
              color: theme.foreground,
              maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
            }}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={snappy}
          >
            {title && (
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: theme.border }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {typeof title === "string" ? (
                    <h2
                      className="text-sm font-semibold m-0 leading-tight truncate"
                      style={{ color: theme.foreground }}
                    >
                      {title}
                    </h2>
                  ) : (
                    title
                  )}
                </div>
                {showCloseButton && (
                  <button
                    type="button"
                    className="bg-foreground/10 hover:bg-foreground/20 border-0 cursor-pointer size-6 flex items-center justify-center rounded-full transition-colors p-0"
                    onClick={onClose}
                    aria-label="Close modal"
                  >
                    <Icon name="x" size={14} color={theme.foreground} />
                  </button>
                )}
              </div>
            )}

            <div
              className={
                contentClassName ??
                "relative z-10 p-4 flex flex-col gap-3.5 max-h-[70vh] overflow-y-auto"
              }
            >
              {children}
            </div>

            {footer && (
              <div
                className="relative z-0 flex items-center justify-end gap-2 px-4 py-3 border-t"
                style={{ borderColor: theme.border }}
              >
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
