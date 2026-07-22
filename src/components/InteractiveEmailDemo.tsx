import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Paperclip } from 'lucide-react';

export const InteractiveEmailDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [step, setStep] = useState(0); // 0: init delay, 1: typing subject, 2: mid delay, 3: typing body, 4: post typing delay, 5: cursor moving, 6: clicked, 7: sending/fade, 8: reset
  const [cursorX, setCursorX] = useState(380);
  const [cursorY, setCursorY] = useState(220);
  const [cursorOpacity, setCursorOpacity] = useState(0.5); // Elegant semi-visible resting cursor
  const [isSendHovered, setIsSendHovered] = useState(false);
  const [isSendClicked, setIsSendClicked] = useState(false);

  const fullSubject = "Guys, I have more work for you!";
  const fullBody = "Hi team, can we do a quick fix on the landing page? It should only take 5 minutes...";

  // Intersection Observer to detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.95 } // Trigger when 95% visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Reset step to 0 when element is scrolled out of view
  useEffect(() => {
    if (!isInView) {
      setStep(0);
    }
  }, [isInView]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (step === 0) {
      // Clear inputs and wait, cursor rests at bottom right
      setSubject('');
      setBody('');
      setCursorX(380);
      setCursorY(220);
      setCursorOpacity(0);
      setIsSendHovered(false);
      setIsSendClicked(false);
      if (isInView) {
        timeout = setTimeout(() => {
          setStep(1);
        }, 1000);
      }
    } 
    else if (step === 1) {
      // Type subject character by character
      if (subject.length < fullSubject.length) {
        timeout = setTimeout(() => {
          setSubject(fullSubject.slice(0, subject.length + 1));
        }, 45); // Typing speed
      } else {
        timeout = setTimeout(() => {
          setStep(2);
        }, 600);
      }
    } 
    else if (step === 2) {
      // Brief delay before starting body typing
      timeout = setTimeout(() => {
        setStep(3);
      }, 300);
    } 
    else if (step === 3) {
      // Type body character by character
      if (body.length < fullBody.length) {
        timeout = setTimeout(() => {
          setBody(fullBody.slice(0, body.length + 1));
        }, 35); // Fast, realistic typing speed
      } else {
        timeout = setTimeout(() => {
          setStep(4);
        }, 800);
      }
    } 
    else if (step === 4) {
      // Cursor lights up and starts glide
      setCursorOpacity(1);
      timeout = setTimeout(() => {
        setStep(5);
      }, 200);
    } 
    else if (step === 5) {
      // Glide cursor to the blue Send button precisely
      setCursorX(48);
      setCursorY(52);
      
      // Wait for the glide transition to finish
      timeout = setTimeout(() => {
        setIsSendHovered(true);
        setStep(6);
      }, 1000);
    } 
    else if (step === 6) {
      // Click effect
      timeout = setTimeout(() => {
        setIsSendClicked(true);
        timeout = setTimeout(() => {
          setStep(7);
        }, 250);
      }, 200);
    } 
    else if (step === 7) {
      // Sent animation: window slides up & scales down, then restarts
      timeout = setTimeout(() => {
        setStep(0);
      }, 800);
    }

    return () => clearTimeout(timeout);
  }, [step, subject, body, isInView]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        {step !== 7 && (
          <motion.div
            key="email-window"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -40, filter: 'blur(4px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="relative w-full max-w-[480px] aspect-[16/10] bg-white rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.08),_0_1px_3px_rgba(0,0,0,0.02)] border border-neutral-150 overflow-hidden flex flex-col font-sans select-none text-left"
          >
            {/* macOS Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#fafafa] border-b border-neutral-100 shrink-0">
              {/* Traffic Lights */}
              <div className="flex items-center space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>

              {/* Title */}
              <span className="text-xs font-medium text-neutral-500 font-mono tracking-tight">
                New Message
              </span>

              {/* Window Controls Right Placeholder */}
              <div className="w-12" />
            </div>

            {/* Email Toolbar with Send Button */}
            <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-neutral-100 shrink-0">
              <div className="flex items-center space-x-3">
                {/* Send Button */}
                <motion.button
                  animate={{
                    scale: isSendClicked ? 0.92 : isSendHovered ? 1.04 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-colors duration-200 ${
                    isSendHovered 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  <Send className="w-3.5 h-3.5 fill-white" />
                  <span>Send</span>
                </motion.button>

                {/* Attachment Icons */}
                <Paperclip className="w-4 h-4 text-neutral-400 cursor-default" />
                <div className="w-[1px] h-4 bg-neutral-200" />
                <div className="flex space-x-1">
                  <div className="w-4 h-4 rounded border border-neutral-300 flex items-center justify-center text-[9px] font-bold text-neutral-400 font-mono">A</div>
                  <div className="w-4 h-4 rounded border border-neutral-300 flex items-center justify-center text-[9px] font-bold text-neutral-400 font-mono">B</div>
                </div>
              </div>
            </div>

            {/* Recipients Header */}
            <div className="px-4 py-2.5 border-b border-neutral-100 flex items-center gap-3 text-xs shrink-0">
              <span className="w-16 shrink-0 text-neutral-400">To:</span>
              <span className="text-neutral-700 font-medium">worker@agency.com</span>
            </div>

            {/* Subject Header */}
            <div className="px-4 py-2.5 border-b border-neutral-100 flex items-center gap-3 text-xs shrink-0">
              <span className="w-16 shrink-0 text-neutral-400">Subject:</span>
              <span className="text-neutral-800 font-semibold flex items-center min-h-[16px]">
                {subject}
                {step === 1 && subject.length < fullSubject.length && (
                  <span className="w-0.5 h-3.5 bg-blue-500 ml-0.5 animate-pulse shrink-0" />
                )}
              </span>
            </div>

            {/* Email Message Content Area */}
            <div className="flex-1 p-4 text-xs text-neutral-800 leading-relaxed font-normal whitespace-pre-wrap select-none outline-none">
              <div className="flex items-start min-h-[60px]">
                <span>{body}</span>
                {step === 3 && body.length < fullBody.length && (
                  <span className="w-0.5 h-3.5 bg-blue-500 ml-0.5 animate-pulse inline-block shrink-0" />
                )}
              </div>
            </div>

            {/* Interactive Mouse Cursor overlay */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 50,
              }}
              animate={{
                x: cursorX,
                y: cursorY,
                opacity: cursorOpacity,
              }}
              transition={
                step === 0 || step === 7
                  ? { duration: 0 }
                  : { type: 'spring', damping: 32, stiffness: 65 }
              }
              className="w-5 h-5 drop-shadow-[0_2px_5px_rgba(0,0,0,0.15)]"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-black">
                <path
                  d="M4.5 3V17.5L9.12 13.78L13.2 21L16.5 19.1L12.5 12L17.5 11.2L4.5 3Z"
                  fill="white"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveEmailDemo;
