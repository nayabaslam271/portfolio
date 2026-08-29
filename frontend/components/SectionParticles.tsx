"use client";

import { useEffect, useRef, useCallback } from "react";

interface SectionParticlesProps {
  /** particle count override — defaults auto by viewport */
  count?: number;
  /** 0–1 max opacity of dots, default 0.35 */
  intensity?: number;
  /** show connecting lines, default false */
  lines?: boolean;
}

const ACCENT = { r: 32, g: 229, b: 106 }; // #20E56A

export function SectionParticles({
  count,
  intensity = 0.35,
  lines = false,
}: SectionParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  /* reduced-motion — read once */
  const reducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const resolveCount = useCallback(
    (w: number) => {
      if (count !== undefined) return count;
      if (w < 640) return 18;
      if (w < 1024) return 30;
      return 48;
    },
    [count]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    interface Dot {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      op: number;
      glow: boolean;
    }

    let w = 0;
    let h = 0;
    let dots: Dot[] = [];

    const init = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      const n = resolveCount(w);
      dots = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 0.3,
        op: Math.random() * intensity * 0.7 + intensity * 0.2,
        glow: Math.random() < 0.22,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const d of dots) {
        if (!reducedMotion) {
          d.x += d.vx;
          d.y += d.vy;
          if (d.x < -8) d.x = w + 8;
          if (d.x > w + 8) d.x = -8;
          if (d.y < -8) d.y = h + 8;
          if (d.y > h + 8) d.y = -8;
        }

        /* optional connections */
        if (lines) {
          for (const b of dots) {
            if (b === d) continue;
            const dx = d.x - b.x;
            const dy = d.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 90) {
              ctx.beginPath();
              ctx.moveTo(d.x, d.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${
                (1 - dist / 90) * 0.07
              })`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }

        /* glow halo */
        if (d.glow) {
          const gr = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 8);
          gr.addColorStop(
            0,
            `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${d.op * 0.45})`
          );
          gr.addColorStop(1, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0)`);
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r * 8, 0, Math.PI * 2);
          ctx.fillStyle = gr;
          ctx.fill();
        }

        /* core dot */
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${d.op})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    init();
    const ro = new ResizeObserver(init);
    ro.observe(canvas);

    if (!reducedMotion) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      draw(); // single static frame
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [resolveCount, intensity, lines, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none", zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
