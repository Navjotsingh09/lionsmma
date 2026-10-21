'use client';

import { useState } from 'react';
import { EMAIL } from '@/data/clubs';
import { Icon } from './icons';
import { buttonClass, cx } from './ui';

const AMOUNTS = [10, 25, 50, 100, 250];

/**
 * Donation picker. Payments go to the club's donation page (DONATE_URL in Vercel —
 * e.g. a Stripe Payment Link, JustGiving or PayPal page). Until that is set, the
 * button opens an email to the club instead.
 */
export function DonateWidget({ donateUrl }: { donateUrl?: string }) {
  const [monthly, setMonthly] = useState(false);
  const [amount, setAmount] = useState<number | 'other'>(25);
  const [other, setOther] = useState('');
  const value = amount === 'other' ? Number(other) || 0 : amount;
  const label = value ? `Donate £${value}${monthly ? ' a month' : ''}` : 'Donate';
  const href = donateUrl ?? `mailto:${EMAIL}?subject=${encodeURIComponent(`Donation${value ? ` of £${value}${monthly ? ' a month' : ''}` : ''} for #ABetterPunjab`)}`;

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-line p-5 md:p-6">
      <div className="grid grid-cols-2 rounded-full bg-surface p-[3px]" role="group" aria-label="How often">
        {[
          ['Give monthly', true],
          ['Give once', false],
        ].map(([l, m]) => (
          <button key={String(l)} type="button" aria-pressed={monthly === m} onClick={() => setMonthly(m as boolean)} className={cx('rounded-full py-2.5 text-small transition-colors', monthly === m ? 'bg-white shadow-sm' : 'text-muted')}>
            {l}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2" role="group" aria-label="Amount">
        {AMOUNTS.map((a) => (
          <button key={a} type="button" aria-pressed={amount === a} onClick={() => setAmount(a)} className={cx('rounded-xl py-4 text-lead transition-colors', amount === a ? 'bg-black text-white' : 'border border-line hover:bg-surface')}>
            £{a}
          </button>
        ))}
        <button type="button" aria-pressed={amount === 'other'} onClick={() => setAmount('other')} className={cx('rounded-xl py-4 text-lead transition-colors', amount === 'other' ? 'bg-black text-white' : 'border border-line hover:bg-surface')}>
          Other
        </button>
      </div>
      {amount === 'other' && (
        <label className="flex items-center gap-2 rounded-[10px] border border-line px-3.5 py-3 focus-within:border-ink">
          <span className="text-lead">£</span>
          <span className="sr-only">Amount in pounds</span>
          <input inputMode="numeric" value={other} onChange={(e) => setOther(e.target.value.replace(/\D/g, '').slice(0, 5))} placeholder="Enter an amount" className="flex-1 text-lead outline-none" autoFocus />
        </label>
      )}
      <p className="flex items-center gap-2.5 rounded-[10px] bg-surface p-3.5 text-small">
        <Icon name="heart" size={16} /> Any amount helps us achieve our goals.
      </p>
      <a href={href} target={donateUrl ? '_blank' : undefined} rel="noreferrer" className={buttonClass('black', 'l', true)}>
        {label}
      </a>
      <p className="flex items-center gap-1.5 text-tiny text-muted">
        <Icon name="shield" size={13} /> {donateUrl ? 'You’ll finish your donation on our secure payment page.' : `Online giving is being set up — this opens an email to ${EMAIL}.`}
      </p>
    </div>
  );
}
