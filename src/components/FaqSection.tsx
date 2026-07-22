import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: 'implementation',
    number: '01',
    question: 'How long does implementation take?',
    answer:
      'Full infrastructure deployment takes 2 to 4 weeks. We custom-build and calibrate your dedicated environment to guarantee bank-grade data security with zero developer load on your team.',
  },
  {
    id: 'workflow',
    number: '02',
    question: 'Does my team need to change their daily workflow?',
    answer:
      'No. Our engine hooks directly into the tools you already use (Slack, Toggl, Stripe, Gmail). Your team continues working as they do today without adopting new habits or software.',
  },
  {
    id: 'poc',
    number: '03',
    question: 'How does the 30-day proof of concept work?',
    answer:
      "We deploy the system with zero annual lock-in. You keep 100% of all recovered margin with zero revenue share. If the system doesn't identify at least $2,000 in unbilled leaks during your first 30 days, your second month is completely free until it does.",
  },
];

export const FaqSection: React.FC = () => {
  // Open first item by default for rich layout, allow toggling
  const [openId, setOpenId] = useState<string | null>('implementation');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full">
      {/* Section Divider */}
      <div className="w-full px-6 md:px-12 mt-16 md:mt-24">
        <div className="border-t border-neutral-200 w-full" />
      </div>

      {/* Main FAQ Container */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 mt-12 md:mt-16 text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-4">
          <div>
            <h3 className="font-display text-4xl md:text-5xl font-semibold text-neutral-900 tracking-tight">
              Frequently Asked Questions
            </h3>
          </div>
          <p className="text-neutral-500 text-sm md:text-base font-medium max-w-sm">
            Everything you need to know about implementation, workflows, and our performance guarantee.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col border-t border-neutral-200">
          {faqData.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="border-b border-neutral-200 transition-colors duration-200 hover:bg-neutral-50/60 rounded-xl px-2 md:px-4 my-1"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full py-6 md:py-8 flex items-center justify-between text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 rounded-lg"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 md:gap-8 pr-4">
                    <span className="font-mono text-xs md:text-sm font-semibold text-neutral-400 group-hover:text-neutral-900 transition-colors">
                      {item.number}
                    </span>
                    <h4 className="font-display text-lg md:text-2xl font-semibold text-neutral-900 tracking-tight group-hover:text-neutral-950">
                      {item.question}
                    </h4>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center shrink-0 text-neutral-700 group-hover:border-neutral-900 group-hover:text-neutral-950 transition-colors shadow-xs"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        transition: {
                          height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.25, delay: 0.1 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.15 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 md:pb-8 pl-8 md:pl-16 pr-4 max-w-3xl">
                        <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-medium tracking-tight">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
