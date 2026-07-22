import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, FileText, Mail, CheckCircle } from 'lucide-react';
import { Footer } from '../components/Footer';
import { Logo } from '../components/Logo';

interface LegalPageProps {
  onNavigate: (path: string) => void;
}

export const TermsOfService: React.FC<LegalPageProps> = ({ onNavigate }) => {
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
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>TERMS OF SERVICE</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 mb-3">
            Terms of Service
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
          <p className="mb-4">
            Welcome to Artificially Hub. These Terms of Service ("Terms") constitute a legally binding agreement between Artificially Hub Inc. ("Company", "we", "us") and the business entity subscribing to or accessing our platform ("Customer", "you").
          </p>
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-neutral-900 font-medium text-sm md:text-base">
            BY ACCESSING OR USING THE SERVICE, YOU AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE, DO NOT ACCESS OR USE THE SERVICE.
          </div>
        </motion.div>

        {/* Harmonious Section Cards */}
        <div className="space-y-8 text-neutral-800">
          {/* Section 01 */}
          <section className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-neutral-400">01</span>
              <span>B2B Enterprise Service Only</span>
            </h2>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
              The Service is a B2B (Business-to-Business) performance infrastructure designed exclusively for commercial agencies and businesses. It is not intended for consumer or personal use.
            </p>
          </section>

          {/* Section 02 */}
          <section className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-neutral-400">02</span>
              <span>Subscriptions, Payments, and Merchant of Record</span>
            </h2>
            <ul className="space-y-4 text-sm md:text-base text-neutral-600">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 font-semibold">Merchant of Record:</strong> All order fulfillment, payment processing, sales tax, VAT calculation, and invoicing are handled directly by Paddle.com Market Limited ("Paddle"), our authorized Merchant of Record. By placing an order, you agree to Paddle's Terms of Use and Privacy Policy.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 font-semibold">Subscription Fee:</strong> The Service is billed as a recurring monthly subscription of <span className="font-semibold text-neutral-950">$2,000 USD</span> per active agency workspace.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 font-semibold">No Lock-In:</strong> Subscriptions operate on a month-to-month basis with zero annual commitments. You may cancel your subscription at any time via your account settings prior to the start of the next billing cycle.
                </div>
              </li>
            </ul>
          </section>

          {/* Section 03 */}
          <section className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-neutral-400">03</span>
              <span>Performance Proof of Concept & Fee Structure</span>
            </h2>
            <ul className="space-y-3 text-sm md:text-base text-neutral-600">
              <li>
                <strong className="text-neutral-900 font-semibold">Zero Revenue Share:</strong> You retain 100% of all margin, recovered revenues, and unbilled invoices generated through the insights provided by the Service. We charge no commission or success fees.
              </li>
              <li>
                <strong className="text-neutral-900 font-semibold">Performance SLA:</strong> If during your initial 30-day proof-of-concept period the Service fails to identify at least $2,000 USD in unbilled scope creep or margin risk leaks, your second month of Service access will be granted free of charge until $2,000 USD in total leaks are identified.
              </li>
              <li>
                <strong className="text-neutral-900 font-semibold">No Cash Refunds:</strong> Subscriptions and fees paid are non-refundable once processed by Paddle. The Performance SLA is strictly fulfilled via service time extensions (free access months) and does not constitute a cash refund.
              </li>
            </ul>
          </section>

          {/* Section 04 */}
          <section className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-neutral-400">04</span>
              <span>Customer Obligations and Human-in-the-Loop Authority</span>
            </h2>
            <div className="space-y-4 text-sm md:text-base text-neutral-600">
              <div className="bg-white border border-neutral-200 p-4 rounded-xl">
                <strong className="text-neutral-900 block mb-1">Human Approval Required:</strong>
                The Service provides automated audit ledgers, analytics, and draft emails/invoices. <span className="font-semibold text-neutral-950">Nothing is automatically sent to your agency’s clients without your explicit manual review and approval.</span> You retain sole responsibility for reviewing, calibrating, and approving any draft communications or invoice links prior to client distribution.
              </div>
              <div>
                <strong className="text-neutral-900 font-semibold">System Connectivity:</strong> You agree to maintain active API webhooks and integrations with your operating stack to allow proper margin calculation.
              </div>
            </div>
          </section>

          {/* Section 05 */}
          <section className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-neutral-400">05</span>
              <span>Intellectual Property</span>
            </h2>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
              Artificially Hub retains all right, title, and interest in and to the Service, including all software, algorithms, dashboard interfaces, source code, and trade secrets. Customer receives a non-exclusive, non-transferable, revocable license to access the platform during an active subscription.
            </p>
          </section>

          {/* Section 06 */}
          <section className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-neutral-400">06</span>
              <span>Limitation of Liability (CRITICAL)</span>
            </h2>
            <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW:
            </p>
            <ol className="space-y-3 text-sm md:text-base text-neutral-600 list-decimal pl-5">
              <li>
                IN NO EVENT SHALL ARTIFICIALLY HUB INC. BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES (INCLUDING LOSS OF PROFITS, REVENUE, CLIENT CHURN, OR DATA).
              </li>
              <li>
                OUR AGGREGATE LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE TOTAL AMOUNT ACTUALLY PAID BY YOU TO US (VIA PADDLE) DURING THE ONE (1) MONTH PERIOD IMMEDIATELY PRECEDING THE CLAIM.
              </li>
            </ol>
          </section>

          {/* Section 07 */}
          <section className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-neutral-400">07</span>
              <span>Governing Law</span>
            </h2>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law principles.
            </p>
          </section>

          {/* Section 08 */}
          <section className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-3 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-neutral-400">08</span>
              <span>Contact</span>
            </h2>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-4">
              For legal or billing inquiries, reach out directly to:
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
