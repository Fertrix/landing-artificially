import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Loader2, Lock, MessageSquare, Mail, Phone, KanbanSquare, Smartphone, Sparkles, Timer, Zap } from 'lucide-react';
import { Logo } from '../components/Logo';
import { Footer } from '../components/Footer';
import { MarginAuditModal } from '../components/MarginAuditModal';
import { ThreadAnalyzer } from '../components/ThreadAnalyzer';
import TextType from '../components/TextType';
import GlassSurface from '../components/GlassSurface';
import { computeLeak, REQUESTS_PER_MONTH, HOURS_PER_REQUEST, UNBILLED_SHARE, type LeakInputs, type Channel } from '../lib/leakModel';

interface ScopeCheckProps {
  onNavigate: (path: string) => void;
}

type Stage = 'intro' | 'quiz' | 'result';

const DEFAULTS: LeakInputs = {
  clients: 12,
  retainer: 5000,
  rate: 120,
  frequency: 'weekly',
  duration: '30m',
  billing: 'some',
  sow: 'partial',
  channels: ['slack', 'email'],
};

type Option<T extends string> = { value: T; label: string; hint?: string };
type Step =
  | { kind: 'slider'; key: 'clients' | 'retainer' | 'rate'; title: string; sub: string; min: number; max: number; step: number; format: (n: number) => string }
  | { kind: 'choice'; key: 'frequency' | 'duration' | 'billing' | 'sow'; title: string; sub: string; options: Option<string>[] }
  | { kind: 'multi'; key: 'channels'; title: string; sub: string; options: (Option<Channel> & { icon: React.ElementType })[] };

const money = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;

const STEPS: Step[] = [
  { kind: 'slider', key: 'clients', title: 'How many active retainer clients do you have?', sub: 'Roughly is fine.', min: 1, max: 60, step: 1, format: (n) => `${n} client${n === 1 ? '' : 's'}` },
  { kind: 'slider', key: 'retainer', title: 'What does an average client pay per month?', sub: 'Average monthly retainer.', min: 1000, max: 30000, step: 500, format: money },
  { kind: 'slider', key: 'rate', title: 'What is your blended hourly rate?', sub: 'What an hour of your team costs a client.', min: 40, max: 300, step: 5, format: (n) => `${money(n)}/h` },
  {
    kind: 'choice', key: 'frequency', title: 'How often does a client ask for a “quick” extra?', sub: '“Can you just…?” — anything outside the contract.', options: [
      { value: 'rarely', label: 'Rarely', hint: 'About once a month' },
      { value: 'weekly', label: 'Weekly', hint: 'A few per month' },
      { value: 'several', label: 'Several times a week', hint: 'It never really stops' },
      { value: 'daily', label: 'Daily', hint: 'It is basically part of the job' },
    ],
  },
  {
    kind: 'choice', key: 'duration', title: 'How long does a “5-minute” request really take?', sub: 'Including the back-and-forth.', options: [
      { value: '15m', label: '~15 minutes' },
      { value: '30m', label: '~30 minutes' },
      { value: '1h', label: '~1 hour' },
      { value: '2h', label: '2 hours or more' },
    ],
  },
  {
    kind: 'choice', key: 'billing', title: 'What usually happens to those extras?', sub: 'Be honest — nobody is watching.', options: [
      { value: 'most', label: 'We bill almost all of them' },
      { value: 'some', label: 'We bill some of them' },
      { value: 'rarely', label: 'We rarely bill them' },
      { value: 'never', label: 'We just do them' },
    ],
  },
  {
    kind: 'choice', key: 'sow', title: 'Do your contracts set hard limits?', sub: 'Like “12 posts, 2 revision rounds”.', options: [
      { value: 'clear', label: 'Yes, clearly defined' },
      { value: 'partial', label: 'Partially' },
      { value: 'none', label: 'Not really' },
    ],
  },
  {
    kind: 'multi', key: 'channels', title: 'Where do client requests reach your team?', sub: 'Select all that apply.', options: [
      { value: 'slack', label: 'Slack / Teams', icon: MessageSquare },
      { value: 'email', label: 'Email', icon: Mail },
      { value: 'calls', label: 'Calls / meetings', icon: Phone },
      { value: 'pm', label: 'Project tool', icon: KanbanSquare },
      { value: 'text', label: 'WhatsApp / text', icon: Smartphone },
    ],
  },
];

function useCountUp(target: number, run: boolean, duration = 1400, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const timer = setTimeout(() => {
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        setValue(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, run, duration, delay]);
  return value;
}

const Gauge: React.FC<{ score: number; band: string; run: boolean }> = ({ score, band, run }) => {
  const r = 70;
  const c = Math.PI * r;
  const color = score < 30 ? '#10b981' : score < 55 ? '#f59e0b' : score < 75 ? '#f97316' : '#ef4444';
  const shown = useCountUp(score, run, 1200, 200);
  return (
    <div className="relative w-[180px] h-[104px]">
      <svg viewBox="0 0 180 100" className="w-full h-full overflow-visible">
        <path d="M 20 90 A 70 70 0 0 1 160 90" fill="none" stroke="#f1f1f1" strokeWidth="14" strokeLinecap="round" />
        <motion.path
          d="M 20 90 A 70 70 0 0 1 160 90"
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: run ? c * (1 - score / 100) : c }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <div className="font-display text-3xl font-semibold leading-none">{Math.round(shown)}</div>
        <div className="text-[11px] font-mono uppercase tracking-wider mt-1" style={{ color }}>{band} exposure</div>
      </div>
    </div>
  );
};

export const ScopeCheck: React.FC<ScopeCheckProps> = ({ onNavigate }) => {
  const [stage, setStage] = useState<Stage>('intro');
  const [heroDone, setHeroDone] = useState(false);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [inputs, setInputs] = useState<LeakInputs>(DEFAULTS);
  const [showPilot, setShowPilot] = useState(false);
  const [showDeeper, setShowDeeper] = useState(false);
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [showMath, setShowMath] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  const result = useMemo(() => computeLeak(inputs), [inputs]);
  const monthlyShown = useCountUp(result.monthly, stage === 'result');
  const yearlyShown = useCountUp(result.yearly, stage === 'result', 1800);

  useEffect(() => {
    const previous = document.title;
    document.title = 'Scope Creep Calculator for Agencies — Free 60-Second Check';
    window.scrollTo(0, 0);
    return () => {
      document.title = previous;
    };
  }, []);

  const current = STEPS[step];

  const go = (delta: number) => {
    setDir(delta);
    const next = step + delta;
    if (next < 0) return setStage('intro');
    if (next >= STEPS.length) {
      setStage('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setStep(next);
  };

  const choose = (key: string, value: string) => {
    setInputs((p) => ({ ...p, [key]: value }));
    setTimeout(() => go(1), 260);
  };

  // Keyboard: 1-5 picks options, Enter continues.
  useEffect(() => {
    if (stage !== 'quiz') return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
      if (e.key === 'Enter') go(1);
      const n = Number(e.key);
      if (current.kind !== 'slider' && n >= 1 && n <= current.options.length) {
        const opt = current.options[n - 1];
        if (current.kind === 'choice') choose(current.key, opt.value);
        else toggleChannel(opt.value as Channel);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const toggleChannel = (c: Channel) =>
    setInputs((p) => ({ ...p, channels: p.channels.includes(c) ? p.channels.filter((x) => x !== c) : [...p.channels, c] }));

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    const clean = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return setEmailError('Enter a valid work email.');
    setSending(true);
    try {
      const res = await fetch('https://formspree.io/f/mdabppjp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: clean,
          source: 'scope-leak-check',
          website: website.trim().slice(0, 200),
          estimatedMonthlyLeak: result.monthly,
          exposureScore: result.score,
          clients: inputs.clients,
          avgRetainer: inputs.retainer,
          hourlyRate: inputs.rate,
          frequency: inputs.frequency,
          billing: inputs.billing,
          sow: inputs.sow,
          channels: inputs.channels.join(', '),
          _gotcha: '',
        }),
      });
      if (res.ok) setSent(true);
      else setEmailError('Could not send right now. Please try again.');
    } catch {
      setEmailError('Network error. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const slide = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60, filter: 'blur(6px)' }),
    center: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60, filter: 'blur(6px)' }),
  };

  return (
    <div className="relative w-full min-h-screen bg-white text-neutral-900 flex flex-col font-sans overflow-x-hidden">
      <div aria-hidden className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.04),transparent)]" />
      </div>

      <header className="relative z-20 w-full max-w-5xl mx-auto px-4 md:px-6 pt-5 flex items-center justify-between">
        <button onClick={() => onNavigate('/')} className="inline-flex items-center bg-white/90 backdrop-blur-md border border-neutral-200/80 px-4 py-2 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-md hover:scale-[1.02] transition-all">
          <Logo variant="light" />
        </button>
        <button onClick={() => onNavigate('/')} className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-neutral-600 hover:text-neutral-950 bg-white/90 backdrop-blur-md border border-neutral-200/80 px-4 py-2 rounded-full hover:shadow-md hover:scale-[1.02] transition-all">
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>
      </header>

      <main className="relative z-10 flex-1 w-full max-w-3xl mx-auto px-4 md:px-6">
        <AnimatePresence mode="wait">
          {stage === 'intro' && (
            <motion.section key="intro" exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }} transition={{ duration: 0.35 }} className="min-h-[78vh] flex flex-col items-center justify-center text-center py-12">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-neutral-900 text-neutral-200 px-3.5 py-1.5 rounded-full text-xs font-mono mb-6">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>FREE · 60 SECONDS · NO CLIENT DATA</span>
              </motion.div>
              <TextType
                as="h1"
                text={'How much free work\nis your agency doing?'}
                typingSpeed={40}
                showCursor={true}
                loop={false}
                cursorCharacter="|"
                onComplete={() => setHeroDone(true)}
                cursorClassName="text-neutral-900 font-extralight"
                className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] whitespace-pre-line min-h-[2.2em]"
              />
              <motion.div initial={{ opacity: 0, y: 14 }} animate={heroDone ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="w-full max-w-xl mt-6">
                <GlassSurface borderRadius={16} borderWidth={0.03} brightness={100} opacity={0.9} blur={10} backgroundOpacity={0.85} className="w-full" style={{ padding: '0.85rem 1.5rem' }}>
                  <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-medium tracking-tight">
                    8 quick questions. See what free work is really costing you.
                  </p>
                </GlassSurface>
              </motion.div>
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={heroDone ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.15 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setStage('quiz'); setStep(0); setDir(1); }}
                disabled={!heroDone}
                className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-neutral-900 text-white text-sm md:text-base font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
              >
                Start the check <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.p initial={{ opacity: 0 }} animate={heroDone ? { opacity: 1 } : {}} transition={{ delay: 0.35 }} className="mt-4 flex items-center gap-1.5 text-xs text-neutral-400">
                <Lock className="w-3 h-3" /> Runs in your browser. No signup required.
              </motion.p>
            </motion.section>
          )}

          {stage === 'quiz' && (
            <motion.section key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }} className="min-h-[78vh] flex flex-col justify-center py-10">
              <div className="mb-8">
                <div className="flex justify-between text-xs font-mono text-neutral-400 mb-2">
                  <span>QUESTION {step + 1} / {STEPS.length}</span>
                  <span className="hidden sm:inline">Live estimate: <span className="text-neutral-900">{money(result.monthly)}/mo</span></span>
                </div>
                <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-neutral-900 rounded-full" animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
                </div>
              </div>

              <div className="relative">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div key={step} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
                    <div className="rounded-3xl bg-white/85 backdrop-blur-xl border border-neutral-200/80 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-6 md:p-10">
                      <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-2">{current.title}</h2>
                      <p className="text-neutral-500 text-sm md:text-base mb-8">{current.sub}</p>

                      {current.kind === 'slider' && (
                        <div>
                          <motion.div key={inputs[current.key]} initial={{ scale: 0.96, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }} className="font-display text-5xl md:text-6xl font-semibold tracking-tight mb-6">
                            {current.format(inputs[current.key])}
                          </motion.div>
                          <input
                            type="range"
                            min={current.min}
                            max={current.max}
                            step={current.step}
                            value={inputs[current.key]}
                            onChange={(e) => setInputs((p) => ({ ...p, [current.key]: Number(e.target.value) }))}
                            className="w-full accent-neutral-900 h-2 cursor-pointer"
                          />
                          <div className="flex justify-between text-xs font-mono text-neutral-400 mt-2">
                            <span>{current.format(current.min)}</span>
                            <span>{current.format(current.max)}{current.key !== 'rate' ? '+' : ''}</span>
                          </div>
                        </div>
                      )}

                      {current.kind === 'choice' && (
                        <div className="grid gap-2.5">
                          {current.options.map((o, i) => {
                            const active = inputs[current.key] === o.value;
                            return (
                              <motion.button
                                key={o.value}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 * i }}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => choose(current.key, o.value)}
                                className={`group flex items-center gap-4 text-left rounded-2xl border px-4 py-3.5 transition-colors ${active ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 bg-white hover:border-neutral-400'}`}
                              >
                                <span className={`hidden sm:flex w-7 h-7 shrink-0 items-center justify-center rounded-lg text-xs font-mono border ${active ? 'border-white/30 text-white' : 'border-neutral-200 text-neutral-400'}`}>{i + 1}</span>
                                <span className="flex-1">
                                  <span className="block font-medium">{o.label}</span>
                                  {o.hint && <span className={`block text-xs ${active ? 'text-neutral-300' : 'text-neutral-400'}`}>{o.hint}</span>}
                                </span>
                                {active && <Check className="w-4 h-4" />}
                              </motion.button>
                            );
                          })}
                        </div>
                      )}

                      {current.kind === 'multi' && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {current.options.map((o, i) => {
                            const active = inputs.channels.includes(o.value);
                            const Icon = o.icon;
                            return (
                              <motion.button
                                key={o.value}
                                initial={{ opacity: 0, scale: 0.94 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.05 * i }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => toggleChannel(o.value)}
                                className={`flex flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${active ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 bg-white hover:border-neutral-400'}`}
                              >
                                <Icon className="w-5 h-5" />
                                <span className="text-sm font-medium">{o.label}</span>
                              </motion.button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button onClick={() => go(-1)} className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => go(1)} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white text-sm font-semibold">
                  {step === STEPS.length - 1 ? 'See my results' : 'Continue'} <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.section>
          )}

          {stage === 'result' && (
            <motion.section key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="py-12 md:py-16">
              <div className="text-center mb-10">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">Estimated unbilled work</div>
                <div className="font-display text-6xl md:text-8xl font-semibold tracking-tight">
                  {money(monthlyShown)}
                  <span className="text-2xl md:text-3xl text-neutral-400 font-normal">/mo</span>
                </div>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-3 text-neutral-500">
                  That is <span className="text-neutral-900 font-semibold">{money(yearlyShown)} a year</span>, about {result.pctOfRevenue}% of your retainer revenue
                  {result.hoursPerMonth > 0 ? ` and ~${result.hoursPerMonth} hours of your team every month` : ''}.
                </motion.p>
              </div>

              <div className="text-center -mt-6 mb-8">
                <button onClick={() => setShowMath((v) => !v)} className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 transition-colors">
                  How we calculate this
                  <motion.span animate={{ rotate: showMath ? 180 : 0 }}><ChevronDown className="w-3.5 h-3.5" /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {showMath && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="mx-auto mt-3 max-w-xl rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 text-left text-xs text-neutral-600 leading-relaxed font-mono">
                        {inputs.clients} clients × {REQUESTS_PER_MONTH[inputs.frequency]} extra requests/month × {HOURS_PER_REQUEST[inputs.duration]}h each × {Math.round(UNBILLED_SHARE[inputs.billing] * 100)}% left unbilled × {money(inputs.rate)}/h
                        {result.capped ? ' → capped at 35% of retainer revenue' : ''} = <span className="text-neutral-900 font-semibold">{money(result.monthly)}/month</span>
                        <p className="font-sans mt-2 text-neutral-500">A conservative estimate based on your answers. Your real number depends on how each account behaves — that is what the pilot measures.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-3xl bg-white/85 backdrop-blur-xl border border-neutral-200/80 shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-6 flex flex-col items-center justify-center">
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">Scope leak exposure</div>
                  <Gauge score={result.score} band={result.band} run={true} />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-3xl bg-white/85 backdrop-blur-xl border border-neutral-200/80 shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-6">
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">How agencies compare</div>
                  {[
                    { label: 'lose $1k–$5k / month', pct: 57 },
                    { label: 'lose more than $5k / month', pct: 30 },
                    { label: 'bill all out-of-scope work', pct: 1 },
                  ].map((b, i) => (
                    <div key={b.label} className="mb-3.5">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-neutral-600">{b.label}</span>
                        <span className="font-mono font-medium">{b.pct}%</span>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-neutral-900 rounded-full" initial={{ width: 0 }} animate={{ width: `${Math.max(b.pct, 1.5)}%` }} transition={{ delay: 0.5 + i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />
                      </div>
                    </div>
                  ))}
                  <p className="text-[11px] text-neutral-400 mt-2">Source: Ignition 2025 Agency Pricing & Cash Flow Report, 273 US agency leaders.</p>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-3xl bg-white/85 backdrop-blur-xl border border-neutral-200/80 shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-6 md:p-8 mb-4">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-5">Your 3 highest-impact fixes</div>
                <div className="grid gap-4">
                  {result.fixes.map((f, i) => (
                    <motion.div key={f.title} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.12 }} className="flex gap-4">
                      <span className="flex w-8 h-8 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-white text-sm font-mono">{i + 1}</span>
                      <div>
                        <div className="font-semibold mb-0.5">{f.title}</div>
                        <p className="text-sm text-neutral-500 leading-relaxed">{f.body}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="rounded-3xl bg-neutral-900 text-white p-6 md:p-10 mb-4 overflow-hidden relative">
                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
                <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-2 relative">Want to know where it actually leaks?</h2>
                <p className="text-neutral-400 mb-6 relative max-w-xl">
                  We connect to your Slack and inbox, flag every out-of-scope request the day it happens and draft the change order. You approve everything — nothing is sent automatically.
                </p>
                <div className="relative">
                  {!sent ? (
                    <form onSubmit={submitEmail} className="flex flex-col gap-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@agency.com" className="w-full rounded-full bg-white/10 border border-white/15 px-5 py-3 text-sm placeholder:text-neutral-500 focus:outline-none focus:border-white/40" />
                        <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="agency.com (optional)" className="w-full rounded-full bg-white/10 border border-white/15 px-5 py-3 text-sm placeholder:text-neutral-500 focus:outline-none focus:border-white/40" />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <button disabled={sending} className="inline-flex flex-1 items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-neutral-900 text-sm font-semibold hover:bg-neutral-100 disabled:opacity-60 transition-colors">
                          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                          Send me my report
                        </button>
                        <button type="button" onClick={() => setShowPilot(true)} className="inline-flex flex-1 items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/20 text-sm font-medium hover:bg-white/10 transition-colors">
                          <Timer className="w-4 h-4" /> Run a pilot on my agency
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-5 py-3 text-sm text-emerald-300">
                        <Check className="w-4 h-4" /> Got it. Your report is on its way within 24h.
                      </motion.div>
                      <button type="button" onClick={() => setShowPilot(true)} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/20 text-sm font-medium hover:bg-white/10 transition-colors">
                        <Timer className="w-4 h-4" /> Run a pilot on my agency
                      </button>
                    </div>
                  )}
                </div>
                {emailError && <p className="text-red-300 text-xs mt-2 relative">{emailError}</p>}
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="rounded-3xl bg-white/85 backdrop-blur-xl border border-neutral-200/80 p-5 md:p-6">
                <button onClick={() => setShowDeeper((v) => !v)} className="w-full flex items-center justify-between text-left">
                  <span>
                    <span className="block font-semibold">Go deeper: check one real client thread</span>
                    <span className="block text-sm text-neutral-500">Optional. AI flags every out-of-scope request and writes the change order.</span>
                  </span>
                  <motion.span animate={{ rotate: showDeeper ? 180 : 0 }}>
                    <ChevronDown className="w-5 h-5 text-neutral-400" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {showDeeper && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="pt-5">
                        <ThreadAnalyzer rate={inputs.rate} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="text-center mt-8">
                <button onClick={() => { setStage('quiz'); setStep(0); setDir(-1); }} className="text-sm text-neutral-500 hover:text-neutral-900 underline underline-offset-4">
                  Change my answers
                </button>
                {result.capped && <p className="text-[11px] text-neutral-400 mt-3">Estimate capped at 35% of retainer revenue to stay conservative.</p>}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <div className="relative z-10">
        <Footer onNavigate={onNavigate} />
      </div>
      <MarginAuditModal isOpen={showPilot} onClose={() => setShowPilot(false)} />
    </div>
  );
};
