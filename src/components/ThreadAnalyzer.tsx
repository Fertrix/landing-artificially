import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Copy, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';

type Verdict = 'out_of_scope' | 'in_scope' | 'unclear';
interface RequestItem { quote: string; summary: string; verdict: Verdict; reason: string; est_hours: number; est_cost: number }
interface Result {
  requests: RequestItem[];
  totals: { out_of_scope_hours: number; out_of_scope_cost: number; unclear_count: number };
  summary: string;
  change_order_email: string;
  currency: string;
}

const EXAMPLE_SCOPE = `Monthly retainer — $4,500/month
- 12 social media posts per month (Instagram + LinkedIn), copy + design
- 1 blog article per month (up to 1,200 words)
- Monthly performance report (PDF)
- Up to 2 rounds of revisions per deliverable`;

const EXAMPLE_THREAD = `Mon — Loved last week's posts! Could you also cut 3 of them into TikTok videos?
Mon — Small thing, can you fix the typo in the "Q3 trends" blog post?
Tue — Our CEO saw Thursday's carousel, can we do one more round of changes? I know it's the 3rd round 🙏
Wed — Quick one: could you write the landing page copy + 3 emails for next month's webinar?
Thu — Could you add a slide comparing us with our 2 main competitors to the report?`;

// Strips obvious identifiers in the browser before anything is sent.
export function anonymize(text: string): string {
  return text
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, '[email]')
    .replace(/https?:\/\/\S+/g, '[link]')
    .replace(/\+?\d[\d\s().-]{7,}\d/g, '[phone]')
    .replace(/@[\w.-]+/g, '@[person]');
}

const verdictStyle: Record<Verdict, { label: string; cls: string }> = {
  out_of_scope: { label: 'Out of scope', cls: 'bg-red-50 text-red-700 border-red-200' },
  unclear: { label: 'Unclear', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
  in_scope: { label: 'In scope', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};

export const ThreadAnalyzer: React.FC<{ rate: number }> = ({ rate }) => {
  const [scope, setScope] = useState('');
  const [thread, setThread] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  const run = async () => {
    setError('');
    setResult(null);
    if (scope.trim().length < 20 || thread.trim().length < 20) {
      setError('Add the agreed scope and a few client messages (or load the example).');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/scope-check', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ scope: anonymize(scope), thread: anonymize(thread), hourlyRate: rate, currency: 'USD' }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data) setError(data?.error || 'Something went wrong. Please try again.');
      else setResult(data);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sorted = result
    ? [...result.requests].sort((a, b) => ['out_of_scope', 'unclear', 'in_scope'].indexOf(a.verdict) - ['out_of_scope', 'unclear', 'in_scope'].indexOf(b.verdict))
    : [];

  const area = 'min-h-[160px] w-full rounded-2xl border border-neutral-200 bg-white/80 p-4 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 resize-y';

  return (
    <div>
      <div className="flex items-start gap-2 rounded-xl bg-emerald-50/70 border border-emerald-100 px-3 py-2.5 text-xs text-emerald-800 mb-4">
        <ShieldCheck className="w-4 h-4 shrink-0 mt-px" />
        <span>Emails, links, phone numbers and @mentions are stripped in your browser before sending. Nothing is stored. The example works without pasting anything real.</span>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <textarea value={scope} onChange={(e) => setScope(e.target.value)} maxLength={6000} placeholder="What you agreed to (deliverables, limits, revision rounds)" className={area} />
        <textarea value={thread} onChange={(e) => setThread(e.target.value)} maxLength={12000} placeholder="What the client has been asking for (Slack / email messages)" className={area} />
      </div>
      <div className="mt-3 flex flex-wrap gap-3 justify-end">
        <button onClick={() => { setScope(EXAMPLE_SCOPE); setThread(EXAMPLE_THREAD); setResult(null); }} className="px-4 py-2.5 rounded-full border border-neutral-200 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
          Load example
        </button>
        <button onClick={run} disabled={loading} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 disabled:opacity-60 transition-colors">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
          {loading ? 'Reading the thread…' : 'Analyze thread'}
        </button>
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
            <div className="flex flex-wrap items-baseline gap-x-3 mb-4">
              <span className="font-display text-3xl font-semibold">${result.totals.out_of_scope_cost.toLocaleString('en-US')}</span>
              <span className="text-sm text-neutral-500">unbilled in this thread · {result.totals.out_of_scope_hours}h</span>
            </div>
            <div className="flex flex-col gap-2.5 mb-6">
              {sorted.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="rounded-2xl border border-neutral-200 bg-white p-4">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${verdictStyle[r.verdict].cls}`}>{verdictStyle[r.verdict].label}</span>
                    <span className="font-medium text-sm">{r.summary}</span>
                    {r.verdict !== 'in_scope' && <span className="ml-auto text-sm font-mono text-neutral-600">~{r.est_hours}h · ${r.est_cost.toLocaleString('en-US')}</span>}
                  </div>
                  <p className="text-sm text-neutral-500">{r.reason}</p>
                </motion.div>
              ))}
            </div>
            {result.change_order_email && (
              <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-200 bg-neutral-50">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">Ready-to-send change order</span>
                  <button
                    onClick={async () => {
                      try { await navigator.clipboard.writeText(result.change_order_email); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* ignore */ }
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-950"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed p-4 text-neutral-800">{result.change_order_email}</pre>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
