"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Floating dot ───────────────────────────────────────── */
interface FloatDot {
  id: number;
  x: number;    // % from left
  y: number;    // % from top
  size: number; // px
  dur: number;  // animation duration s
  delay: number;
  opacity: number;
}

function makeFloatDots(n: number): FloatDot[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 6 + 5,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.45 + 0.1,
  }));
}

/* ─── Spinning arc SVG ───────────────────────────────────── */
function SpinningRing({ size = 260 }: { size?: number }) {
  const r = (size - 4) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute"
      style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
      aria-hidden="true"
    >
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(32,229,106,0.06)"
        strokeWidth="1"
      />
      {/* Animated arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(32,229,106,0.55)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ * 0.72}
        style={{
          transformOrigin: "center",
          animation: "preloaderSpin 2.4s linear infinite",
        }}
      />
      {/* Trailing second arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(32,229,106,0.18)"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ * 0.55}
        style={{
          transformOrigin: "center",
          animation: "preloaderSpin 3.8s linear infinite reverse",
        }}
      />
    </svg>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [dots] = useState<FloatDot[]>(() => makeFloatDots(22));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Lock scroll while preloader is visible
    document.body.classList.add("preloader-active");

    // Drive progress 0 → 100 over ~2.2 s with easing
    let current = 0;
    timerRef.current = setInterval(() => {
      current += Math.random() * 4 + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(timerRef.current!);
        // Small pause at 100% before exit
        setTimeout(() => {
          setVisible(false);
          document.body.classList.remove("preloader-active");
          // Signal popup to open after preloader exit animation (~750ms)
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent("preloader:done"));
          }, 780);
        }, 420);
      }
      setProgress(Math.min(Math.round(current), 100));
    }, 55);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      document.body.classList.remove("preloader-active");
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            transition: { duration: 0.75, ease: [0.43, 0.13, 0.23, 0.96] },
          }}
          className="fixed inset-0 flex items-center justify-center z-[99999] overflow-hidden"
          style={{ background: "#030604" }}
          aria-label="Loading"
          aria-live="polite"
        >
          {/* ── Keyframe injection ── */}
          <style>{`
            @keyframes preloaderSpin {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
            @keyframes floatUp {
              0%   { transform: translateY(0px) scale(1);   opacity: var(--op); }
              50%  { transform: translateY(-18px) scale(1.3); opacity: calc(var(--op) * 1.5); }
              100% { transform: translateY(0px) scale(1);   opacity: var(--op); }
            }
            @keyframes preloaderGlow {
              0%, 100% { opacity: 0.5; transform: scale(1);   }
              50%       { opacity: 1;   transform: scale(1.08); }
            }
            @keyframes letterReveal {
              0%   { opacity: 0; transform: translateY(22px); filter: blur(6px); }
              100% { opacity: 1; transform: translateY(0);    filter: blur(0);   }
            }
            @keyframes subtitleReveal {
              0%   { opacity: 0; transform: translateY(10px); letter-spacing: 0.35em; }
              100% { opacity: 1; transform: translateY(0);    letter-spacing: 0.28em; }
            }
            @keyframes lineGrow {
              from { transform: scaleX(0); }
              to   { transform: scaleX(1); }
            }
          `}</style>

          {/* ── Ambient radial glow ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(32,229,106,0.065) 0%, transparent 70%)",
              animation: "preloaderGlow 3s ease-in-out infinite",
            }}
          />

          {/* ── Floating dots ── */}
          {dots.map((d) => (
            <div
              key={d.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${d.x}%`,
                top: `${d.y}%`,
                width: d.size,
                height: d.size,
                background: "#20E56A",
                // @ts-ignore
                "--op": d.opacity,
                opacity: d.opacity,
                animation: `floatUp ${d.dur}s ease-in-out ${d.delay}s infinite`,
                boxShadow:
                  d.size > 3
                    ? "0 0 6px rgba(32,229,106,0.6)"
                    : "none",
              }}
            />
          ))}

          {/* ── Ring container ── */}
          <div className="relative flex items-center justify-center">
            {/* Outer ring */}
            <SpinningRing size={260} />

            {/* Inner pulsing ring */}
            <div
              className="absolute rounded-full border border-[rgba(32,229,106,0.1)]"
              style={{
                width: 220,
                height: 220,
                animation: "preloaderGlow 2s ease-in-out infinite",
              }}
            />

            {/* Centre content */}
            <div className="relative z-10 flex flex-col items-center gap-3 px-4 text-center">
              {/* Name */}
              <div aria-label="Nayab Aslam">
                <h1
                  className="font-serif text-[#F1F1EA] font-light leading-none tracking-[0.08em]"
                  style={{
                    fontSize: "clamp(26px, 5vw, 42px)",
                    animation: "letterReveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both",
                  }}
                >
                  NAYAB{" "}
                  <span
                    style={{
                      color: "#20E56A",
                      textShadow: "0 0 30px rgba(32,229,106,0.5)",
                    }}
                  >
                    ASLAM
                  </span>
                </h1>

                {/* Thin line under name */}
                <div
                  className="mt-3 mx-auto h-px origin-left"
                  style={{
                    width: "100%",
                    background:
                      "linear-gradient(to right, transparent, rgba(32,229,106,0.5), transparent)",
                    animation: "lineGrow 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s both",
                  }}
                />

                {/* Subtitle */}
                <p
                  className="mt-2 font-sans text-[#A7ADA5] font-light"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    animation: "subtitleReveal 0.8s ease 1.0s both",
                  }}
                >
                  Full Stack Developer &amp; Marketing Manager
                </p>
              </div>
            </div>
          </div>

          {/* ── Progress counter ── */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            {/* Progress bar track */}
            <div
              className="relative overflow-hidden"
              style={{
                width: "clamp(120px, 20vw, 200px)",
                height: "1px",
                background: "rgba(32,229,106,0.1)",
              }}
            >
              <div
                className="absolute inset-y-0 left-0 transition-all duration-100"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(to right, rgba(32,229,106,0.4), #20E56A)",
                  boxShadow: "0 0 8px rgba(32,229,106,0.5)",
                }}
              />
            </div>

            {/* Percentage */}
            <span
              className="font-sans text-[#59635B] tabular-nums"
              style={{ fontSize: "9px", letterSpacing: "0.18em" }}
            >
              {String(progress).padStart(3, "0")}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
