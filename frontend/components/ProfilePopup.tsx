"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   ProfilePopup
   Listens for the custom "preloader:done" event that the
   Preloader dispatches when it finishes, then shows itself.
───────────────────────────────────────────────────────── */
export function ProfilePopup() {
  const [open, setOpen] = useState(false);

  /* ── Open after preloader finishes ── */
  useEffect(() => {
    const handler = () => {
      // Small delay so preloader exit animation fully completes
      setTimeout(() => setOpen(true), 200);
    };
    window.addEventListener("preloader:done", handler);
    return () => window.removeEventListener("preloader:done", handler);
  }, []);

  /* ── ESC key ── */
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    // Lock scroll
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  /* ── View profile click ── */
  const handleViewProfile = () => {
    close();
    setTimeout(() => {
      const el = document.getElementById("home");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[99990]"
            style={{ background: "rgba(3,6,4,0.82)", backdropFilter: "blur(8px)" }}
            onClick={close}
            aria-hidden="true"
          />

          {/* ── Card ── */}
          <motion.div
            key="popup-card"
            role="dialog"
            aria-modal="true"
            aria-label="Profile — Nayab Aslam"
            initial={{ opacity: 0, scale: 0.88, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[99991] inset-0 flex items-center justify-center pointer-events-none px-4"
          >
            <div
              className="relative pointer-events-auto w-full max-w-[340px] md:max-w-[380px]"
              style={{
                background: "linear-gradient(145deg, #111812 0%, #0B110C 60%, #080D09 100%)",
                border: "1px solid rgba(32,229,106,0.14)",
                boxShadow:
                  "0 0 0 1px rgba(32,229,106,0.06), 0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(32,229,106,0.05)",
              }}
            >
              {/* ── Keyframes ── */}
              <style>{`
                @keyframes popupGlow {
                  0%,100% { opacity:0.6; }
                  50%     { opacity:1; }
                }
                @keyframes imgRingSpin {
                  from { transform: rotate(0deg); }
                  to   { transform: rotate(360deg); }
                }
                @keyframes popupFloat {
                  0%,100% { transform: translateY(0); }
                  50%     { transform: translateY(-6px); }
                }
              `}</style>

              {/* ── Top green line ── */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(32,229,106,0.6), transparent)",
                }}
              />

              {/* ── Close button ── */}
              <button
                onClick={close}
                aria-label="Close profile popup"
                className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center transition-colors duration-200"
                style={{
                  color: "#59635B",
                  border: "1px solid rgba(40,230,105,0.1)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#20E56A";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(32,229,106,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#59635B";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(40,230,105,0.1)";
                }}
              >
                <X size={13} />
              </button>

              {/* ── Card body ── */}
              <div className="flex flex-col items-center px-8 pt-10 pb-8 gap-0">

                {/* ── Profile image with animated ring ── */}
                <div
                  className="relative mb-6"
                  style={{ animation: "popupFloat 4s ease-in-out infinite" }}
                >
                  {/* Spinning arc ring */}
                  <svg
                    width="136"
                    height="136"
                    viewBox="0 0 136 136"
                    className="absolute -inset-[6px]"
                    style={{
                      width: 148,
                      height: 148,
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      animation: "imgRingSpin 6s linear infinite",
                    }}
                    aria-hidden="true"
                  >
                    {/* <circle
                      cx="74" cy="74" r="70"
                      fill="none"
                      stroke="rgba(32,229,106,0.08)"
                      strokeWidth="1"
                    /> */}
                    {/* <circle
                      cx="74" cy="74" r="70"
                      fill="none"
                      stroke="rgba(32,229,106,0.5)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${2 * Math.PI * 70 * 0.75}`}
                    /> */}
                  </svg>

                  {/* Outer glow ring */}
                  <div
                    className="absolute -inset-[3px] rounded-full pointer-events-none"
                    style={{
                      boxShadow: "0 0 20px rgba(32,229,106,0.18), 0 0 40px rgba(32,229,106,0.08)",
                      animation: "popupGlow 2.5s ease-in-out infinite",
                      borderRadius: "50%",
                    }}
                  />

                  {/* Image container */}
                  <div
                    className="relative overflow-hidden"
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      border: "1.5px solid rgba(32,229,106,0.25)",
                    }}
                  >
                    <Image
                      src="/nayab-p.png"
                      alt="Nayab Aslam"
                      fill
                      className="object-cover object-top"
                      sizes="120px"
                      priority
                    />
                  </div>
                </div>

                {/* ── Name ── */}
                <h2
                  className="font-serif font-light text-[#F1F1EA] tracking-[0.08em] leading-tight text-center"
                  style={{ fontSize: "clamp(22px, 5vw, 28px)" }}
                >
                  NAYAB{" "}
                  <span
                    style={{
                      color: "#20E56A",
                      textShadow: "0 0 24px rgba(32,229,106,0.45)",
                    }}
                  >
                    ASLAM
                  </span>
                </h2>

                {/* ── Divider ── */}
                <div
                  className="my-4 w-[60%] h-px"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(32,229,106,0.35), transparent)",
                  }}
                />

                {/* ── Subtitle ── */}
                <p
                  className="font-sans text-[#A7ADA5] text-center font-light leading-relaxed"
                  style={{ fontSize: "10px", letterSpacing: "0.16em" }}
                >
                  Full Stack Developer&nbsp;•&nbsp;Digital Marketer
                  <br />
                  AI Enthusiast
                </p>

                {/* ── Tags ── */}
                <div className="mt-5 flex flex-wrap gap-2 justify-center">
                  {["Full Stack",  "Marketing"].map((tag) => (
                    <span
                      key={tag}
                      className="font-sans"
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#59635B",
                        border: "1px solid rgba(40,230,105,0.1)",
                        padding: "3px 8px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* ── CTA button ── */}
                <button
                  onClick={handleViewProfile}
                  className="mt-7 w-full flex items-center justify-center gap-2 font-sans font-semibold transition-all duration-300 group"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    background: "#20E56A",
                    color: "#030604",
                    border: "1px solid #20E56A",
                    padding: "12px 24px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#159447";
                    (e.currentTarget as HTMLElement).style.borderColor = "#159447";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#20E56A";
                    (e.currentTarget as HTMLElement).style.borderColor = "#20E56A";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  View Profile
                  <ArrowRight size={11} />
                </button>

                {/* ── Dismiss hint ── */}
                <p
                  className="mt-4 font-sans text-[#3A4040]"
                  style={{ fontSize: "9px", letterSpacing: "0.14em" }}
                >
                  Press ESC or click outside to close
                </p>
              </div>

              {/* ── Bottom green line ── */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(32,229,106,0.2), transparent)",
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
