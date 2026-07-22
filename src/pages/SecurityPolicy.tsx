import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck, Mail } from 'lucide-react';
import { Footer } from '../components/Footer';
import { Logo } from '../components/Logo';

interface LegalPageProps {
  onNavigate: (path: string) => void;
}

export const SecurityPolicy: React.FC<LegalPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('/');
  };

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900 flex flex-col font-sans select-none">
      {/* Logo Island (positioned at top-left, scrolls away with page content) */}
      <div className="absolute top-5 left-6 md:left-12 z-30">
        <button
          onClick={handleBack}
          className="cursor-pointer group inline-flex items-center bg-white/90 hover:bg-white border border-neutral-200/80 px-4 py-2 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
        >
          <Logo variant="light" />
        </button>
      </div>

      {/* Fixed Back Button Island (pinned at top-right during scroll) */}
      <button
        onClick={handleBack}
        className="fixed top-5 right-6 md:right-12 z-40 inline-flex items-center gap-2 text-xs md:text-sm font-medium text-neutral-600 hover:text-neutral-950 bg-white/90 hover:bg-white border border-neutral-200/80 px-4 py-2 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all cursor-pointer hover:shadow-md hover:scale-[1.02]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>



      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 md:py-20">
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 border-b border-neutral-200 pb-8"
        >
          <div className="inline-flex items-center gap-2 bg-neutral-900 text-neutral-200 px-3.5 py-1.5 rounded-full text-xs font-mono mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>SECURITY & COMPLIANCE</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 mb-3">
            Security & Infrastructure Policy
          </h1>
          <p className="text-sm font-mono text-neutral-500">
            Last Updated: July 2026
          </p>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed text-base md:text-lg mb-12"
        >
          <p>
            At Artificially Hub, we build financial and operational data infrastructure designed for high-ticket B2B agencies. Security is built directly into our codebase and network architecture.
          </p>
        </motion.div>

        {/* Harmonious Section Cards */}
        <div className="space-y-8 text-neutral-800">
          {/* Section 01 */}
          <section className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-neutral-400">01</span>
              <span>Data Processing Architecture (RAM-Only Execution)</span>
            </h2>

            {/* Privacy Callout Box */}
            <div className="bg-white border border-neutral-200 rounded-xl p-5 mb-5 shadow-xs">
              <h3 className="font-display text-lg font-semibold text-neutral-900 mb-2">
                Privacy
              </h3>
              <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
                We never archive your full chat history or inbox data. Messages are processed in memory, storing only isolated, encrypted snippets required for audit proof.
              </p>
            </div>

            {/* Zero Raw Archive Policy Clause */}
            <div className="bg-white border border-neutral-200 p-5 rounded-xl text-neutral-800 space-y-2">
              <strong className="text-neutral-900 font-semibold block text-base">
                Zero Raw Archive Policy
              </strong>
              <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
                We do not index or store full conversation archives or raw message histories. Communication streams are processed statelessly in transient memory (RAM). Only isolated text excerpts connected to identified scope creep or churn flags are retained as encrypted audit evidence (AES-256 at rest).
              </p>
            </div>
          </section>


          {/* Section 02 */}
          <section className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-neutral-400">02</span>
              <span>Database Isolation & Encryption</span>
            </h2>
            <ul className="space-y-3 text-sm md:text-base text-neutral-600">
              <li className="bg-white border border-neutral-200 p-4 rounded-xl">
                <strong className="text-neutral-900 block mb-1">Encryption at Rest:</strong>
                All stored analytical metadata, user settings, and financial logs are encrypted using industrial-standard <span className="font-mono font-semibold text-neutral-900">AES-256</span> encryption.
              </li>
              <li className="bg-white border border-neutral-200 p-4 rounded-xl">
                <strong className="text-neutral-900 block mb-1">Encryption in Transit:</strong>
                All data moving between client browsers, Vercel Serverless Functions, and Supabase core databases is strictly forced over <span className="font-mono font-semibold text-neutral-900">TLS 1.3 / HTTPS</span>.
              </li>
              <li className="bg-white border border-neutral-200 p-4 rounded-xl">
                <strong className="text-neutral-900 block mb-1">Multi-Tenant Row-Level Security (RLS):</strong>
                Every database table employs hardware-enforced Row-Level Security. Tenant data is logically isolated; your agency’s data can never be read or queried by another account context.
              </li>
            </ul>
          </section>

          {/* Section 03 */}
          <section className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-neutral-400">03</span>
              <span>Automated Code Integrity & Static Analysis</span>
            </h2>
            <ul className="space-y-3 text-sm md:text-base text-neutral-600">
              <li>
                <strong className="text-neutral-900 font-semibold">Sentinel PR Scanning:</strong> 100% of backend and frontend code commits undergo automated static analysis and vulnerability checks via <span className="font-semibold text-neutral-950">CodeRabbit</span> prior to deployment.
              </li>
              <li>
                <strong className="text-neutral-900 font-semibold">Zero Third-Party Automation Middleware:</strong> We write custom, direct API integrations running on Vercel Functions. We do not route sensitive client webhooks through third-party automation wrappers (e.g., Zapier, n8n), eliminating external intermediary breach vectors.
              </li>
            </ul>
          </section>

          {/* Section 04 */}
          <section className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-neutral-400">04</span>
              <span>Payment & Financial Compliance</span>
            </h2>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
              Payment processing and tax calculations are handled by <strong className="text-neutral-900">Paddle</strong> as Merchant of Record. Artificially Hub never stores, processes, or transmits raw credit card numbers or banking credentials.
            </p>
          </section>

          {/* Section 05 */}
          <section className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-3 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-neutral-400">05</span>
              <span>Incident Response & Reporting</span>
            </h2>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-4">
              We maintain 24/7 automated uptime and exception monitoring across our serverless stack. If you discover a security vulnerability or suspect an incident, please report it immediately to our security team at:
            </p>
            <a
              href="mailto:fernando@artificiallyhub.com"
              className="inline-flex items-center gap-2 text-neutral-900 hover:text-neutral-600 font-mono text-sm md:text-base font-semibold underline transition-colors"
            >
              <Mail className="w-4 h-4 text-neutral-900" />
              <span>fernando@artificiallyhub.com</span>
            </a>

          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
