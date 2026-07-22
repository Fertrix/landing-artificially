import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CornerUpLeft } from 'lucide-react';

export const InteractiveChurnDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  
  // Steps:
  // 0: Reset / Idle
  // 1: Agency email is typing.
  // 2: Agency email completed. Cursor appears and glides to "Reply" button.
  // 3: Cursor hovers and clicks "Reply" button.
  // 4: Composer slides up.
  // 5: Client reply starts typing.
  // 6: Client typing completed. Cursor appears in composer.
  // 7: Cursor glides down precisely to the Send button.
  // 8: Cursor hovers and clicks Send.
  // 9: Composer closes, sent email joins the thread.
  // 10: Pause on full thread before resetting.
  const [step, setStep] = useState(0); 
  const [agencyText, setAgencyText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [cursorX, setCursorX] = useState(85); // Percentage-based coordinates
  const [cursorY, setCursorY] = useState(65);
  const [cursorOpacity, setCursorOpacity] = useState(0);
  const [isReplyHovered, setIsReplyHovered] = useState(false);
  const [isReplyClicked, setIsReplyClicked] = useState(false);
  const [isSendHovered, setIsSendHovered] = useState(false);
  const [isSendClicked, setIsSendClicked] = useState(false);

  const fullAgencyText = "Hi Mark, just sent over the weekly deliverables for the project. Are we still good for our strategy call tomorrow at 10:00 AM?";
  const fullReply = "Yeah whatever. Super busy this week, let's just cancel it.";

  // Intersection Observer to detect visibility (95% threshold for precise trigger)
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
      setAgencyText('');
      setReplyText('');
      setCursorOpacity(0);
      setIsReplyHovered(false);
      setIsReplyClicked(false);
      setIsSendHovered(false);
      setIsSendClicked(false);
    }
  }, [isInView]);

  // Main animation timeline
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (step === 0 && isInView) {
      setAgencyText('');
      setReplyText('');
      setCursorOpacity(0);
      setIsReplyHovered(false);
      setIsReplyClicked(false);
      setIsSendHovered(false);
      setIsSendClicked(false);
      timeout = setTimeout(() => {
        setStep(1);
      }, 800);
    }
    else if (step === 1) {
      // Type agency email
      if (agencyText.length < fullAgencyText.length) {
        timeout = setTimeout(() => {
          setAgencyText(fullAgencyText.slice(0, agencyText.length + 1));
        }, 15); // Fast typing for agency context
      } else {
        timeout = setTimeout(() => {
          setStep(2);
        }, 1000); // Pause before cursor appears
      }
    }
    else if (step === 2) {
      // Cursor appears and glides to Reply button
      setCursorX(88);
      setCursorY(80);
      setCursorOpacity(1);
      timeout = setTimeout(() => {
        setCursorX(84);
        setCursorY(41); // Pointed precisely on the Reply button inside the card
        timeout = setTimeout(() => {
          setIsReplyHovered(true);
          setStep(3);
        }, 800);
      }, 300);
    }
    else if (step === 3) {
      // Click simulation for Reply button
      timeout = setTimeout(() => {
        setIsReplyClicked(true);
        timeout = setTimeout(() => {
          setIsReplyHovered(false);
          setIsReplyClicked(false);
          setCursorOpacity(0);
          setStep(4);
        }, 200);
      }, 300);
    }
    else if (step === 4) {
      // Composer slides up, wait for transition
      timeout = setTimeout(() => {
        setStep(5);
      }, 800);
    }
    else if (step === 5) {
      // Type client reply
      if (replyText.length < fullReply.length) {
        timeout = setTimeout(() => {
          setReplyText(fullReply.slice(0, replyText.length + 1));
        }, 45); // Natural typing speed
      } else {
        timeout = setTimeout(() => {
          setStep(6);
        }, 1000); // Wait, then show cursor
      }
    }
    else if (step === 6) {
      // Show cursor near middle-right of composer
      setCursorX(80);
      setCursorY(68);
      setCursorOpacity(1);
      timeout = setTimeout(() => {
        setStep(7);
      }, 600);
    }
    else if (step === 7) {
      // Glide cursor down precisely to the Send button
      setCursorX(84);
      setCursorY(89); // Pointed precisely onto the Pill Send button inside h-[52%] composer
      timeout = setTimeout(() => {
        setIsSendHovered(true);
        setStep(8);
      }, 1000);
    }
    else if (step === 8) {
      // Click simulation
      timeout = setTimeout(() => {
        setIsSendClicked(true);
        timeout = setTimeout(() => {
          setIsSendHovered(false);
          setIsSendClicked(false);
          setCursorOpacity(0);
          setStep(9);
        }, 250);
      }, 350);
    }
    else if (step === 9) {
      // Show completed thread
      timeout = setTimeout(() => {
        setStep(10);
      }, 4000);
    }
    else if (step === 10) {
      timeout = setTimeout(() => {
        setStep(0);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [step, agencyText, replyText, isInView]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        {step !== 10 && (
          <motion.div
            key="churn-window"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -40, filter: 'blur(4px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="relative w-full max-w-[480px] aspect-[1.1] bg-white rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.08),_0_1px_3px_rgba(0,0,0,0.02)] border border-neutral-150 overflow-hidden flex flex-col font-sans select-none text-left"
          >
            {/* macOS Title Bar */}
            <div className="flex items-center justify-between px-4 h-11 bg-[#fafafa] border-b border-neutral-100 shrink-0">
              {/* Traffic Lights */}
              <div className="flex items-center space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>

              {/* Clean Monospaced Title */}
              <span className="text-xs font-normal text-neutral-400 font-mono tracking-tight">
                Mail conversation
              </span>

              {/* Spacer */}
              <div className="w-12" />
            </div>

            {/* Content Area / Email Viewport */}
            <div className="flex-1 p-5 overflow-hidden flex flex-col justify-start bg-gradient-to-b from-white to-[#fcfcfc] relative">
              
              {/* Thread History Container */}
              <div className="space-y-4 w-full">
                
                {/* 1. Original Agency Email */}
                {step >= 1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-4 border border-neutral-150 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-2.5"
                  >
                    <div className="flex justify-between items-start text-[11px]">
                      <span className="font-semibold text-neutral-700">Your Agency to Mark (Client)</span>
                      <span className="text-neutral-400 font-mono">5 days ago, 4:12 PM</span>
                    </div>
                    
                    <div className="text-xs font-semibold text-neutral-800 bg-neutral-50 px-2.5 py-1.5 rounded border border-neutral-100">
                      Subject: Sync for tomorrow / Monthly Progress
                    </div>
                    
                    <p className="text-xs md:text-[13px] text-neutral-500 leading-relaxed min-h-[32px] whitespace-pre-wrap">
                      {agencyText}
                      {step === 1 && agencyText.length < fullAgencyText.length && (
                        <span className="inline-block w-0.5 h-3.5 bg-blue-500 ml-0.5 animate-pulse" style={{ verticalAlign: 'middle' }} />
                      )}
                    </p>

                    {/* Clean gray Reply Button under the text */}
                    <motion.div 
                      initial={{ opacity: 0, height: 0, scale: 0.9, marginTop: 0 }}
                      animate={{ 
                        opacity: step >= 1 && step <= 3 ? 1 : 0,
                        height: step >= 1 && step <= 3 ? 24 : 0,
                        scale: step >= 1 && step <= 3 ? 1 : 0.85,
                        marginTop: step >= 1 && step <= 3 ? 12 : 0,
                      }}
                      transition={{ 
                        type: 'spring', 
                        damping: 24, 
                        stiffness: 150 
                      }}
                      className="flex justify-end overflow-hidden"
                    >
                      <div 
                        className={`flex items-center space-x-1 px-2.5 py-1 rounded bg-neutral-100 text-neutral-500 font-medium text-[10px] cursor-pointer transition-all duration-150 border border-neutral-200/50 ${
                          isReplyHovered ? 'bg-neutral-200 text-neutral-800 shadow-sm' : ''
                        } ${isReplyClicked ? 'scale-95 bg-neutral-300' : ''}`}
                      >
                        <CornerUpLeft className="w-3 h-3 text-neutral-500" />
                        <span>Reply</span>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* 2. Sent Client Email (Appears once clicked & submitted) */}
                {step >= 9 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="bg-white rounded-xl p-4 border border-neutral-150 shadow-[0_4px_12px_rgba(0,0,0,0.02)] space-y-2.5 relative"
                  >
                    <div className="flex justify-between items-start text-[11px]">
                      <span className="font-semibold text-neutral-700">Mark (Client) to Your Agency</span>
                      <div className="flex items-center space-x-1 font-mono text-neutral-400">
                        <span>Sent just now</span>
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-neutral-800 bg-neutral-50 px-2.5 py-1.5 rounded border border-neutral-100">
                      Subject: Re: Sync for tomorrow / Monthly Progress
                    </div>

                    <p className="text-xs md:text-[13px] text-neutral-600 leading-relaxed">
                      Yeah whatever. Super busy this week, let's just cancel it.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Interactive Reply Sheet Overlay */}
              <AnimatePresence>
                {step >= 4 && step <= 8 && (
                  <motion.div
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="absolute inset-x-0 bottom-0 bg-white border-t border-neutral-200/90 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] rounded-t-2xl p-4 flex flex-col justify-between h-[52%] z-25"
                  >
                    {/* Header Address Fields */}
                    <div className="space-y-1.5 shrink-0">
                      <div className="flex items-center text-[10px] border-b border-neutral-100 pb-1.5">
                        <span className="text-neutral-400 font-medium w-12">From:</span>
                        <span className="text-neutral-700 font-semibold">mark@client.com</span>
                      </div>
                      <div className="flex items-center text-[10px] border-b border-neutral-100 pb-1.5">
                        <span className="text-neutral-400 font-medium w-12">To:</span>
                        <span className="text-neutral-700 font-semibold">worker@agency.com</span>
                      </div>
                      <div className="flex items-center text-[10px] border-b border-neutral-100 pb-1.5">
                        <span className="text-neutral-400 font-medium w-12">Subject:</span>
                        <span className="text-neutral-600">Re: Sync for tomorrow / Monthly Progress</span>
                      </div>
                    </div>

                    {/* Rich Input Field */}
                    <p className="flex-1 py-2 text-xs md:text-[13px] text-neutral-800 leading-relaxed text-left font-sans select-none whitespace-pre-wrap">
                      {replyText}
                      {step === 5 && replyText.length < fullReply.length && (
                        <span className="inline-block w-0.5 h-3.5 bg-blue-500 ml-0.5 animate-pulse" style={{ verticalAlign: 'middle' }} />
                      )}
                    </p>

                    {/* Footer Row (Send Button) */}
                    <div className="flex items-center justify-between border-t border-neutral-100 pt-2 shrink-0">
                      <div className="w-12" />
                      
                      {/* Polished Pill-shaped Send Button matching user screenshot */}
                      <motion.button
                        type="button"
                        animate={{
                          scale: isSendClicked ? 0.92 : isSendHovered ? 1.04 : 1,
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-colors duration-200 ${
                          isSendHovered 
                            ? 'bg-blue-600 text-white shadow-[0_4px_12px_rgba(59,130,246,0.25)]' 
                            : 'bg-blue-500 text-white shadow-[0_2px_6px_rgba(59,130,246,0.15)]'
                        }`}
                      >
                        <Send className="w-3.5 h-3.5 fill-white text-white" />
                        <span>Send</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Cursor Overlay */}
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
                  step === 0 || step === 4 || step === 9
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveChurnDemo;
