import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer');
        setIsHovered(!!isClickable);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth trailing animation loop
    let rafId: number;
    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.25,
        y: prev.y + (pos.y - prev.y) * 0.25,
      }));
      rafId = requestAnimationFrame(updateTrailing);
    };
    rafId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [pos.x, pos.y]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Center precise dot */}
      <div
        className="absolute w-2 h-2 -ml-1 -mt-1 bg-[#22c55e] rounded-full transition-transform duration-75 shadow-[0_0_8px_#22c55e]"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${isClicking ? 0.7 : isHovered ? 1.5 : 1})`,
        }}
      />

      {/* Trailing Crosshair Target Ring */}
      <div
        className="absolute w-8 h-8 -ml-4 -mt-4 transition-transform ease-out will-change-transform"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) scale(${
            isClicking ? 0.8 : isHovered ? 1.3 : 1
          }) rotate(${isHovered ? '45deg' : '0deg'})`,
        }}
      >
        <svg viewBox="0 0 36 36" className="w-full h-full stroke-[#22c55e]">
          {/* Outer circle */}
          <circle
            cx="18"
            cy="18"
            r="12"
            fill="none"
            strokeWidth="1.2"
            strokeDasharray={isHovered ? '2,2' : 'none'}
            className="opacity-80"
          />
          {/* Crosshair lines */}
          <line x1="18" y1="2" x2="18" y2="8" strokeWidth="1.5" />
          <line x1="18" y1="28" x2="18" y2="34" strokeWidth="1.5" />
          <line x1="2" y1="18" x2="8" y2="18" strokeWidth="1.5" />
          <line x1="28" y1="18" x2="34" y2="18" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
};
