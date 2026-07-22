import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2, Loader2, AlertCircle, ShieldAlert } from 'lucide-react';

interface MarginAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RATE_LIMIT_KEY = 'artificially_audit_submit_history';
const MAX_SUBMISSIONS_PER_DAY = 3;
const COOLDOWN_MINUTES = 5;

export const MarginAuditModal: React.FC<MarginAuditModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [agencySize, setAgencySize] = useState('5 - 15 team members');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot trap field (hidden to humans)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const openedAtRef = useRef<number>(0);

  useEffect(() => {
    if (isOpen) {
      openedAtRef.current = Date.now();
    }
  }, [isOpen]);

  const handleReset = () => {
    setEmail('');
    setHoneypot('');
    setAgencySize('5 - 15 team members');
    setIsSubmitting(false);
    setIsSubmitted(false);
    setErrorMsg('');
  };

  const handleClose = () => {
    onClose();
    setTimeout(handleReset, 300);
  };

  // Client-side Rate Limiting Checks
  const checkRateLimit = (): { allowed: boolean; reason?: string } => {
    try {
      const historyRaw = localStorage.getItem(RATE_LIMIT_KEY);
      const history: number[] = historyRaw ? JSON.parse(historyRaw) : [];
      const now = Date.now();

      // Filter submissions from last 24 hours
      const recent24h = history.filter(timestamp => now - timestamp < 24 * 60 * 60 * 1000);

      // Check max submissions in 24 hours
      if (recent24h.length >= MAX_SUBMISSIONS_PER_DAY) {
        return {
          allowed: false,
          reason: `Daily application limit reached (${MAX_SUBMISSIONS_PER_DAY} max per 24 hours). Please try again tomorrow.`
        };
      }

      // Check cooldown from last submission
      const lastSubmission = recent24h[recent24h.length - 1];
      if (lastSubmission && now - lastSubmission < COOLDOWN_MINUTES * 60 * 1000) {
        const remainingSec = Math.ceil((COOLDOWN_MINUTES * 60 * 1000 - (now - lastSubmission)) / 1000);
        const minLeft = Math.ceil(remainingSec / 60);
        return {
          allowed: false,
          reason: `Rate limit active. Please wait ${minLeft} minute${minLeft > 1 ? 's' : ''} before submitting another application.`
        };
      }
    } catch {
      // Fallback if localStorage is unavailable
    }
    return { allowed: true };
  };

  const recordSubmission = () => {
    try {
      const historyRaw = localStorage.getItem(RATE_LIMIT_KEY);
      const history: number[] = historyRaw ? JSON.parse(historyRaw) : [];
      const now = Date.now();
      const recent24h = history.filter(timestamp => now - timestamp < 24 * 60 * 60 * 1000);
      recent24h.push(now);
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent24h));
    } catch {
      // Fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Honeypot Anti-Bot Shield (If honeypot field is filled, it's 100% a spam bot)
    if (honeypot.trim() !== '') {
      // Fake success to trap the bot silently without sending data
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 800);
      return;
    }

    // 2. Speed Shield (Form submitted under 1.2s from modal open is a bot script)
    const timeSpent = Date.now() - openedAtRef.current;
    if (timeSpent < 1200) {
      setErrorMsg('Submission too fast. Please review your details and try again.');
      return;
    }

    // 3. Email Format Validation
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }

    // 4. Rate Limit Verification
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      setErrorMsg(rateCheck.reason || 'Rate limit active. Please try again later.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mdabppjp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: cleanEmail,
          agencySize: agencySize,
          submittedAt: new Date().toISOString(),
          _gotcha: '' // Formspree native honeypot verification
        })
      });

      if (response.ok) {
        recordSubmission();
        setIsSubmitted(true);
      } else {
        const data = await response.json().catch(() => null);
        if (data && data.errors && data.errors.length > 0) {
          setErrorMsg(data.errors.map((err: any) => err.message).join(', '));
        } else {
          setErrorMsg('An error occurred submitting your application. Please try again.');
        }
      }
    } catch (err) {
      setErrorMsg('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans select-none">
          {/* Dark Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container in Ultra-Clean Dark Mode */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
            className="relative w-full max-w-lg bg-neutral-950 text-white border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              type="button"
              className="absolute top-5 right-5 text-neutral-400 hover:text-white hover:bg-neutral-900 p-2 rounded-full transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              /* Screen 1: Application Form */
              <div className="flex flex-col">
                <h3 className="font-display font-semibold text-2xl text-white tracking-tight mb-2">
                  Margin Audit Application
                </h3>
                <p className="text-sm text-neutral-400 font-medium leading-relaxed mb-6">
                  Selectively approved for agencies running active retainers.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot Trap Input Field (Hidden from humans, filled by spam bots) */}
                  <div className="absolute opacity-0 pointer-events-none -z-50 h-0 w-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="website_url">Website URL</label>
                    <input
                      type="text"
                      id="website_url"
                      name="website_url"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Field 1: Work Email */}
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@agency.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-white rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-all"
                    />
                  </div>

                  {/* Field 2: Agency Size Dropdown */}
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                      Agency Size
                    </label>
                    <select
                      value={agencySize}
                      onChange={(e) => setAgencySize(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-white rounded-xl px-4 py-3 text-sm text-white outline-none transition-all cursor-pointer appearance-none"
                    >
                      <option value="5 - 15 team members">5 - 15 team members</option>
                      <option value="15 - 50 team members">15 - 50 team members</option>
                      <option value="50+ team members">50+ team members</option>
                    </select>
                  </div>

                  {/* Error Alert Display */}
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2.5 p-3.5 bg-red-950/50 border border-red-800/80 rounded-xl text-xs text-red-300 font-medium"
                    >
                      <ShieldAlert className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-100 text-neutral-950 font-semibold px-6 py-3.5 rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <ArrowRight className="w-4 h-4 text-neutral-950" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Screen 2: Confirmation Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4 flex flex-col text-left"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800 flex items-center justify-center mb-6 text-emerald-400 shadow-inner">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>

                <h3 className="font-display font-semibold text-2xl text-white tracking-tight mb-3">
                  Application Received.
                </h3>

                <p className="text-sm md:text-base text-neutral-300 font-normal leading-relaxed mb-8">
                  We review agency infrastructure compatibility and active volume. If your workspace qualifies, you will receive a direct invitation link to book your 30-minute private audit within 12 hours.
                </p>

                <button
                  onClick={handleClose}
                  type="button"
                  className="w-full inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-850 text-white font-medium px-6 py-3 rounded-xl border border-neutral-800 transition-all cursor-pointer"
                >
                  Done
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
