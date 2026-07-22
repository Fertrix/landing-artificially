import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'motion/react';

// Custom designed premium SVG icons (larger, with bold stroke-width of 2.2 and extreme personality)
const UndoIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

const TerminalIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const DotsIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="2.5" />
    <circle cx="5" cy="12" r="1.5" />
    <circle cx="19" cy="12" r="1.5" />
    <circle cx="12" cy="5" r="1.5" />
    <circle cx="12" cy="19" r="1.5" />
  </svg>
);

const ChevronCodeIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ThickStarIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10 0-5.523-4.477-10-10-10 5.477 0 10-4.477 10-10z" />
  </svg>
);

const SlimStarIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3c.15 4.5 3.5 7.85 8 8-4.5.15-7.85 3.5-8 8-.15-4.5-3.5-7.85-8-8 4.5-.15 7.85-3.5 8-8z" />
  </svg>
);

const BracesIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1" />
    <path d="M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
  </svg>
);

const GitForkIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 15V9a4 4 0 0 0-4-4H9" />
    <line x1="6" y1="9" x2="6" y2="15" />
  </svg>
);

const CommandIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
  </svg>
);

const LayoutGridIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const CodeIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
    <line x1="6" y1="7" x2="6.01" y2="7" />
    <line x1="10" y1="7" x2="10.01" y2="7" />
    <polyline points="8 15 10 13 8 11" />
  </svg>
);

const SliderIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="12" x2="20" y2="12" />
    <circle cx="12" cy="12" r="4" fill="white" stroke="currentColor" strokeWidth="2.2" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const FolderIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const CodeMonitorIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const CopyIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const LogOutIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

// High-fidelity item list mirroring the layout
const SparklesIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5z" />
    <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" />
  </svg>
);

const CpuIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
  </svg>
);

const LayersIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-10 5 10 5 10-5-10-5Z" />
    <path d="m2 17 10 5 10-5" />
    <path d="m2 12 10 5 10-5" />
  </svg>
);

const DatabaseIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-8 h-8 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const iconList = [
  { icon: <UndoIcon />, label: "Undo" },
  { icon: <TerminalIcon />, label: "Terminal" },
  { icon: <DotsIcon />, label: "Dots" },
  { icon: <ThickStarIcon />, label: "Thick Star" }, // First Star here
  { icon: <ChevronCodeIcon />, label: "Code Chevron" },
  { icon: <CheckCircleIcon />, label: "Check" },
  { icon: <SparklesIcon />, label: "Sparkles" },
  { icon: <CpuIcon />, label: "CPU" },
  { icon: <BracesIcon />, label: "Braces" },
  { icon: <GitForkIcon />, label: "Git Fork" },
  { icon: <LayersIcon />, label: "Layers" },
  { icon: <CommandIcon />, label: "Command" },
  { icon: <SlimStarIcon />, label: "Slim Star" }, // Second Star here (very separated!)
  { icon: <LayoutGridIcon />, label: "Layout" },
  { icon: <CodeIcon />, label: "Code" },
  { icon: <SliderIcon />, label: "Slider" },
  { icon: <DatabaseIcon />, label: "Database" },
  { icon: <ArrowUpIcon />, label: "Arrow Up" },
  { icon: <FolderIcon />, label: "Folder" },
  { icon: <SettingsIcon />, label: "Settings" },
  { icon: <CodeMonitorIcon />, label: "Monitor" },
  { icon: <CopyIcon />, label: "Copy" },
  { icon: <LogOutIcon />, label: "Exit" }
];

interface WaveItemProps {
  icon: React.ReactNode;
  index: number;
  spacing: number;
  xValue: any;
  timePhase: any;
  totalWidth: number;
}

const WaveItem: React.FC<WaveItemProps> = ({ icon, index, spacing, xValue, timePhase, totalWidth }) => {
  const itemX = index * spacing;
  
  // y is driven by timePhase so it animates constantly on every single frame
  const y = useTransform(timePhase, (latestTime: number) => {
    const latestX = xValue.get();
    const currentX = (itemX + latestX) % totalWidth;
    
    // Wave parameters matching the photo precisely
    const frequency = 0.0035; 
    const amplitude = 52; 
    
    // Smooth continuous wave formula
    return Math.sin(currentX * frequency - latestTime) * amplitude;
  });

  return (
    <motion.div
      style={{
        x: itemX,
        y: y,
        position: 'absolute',
        top: '50%',
        marginTop: '-44px' // Center vertically (88px / 2)
      }}
      className="w-[84px] h-[84px] md:w-[88px] md:h-[88px] rounded-full flex items-center justify-center bg-[#f4f5f7] border border-neutral-900/15 shadow-[0_4px_12px_rgba(0,0,0,0.02)] pointer-events-none select-none"
    >
      {icon}
    </motion.div>
  );
};

export const WaveScrollIcons: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track continuous time phase for the wave movement
  const timePhase = useMotionValue(0);
  
  // Track scroll position for horizontal slide only
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    damping: 35,
    stiffness: 75,
    mass: 0.4
  });

  // Spacing between icons decreased to pack them tightly and beautifully
  const spacing = 115; 
  
  const items = [...iconList, ...iconList, ...iconList];
  const totalWidth = items.length * spacing;

  // The horizontal position is strictly mapped to the scroll position
  // It only changes when the page scrolls!
  const x = useTransform(smoothScrollY, [0, 2500], [0, -totalWidth * 0.4]);

  // Update only the wave phase time parameter constantly
  useAnimationFrame((time) => {
    // Elegant, constant wave speed through the sinus function
    timePhase.set(time * 0.0022);
  });

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[280px] overflow-hidden my-6 flex items-center select-none bg-white pointer-events-none"
    >
      {/* Background visual indicators (subtle baseline to show the waves cleanly) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-neutral-100/30 pointer-events-none" />
      
      {/* Wave Track */}
      <motion.div 
        style={{ x }}
        className="absolute left-0 w-full h-full pointer-events-none"
      >
        {items.map((item, idx) => (
          <WaveItem
            key={`${item.label}-${idx}`}
            icon={item.icon}
            index={idx}
            spacing={spacing}
            xValue={x}
            timePhase={timePhase}
            totalWidth={totalWidth}
          />
        ))}
      </motion.div>

      {/* Decorative elegant vignettes to fade the sides gracefully into white */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default WaveScrollIcons;
