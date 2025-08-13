"use client";
import { useRef } from "react";

export function useConfetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);

  const burst = (durationMs = 1800) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const { innerWidth: w, innerHeight: h } = window;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);
    const N = 160;
    const colors = [
      "#ff477e",
      "#ffd166",
      "#06d6a0",
      "#118ab2",
      "#8338ec",
      "#ef476f",
    ];
    const pieces = Array.from({ length: N }).map(() => ({
      x: Math.random() * w,
      y: -20 - Math.random() * 60,
      r: 4 + Math.random() * 8,
      vy: 2 + Math.random() * 5,
      vx: -2 + Math.random() * 4,
      rot: Math.random() * Math.PI,
      vr: -0.2 + Math.random() * 0.4,
      color: colors[(Math.random() * colors.length) | 0],
      shape: Math.random() < 0.5 ? "rect" : ("circle" as const),
    }));
    const start = performance.now();
    const tick = (t: number) => {
      const elapsed = t - start;
      ctx.clearRect(0, 0, w, h);
      pieces.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y > h + 20) p.y = -10;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === "rect") {
          ctx.fillRect(
            -p.r,
            -p.r,
            p.r * 2,
            p.r * 2 * (0.6 + Math.sin(p.rot) * 0.4)
          );
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
      if (elapsed < durationMs) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    };
    cancelAnimationFrame(animRef.current || 0);
    animRef.current = requestAnimationFrame(tick);
  };
  return { canvasRef, burst };
}
