'use client';

import { useId, useState, type ComponentProps, type ReactNode } from 'react';
import { EMAIL } from '@/data/clubs';
import { Icon } from './icons';
import { cx } from './ui';

export function Field({ label, textarea, className, ...rest }: { label: string; textarea?: boolean } & ComponentProps<'input'> & ComponentProps<'textarea'>) {
  const id = useId();
  const cls = 'w-full rounded-[10px] border border-line bg-white px-3.5 py-3 text-body outline-none transition-colors placeholder:text-muted focus:border-ink';
  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-small">
        {label}
        {rest.required === false && <span className="text-muted"> (optional)</span>}
      </label>
      {textarea ? <textarea id={id} rows={5} className={cx(cls, 'resize-y')} {...(rest as ComponentProps<'textarea'>)} /> : <input id={id} className={cls} {...(rest as ComponentProps<'input'>)} />}
    </div>
  );
}

export function ChoiceChips({ label, name, options, value, onChange }: { label: string; name: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset className="flex flex-col gap-2.5">
      <legend className="pb-2.5 text-small">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className={cx('cursor-pointer rounded-full px-4 py-2 text-small transition-colors has-focus-visible:outline-2 has-focus-visible:outline-orange', value === o ? 'bg-black text-white' : 'border border-line hover:bg-surface')}>
            <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Hidden field bots fill in and people don't. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
      <label>
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'offline';

export function useEnquiry(kind: 'contact' | 'volunteer' | 'trial') {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  async function submit(form: HTMLFormElement, extra: Record<string, string> = {}) {
    setStatus('sending');
    setError('');
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const { company, ...fields } = data;
    try {
      const res = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind, company, fields: { ...fields, ...extra } }) });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && json.ok) return setStatus('sent');
      if (json.error === 'not-configured' || json.error === 'send-failed') return setStatus('offline');
      setError(json.error ?? 'Something went wrong. Please try again.');
      setStatus('error');
    } catch {
      setStatus('offline');
    }
  }
  return { status, error, submit };
}

export function FormStatus({ status, error, sent }: { status: Status; error: string; sent: ReactNode }) {
  if (status === 'sent')
    return (
      <div role="status" className="flex items-start gap-3 rounded-xl bg-surface p-4 text-body">
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-black text-white">
          <Icon name="check" size={14} strokeWidth={2.5} />
        </span>
        <span>{sent}</span>
      </div>
    );
  if (status === 'error')
    return (
      <p role="alert" className="text-small text-[#b42318]">
        {error}
      </p>
    );
  if (status === 'offline')
    return (
      <p role="alert" className="rounded-xl bg-surface p-4 text-small">
        We couldn’t send that just now. Please email{' '}
        <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">
          {EMAIL}
        </a>{' '}
        and we’ll get back to you.
      </p>
    );
  return null;
}
