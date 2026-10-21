import { clubs } from '@/data/clubs';
import { ENQUIRIES_TO, mailConfigured, sendMail } from '@/lib/mail';

type Kind = 'contact' | 'volunteer' | 'trial';
const LABEL: Record<Kind, string> = { contact: 'Website enquiry', volunteer: 'Volunteer offer', trial: 'Free class booking' };

const clean = (v: unknown, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot: real people never fill this in.
  if (clean(body.company)) return Response.json({ ok: true });

  const kind = (['contact', 'volunteer', 'trial'] as const).find((k) => k === body.kind);
  if (!kind) return Response.json({ ok: false, error: 'Unknown form' }, { status: 400 });

  const fields = Object.fromEntries(Object.entries(body.fields ?? {}).map(([k, v]) => [k, clean(v)]));
  const email = fields.email ?? '';
  const missing = ['name', 'email', 'phone'].filter((k) => !fields[k]);
  if (missing.length || !isEmail(email)) {
    return Response.json({ ok: false, error: 'Please fill in your name, a valid email and your phone number.' }, { status: 422 });
  }

  if (!mailConfigured()) {
    return Response.json({ ok: false, error: 'not-configured' }, { status: 503 });
  }

  const club = kind === 'trial' ? clubs.find((c) => c.slug === fields.club) : undefined;
  const subject = `${LABEL[kind]}${club ? ` — ${club.name}` : ''}: ${fields.name}`;
  const text = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k[0].toUpperCase()}${k.slice(1)}: ${v}`)
    .join('\n');

  try {
    await sendMail({ to: ENQUIRIES_TO, subject, text, replyTo: email });
    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return Response.json({ ok: false, error: 'send-failed' }, { status: 502 });
  }
}
