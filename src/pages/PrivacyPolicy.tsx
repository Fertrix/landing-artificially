import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Lock, Mail, CheckCircle } from 'lucide-react';
import { Footer } from '../components/Footer';
import { Logo } from '../components/Logo';

interface LegalPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPolicy: React.FC<LegalPageProps> = ({ onNavigate }) => {
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
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>PRIVACY POLICY</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 mb-3">
            Privacy Policy
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
            Artificially Hub Inc. ("Artificially Hub", "Company", "we", "us", or "our") respects your privacy and is committed to protecting the operational and personal data processed through our infrastructure. This Privacy Policy explains how we collect, process, and protect data when you use our automated revenue recovery and margin analytics platform (the "Service").
          </p>
        </motion.div>

        {/* Harmonious Section Cards */}
        <div className="space-y-8 text-neutral-800">
          {/* Section 01 */}
          <section className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-neutral-400">01</span>
              <span>Data Controller and Data Processor Roles</span>
            </h2>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-4">
              Under applicable data protection laws (including EU GDPR and US State Privacy Laws such as CCPA/CPRA):
            </p>
            <ul className="space-y-3 text-sm md:text-base text-neutral-600">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 font-semibold">Data Controller:</strong> You (the "Customer" or "Agency") remain the sole Data Controller regarding any client communications, contract terms, or operational data connected to the Service.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 font-semibold">Data Processor:</strong> Artificially Hub acts strictly as a Data Processor, handling data solely to execute automated scope creep detection, churn risk analysis, and margin recovery on your behalf.
                </div>
              </li>
            </ul>
          </section>

          {/* Section 02 */}
          <section className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-neutral-400">02</span>
              <span>Transient In-Memory Data Processing Architecture</span>
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


          {/* Section 03 */}
          <section className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-neutral-400">03</span>
              <span>Information We Collect</span>
            </h2>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-4">
              We collect and persistently store only the minimal operational metadata required to deliver the Service:
            </p>
            <ol className="space-y-3 text-sm md:text-base text-neutral-600 list-decimal pl-5">
              <li>
                <strong className="text-neutral-900 font-semibold">Account & Billing Data:</strong> Name, business email address, agency domain, and corporate metadata. Billing information (credit cards, tax IDs) is collected and processed exclusively by our Merchant of Record, Paddle, and is never stored on our servers.
              </li>
              <li>
                <strong className="text-neutral-900 font-semibold">System Metadata & Analytics Ledger:</strong> Calculated financial metrics, hourly cost rates, contract scope rules, scope creep incident logs, and aggregated account health scores.
              </li>
              <li>
                <strong className="text-neutral-900 font-semibold">Authentication Credentials:</strong> Encrypted OAuth tokens and API keys required to maintain secure webhooks with your software stack (e.g., Slack, Toggl, Stripe, Gmail). All credentials are encrypted at rest using AES-256 bit encryption within isolated Supabase database vaults.
              </li>
            </ol>
          </section>

          {/* Section 04 */}
          <section className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-neutral-400">04</span>
              <span>How We Use Information</span>
            </h2>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-3">
              We use persistent metadata solely to:
            </p>
            <ul className="space-y-2 text-sm md:text-base text-neutral-600 list-disc pl-5">
              <li>Provision, maintain, and secure your custom dashboard environment.</li>
              <li>Calculate unbilled hours and generate draft reconciliation requests.</li>
              <li>Trigger real-time alerts regarding account health and communication velocity drops.</li>
              <li>Verify eligibility for performance guarantees during proof-of-concept cycles.</li>
            </ul>
          </section>

          {/* Section 05 */}
          <section className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-neutral-400">05</span>
              <span>Third-Party Infrastructure Sub-Processors</span>
            </h2>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-4">
              We partner with top-tier infrastructure providers executing strict Data Processing Agreements (DPAs):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-neutral-200 p-4 rounded-xl">
                <strong className="text-neutral-900 block mb-1">Paddle</strong>
                <p className="text-xs text-neutral-500">Merchant of Record handling payment processing, tax compliance, and billing.</p>
              </div>
              <div className="bg-white border border-neutral-200 p-4 rounded-xl">
                <strong className="text-neutral-900 block mb-1">Supabase</strong>
                <p className="text-xs text-neutral-500">Managed database infrastructure handling persistent encrypted metadata storage and Row-Level Security (RLS).</p>
              </div>
              <div className="bg-white border border-neutral-200 p-4 rounded-xl">
                <strong className="text-neutral-900 block mb-1">Vercel Inc.</strong>
                <p className="text-xs text-neutral-500">Isolated serverless compute backend executing transient memory functions.</p>
              </div>
            </div>
          </section>

          {/* Section 06 */}
          <section className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-neutral-400">06</span>
              <span>Data Security and Isolation</span>
            </h2>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
              We enforce enterprise-grade security measures including Row-Level Security (RLS) policies at the database layer, isolated tenant schemas, TLS 1.3 encryption in transit, and AES-256 encryption at rest.
            </p>
          </section>

          {/* Section 07 */}
          <section className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-3 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-neutral-400">07</span>
              <span>Your Rights and Contact</span>
            </h2>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-4">
              You retain the right to access, rectify, export, or request the deletion of your persistent account metadata at any time. For privacy inquiries or data requests, contact us at:
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
