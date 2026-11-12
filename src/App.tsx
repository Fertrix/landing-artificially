import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Terminal, 
  Copy, 
  Check, 
  Cpu, 
  Workflow, 
  Sparkles, 
  X, 
  ChevronRight, 
  Layers, 
  ShieldCheck, 
  HeartHandshake,
  Shield,
  Zap,
  Database,
  ArrowUpRight
} from 'lucide-react';

import DotField from './components/DotField';
import TextType from './components/TextType';
import GlassSurface from './components/GlassSurface';
import LogoLoop from './components/LogoLoop';
import WaveScrollIcons from './components/WaveScrollIcons';
import InteractiveEmailDemo from './components/InteractiveEmailDemo';
import { InteractiveDashboardDemo } from './components/InteractiveDashboardDemo';
import { InteractiveChurnDemo } from './components/InteractiveChurnDemo';
import { InteractiveChurnShieldDemo } from './components/InteractiveChurnShieldDemo';
import DecryptedText from './components/DecryptedText';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { SecurityPolicy } from './pages/SecurityPolicy';
import { ScopeCheck } from './pages/ScopeCheck';
import { MarginAuditModal } from './components/MarginAuditModal';
import { Logo } from './components/Logo';
import { brandLogos } from './components/BrandLogos';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';






export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [showAuditModal, setShowAuditModal] = useState(false);

  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };
  
  // Refs for calculating connecting lines
  const parentRef = useRef<HTMLDivElement>(null);
  const upperCardRef = useRef<HTMLDivElement>(null);
  const lowerCardRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const [coords, setCoords] = useState({ x1: 0, y1: 0, x2: 0, y2: 0, dividerY: 0, parentWidth: 0 });

  useEffect(() => {
    if (!isTypingComplete) return;

    const updateCoords = () => {
      if (!parentRef.current || !upperCardRef.current || !lowerCardRef.current || !dividerRef.current) return;
      const parentRect = parentRef.current.getBoundingClientRect();
      const upperRect = upperCardRef.current.getBoundingClientRect();
      const lowerRect = lowerCardRef.current.getBoundingClientRect();
      const dividerRect = dividerRef.current.getBoundingClientRect();

      const x1 = (upperRect.left + upperRect.right) / 2 - parentRect.left;
      const y1 = upperRect.bottom - parentRect.top;

      const x2 = (lowerRect.left + lowerRect.right) / 2 - parentRect.left;
      const y2 = lowerRect.top - parentRect.top;

      const dividerY = (dividerRect.top + dividerRect.bottom) / 2 - parentRect.top;

      setCoords({
        x1,
        y1,
        x2,
        y2,
        dividerY,
        parentWidth: parentRect.width
      });
    };

    updateCoords();
    window.addEventListener('resize', updateCoords);

    const timers = [
      setTimeout(updateCoords, 100),
      setTimeout(updateCoords, 500),
      setTimeout(updateCoords, 1000),
      setTimeout(updateCoords, 2000),
    ];

    const resizeObserver = new ResizeObserver(updateCoords);
    resizeObserver.observe(parentRef.current);
    resizeObserver.observe(upperCardRef.current);
    resizeObserver.observe(lowerCardRef.current);

    return () => {
      window.removeEventListener('resize', updateCoords);
      timers.forEach(clearTimeout);
      resizeObserver.disconnect();
    };
  }, [isTypingComplete]);

  // Refs for calculating second connecting lines (Churn group)
  const churnParentRef = useRef<HTMLDivElement>(null);
  const churnUpperCardRef = useRef<HTMLDivElement>(null);
  const churnLowerCardRef = useRef<HTMLDivElement>(null);
  const churnDividerRef = useRef<HTMLDivElement>(null);

  const [churnCoords, setChurnCoords] = useState({ x1: 0, y1: 0, x2: 0, y2: 0, dividerY: 0, parentWidth: 0 });

  useEffect(() => {
    if (!isTypingComplete) return;

    const updateChurnCoords = () => {
      if (!churnParentRef.current || !churnUpperCardRef.current || !churnLowerCardRef.current || !churnDividerRef.current) return;
      const parentRect = churnParentRef.current.getBoundingClientRect();
      const upperRect = churnUpperCardRef.current.getBoundingClientRect();
      const lowerRect = churnLowerCardRef.current.getBoundingClientRect();
      const dividerRect = churnDividerRef.current.getBoundingClientRect();

      const x1 = (upperRect.left + upperRect.right) / 2 - parentRect.left;
      const y1 = upperRect.bottom - parentRect.top;

      const x2 = (lowerRect.left + lowerRect.right) / 2 - parentRect.left;
      const y2 = lowerRect.top - parentRect.top;

      const dividerY = (dividerRect.top + dividerRect.bottom) / 2 - parentRect.top;

      setChurnCoords({
        x1,
        y1,
        x2,
        y2,
        dividerY,
        parentWidth: parentRect.width
      });
    };

    updateChurnCoords();
    window.addEventListener('resize', updateChurnCoords);

    const timers = [
      setTimeout(updateChurnCoords, 100),
      setTimeout(updateChurnCoords, 500),
      setTimeout(updateChurnCoords, 1000),
      setTimeout(updateChurnCoords, 2000),
    ];

    const resizeObserver = new ResizeObserver(updateChurnCoords);
    resizeObserver.observe(churnParentRef.current);
    resizeObserver.observe(churnUpperCardRef.current);
    resizeObserver.observe(churnLowerCardRef.current);

    return () => {
      window.removeEventListener('resize', updateChurnCoords);
      timers.forEach(clearTimeout);
      resizeObserver.disconnect();
    };
  }, [isTypingComplete]);
  
;

  if (currentPath === '/privacy') {

    return <PrivacyPolicy onNavigate={navigateTo} />;
  }
  if (currentPath === '/terms') {
    return <TermsOfService onNavigate={navigateTo} />;
  }
  if (currentPath === '/scope-check') {
    return <ScopeCheck onNavigate={navigateTo} />;
  }
  if (currentPath === '/security') {
    return <SecurityPolicy onNavigate={navigateTo} />;
  }

  return (

    <main className="relative w-full min-h-screen bg-white overflow-y-auto overflow-x-hidden select-none scroll-smooth">
      {/* 
        DotGrid Component serves as the interactive, kinetic background.
        Base color is set to #ffffff (identical to the background color) 
        so the dots are hidden until the mouse interacts with them.
      */}
      <AnimatePresence>
        {isTypingComplete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            id="canvas-container" 
            className="fixed inset-0 w-full h-full z-0 pointer-events-none"
          >
            <DotField
              dotRadius={1.5}
              dotSpacing={10}
              cursorRadius={250}
              bulgeStrength={67}
              glowRadius={160}
              sparkle={false}
              waveAmplitude={0}
              bulgeOnly={true}
              gradientFrom="#000000"
              gradientTo="#000000"
              glowColor="rgba(0, 0, 0, 0.04)"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern, minimalist top navigation bar */}
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : -10 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 py-5 md:px-12 ${isTypingComplete ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div 
          onClick={() => navigateTo('/')}
          className="pointer-events-auto cursor-pointer group inline-flex items-center bg-white/90 hover:bg-white border border-neutral-200/80 px-4 py-2 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
        >
          <Logo variant="light" />
        </div>
      </motion.header>

      {/* Main Hero Screen Layout */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen max-w-7xl mx-auto px-6 pt-32 pb-24 text-center pointer-events-none">
        
        {/* Dynamic Typing Title */}
        <div className="w-full max-w-6xl min-h-[140px] md:min-h-[180px] lg:min-h-[220px] flex items-center justify-center mb-8">
          <TextType
            as="h1"
            text={"Scope creep is now\na solved engineering\nproblem."}
            typingSpeed={45}
            pauseDuration={2800}
            deletingSpeed={20}
            showCursor={true}
            loop={false}
            onComplete={() => setIsTypingComplete(true)}
            cursorCharacter="|"
            cursorClassName="text-neutral-900 font-extralight text-4xl md:text-6xl lg:text-8xl"
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-neutral-900 tracking-tight leading-[1.05] text-center whitespace-pre-line"
          />
        </div>

        {/* Explanatory Paragraph inside GlassSurface */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 15 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`max-w-4xl w-full mb-10 px-4 ${isTypingComplete ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          <GlassSurface
            borderRadius={16}
            borderWidth={0.03}
            brightness={100}
            opacity={0.9}
            blur={10}
            backgroundOpacity={0.85}
            className="w-full"
            style={{ padding: '0.85rem 1.5rem' }}
          >
            <p className="text-neutral-500 text-sm md:text-lg leading-relaxed text-center font-medium tracking-tight">
              The first system built to plug your agency’s revenue leaks and secure your profit without making your team track a single minute.
            </p>
          </GlassSurface>
        </motion.div>






        {/* Primary CTA: free Scope Leak Check */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 15 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`flex flex-col items-center gap-3 px-4 ${isTypingComplete ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigateTo('/scope-check')}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-neutral-900 text-white text-sm md:text-base font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.18)] cursor-pointer"
          >
            How much free work is your agency doing?
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
          <span className="text-xs text-neutral-500 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">Free 60-second check · No signup · No client data</span>
        </motion.div>

        {/* Partners Logo Loop Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 15 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full max-w-4xl mt-10 px-4 flex flex-col items-center ${isTypingComplete ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >

          {/* Bold "Powered by" text inside a protective white background pill */}
          <div className="inline-block bg-white/90 border border-neutral-900 px-4 py-1.5 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.03)] backdrop-blur-md mb-4 shrink-0">
            <p className="text-[10px] md:text-xs text-neutral-900 font-black tracking-widest uppercase text-center">
              Built for teams using
            </p>
          </div>




          <div className="relative w-full overflow-hidden border border-neutral-900 bg-black rounded-full py-4 px-0 shadow-lg shadow-black/20">
            <LogoLoop
              logos={brandLogos}
              speed={35}
              direction="left"
              logoHeight={16}
              gap={48}
              fadeOut={true}
              fadeOutColor="#000000"
              scaleOnHover={true}
            />
          </div>
        </motion.div>
      </div>

      {/* SCROLLABLE PURE BLANK WHITE SECTION (BELOW THE HERO) */}
      {isTypingComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative z-20 w-full pt-16 md:pt-24 pb-0 flex flex-col items-center justify-start pointer-events-auto"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0px, rgba(255, 255, 255, 1) 200px, rgba(255, 255, 255, 1) 100%)'
          }}
        >
          {/* Scroll velocity horizontal wave carousel */}
          <div className="w-full">
            <WaveScrollIcons />
          </div>

          {/* Connector Line Wrapper */}
          <div ref={parentRef} className="relative w-full">
            {/* Connector SVG lines overlay (Desktop only - hidden on mobile to avoid cutting through stacked text) */}
            {coords.x1 > 0 && coords.x2 > 0 && (
              <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                {/* Dashed connector path with 90-degree bends */}
                <path
                  d={
                    Math.abs(coords.x1 - coords.x2) < 40
                      ? `M ${coords.x1} ${coords.y1} L ${coords.x1} ${coords.y2}`
                      : `M ${coords.x1} ${coords.y1} L ${coords.x1} ${coords.dividerY + 44} L ${coords.x2} ${coords.dividerY + 44} L ${coords.x2} ${coords.y2}`
                  }
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  opacity="0.95"
                />

                {/* Horizontal Divider with a perfect gap at the vertical line intersection */}
                {/* Left part of divider */}
                <line
                  x1={48}
                  y1={coords.dividerY}
                  x2={coords.x1 - 20}
                  y2={coords.dividerY}
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  opacity="1"
                />
                {/* Right part of divider */}
                <line
                  x1={coords.x1 + 20}
                  y1={coords.dividerY}
                  x2={coords.parentWidth - 48}
                  y2={coords.dividerY}
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  opacity="1"
                />
              </svg>
            )}

            {/* Antigravity 2.0 Video Demo Section */}
            <div className="w-full max-w-6xl mx-auto px-6 md:px-12 mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left side text column */}
              <div className="lg:col-span-5 text-left flex flex-col justify-center">
                <h2 className="font-display text-4xl md:text-5xl font-semibold text-neutral-900 tracking-tight mb-5">
                  Unpaid hours
                </h2>
                
                <div className="min-h-[120px] md:min-h-[140px]">
                  <TextType
                    as="p"
                    text="Clients ask for a quick fix. Your team does the work. Clients get free results. You get zero dollars. Stop letting clients bleed your agency dry with those fixes."
                    typingSpeed={12}
                    showCursor={false}
                    loop={false}
                    startOnVisible={true}
                    className="text-neutral-500 text-sm md:text-base leading-relaxed font-medium tracking-tight"
                  />
                </div>
              </div>

              {/* Right side container card holding the vector interactive email demo */}
              <div className="lg:col-span-7 w-full flex justify-center">
                {/* Giant soft glowing colorful gradient frame mirroring the user's second screenshot */}
                <div ref={upperCardRef} className="relative w-full max-w-[560px] aspect-[1.05] sm:aspect-[1.3] rounded-[32px] md:rounded-[40px] bg-gradient-to-tr from-[#eef2f6] via-[#f5f3ff] to-[#fefaf0] p-3 sm:p-8 md:p-12 shadow-[0_24px_50px_rgba(0,0,0,0.02)] border border-neutral-100/60 flex items-center justify-center overflow-hidden">
                  {/* Backdrop subtle ambient color blobs matching the upload */}
                  <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-150/40 rounded-full blur-[80px] pointer-events-none" />
                  <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-amber-100/40 rounded-full blur-[80px] pointer-events-none" />
                  
                  {/* Interactive Email Vector Typing Video Card */}
                  <InteractiveEmailDemo />
                </div>
              </div>

            </div>

            {/* Fine horizontal divider line placeholder - retains structural spacing and guides calculations on Desktop; clean divider line on Mobile */}
            <div ref={dividerRef} className="w-full max-w-6xl mx-auto px-6 md:px-12 mt-16 md:mt-24 h-px flex items-center justify-center">
              <div className="lg:hidden w-full border-t border-[#cbd5e1]" />
            </div>

            {/* Revenue Recovery Section - Dashboard on Left, Text on Right */}
            <div className="w-full max-w-6xl mx-auto px-6 md:px-12 mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left side container card holding the light dashboard demo */}
              <div className="lg:col-span-7 w-full flex justify-center order-2 lg:order-1">
                {/* Giant soft glowing colorful gradient frame mirroring the user's email demo exactly */}
                <div ref={lowerCardRef} className="relative w-full max-w-[560px] aspect-[0.98] sm:aspect-[1.1] rounded-[32px] md:rounded-[40px] bg-gradient-to-tr from-[#eef2f6] via-[#f5f3ff] to-[#fefaf0] p-3 sm:p-8 md:p-12 shadow-[0_24px_50px_rgba(0,0,0,0.02)] border border-neutral-100/60 flex items-center justify-center overflow-hidden">
                  {/* Backdrop subtle ambient color blobs matching the email demo */}
                  <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-150/40 rounded-full blur-[80px] pointer-events-none" />
                  <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-amber-100/40 rounded-full blur-[80px] pointer-events-none" />
                  
                  {/* Interactive Dashboard Vector Demo */}
                  <InteractiveDashboardDemo />
                </div>
              </div>

              {/* Right side text column */}
              <div className="lg:col-span-5 text-left flex flex-col justify-center order-1 lg:order-2">
                <h2 className="font-display text-4xl md:text-5xl font-semibold text-neutral-900 tracking-tight mb-5">
                  Instant Recovery
                </h2>
                
                <div className="min-h-[140px] md:min-h-[160px]">
                  <TextType
                    as="p"
                    text="The 5 minute request turns into 30 minutes. Your team did the work. Clients got free results. Our system catches those unbilled minutes, prices them against your contract, and drafts the invoice. One click and you get paid."
                    typingSpeed={12}
                    showCursor={false}
                    loop={false}
                    startOnVisible={true}
                    className="text-neutral-500 text-sm md:text-base leading-relaxed font-medium tracking-tight"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Crisp vector SVG divider line matching all horizontal dividers */}
          <div className="w-full px-12 mt-16 md:mt-24">
            <svg className="w-full h-1 overflow-visible">
              <line
                x1={0}
                y1={0}
                x2="100%"
                y2={0}
                stroke="#cbd5e1"
                strokeWidth="2"
                opacity="1"
              />
            </svg>
          </div>





          {/* Churn Connector Line Wrapper */}
          <div ref={churnParentRef} className="relative w-full">
            {/* Connector SVG lines overlay (Desktop only - hidden on mobile) */}
            {churnCoords.x1 > 0 && churnCoords.x2 > 0 && (
              <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                {/* Dashed connector path with 90-degree bends */}
                <path
                  d={
                    Math.abs(churnCoords.x1 - churnCoords.x2) < 40
                      ? `M ${churnCoords.x1} ${churnCoords.y1} L ${churnCoords.x1} ${churnCoords.y2}`
                      : `M ${churnCoords.x1} ${churnCoords.y1} L ${churnCoords.x1} ${churnCoords.dividerY + 44} L ${churnCoords.x2} ${churnCoords.dividerY + 44} L ${churnCoords.x2} ${churnCoords.y2}`
                  }
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  opacity="1"
                />

                {/* Horizontal Divider with a perfect gap at the vertical line intersection */}
                {/* Left part of divider */}
                <line
                  x1={48}
                  y1={churnCoords.dividerY}
                  x2={churnCoords.x1 - 20}
                  y2={churnCoords.dividerY}
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  opacity="1"
                />
                {/* Right part of divider */}
                <line
                  x1={churnCoords.x1 + 20}
                  y1={churnCoords.dividerY}
                  x2={churnCoords.parentWidth - 48}
                  y2={churnCoords.dividerY}
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  opacity="1"
                />
              </svg>
            )}

            {/* Churn Prevention Section - Text on Left, Motion on Right */}
            <div className="w-full max-w-6xl mx-auto px-6 md:px-12 mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left side: Text column */}
              <div className="lg:col-span-5 text-left flex flex-col justify-center order-1">
                <span className="self-start text-[10px] md:text-xs font-mono uppercase tracking-widest text-neutral-500 border border-neutral-200 rounded-full px-3 py-1 mb-4">Also included</span>
                <h3 className="font-display text-4xl md:text-5xl font-semibold text-neutral-900 tracking-tight mb-5">
                  Silent Churn
                </h3>
                
                <div className="min-h-[140px] md:min-h-[160px]">
                  <TextType
                    as="p"
                    text="Clients do not cancel overnight. First, their replies get short. They skip strategy calls. Your team thinks everything is fine. Two weeks later, they cancel their retainer. Stop letting silent churn kill your monthly revenue."
                    typingSpeed={12}
                    showCursor={false}
                    loop={false}
                    startOnVisible={true}
                    className="text-neutral-500 text-sm md:text-base leading-relaxed font-medium tracking-tight"
                  />
                </div>
              </div>

              {/* Right side: Interactive Motion Graphic */}
              <div className="lg:col-span-7 w-full flex justify-center order-2">
                {/* Giant soft glowing colorful gradient frame mirroring the user's other cards */}
                <div ref={churnUpperCardRef} className="relative w-full max-w-[560px] aspect-[0.76] xs:aspect-[0.82] sm:aspect-[1.1] rounded-[32px] md:rounded-[40px] bg-gradient-to-tr from-[#eef2f6] via-[#f5f3ff] to-[#fefaf0] p-3 sm:p-8 md:p-12 shadow-[0_24px_50px_rgba(0,0,0,0.02)] border border-neutral-100/60 flex items-center justify-center overflow-hidden">
                  {/* Backdrop subtle ambient color blobs */}
                  <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-150/40 rounded-full blur-[80px] pointer-events-none" />
                  <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-red-100/10 rounded-full blur-[80px] pointer-events-none" />
                  
                  {/* Interactive Churn Demo */}
                  <InteractiveChurnDemo />
                </div>
              </div>

            </div>

            {/* Fine horizontal divider line placeholder - retains structural spacing and guides calculations on Desktop; clean divider line on Mobile */}
            <div ref={churnDividerRef} className="w-full max-w-6xl mx-auto px-6 md:px-12 mt-16 md:mt-24 h-px flex items-center justify-center">
              <div className="lg:hidden w-full border-t border-[#cbd5e1]" />
            </div>

            {/* Churn Shield Section - Motion on Left, Text on Right */}
            <div className="w-full max-w-6xl mx-auto px-6 md:px-12 mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left side: Interactive Churn Shield Demo (Dashboard) */}
              <div className="lg:col-span-7 w-full flex justify-center order-2 lg:order-1">
                {/* Giant soft glowing colorful gradient frame mirroring the others */}
                <div ref={churnLowerCardRef} className="relative w-full max-w-[560px] aspect-[0.76] xs:aspect-[0.82] sm:aspect-[1.15] rounded-[32px] md:rounded-[40px] bg-gradient-to-tr from-[#eef2f6] via-[#f5f3ff] to-[#fefaf0] p-3 sm:p-8 md:p-12 shadow-[0_24px_50px_rgba(0,0,0,0.02)] border border-neutral-100/60 flex items-center justify-center overflow-hidden">
                  {/* Backdrop subtle ambient color blobs */}
                  <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-150/40 rounded-full blur-[80px] pointer-events-none" />
                  <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-amber-100/40 rounded-full blur-[80px] pointer-events-none" />
                  
                  {/* Interactive Churn Shield Dashboard Demo */}
                  <InteractiveChurnShieldDemo />
                </div>
              </div>

              {/* Right side: Text column */}
              <div className="lg:col-span-5 text-left flex flex-col justify-center order-1 lg:order-2">
                <h3 className="font-display text-4xl md:text-5xl font-semibold text-neutral-900 tracking-tight mb-5">
                  Churn Shield
                </h3>
                
                <div className="min-h-[140px] md:min-h-[160px]">
                  <TextType
                    as="p"
                    text="Replies get short. Meetings get canceled. Until now. Our system tracks communication drops, flags cold accounts 60 days early, and alerts your team. Step in before it’s too late and save the retainer."
                    typingSpeed={12}
                    showCursor={false}
                    loop={false}
                    startOnVisible={true}
                    className="text-neutral-500 text-sm md:text-base leading-relaxed font-medium tracking-tight"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Section Divider */}
          <div className="w-full px-6 md:px-12 mt-16 md:mt-24">
            <div className="border-t border-neutral-200 w-full" />
          </div>

          {/* Two-Column Text Section below Churn Shield */}
          <div className="w-full max-w-6xl mx-auto px-6 md:px-12 mt-12 md:mt-16 text-left">
            <h3 className="font-display text-4xl md:text-5xl font-semibold text-neutral-900 tracking-tight mb-10 md:mb-14 text-left">
              Why us?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 relative">
              
              {/* Vertical Divider on medium+ screens */}
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-neutral-200" />

              {/* Column 1 */}
              <div className="flex flex-col gap-8">
                {/* Block 1 */}
                <div className="flex flex-col gap-2.5">
                  <h4 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 tracking-tight">
                    Privacy
                  </h4>
                  <div className="text-neutral-500 text-sm md:text-base leading-relaxed font-medium tracking-tight">
                    <DecryptedText 
                      text="We never archive your full chat history or inbox data. Messages are processed in memory, storing only isolated, encrypted snippets required for audit proof."
                      animateOn="view"
                      speed={10}
                      maxIterations={10}
                      sequential={true}
                      revealDirection="start"
                      useOriginalCharsOnly={true}
                      clickMode="once"
                      className="text-neutral-700 font-medium"
                      encryptedClassName="text-neutral-400 font-mono"
                    />
                  </div>

                </div>

                {/* Horizontal divider between blocks */}
                <div className="border-t border-neutral-200 w-full" />

                {/* Block 2 */}
                <div className="flex flex-col gap-2.5">
                  <h4 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 tracking-tight">
                    Built For You
                  </h4>
                  <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-medium tracking-tight">
                    We build your dashboard directly around the tools you already use. Connect your software seamlessly with zero changes to your team's daily workflow.
                  </p>
                </div>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-8">
                {/* Block 3 */}
                <div className="flex flex-col gap-2.5">
                  <h4 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 tracking-tight">
                    Customization
                  </h4>
                  <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-medium tracking-tight">
                    Set your own scope rules and hourly rates. Edit cost numbers directly inside generated drafts on the fly to calibrate your dashboard in seconds.
                  </p>
                </div>

                {/* Horizontal divider between blocks */}
                <div className="border-t border-neutral-200 w-full" />

                {/* Block 4 */}
                <div className="flex flex-col gap-2.5">
                  <h4 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 tracking-tight">
                    Full Control
                  </h4>
                  <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-medium tracking-tight">
                    Nothing gets sent to your clients automatically. You stay in full control to review every draft, edit the numbers, and approve invoice links with a single click.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Frequently Asked Questions Section */}
          <FaqSection />

          {/* Call To Action Section */}
          <CtaSection onApplyClick={() => setShowAuditModal(true)} />

          {/* Site Footer */}
          <Footer onNavigate={navigateTo} />

        </motion.div>
      )}

      {/* MARGIN AUDIT APPLICATION MODAL */}
      <MarginAuditModal isOpen={showAuditModal} onClose={() => setShowAuditModal(false)} />


      <Analytics />
      <SpeedInsights />
    </main>
  );
}
