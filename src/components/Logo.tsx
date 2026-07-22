import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'light', className = '' }) => {
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-2.5 font-sans cursor-pointer select-none ${className}`}>
      {/* Isotipo Geométrico 2x2 (Nodo de Datos) */}
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <rect x="3" y="3" width="8" height="8" rx="1.5" className={isDark ? "fill-white" : "fill-neutral-900"} />
        <rect x="13" y="3" width="8" height="8" rx="1.5" className={isDark ? "fill-slate-700" : "fill-neutral-350 dark:fill-neutral-400"} />
        <rect x="3" y="13" width="8" height="8" rx="1.5" className={isDark ? "fill-slate-700" : "fill-neutral-350 dark:fill-neutral-400"} />
        <rect x="13" y="13" width="8" height="8" rx="1.5" className={isDark ? "fill-white" : "fill-neutral-900"} />
      </svg>
      
      {/* Wordmark Corporativo */}
      <span className={`text-sm md:text-base tracking-tight font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
        Artificially <span className={isDark ? "text-slate-400 font-normal" : "text-neutral-400 font-normal"}>Hub</span>
      </span>
    </div>
  );
};
