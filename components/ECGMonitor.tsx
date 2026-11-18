"use client";

import { useEffect, useRef } from "react";

/**
 * A cardiac-monitor style ECG sweep.
 * The trace is written left→right by a glowing head that erases the old
 * signal just ahead of it, like a real bedside monitor. Beats written
 * near the cursor spike higher, so the line reacts to you.
 */
const g = (t: number, mu: number, s: number) => Math.exp(-((t - mu) ** 2) / (2 * s * s));
function beat(t: number) {
  return (
    0.1 * g(t, 0.16, 0.028) - // P
    0.12 * g(t, 0.3, 0.009) + // Q
    1 * g(t, 0.33, 0.011) - // R
    0.28 * g(t, 0.36, 0.011) + // S
    0.22 * g(t, 0.56, 0.045) // T
  );
}

export default function ECGMonitor({
  className,
  color,
  height = 160,
  speed = 180, // px per second
  period = 150, // px per beat → 180/150*60 = 72 bpm
  amplitude = 0.38, // fraction of height
  lineWidth = 2,
  interactive = true,
}: {
  className?: string;
  color?: string; // defaults to the surrounding --color-pulse
  height?: number;
  speed?: number;
  period?: number;
  amplitude?: number;
  lineWidth?: number;
  interactive?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const stroke = color ?? (getComputedStyle(canvas).getPropertyValue("--color-pulse").trim() || "#6e1b2f");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let dpr = 1;
    let ys = new Float32Array(0);
    let head = 0;
    let phase = 0;
    let mouseX = -9999;
    let boost = 0;
    let raf = 0;
    let last = 0;
    let visible = true;

    const sample = (x: number) => {
      const near = interactive ? Math.exp(-((x - mouseX) ** 2) / (2 * 140 * 140)) : 0;
      const amp = amplitude * (1 + 1.1 * near * boost);
      const jitter = (Math.random() - 0.5) * 0.012;
      return beat((phase % period) / period) * amp + jitter;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      canvas.width = w * dpr;
      canvas.height = height * dpr;
      const old = ys;
      ys = new Float32Array(Math.ceil(w));
      if (old.length) ys.set(old.subarray(0, Math.min(old.length, ys.length)));
      else {
        // Pre-fill so the first frame is already a full trace.
        for (let x = 0; x < ys.length; x++) {
          ys[x] = sample(x);
          phase++;
        }
      }
      head = Math.min(head, ys.length - 1);
      draw();
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, height);
      const mid = height * 0.58;
      const gap = 36;
      ctx.lineWidth = lineWidth;
      ctx.lineJoin = "round";
      ctx.strokeStyle = stroke;

      // Old trace (ahead of the head), fading
      ctx.globalAlpha = 0.28;
      ctx.beginPath();
      for (let x = Math.floor(head) + gap; x < ys.length; x++) {
        const y = mid - ys[x] * height;
        x === Math.floor(head) + gap ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Fresh trace (behind the head)
      ctx.globalAlpha = 1;
      ctx.beginPath();
      for (let x = 0; x < Math.floor(head); x++) {
        const y = mid - ys[x] * height;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Glowing head
      const hx = Math.floor(head);
      const hy = mid - (ys[Math.max(0, hx - 1)] ?? 0) * height;
      const grd = ctx.createRadialGradient(hx, hy, 0, hx, hy, 18);
      grd.addColorStop(0, stroke);
      grd.addColorStop(1, "transparent");
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(hx, hy, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = stroke;
      ctx.beginPath();
      ctx.arc(hx, hy, 3, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) {
        last = t;
        return;
      }
      const dt = Math.min(0.05, (t - (last || t)) / 1000);
      last = t;
      boost += ((mouseX > -9000 ? 1 : 0) - boost) * 0.06;
      const steps = speed * dt;
      for (let i = 0; i < steps; i++) {
        head += 1;
        if (head >= ys.length) head = 0;
        ys[Math.floor(head)] = sample(head);
        phase++;
      }
      draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const inside = e.clientY > r.top - 200 && e.clientY < r.bottom + 200;
      mouseX = inside ? e.clientX - r.left : -9999;
    };
    if (interactive) window.addEventListener("pointermove", onMove, { passive: true });

    resize();
    if (!reduce) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [color, height, speed, period, amplitude, lineWidth, interactive]);

  return <canvas ref={canvasRef} aria-hidden className={className} style={{ width: "100%", height, display: "block" }} />;
}
