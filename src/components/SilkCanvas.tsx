"use client";

import { useEffect, useRef } from "react";

export default function SilkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W: number, H: number;
    let t = 0;
    let animId: number;

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const curves = Array.from({ length: 12 }, (_, i) => ({
      x: (i / 12) * 1.2,
      speed: 0.0003 + Math.random() * 0.0004,
      amp: 0.08 + Math.random() * 0.12,
      freq: 1.5 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.5 ? [201, 169, 110] : [165, 40, 72],
      width: 0.5 + Math.random() * 1.2,
    }));

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      t += 1;
      curves.forEach((c) => {
        ctx!.beginPath();
        const pts = 80;
        for (let i = 0; i <= pts; i++) {
          const px = (c.x + t * c.speed * 0.5) % 1.3 - 0.1;
          const py = i / pts;
          const x = (px + Math.sin(py * c.freq * Math.PI + c.phase + t * c.speed) * c.amp) * W;
          const y = py * H;
          if (i === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        const [r, g, b] = c.hue;
        ctx!.strokeStyle = `rgba(${r},${g},${b},0.6)`;
        ctx!.lineWidth = c.width;
        ctx!.stroke();
        c.phase += c.speed * 0.5;
      });
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-[0.12]"
    />
  );
}
