// Rule-based Scope Leak estimate. No AI, no data leaves the browser until the user opts in.

export type Frequency = 'rarely' | 'weekly' | 'several' | 'daily';
export type Duration = '15m' | '30m' | '1h' | '2h';
export type Billing = 'most' | 'some' | 'rarely' | 'never';
export type SowClarity = 'clear' | 'partial' | 'none';
export type Channel = 'slack' | 'email' | 'calls' | 'pm' | 'text';

export interface LeakInputs {
  clients: number;
  retainer: number;
  rate: number;
  frequency: Frequency;
  duration: Duration;
  billing: Billing;
  sow: SowClarity;
  channels: Channel[];
}

export const REQUESTS_PER_MONTH: Record<Frequency, number> = { rarely: 1, weekly: 4, several: 10, daily: 20 };
export const HOURS_PER_REQUEST: Record<Duration, number> = { '15m': 0.25, '30m': 0.5, '1h': 1, '2h': 2 };
export const UNBILLED_SHARE: Record<Billing, number> = { most: 0.2, some: 0.6, rarely: 0.9, never: 1 };

export interface LeakResult {
  monthly: number;
  yearly: number;
  hoursPerMonth: number;
  pctOfRevenue: number;
  score: number; // 0-100, higher = more exposed
  band: 'Low' | 'Moderate' | 'High' | 'Critical';
  capped: boolean;
  fixes: { title: string; body: string }[];
}

export function computeLeak(i: LeakInputs): LeakResult {
  const revenue = i.clients * i.retainer;
  const hours = i.clients * REQUESTS_PER_MONTH[i.frequency] * HOURS_PER_REQUEST[i.duration] * UNBILLED_SHARE[i.billing];
  let monthly = hours * i.rate;
  // Keep the estimate believable: cap at 35% of retainer revenue.
  const cap = revenue * 0.35;
  const capped = monthly > cap;
  if (capped) monthly = cap;
  monthly = Math.round(monthly / 10) * 10;

  const pct = revenue > 0 ? (monthly / revenue) * 100 : 0;

  let score = 0;
  score += { most: 5, some: 20, rarely: 32, never: 40 }[i.billing];
  score += { rarely: 3, weekly: 12, several: 20, daily: 25 }[i.frequency];
  score += { clear: 0, partial: 10, none: 20 }[i.sow];
  score += Math.min(15, Math.max(0, i.channels.length - 1) * 5);
  score = Math.max(4, Math.min(98, score));
  const band = score < 30 ? 'Low' : score < 55 ? 'Moderate' : score < 75 ? 'High' : 'Critical';

  const fixes: { title: string; body: string }[] = [];
  if (i.sow !== 'clear')
    fixes.push({
      title: 'Put hard limits in every SOW',
      body: 'Numbers, not vibes: "12 posts, 2 revision rounds". Vague scope is where free work starts.',
    });
  if (i.billing !== 'most')
    fixes.push({
      title: 'Price it the moment it is asked',
      body: 'Reply with hours and cost before starting. Same-day change orders get approved.',
    });
  if (i.channels.length > 1)
    fixes.push({
      title: i.channels.length === 2 ? 'Watch both channels, not just one' : `Watch all ${i.channels.length} channels, not just one`,
      body: 'Extras hide in DMs, emails and calls — places nobody logs.',
    });
  if (i.frequency === 'several' || i.frequency === 'daily')
    fixes.push({
      title: 'Set a "quick request" budget per client',
      body: 'A small monthly bucket of hours. Once it is used, extras are billed.',
    });
  if (fixes.length < 3)
    fixes.push({
      title: 'Review the top 3 accounts weekly',
      body: 'Delivered vs. paid, every Friday. Leaks hide in a few accounts.',
    });

  return { monthly, yearly: monthly * 12, hoursPerMonth: Math.round(hours), pctOfRevenue: Math.round(pct * 10) / 10, score, band, capped, fixes: fixes.slice(0, 3) };
}
