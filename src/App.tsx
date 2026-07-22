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
import { MarginAuditModal } from './components/MarginAuditModal';
import { Logo } from './components/Logo';


// Custom SVG Logo for Google Antigravity designed with Google's iconic four-color theme
const AntigravityLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 3L2 21H7L12 11.5L17 21H22L12 3Z"
      fill="url(#antigravity-brand-grad)"
    />
    <circle cx="12" cy="15.5" r="2.8" fill="#ffffff" />
    <circle cx="12" cy="15.5" r="1.5" fill="#4285F4" />
    <defs>
      <linearGradient id="antigravity-brand-grad" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4285F4" />     {/* Google Blue */}
        <stop offset="35%" stopColor="#EA4335" />    {/* Google Red */}
        <stop offset="70%" stopColor="#FBBC05" />    {/* Google Yellow */}
        <stop offset="100%" stopColor="#34A853" />   {/* Google Green */}
      </linearGradient>
    </defs>
  </svg>
);

/**
 * LOGO CUSTOMIZATION GUIDE:
 * To add, remove, or modify logos in the loop below:
 * 1. To use custom React Nodes (SVG icons, styled labels):
 *    Add an object like: { node: <MyIcon />, title: "Brand Name" }
 * 2. To use image files (PNG/SVG assets):
 *    Add an object like: { src: "/path/to/logo.png", alt: "Brand Name", href: "https://brand.com" }
 */
const techLogos = [
  {
    node: (
      <span className="flex items-center space-x-2 text-xs font-semibold tracking-wider font-mono text-neutral-300 hover:text-white transition-colors duration-150">
        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span>GOOGLE</span>
      </span>
    ),
    title: "Google"
  },
  {
    node: (
      <span className="flex items-center space-x-2 text-xs font-semibold tracking-wider font-mono text-neutral-300 hover:text-white transition-colors duration-150">
        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 22H22L12 2Z" fill="#ffffff" />
        </svg>
        <span>VERCEL</span>
      </span>
    ),
    title: "Vercel"
  },
  {
    node: (
      <span className="flex items-center space-x-2 text-xs font-semibold tracking-wider font-mono text-neutral-300 hover:text-white transition-colors duration-150">
        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.433 13.067H20L10.567 24l2.133-10.933H6L15.433 0l-2 13.067z" fill="#3ECF8E" />
        </svg>
        <span>SUPABASE</span>
      </span>
    ),
    title: "Supabase"
  },
  {
    node: (
      <span className="flex items-center space-x-2 text-xs font-semibold tracking-wider font-mono text-neutral-300 hover:text-white transition-colors duration-150">
        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
        <span>GITHUB</span>
      </span>
    ),
    title: "GitHub"
  },
  {
    node: (
      <span className="flex items-center space-x-2 text-xs font-semibold tracking-wider font-mono text-neutral-300 hover:text-white transition-colors duration-150">
        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.042 15.125a2.521 2.521 0 1 1-2.52 2.52h2.52v-2.52z" fill="#36C5F0"/>
          <path d="M6.303 15.125a2.521 2.521 0 0 1 5.042 0v5.042a2.521 2.521 0 1 1-5.042 0v-5.042z" fill="#36C5F0"/>
          <path d="M8.825 5.042a2.521 2.521 0 1 1 2.52-2.52v2.52h-2.52z" fill="#2EB67D"/>
          <path d="M8.825 6.303a2.521 2.521 0 0 1 0 5.042H3.783a2.521 2.521 0 1 1 0-5.042h5.042z" fill="#2EB67D"/>
          <path d="M18.958 8.825a2.521 2.521 0 1 1 2.52-2.52h-2.52v2.52z" fill="#ECB22E"/>
          <path d="M17.697 8.825a2.521 2.521 0 0 1-5.042 0V3.783a2.521 2.521 0 1 1 5.042 0v5.042z" fill="#ECB22E"/>
          <path d="M15.125 18.958a2.521 2.521 0 1 1-2.52 2.52v-2.52h2.52z" fill="#E01E5A"/>
          <path d="M15.125 17.697a2.521 2.521 0 0 1 0-5.042h5.042a2.521 2.521 0 1 1 0 5.042h-5.042z" fill="#E01E5A"/>
        </svg>
        <span>SLACK</span>
      </span>
    ),
    title: "Slack"
  },
  {
    node: (
      <span className="flex items-center space-x-2 text-xs font-semibold tracking-wider font-mono text-neutral-300 hover:text-white transition-colors duration-150">
        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.087 13.563a2.915 2.915 0 0 1-2.913 2.913H3.54a3.454 3.454 0 0 1-1.393-6.613 4.298 4.298 0 0 1 7.643-3.136 5.86 5.86 0 0 1 10.957 2.164 2.918 2.918 0 0 1 3.34 4.672zm-15.53-.16a1.944 1.944 0 0 1-1.942-1.943c0-1.073.87-1.943 1.943-1.943.435 0 .835.143 1.161.385a4.256 4.256 0 0 1 1.637 1.558H8.557z" fill="#F38020"/>
        </svg>
        <span>CLOUDFLARE</span>
      </span>
    ),
    title: "Cloudflare"
  },
  {
    node: (
      <span className="flex items-center space-x-2 text-xs font-semibold tracking-wider font-mono text-neutral-300 hover:text-white transition-colors duration-150">
        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.125 0C.502 0 0 .502 0 1.125V22.88C0 23.498.502 24 1.125 24H22.88c.62 0 1.12-.502 1.12-1.125V1.125C24 .502 23.498 0 22.88 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v3.358c-.588-.306-1.194-.47-1.818-.493-.612-.023-1.11.074-1.493.292-.375.21-.567.575-.567 1.096 0 .346.082.617.247.813.165.196.442.378.832.545.39.167.92.368 1.587.604.814.286 1.442.673 1.884 1.161.443.487.662 1.132.662 1.932 0 .867-.23 1.582-.69 2.146-.46.564-1.12.986-1.984 1.266-.864.28-1.887.42-3.07.42-1.228 0-2.28-.146-3.155-.44a8.1 8.1 0 0 1-1.912-.946v-3.52c.675.432 1.455.765 2.34 1.005.885.24 1.714.36 2.486.36.723 0 1.258-.117 1.606-.353.348-.236.52-.584.52-1.042 0-.287-.067-.52-.2-.7-.133-.18-.393-.35-.78-.51s-.96-.36-1.72-.605c-.832-.267-1.474-.632-1.928-1.095-.454-.463-.681-1.114-.681-1.953 0-.825.228-1.517.685-2.076.457-.56 1.1-.986 1.93-1.28.83-.293 1.815-.44 2.955-.44zm-14.87.113h11.538v3.083H10.15v10.36H6.626v-10.36H3.618z" fill="#3178C6" />
        </svg>
        <span>TYPESCRIPT</span>
      </span>
    ),
    title: "TypeScript"
  }
];

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [showUseCases, setShowUseCases] = useState(false);

  const [copied, setCopied] = useState(false);
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
  
  // Download simulation states
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleCopyCommand = () => {
    navigator.clipboard.writeText('winget install google.antigravity');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startDownloadSimulation = () => {
    if (isDownloading || downloadComplete) return;
    setIsDownloading(true);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setDownloadComplete(true);
          return 100;
        }
        // Smooth logarithmic progress step
        const step = Math.max(2, Math.floor((100 - prev) * 0.15));
        return Math.min(100, prev + step);
      });
    }, 150);
  };

  const resetDownload = () => {
    setDownloadProgress(0);
    setIsDownloading(false);
    setDownloadComplete(false);
  };

  const useCasesList = [
    {
      title: "Workspace Automation",
      description: "Automate desktop windows, navigate file structures, and script multi-app workflows natively using local agent context.",
      icon: Terminal,
      color: "text-blue-500",
      bgColor: "bg-blue-50/50"
    },
    {
      title: "Cross-App Orchestration",
      description: "Chain together multiple APIs, web applications, and desktop processes securely under a single semantic goal.",
      icon: Workflow,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50/50"
    },
    {
      title: "Intelligent Debugging",
      description: "Real-time log parsing, self-healing code compilation, and terminal assistance running natively in the background.",
      icon: Cpu,
      color: "text-pink-500",
      bgColor: "bg-pink-50/50"
    },
    {
      title: "Hybrid AI Architecture",
      description: "Bypass network latency by executing on-device models with seamless server-side failover to Gemini 1.5 Pro.",
      icon: Sparkles,
      color: "text-amber-500",
      bgColor: "bg-amber-50/50"
    }
  ];

  if (currentPath === '/privacy') {

    return <PrivacyPolicy onNavigate={navigateTo} />;
  }
  if (currentPath === '/terms') {
    return <TermsOfService onNavigate={navigateTo} />;
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
              The first system built to plug your agency’s revenue leaks and secure your profit without making developers track a single minute.
            </p>
          </GlassSurface>
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
              Powered by
            </p>
          </div>




          <div className="relative w-full overflow-hidden border border-neutral-900 bg-black rounded-full py-4 px-0 shadow-lg shadow-black/20">
            <LogoLoop
              logos={techLogos}
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
            {/* Connector SVG lines overlay */}
            {coords.x1 > 0 && coords.x2 > 0 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
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
                    text="Clients ask for a quick fix. Your developers work. Clients get free results. You get zero dollars. Stop letting clients bleed your agency dry with those fixes."
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
                <div ref={upperCardRef} className="relative w-full max-w-[560px] aspect-[1.3] rounded-[32px] md:rounded-[40px] bg-gradient-to-tr from-[#eef2f6] via-[#f5f3ff] to-[#fefaf0] p-6 sm:p-8 md:p-12 shadow-[0_24px_50px_rgba(0,0,0,0.02)] border border-neutral-100/60 flex items-center justify-center overflow-hidden">
                  {/* Backdrop subtle ambient color blobs matching the upload */}
                  <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-150/40 rounded-full blur-[80px] pointer-events-none" />
                  <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-amber-100/40 rounded-full blur-[80px] pointer-events-none" />
                  
                  {/* Interactive Email Vector Typing Video Card */}
                  <InteractiveEmailDemo />
                </div>
              </div>

            </div>

            {/* Fine horizontal divider line placeholder - retains structural spacing and guides calculations */}
            <div ref={dividerRef} className="w-full max-w-6xl mx-auto px-6 md:px-12 mt-16 md:mt-24 h-px" />

            {/* Revenue Recovery Section - Dashboard on Left, Text on Right */}
            <div className="w-full max-w-6xl mx-auto px-6 md:px-12 mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left side container card holding the light dashboard demo */}
              <div className="lg:col-span-7 w-full flex justify-center order-2 lg:order-1">
                {/* Giant soft glowing colorful gradient frame mirroring the user's email demo exactly */}
                <div ref={lowerCardRef} className="relative w-full max-w-[560px] aspect-[1.1] rounded-[32px] md:rounded-[40px] bg-gradient-to-tr from-[#eef2f6] via-[#f5f3ff] to-[#fefaf0] p-6 sm:p-8 md:p-12 shadow-[0_24px_50px_rgba(0,0,0,0.02)] border border-neutral-100/60 flex items-center justify-center overflow-hidden">
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
                    text="The 5 minute request turns into 30 minutes. Your developers worked. Clients got free results. Our system catches those unbilled minutes, prices them against your contract, and drafts the invoice. One click and you get paid."
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
            {/* Connector SVG lines overlay */}
            {churnCoords.x1 > 0 && churnCoords.x2 > 0 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
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
                <div ref={churnUpperCardRef} className="relative w-full max-w-[560px] aspect-[1.1] rounded-[32px] md:rounded-[40px] bg-gradient-to-tr from-[#eef2f6] via-[#f5f3ff] to-[#fefaf0] p-6 sm:p-8 md:p-12 shadow-[0_24px_50px_rgba(0,0,0,0.02)] border border-neutral-100/60 flex items-center justify-center overflow-hidden">
                  {/* Backdrop subtle ambient color blobs */}
                  <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-150/40 rounded-full blur-[80px] pointer-events-none" />
                  <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-red-100/10 rounded-full blur-[80px] pointer-events-none" />
                  
                  {/* Interactive Churn Demo */}
                  <InteractiveChurnDemo />
                </div>
              </div>

            </div>

            {/* Fine horizontal divider line placeholder - retains structural spacing and guides calculations */}
            <div ref={churnDividerRef} className="w-full max-w-6xl mx-auto px-6 md:px-12 mt-16 md:mt-24 h-px" />

            {/* Churn Shield Section - Motion on Left, Text on Right */}
            <div className="w-full max-w-6xl mx-auto px-6 md:px-12 mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left side: Interactive Churn Shield Demo (Dashboard) */}
              <div className="lg:col-span-7 w-full flex justify-center order-2 lg:order-1">
                {/* Giant soft glowing colorful gradient frame mirroring the others */}
                <div ref={churnLowerCardRef} className="relative w-full max-w-[560px] aspect-[1.15] rounded-[32px] md:rounded-[40px] bg-gradient-to-tr from-[#eef2f6] via-[#f5f3ff] to-[#fefaf0] p-6 sm:p-8 md:p-12 shadow-[0_24px_50px_rgba(0,0,0,0.02)] border border-neutral-100/60 flex items-center justify-center overflow-hidden">
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


      {/* ANIMATED DRAWER: EXPLORE USE CASES */}
      <AnimatePresence>
        {showUseCases && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUseCases(false)}
              className="absolute inset-0 bg-neutral-900/10 backdrop-blur-sm"
            />

            {/* Slider Content Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white border-l border-neutral-100 h-full p-8 md:p-10 shadow-2xl flex flex-col z-10 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-2">
                  <AntigravityLogo className="w-5 h-5" />
                  <span className="font-display font-semibold text-neutral-900 text-lg">
                    Capabilities
                  </span>
                </div>
                <button
                  onClick={() => setShowUseCases(false)}
                  className="text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 p-1.5 rounded-full transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Subheading intro */}
              <p className="text-neutral-500 text-sm mb-8 leading-relaxed">
                Google Antigravity introduces high-efficiency, multi-agent frameworks running directly at the system layer. Explore developer capabilities:
              </p>

              {/* Features List */}
              <div className="space-y-5 flex-1 mb-10">
                {useCasesList.map((uc, index) => {
                  const IconComponent = uc.icon;
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      key={uc.title}
                      className="group border border-neutral-100 bg-neutral-50/30 rounded-2xl p-4 hover:border-neutral-200 hover:bg-neutral-50/70 transition-all cursor-default"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-2.5 rounded-xl ${uc.bgColor} ${uc.color} shrink-0`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-neutral-800 mb-1 flex items-center">
                            {uc.title}
                          </h4>
                          <p className="text-xs text-neutral-400 leading-relaxed group-hover:text-neutral-500 transition-colors">
                            {uc.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Action and security note at the bottom */}
              <div className="border-t border-neutral-100 pt-6 mt-auto">
                <div className="flex items-center space-x-2.5 text-xs text-neutral-400 font-mono mb-4">
                  <HeartHandshake className="w-4 h-4 text-pink-500" />
                  <span>Built with open standards for security.</span>
                </div>
                <button
                  onClick={() => {
                    setShowUseCases(false);
                    setShowAuditModal(true);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 bg-neutral-950 text-white font-medium rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer text-sm"
                >
                  <span>Apply for Margin Audit</span>
                </button>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
