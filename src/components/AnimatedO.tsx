import React, { useEffect } from "react";
import { motion, useAnimation } from "motion/react";

interface AnimatedOProps {
  active?: boolean;
}

export const AnimatedO: React.FC<AnimatedOProps> = ({ active = false }) => {
  const svgControls = useAnimation();
  const teethControls = useAnimation();

  const teethCount = 16;

  useEffect(() => {
    if (!active) {
      teethControls.set({ y: 10, scaleY: 0, opacity: 0 });
      svgControls.set({ rotate: 0 });
      return;
    }

    const triggerCleanCartoonBurst = async () => {
      // Teeth shoot outward from underneath the ring with ZERO peeking inside the hole and ZERO pre-dip
      await teethControls.start({
        y: [10, -6, 2, 0],
        scaleY: [0, 1.4, 0.9, 1.0],
        scaleX: [0.6, 0.85, 1.08, 1.0],
        opacity: [0, 1, 1, 1],
        transition: {
          duration: 0.55,
          times: [0, 0.5, 0.8, 1],
          ease: "easeOut",
        },
      });

      // Continuous smooth gear rotation
      svgControls.start({
        rotate: 360,
        transition: {
          repeat: Infinity,
          ease: "linear",
          duration: 12,
        },
      });
    };

    triggerCleanCartoonBurst();
  }, [active, teethControls, svgControls]);

  return (
    <span className="relative inline-flex items-center justify-center w-[0.78em] h-[0.78em] mx-[0.04em] select-none align-middle translate-y-[-0.04em]">
      {/* The entire composite gear rotates smoothly */}
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        animate={svgControls}
        initial={{ rotate: 0 }}
      >
        {/* 
          1. All 16 Gear Teeth (Hidden underneath the ring, shoot straight outward with Y-stretch & end bounce)
        */}
        {Array.from({ length: teethCount }).map((_, i) => {
          const angle = (i * 360) / teethCount;
          return (
            <g key={i} transform={`rotate(${angle} 50 50)`}>
              <motion.path
                initial={{ y: 10, scaleY: 0, opacity: 0 }}
                animate={teethControls}
                d="M 46 6 L 54 6 L 56 22 L 44 22 Z"
                fill="currentColor"
                className="text-neutral-900 origin-bottom"
              />
            </g>
          );
        })}

        {/* 
          2. The letter 'o' as a bold, solid ring (Outer radius 32, Inner radius 18)
        */}
        <circle
          cx="50"
          cy="50"
          r="25"
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
          className="text-neutral-900 z-10 relative"
        />
      </motion.svg>
    </span>
  );
};
