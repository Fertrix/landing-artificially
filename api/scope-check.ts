// Free "Scope Check" tool backend.
// Runs as a Vercel Function (Web standard handler) and, in local dev, through the Vite middleware in vite.config.ts.
// Content is processed in memory only and never stored or logged.

type Provider = { name: string; baseUrl: string; apiKey: string; model: string };

const MAX_SCOPE_CHARS = 6000;
const MAX_THREAD_CHARS = 12000;
const RATE_LIMIT_PER_HOUR = 8;
const hits = new Map<string, number[]>(); // best-effort, per warm instance

function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() && !v.includes('PEGA_AQUI') ? v.trim() : undefined;
}

function providers(): Provider[] {
  const list: Provider[] = [];
  const apinex = env('APINEX_API_KEY');
  const gemini = env('GEMINI_API_KEY');
  const apinexP: Provider | null = apinex
    ? { name: 'apinex', baseUrl: env('APINEX_BASE_URL') || 'https://api.apinex.bond/v1', apiKey: apinex, model: env('APINEX_MODEL') || 'free/gemini-3.8-flash' }
    : null;
  const geminiP: Provider | null = gemini
    ? { name: 'gemini', baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai', apiKey: gemini, model: env('GEMINI_MODEL') || 'gemini-2.5-flash' }
    : null;
  const order = (env('LLM_ORDER') || 'apinex,gemini').split(',').map((s) => s.trim());
  for (const name of order) {
    if (name === 'apinex' && apinexP) list.push(apinexP);
    if (name === 'gemini' && geminiP) list.push(geminiP);
  }
  return list;
}

const SYSTEM_PROMPT = `You are an operations analyst for service agencies (marketing, creative, web, dev).
You receive (1) the agreed scope of a client retainer or project and (2) a thread of client messages.
Identify every distinct client REQUEST in the thread and decide if it is inside the agreed scope.

Rules:
- verdict "out_of_scope": clearly not covered by the scope text, or exceeds stated limits (quantities, revisions, channels, deliverables).
- verdict "in_scope": clearly covered.
- verdict "unclear": scope text is ambiguous about it. Explain what is ambiguous.
- Ignore greetings, thanks and pure status updates. Do not invent requests.
- "quote": copy the shortest exact fragment of the client's words that contains the request.
- est_hours: realistic hours a competent agency team would spend (number, can be decimal). Be conservative.
- est_cost = est_hours * hourly_rate, rounded to whole currency units.
- change_order_email: a short, friendly, professional email from the agency to the client listing ONLY the out_of_scope items with hours and cost, offering to proceed once approved, and keeping the relationship warm. No placeholders except [Your name]. Write it in the same language as the client thread.
- summary: one or two sentences for the agency owner.

Return ONLY valid JSON with this exact shape:
{"requests":[{"quote":"","summary":"","verdict":"out_of_scope|in_scope|unclear","reason":"","est_hours":0,"est_cost":0}],
 "totals":{"out_of_scope_hours":0,"out_of_scope_cost":0,"unclear_count":0},
 "summary":"","change_order_email":""}`;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

function extractJson(text: string): any {
  const cleaned = text.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start >= 0 && end > start) return JSON.parse(cleaned.slice(start, end + 1));
    throw new Error('Model did not return JSON');
  }
}

function sanitize(result: any, rate: number) {
  const requests = Array.isArray(result?.requests) ? result.requests : [];
  const clean = requests.slice(0, 30).map((r: any) => {
    const verdict = ['out_of_scope', 'in_scope', 'unclear'].includes(r?.verdict) ? r.verdict : 'unclear';
    const hours = Math.max(0, Math.min(200, Number(r?.est_hours) || 0));
    return {
      quote: String(r?.quote ?? '').slice(0, 400),
      summary: String(r?.summary ?? '').slice(0, 300),
      verdict,
      reason: String(r?.reason ?? '').slice(0, 500),
      est_hours: Math.round(hours * 10) / 10,
      est_cost: Math.round(hours * rate),
    };
  });
  const out = clean.filter((r: any) => r.verdict === 'out_of_scope');
  return {
    requests: clean,
    totals: {
      out_of_scope_hours: Math.round(out.reduce((s: number, r: any) => s + r.est_hours, 0) * 10) / 10,
      out_of_scope_cost: out.reduce((s: number, r: any) => s + r.est_cost, 0),
      unclear_count: clean.filter((r: any) => r.verdict === 'unclear').length,
    },
    summary: String(result?.summary ?? '').slice(0, 600),
    change_order_email: String(result?.change_order_email ?? '').slice(0, 4000),
  };
}

async function callModel(p: Provider, user: string): Promise<any> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45000);
  try {
    const res = await fetch(`${p.baseUrl}/chat/completions`, {
      method: 'POST',
      signal: controller.signal,
      headers: { authorization: `Bearer ${p.apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        model: p.model,
        temperature: 0.2,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: user },
        ],
      }),
    });
    if (!res.ok) throw new Error(`${p.name} HTTP ${res.status}`);
    const data: any = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) throw new Error(`${p.name} empty response`);
    return extractJson(text);
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(request: Request): Promise<Response> {
  const ip = (request.headers.get('x-forwarded-for') || 'local').split(',')[0].trim();
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 3600_000);
  if (recent.length >= RATE_LIMIT_PER_HOUR) {
    return json({ error: 'Too many checks from this connection. Try again in an hour.' }, 429);
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }
  const scope = String(body?.scope ?? '').trim();
  const thread = String(body?.thread ?? '').trim();
  const rate = Math.max(1, Math.min(1000, Number(body?.hourlyRate) || 100));
  const currency = ['USD', 'EUR', 'GBP'].includes(body?.currency) ? body.currency : 'USD';

  if (scope.length < 20 || thread.length < 20) {
    return json({ error: 'Add a bit more detail to both the scope and the client messages.' }, 400);
  }
  if (scope.length > MAX_SCOPE_CHARS || thread.length > MAX_THREAD_CHARS) {
    return json({ error: `Keep the scope under ${MAX_SCOPE_CHARS} and the messages under ${MAX_THREAD_CHARS} characters.` }, 400);
  }

  const list = providers();
  if (list.length === 0) return json({ error: 'The analyzer is not configured yet.' }, 503);

  recent.push(now);
  hits.set(ip, recent);

  const user = `HOURLY RATE: ${rate} ${currency}\n\n=== AGREED SCOPE ===\n${scope}\n\n=== CLIENT MESSAGES ===\n${thread}`;
  for (const p of list) {
    try {
      const raw = await callModel(p, user);
      return json({ ...sanitize(raw, rate), currency });
    } catch (err) {
      console.error(`scope-check provider failed: ${(err as Error).message}`); // no user content logged
    }
  }
  return json({ error: 'The analyzer is busy right now. Please try again in a minute.' }, 502);
}
