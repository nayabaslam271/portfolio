"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [state, setState] = useState<"default" | "hover" | "view" | "explore">("default");

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const closest = (sel: string) => el.closest(sel);

      if (closest("[data-cursor='view']")) {
        setState("view");
      } else if (closest("[data-cursor='explore']")) {
        setState("explore");
      } else if (closest("a") || closest("button") || el.tagName === "A" || el.tagName === "BUTTON") {
        setState("hover");
      } else {
        setState("default");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  const isLarge = state === "view" || state === "explore";
  const size = state === "default" ? 10 : isLarge ? 64 : 36;

  return (
    <motion.div
      className="fixed z-[9997] pointer-events-none hidden lg:flex items-center justify-center"
      animate={{
        x: pos.x - size / 2,
        y: pos.y - size / 2,
        width: size,
        height: size,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.15 }}
    >
      <motion.div
        animate={{
          borderRadius: state === "default" ? "50%" : "2px",
          backgroundColor:
            state === "default"
              ? "#20E56A"
              : "rgba(32, 229, 106, 0.1)",
          borderWidth: state === "default" ? 0 : 1,
          borderColor: "rgba(32, 229, 106, 0.5)",
        }}
        transition={{ duration: 0.25 }}
        className="w-full h-full border flex items-center justify-center"
      >
        <AnimatePresence>
          {isLarge && (
            <motion.span
              key={state}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="text-[9px] text-[#20E56A] tracking-[0.18em] uppercase font-sans font-semibold"
            >
              {state === "view" ? "View" : "Explore"}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
