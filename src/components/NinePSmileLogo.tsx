import React from 'react';

interface NinePSmileLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
}

export const NinePSmileLogo: React.FC<NinePSmileLogoProps> = ({
  className = '',
  size = 'md',
  interactive = true,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8 text-[11px]',
    md: 'w-11 h-11 text-[15px]',
    lg: 'w-16 h-16 text-[22px]',
    xl: 'w-24 h-24 text-[32px]',
  };

  return (
    <div
      id="nine-p-smile-badge"
      className={`relative inline-flex items-center justify-center rounded-full bg-[#22c55e] text-black font-black select-none transition-transform duration-300 ${
        interactive ? 'hover:scale-110 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(34,197,94,0.5)]' : ''
      } ${sizeMap[size]} ${className}`}
      title="Studio 9P ☺"
    >
      {/* Outer subtle ring */}
      <div className="absolute inset-0 rounded-full border border-black/20 pointer-events-none" />

      {/* Main 9P glyph and smiling arc */}
      <div className="flex flex-col items-center justify-center leading-none tracking-tighter">
        <span className="font-extrabold tracking-tight font-mono">9P</span>
        {/* The smile curve */}
        <svg
          viewBox="0 0 24 10"
          className="w-[60%] h-auto mt-[1px] fill-none stroke-black stroke-[3] stroke-linecap-round"
        >
          <path d="M 2,2 Q 12,11 22,2" />
        </svg>
      </div>
    </div>
  );
};
