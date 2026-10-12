'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationId: number;
    let isVisible = true;
    let mouseX = -1000;
    let mouseY = -1000;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 18 : 36;
    const particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const width = rect?.width || 680;
      const height = rect?.height || 260;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;

    for (let i = 0; i < particleCount; i++) {
      const px = Math.random() * width;
      const py = Math.random() * height;
      particles.push({
        x: px,
        y: py,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        originX: px,
        originY: py,
      });
    }

    const drawFrame = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains('dark');
      const strokeColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)';
      const nodeColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;

          // Subtle cursor reaction
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            p.x -= (dx / dist) * 0.6;
            p.y -= (dy / dist) * 0.6;
          }
        }

        // Draw node
        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();

        // Connect proximate particles (nature-inspired mesh)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 85) {
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    let lastTime = 0;
    const targetFpsInterval = 1000 / 60;

    const animate = (time: number) => {
      if (isVisible) {
        const delta = time - lastTime;
        if (delta > targetFpsInterval) {
          lastTime = time - (delta % targetFpsInterval);
          drawFrame();
        }
      }
      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(animate);
      }
    };

    if (prefersReducedMotion) {
      drawFrame();
    } else {
      animationId = requestAnimationFrame(animate);
    }

    // Pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10"
      aria-hidden="true"
    />
  );
}
