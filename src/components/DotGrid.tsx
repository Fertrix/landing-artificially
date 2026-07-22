import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import './DotGrid.css';

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface DotType {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  _inertiaApplied: boolean;
  activeRgb: RGB;
}

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const throttle = <T extends (...args: any[]) => void>(func: T, limit: number): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  return function (this: any, ...args: Parameters<T>) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

function hexToRgb(hex: string): RGB {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 82, g: 39, b: 255 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  };
}

function hslToRgb(h: number, s: number, l: number): RGB {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

// A vibrant, premium color palette resembling the Google Antigravity logo colors in the image.
const COLOR_PALETTE: string[] = [
  '#3b82f6', // Light Blue
  '#4f46e5', // Indigo/Blue
  '#db2777', // Pink/Magenta
  '#ea580c', // Orange/Red
  '#eab308', // Yellow
  '#8b5cf6', // Violet
  '#14b8a6'  // Teal
];

export const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 16,
  gap = 32,
  baseColor = '#ffffff', // Set default to #ffffff (matches background) as requested
  activeColor,           // Custom single active color, or undefined for multicolor
  proximity = 420,
  speedTrigger = 100,
  shockRadius = 450,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = '',
  style
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<DotType[]>([]);
  const pointerRef = useRef({
    x: -1000, // Start offscreen
    y: -1000,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  
  // Custom or standard active color rgb
  const activeRgb = useMemo(() => {
    if (activeColor) return hexToRgb(activeColor);
    return null; // Signals multicolor palette
  }, [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null;
    const p = new window.Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const dots: DotType[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;

        // Assign a color based on its coordinates (or radial position) to create the Google Antigravity rainbow cloud effect
        let dotRgb = activeRgb;
        if (!dotRgb) {
          // Calculate distance from center to make colors map beautifully
          const centerX = width / 2;
          const centerY = height / 2;
          const distFromCenter = Math.hypot(cx - centerX, cy - centerY);
          const colorIndex = Math.floor((distFromCenter / 150) + (x * 0.1) + (y * 0.1)) % COLOR_PALETTE.length;
          dotRgb = hexToRgb(COLOR_PALETTE[colorIndex]);
        }

        dots.push({ 
          cx, 
          cy, 
          xOffset: 0, 
          yOffset: 0, 
          _inertiaApplied: false,
          activeRgb: dotRgb
        });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap, activeRgb]);

  useEffect(() => {
    if (!circlePath) return;

    let rafId: number;
    const proxSq = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;

      for (const dot of dotsRef.current) {
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let style = baseColor;
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          
          // Dynamic gradient based on angle relative to mouse and time
          const angle = Math.atan2(dy, dx); // Angle from pointer to dot
          const timeFactor = performance.now() * 0.0015; // slow color cycle over time
          
          // Compute a beautifully shifting hue (0 to 360) based on angle and slow rolling time
          const hue = Math.round(((angle * (180 / Math.PI)) + (timeFactor * 50) + 360) % 360);
          
          // Convert HSL to RGB dynamically so it works on any background color
          const targetRgb = hslToRgb(hue, 92, 55);
          
          // Interpolate beautifully between base background color and the dynamic gradient target color
          const r = Math.round(baseRgb.r + (targetRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (targetRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (targetRgb.b - baseRgb.b) * t);
          style = `rgb(${r},${g},${b})`;
        }

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = style;
        ctx.fill(circlePath);
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [proximity, baseColor, baseRgb, circlePath]);

  useEffect(() => {
    buildGrid();
    let ro: ResizeObserver | null = null;
    if (typeof window !== 'undefined') {
      if (typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(() => {
          buildGrid();
        });
        if (wrapperRef.current) {
          ro.observe(wrapperRef.current);
        }
      } else {
        window.addEventListener('resize', buildGrid);
      }
    }
    return () => {
      if (ro) {
        ro.disconnect();
      } else if (typeof window !== 'undefined') {
        window.removeEventListener('resize', buildGrid);
      }
    };
  }, [buildGrid]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }
      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      pr.x = e.clientX - rect.left;
      pr.y = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          
          // Generate realistic physics reaction using standard high-performance GSAP transitions
          const pushX = (dot.cx - pr.x) * 0.15 + vx * 0.008;
          const pushY = (dot.cy - pr.y) * 0.15 + vy * 0.008;
          
          gsap.to(dot, {
            xOffset: pushX,
            yOffset: pushY,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.65)'
              });
              dot._inertiaApplied = false;
            }
          });
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (dot.cx - cx) * shockStrength * falloff;
          const pushY = (dot.cy - cy) * shockStrength * falloff;
          
          gsap.to(dot, {
            xOffset: pushX,
            yOffset: pushY,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.65)'
              });
              dot._inertiaApplied = false;
            }
          });
        }
      }
    };

    const throttledMove = throttle(onMove, 16); // Throttling roughly at 60fps for hyper-responsive mouse reaction
    window.addEventListener('mousemove', throttledMove, { passive: true });
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', throttledMove);
      window.removeEventListener('click', onClick);
    };
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);

  return (
    <section id="dot-grid-section" className={`dot-grid ${className}`} style={style}>
      <div id="dot-grid-wrap" ref={wrapperRef} className="dot-grid__wrap">
        <canvas id="dot-grid-canvas" ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </section>
  );
};

export default DotGrid;
