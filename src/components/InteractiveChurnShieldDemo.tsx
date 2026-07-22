import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ShieldAlert, ArrowRight, CheckCircle2, MessageSquare, AlertTriangle, UserMinus } from 'lucide-react';

export const InteractiveChurnShieldDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [step, setStep] = useState(0); 
  // Steps:
  // 0: Waiting/Detecting
  // 1: Client email detected (e.g., "yeah whatever")
  // 2: Counting churn risk percentage up from 15% to 85% & displaying delay
  // 3: Contact Client recommendation button appears
  // 4: Cursor gliding to Contact Client button
  // 5: Clicking Contact Client button
  // 6: Success / Saved Retainer screen
  // 7: Wait & reset

  const [riskValue, setRiskValue] = useState(15);
  const [cursorX, setCursorX] = useState(85); // percentage left
  const [cursorY, setCursorY] = useState(70); // percentage top
  const [cursorOpacity, setCursorOpacity] = useState(0);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // Intersection Observer to detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.95 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Reset when scrolled out of view
  useEffect(() => {
    if (!isInView) {
      setStep(0);
    }
  }, [isInView]);

  // Main animation sequence controller (slowed down for premium feel)
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (step === 0) {
      setRiskValue(15);
      setCursorX(85);
      setCursorY(75);
      setCursorOpacity(0);
      setIsButtonHovered(false);
      setIsButtonClicked(false);
      
      if (isInView) {
        timeout = setTimeout(() => {
          setStep(1);
        }, 2200); // Wait before starting
      }
    }
    else if (step === 1) {
      // Short/cold email detected. Wait a bit, then start risk and analysis counts.
      timeout = setTimeout(() => {
        setStep(2);
      }, 2000);
    }
    else if (step === 2) {
      // Count risk up from 15% to 85%
      let start = 15;
      const end = 85;
      const duration = 2200; // ms (Slower speed)
      const startTime = performance.now();

      const animateCount = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out quad
        const ease = progress * (2 - progress);
        const currentVal = Math.round(start + ease * (end - start));
        setRiskValue(currentVal);

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setStep(3);
        }
      };

      requestAnimationFrame(animateCount);
    }
    else if (step === 3) {
      // Contact Client button becomes active, cursor appears
      setCursorX(82);
      setCursorY(72);
      setCursorOpacity(1);
      
      timeout = setTimeout(() => {
        setStep(4);
      }, 1200);
    }
    else if (step === 4) {
      // Glide cursor to the "Contact Client" button coordinate
      // Centered on the button in the right card of the frame (X: 74%, Y: 84%)
      setCursorX(74);
      setCursorY(84);

      timeout = setTimeout(() => {
        setIsButtonHovered(true);
        setStep(5);
      }, 1800);
    }
    else if (step === 5) {
      // Simulate click
      timeout = setTimeout(() => {
        setIsButtonClicked(true);
        timeout = setTimeout(() => {
          setStep(6);
        }, 600);
      }, 400);
    }
    else if (step === 6) {
      // Success checkmark state
      timeout = setTimeout(() => {
        setStep(7);
      }, 3500);
    }
    else if (step === 7) {
      // Fade out and reset
      timeout = setTimeout(() => {
        setStep(0);
      }, 1200);
    }

    return () => clearTimeout(timeout);
  }, [step, isInView]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        {step !== 7 && (
          <motion.div
            id="churn-shield-dashboard-card"
            key="churn-dashboard-window"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -40, filter: 'blur(4px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="w-full max-w-[480px] aspect-[1.25] bg-white rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.08),_0_1px_3px_rgba(0,0,0,0.02)] border border-neutral-150 overflow-hidden flex flex-col font-sans select-none text-left text-neutral-800 relative"
          >
            {/* macOS Title Bar */}
            <div className="h-11 border-b border-neutral-100 px-4 flex items-center justify-between bg-[#fafafa] shrink-0">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-xs font-medium text-neutral-500 font-mono tracking-tight">
                Churn Shield Dashboard
              </span>
              <div className="w-12" />
            </div>

            {/* Success Full Overlay State */}
            {step === 6 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-x-0 bottom-0 top-11 bg-white z-40 flex flex-col items-center justify-center p-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="mb-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-[0_4px_20px_rgba(16,185,129,0.1)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                </motion.div>
                <motion.h4
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-base font-semibold text-neutral-900 tracking-tight"
                >
                  Retainer Saved!
                </motion.h4>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs text-neutral-500 mt-1 max-w-[280px] leading-relaxed"
                >
                  Alert sent to team. Automated client follow-up has been prioritized.
                </motion.p>
              </motion.div>
            ) : (
              /* Normal Flow Panel Layout */
              <div className="flex-1 p-5 flex flex-col justify-between relative bg-gradient-to-b from-white to-[#fcfcfc]">
                
                {/* Upper Log Terminal / Sentiment Detector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-medium">
                    <div className="flex items-center space-x-1.5 text-neutral-500">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                      </span>
                      <span className="font-semibold tracking-tight">Communication Watchdog</span>
                    </div>
                    <span className="font-mono text-neutral-400 text-[9px]">v2.1.0</span>
                  </div>

                  {/* Log Content container */}
                  <div className="bg-[#f8f9fa] border border-neutral-200/60 rounded-xl p-3.5 text-left shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
                    {step === 0 ? (
                      <div className="flex items-center space-x-2.5 py-1">
                        <div className="w-3.5 h-3.5 border-2 border-neutral-300 border-t-red-500 rounded-full animate-spin" />
                        <span className="text-xs font-medium text-neutral-450">Monitoring client communications & reply speed...</span>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-red-600 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-red-500" /> Short reply detected (Abrupt drop)
                          </span>
                          <span className="text-[9px] font-mono text-neutral-450">Response time: +5.2 days</span>
                        </div>
                        <p className="text-xs text-neutral-600 leading-relaxed italic bg-white p-2.5 rounded-lg border border-neutral-200/60 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                          "Yeah, whatever."
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Dashboard Metric & Action Row */}
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {/* Churn Risk Tracker Box */}
                  <div className="bg-[#f8f9fa] border border-neutral-200/60 rounded-xl p-3.5 flex flex-col justify-between text-left h-[104px] shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold">Churn Risk Index</span>
                    <div className="flex flex-col">
                      <span className="text-3xl font-semibold tracking-tight text-red-500 font-mono flex items-baseline">
                        {riskValue}%
                      </span>
                      <span className="text-[9px] text-neutral-500 mt-1">
                        {riskValue > 50 ? "⚠️ Critical Risk: Cold communication" : "Calculating risk..."}
                      </span>
                    </div>
                  </div>

                  {/* Contact Client Action Card */}
                  <div className="bg-[#f8f9fa] border border-neutral-200/60 rounded-xl p-3.5 flex flex-col justify-between text-left h-[104px] relative overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold">Recommended Action</span>
                    
                    <AnimatePresence>
                      {step >= 3 ? (
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            scale: isButtonClicked ? 0.95 : isButtonHovered ? 1.02 : 1 
                          }}
                          exit={{ opacity: 0 }}
                          className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-[0_4px_12px_rgba(16,185,129,0.15)] ${
                            isButtonClicked 
                              ? 'bg-[#1e1b4b] text-white shadow-inner' 
                              : 'bg-red-500 hover:bg-red-600 text-white'
                          }`}
                        >
                          <span>Contact Client</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </motion.button>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center space-x-1.5 text-neutral-400 text-xs"
                        >
                          <ShieldAlert className="w-4 h-4 text-neutral-400" />
                          <span>Sentiment analysis...</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Simulated Floating Pointer cursor */}
                <motion.div
                  style={{
                    position: 'absolute',
                    pointerEvents: 'none',
                    zIndex: 50,
                  }}
                  animate={{
                    left: `${cursorX}%`,
                    top: `${cursorY}%`,
                    opacity: cursorOpacity,
                  }}
                  transition={
                    step === 0 || step === 7
                      ? { duration: 0 }
                      : { type: 'spring', damping: 32, stiffness: 65 }
                  }
                  className="w-5 h-5 absolute drop-shadow-[0_2px_5px_rgba(0,0,0,0.15)]"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-black">
                    <path
                      d="M4.5 3V17.5L8.5 13.8L12.5 21L14.8 19.7L10.8 12.5H16.8L4.5 3Z"
                      fill="#ffffff"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinejoin="miter"
                    />
                  </svg>
                </motion.div>

              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
