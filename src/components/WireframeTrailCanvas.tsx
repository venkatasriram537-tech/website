import React, { useEffect, useRef, useState } from 'react';

interface WireframeTrailCanvasProps {
  isActive?: boolean;
}

interface BoxNode {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  alpha: number;
  layerCount: number;
}

export const WireframeTrailCanvas: React.FC<WireframeTrailCanvasProps> = ({ isActive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const boxesRef = useRef<BoxNode[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const [interactiveMode, setInteractiveMode] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initial decorative wireframe structure like the 3D green sculpture in the video (00:14, 00:31)
    const initDecorativeStructure = () => {
      boxesRef.current = [];
      const startX = width * 0.45;
      const startY = height * 0.25;
      const steps = 28;
      for (let i = 0; i < steps; i++) {
        const offset = i * 14;
        boxesRef.current.push({
          x: startX + Math.sin(i * 0.3) * 60 + offset * 0.8,
          y: startY + i * 16,
          w: 220 + (i % 3) * 20,
          h: 120 + (i % 2) * 15,
          color: i % 2 === 0 ? '#22c55e' : '#84cc16',
          alpha: 0.45,
          layerCount: 4,
        });
      }
    };

    initDecorativeStructure();

    // Mouse movement adds stepped trailing wireframe boxes
    const handlePointerMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      if (lastPosRef.current) {
        const dx = currentX - lastPosRef.current.x;
        const dy = currentY - lastPosRef.current.y;
        const dist = Math.hypot(dx, dy);

        // Spawn trailing wireframe rectangles if moved enough
        if (dist > 35) {
          boxesRef.current.push({
            x: currentX - 110,
            y: currentY - 70,
            w: 200,
            h: 120,
            color: Math.random() > 0.4 ? '#22c55e' : '#facc15',
            alpha: 0.75,
            layerCount: 3,
          });

          // Limit total boxes to keep silky smooth performance
          if (boxesRef.current.length > 55) {
            boxesRef.current.shift();
          }

          lastPosRef.current = { x: currentX, y: currentY };
        }
      } else {
        lastPosRef.current = { x: currentX, y: currentY };
      }
    };

    window.addEventListener('mousemove', handlePointerMove);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw all cascading boxes
      boxesRef.current.forEach((box, index) => {
        // Subtle drift
        box.x += Math.sin(index * 0.5 + Date.now() * 0.001) * 0.2;
        box.y += Math.cos(index * 0.5 + Date.now() * 0.001) * 0.2;

        ctx.strokeStyle = box.color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = Math.max(0.15, box.alpha);

        // Draw multi-layered stepped borders (signature Studio 9P look)
        for (let l = 0; l < box.layerCount; l++) {
          const stepOffset = l * 5;
          ctx.strokeRect(box.x + stepOffset, box.y + stepOffset, box.w, box.h);

          // Connecting corner lines between layers
          if (l < box.layerCount - 1) {
            ctx.beginPath();
            ctx.moveTo(box.x + stepOffset, box.y + stepOffset);
            ctx.lineTo(box.x + stepOffset + 5, box.y + stepOffset + 5);
            ctx.moveTo(box.x + stepOffset + box.w, box.y + stepOffset);
            ctx.lineTo(box.x + stepOffset + box.w + 5, box.y + stepOffset + 5);
            ctx.stroke();
          }
        }

        // Crosshairs in top right corner
        const cx = box.x + box.w - 12;
        const cy = box.y + 12;
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.moveTo(cx - 9, cy);
        ctx.lineTo(cx + 9, cy);
        ctx.moveTo(cx, cy - 9);
        ctx.lineTo(cx, cy + 9);
        ctx.stroke();

        // Slow fade of user created boxes
        if (index > 28) {
          box.alpha *= 0.992;
        }
      });

      // Filter out totally faded boxes
      if (boxesRef.current.length > 30) {
        boxesRef.current = boxesRef.current.filter((b, idx) => idx < 28 || b.alpha > 0.05);
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full opacity-65" />
    </div>
  );
};
