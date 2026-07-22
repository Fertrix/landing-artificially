import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface CtaSectionProps {
  onApplyClick?: () => void;
}

// 8 Crystal-Clear, Bold, Globally Recognizable Tech & Product Logos
const SlackLogo = () => (
  <svg className="w-7 h-7 text-neutral-900 fill-current" viewBox="0 0 24 24">
    <path d="M6 15a2 2 0 0 1-2-2 2 2 0 0 1 2-2h2v2a2 2 0 0 1-2 2zm0-8a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2H8a2 2 0 0 1-2-2zm8 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2h-2a2 2 0 0 1-2-2zm0 8a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2h2a2 2 0 0 1 2 2zm-6 2a2 2 0 0 1 2 2 2 2 0 0 1-2 2H6v-2a2 2 0 0 1 2-2zm8-10a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2h-2a2 2 0 0 1-2-2zm0 10a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2h2a2 2 0 0 1 2 2zm-10-8a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2H8a2 2 0 0 1-2-2z" />
  </svg>
);

const GitHubLogo = () => (
  <svg className="w-7 h-7 text-neutral-900 fill-current" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const StripeLogo = () => (
  <svg className="w-7 h-7 text-neutral-900 fill-current" viewBox="0 0 24 24">
    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C17.674.654 15.023 0 12.35 0 6.643 0 2.7 3.037 2.7 7.747c0 5.494 7.234 6.136 7.234 9.296 0 1.009-.854 1.536-2.228 1.536-2.394 0-5.385-1.127-7.25-2.203L-0.5 22.02c2.148 1.258 5.485 1.98 8.85 1.98 6.05 0 10.226-2.91 10.226-7.854 0-5.918-7.6-6.474-7.6-9.496z" />
  </svg>
);

const VercelLogo = () => (
  <svg className="w-6 h-6 text-neutral-900 fill-current" viewBox="0 0 24 24">
    <path d="M12 2L2 22H22L12 2Z" />
  </svg>
);

const LinearLogo = () => (
  <svg className="w-7 h-7 text-neutral-900 fill-current" viewBox="0 0 24 24">
    <path d="M2.5 12C2.5 6.753 6.753 2.5 12 2.5c2.4 0 4.6.89 6.28 2.37L4.87 18.28C3.39 16.6 2.5 14.4 2.5 12zm16.63-6.13L5.72 19.28C7.4 20.76 9.6 21.5 12 21.5c5.247 0 9.5-4.253 9.5-9.5 0-2.4-.89-4.6-2.37-6.28z" />
  </svg>
);

const RaycastLogo = () => (
  <svg className="w-7 h-7 text-neutral-900 fill-current" viewBox="0 0 24 24">
    <path d="M12 0L0 12l12 12 12-12L12 0zm0 4.8L19.2 12 12 19.2 4.8 12 12 4.8zm0 4.8L14.4 12 12 14.4 9.6 12 12 9.6z" />
  </svg>
);

const OpenAILogo = () => (
  <svg className="w-7 h-7 text-neutral-900 fill-current" viewBox="0 0 24 24">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9013 6.0651 6.0651 0 0 0-4.9392-2.009 6.05 6.05 0 0 0-5.748 3.997 6.002 6.002 0 0 0-4.0048 2.9064 6.0407 6.0407 0 0 0 .7402 7.0409 5.9847 5.9847 0 0 0 .5155 4.9108 6.0462 6.0462 0 0 0 6.5098 2.9013 6.0651 6.0651 0 0 0 4.9392 2.009 6.05 6.05 0 0 0 5.748-3.997 6.002 6.002 0 0 0 4.0048-2.9064 6.0407 6.0407 0 0 0-.7402-7.0409zm-8.826 11.233a4.269 4.269 0 0 1-2.4699-.778l.1425-.2466 3.0135-5.2195a.8953.8953 0 0 1 .7738-.4488h.0016a.8872.8872 0 0 1 .892.8906v7.039a4.2838 4.2838 0 0 1-2.3535 1.2355zm-7.6186-3.2384a4.269 4.269 0 0 1-.5603-2.5273l.2844.0205 6.0263 1.6148a.8953.8953 0 0 1 .6324.6293.8872.8872 0 0 1-.3264.9126l-6.096 3.5195a4.2838 4.2838 0 0 1-.0396-4.1686zm-2.8257-7.9953a4.269 4.269 0 0 1 1.9096-1.7493l.142.2466 3.0134 5.2195a.8953.8953 0 0 1-.1414.8976.8872.8872 0 0 1-.9624.1691l-6.096-3.5196a4.2838 4.2838 0 0 1 2.1348-1.2639zm12.311 2.3789l-3.0136-5.2195a.8953.8953 0 0 1 .1414-.8976.8872.8872 0 0 1 .9624-.1691l6.096 3.5196a4.2838 4.2838 0 0 1-2.1348 1.2639 4.269 4.269 0 0 1-1.9096 1.7493l-.142-.2466zm2.8257 7.9953a4.269 4.269 0 0 1-.5603 2.5273l-.2844-.0205-6.0263-1.6148a.8953.8953 0 0 1-.6324-.6293.8872.8872 0 0 1 .3264-.9126l6.096-3.5195a4.2838 4.2838 0 0 1 .0396 4.1686zm-7.6186 3.2384a4.269 4.269 0 0 1 2.4699.778l-.1425.2466-3.0135 5.2195a.8953.8953 0 0 1-.7738.4488h-.0016a.8872.8872 0 0 1-.892-.8906v-7.039a4.2838 4.2838 0 0 1 2.3535-1.2355z" />
  </svg>
);

const ReactLogo = () => (
  <svg className="w-7 h-7 fill-none stroke-current text-neutral-900" viewBox="0 0 24 24" strokeWidth="1.8">
    <ellipse cx="12" cy="12" rx="9" ry="3.5" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="1.5" className="fill-neutral-900" />
  </svg>
);

// 4 Bold, Ultra-Clean Logos on Left, 4 on Right (8 total)
const floatingCards = [
  // Left side (4 cards: Slack, GitHub, Stripe, Vercel)
  { icon: SlackLogo, pos: 'top-[4%] left-[2%] sm:left-[4%] md:left-[6%]', rotate: -10, delay: 0 },
  { icon: GitHubLogo, pos: 'top-[26%] left-[14%] sm:left-[16%] md:left-[18%]', rotate: 12, delay: 0.1 },
  { icon: StripeLogo, pos: 'top-[48%] left-[1%] sm:left-[3%] md:left-[5%]', rotate: -5, delay: 0.2 },
  { icon: VercelLogo, pos: 'top-[70%] left-[12%] sm:left-[14%] md:left-[16%]', rotate: 8, delay: 0.3 },

  // Right side (4 cards: Linear, Raycast, OpenAI, React)
  { icon: LinearLogo, pos: 'top-[4%] right-[2%] sm:right-[4%] md:right-[6%]', rotate: 8, delay: 0.05 },
  { icon: RaycastLogo, pos: 'top-[26%] right-[14%] sm:right-[16%] md:right-[18%]', rotate: -12, delay: 0.15 },
  { icon: OpenAILogo, pos: 'top-[48%] right-[1%] sm:right-[3%] md:right-[5%]', rotate: -14, delay: 0.25 },
  { icon: ReactLogo, pos: 'top-[70%] right-[12%] sm:right-[14%] md:right-[16%]', rotate: 14, delay: 0.35 }
];

interface FloatingCardProps {
  card: typeof floatingCards[0];
  idx: number;
  isInView: boolean;
}

// Entire white square card floats & flies together as a single unit
const FloatingCard: React.FC<FloatingCardProps> = ({ card, idx, isInView }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const IconComponent = card.icon;

  return (
    // Outer positioner with smooth decelerating entrance drop animation
    <motion.div
      initial={{ opacity: 0, y: -220, scale: 0.78 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -220, scale: 0.78 }}
      transition={{
        duration: 1.25,
        delay: card.delay,
        ease: [0.12, 1, 0.2, 1] // Ultra-smooth decelerating curve
      }}
      onAnimationComplete={() => {
        if (isInView) setHasEntered(true);
      }}
      className={`absolute ${card.pos} hidden sm:flex pointer-events-none select-none`}
    >
      {/* Entire white square card (border + shadow + logo) floats as one object */}
      <motion.div
        animate={
          hasEntered
            ? {
                y: [0, -10, 0],
                rotate: [card.rotate - 1.5, card.rotate + 2, card.rotate - 1.5]
              }
            : { rotate: card.rotate }
        }
        transition={
          hasEntered
            ? {
                y: { duration: 3.6 + (idx % 3) * 0.4, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 4.8 + (idx % 2) * 0.5, repeat: Infinity, ease: 'easeInOut' }
              }
            : { duration: 0 }
        }
        className="w-14 h-14 sm:w-16 sm:h-16 md:w-[4.5rem] md:h-[4.5rem] bg-white rounded-2xl border border-black/[0.08] shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06),0_2px_6px_-1px_rgba(0,0,0,0.03)] flex items-center justify-center cursor-default"
      >
        <IconComponent />
      </motion.div>
    </motion.div>
  );
};

export const CtaSection: React.FC<CtaSectionProps> = ({ onApplyClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.8 });



  return (
    <div className="w-full">
      {/* Top Separator Line */}
      <div className="w-full px-6 md:px-12 mt-16 md:mt-24">
        <div className="border-t border-neutral-200 w-full" />
      </div>



      {/* Main CTA Section */}
      <section
        ref={sectionRef}
        className="relative w-full py-24 md:py-36 px-4 sm:px-8 bg-white text-center overflow-hidden flex flex-col items-center justify-center min-h-[580px]"
      >
        {/* Floating Tech Icon Cards (4 on Left, 4 on Right - all 8 trigger in unified sync) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {floatingCards.map((card, idx) => (
            <FloatingCard key={idx} card={card} idx={idx} isInView={isInView} />
          ))}
        </div>

        {/* Center Copy */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 max-w-3xl mx-auto flex flex-col items-center"
        >
          {/* Main Heading using site font-display */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-neutral-900 tracking-tight leading-[1.12] mb-5">
            Revenue leaks are solved.
          </h2>

          {/* Subtitle */}
          <p className="text-neutral-500 text-base sm:text-lg leading-relaxed font-medium tracking-tight mb-9 max-w-2xl">
            Apply for a private 30-minute margin audit to pinpoint unbilled hours and churn risks across your active accounts. Applications are reviewed selectively based on agency volume and infrastructure compatibility.
          </p>

          {/* Action Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={onApplyClick}
              type="button"
              className="inline-flex items-center gap-2.5 bg-[#18181b] hover:bg-black text-white text-base font-medium px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Apply for Margin Audit</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
