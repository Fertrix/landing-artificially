import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

interface MarginAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MarginAuditModal: React.FC<MarginAuditModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [agencySize, setAgencySize] = useState('5 - 15 team members');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleReset = () => {
    setEmail('');
    setAgencySize('5 - 15 team members');
    setIsSubmitting(false);
    setIsSubmitted(false);
    setErrorMsg('');
  };

  const handleClose = () => {
    onClose();
    setTimeout(handleReset, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid work email address.');
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
          email: email.trim(),
          agencySize: agencySize,
          submittedAt: new Date().toISOString()
        })
      });

      if (response.ok) {
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
                  {/* Field 1: Work Email */}
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@agency.com"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all font-mono"
                    />
                  </div>

                  {/* Field 2: Agency Size */}
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                      Agency Size
                    </label>
                    <div className="relative">
                      <select
                        value={agencySize}
                        onChange={(e) => setAgencySize(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all appearance-none font-sans cursor-pointer pr-10"
                      >
                        <option value="5 - 15 team members">5 - 15 team members</option>
                        <option value="15 - 50 team members">15 - 50 team members</option>
                        <option value="50+ team members">50+ team members</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Error Display */}
                  {errorMsg && (
                    <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/40 border border-rose-900/60 p-3 rounded-xl">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white hover:bg-neutral-200 text-neutral-950 font-medium py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Screen 2: Confirmation Screen */
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="py-4 flex flex-col"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-2xl text-white tracking-tight mb-4">
                  Application Received.
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-mono mb-8">
                  We review agency infrastructure compatibility and active volume. If your workspace qualifies, you will receive a direct invitation link to book your 30-minute private audit within 12 hours.
                </p>
                <button
                  onClick={handleClose}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-3 rounded-xl transition-all cursor-pointer text-sm border border-neutral-800"
                >
                  Close
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
