import React from 'react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.pathname = path;
    }
  };

  return (
    <footer className="w-full bg-white px-6 md:px-12">
      {/* Top Divider Line */}
      <div className="w-full border-t border-neutral-200" />

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side: Brand Identity & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
          <div className="cursor-pointer" onClick={(e) => handleLinkClick(e, '/')}>
            <Logo variant="light" />
          </div>
          <span className="hidden sm:inline text-neutral-300">|</span>

          <p className="text-xs md:text-sm text-neutral-400 font-medium">
            © 2026 Artificially Hub Inc. All rights reserved.
          </p>
        </div>

        {/* Right Side: Legal & Compliance Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs md:text-sm text-neutral-500 font-medium">
          <a
            href="/privacy"
            onClick={(e) => handleLinkClick(e, '/privacy')}
            className="hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Privacy Policy
          </a>
          <span className="text-neutral-300 select-none">•</span>
          <a
            href="/terms"
            onClick={(e) => handleLinkClick(e, '/terms')}
            className="hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Terms of Service
          </a>
          <span className="text-neutral-300 select-none">•</span>
          <a
            href="/security"
            onClick={(e) => handleLinkClick(e, '/security')}
            className="hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Security & Compliance
          </a>
        </div>
      </div>
    </footer>
  );
};


