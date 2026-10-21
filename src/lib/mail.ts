// Sends website enquiries by email through Resend (https://resend.com).
// Set RESEND_API_KEY and ENQUIRIES_FROM in Vercel to switch it on.
// Until then the forms tell visitors to email the club directly.

export const ENQUIRIES_TO = process.env.ENQUIRIES_TO ?? 'info@lionsmma.net';

export function mailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.ENQUIRIES_FROM);
}

export async function sendMail({ to, subject, text, replyTo }: { to: string; subject: string; text: string; replyTo?: string }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.ENQUIRIES_FROM, to: [to], subject, text, reply_to: replyTo }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}
