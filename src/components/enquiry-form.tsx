'use client';

import { useState } from 'react';
import { ChoiceChips, Field, FormStatus, Honeypot, useEnquiry } from './form';
import { Button } from './ui';

const ROLES = ['Fundraising', 'Coaching', 'Social work', 'Teaching', 'Events', 'Something else'];

export function EnquiryForm({ kind }: { kind: 'contact' | 'volunteer' }) {
  const { status, error, submit } = useEnquiry(kind);
  const [role, setRole] = useState(ROLES[0]);

  if (status === 'sent') {
    return <FormStatus status={status} error={error} sent={kind === 'volunteer' ? 'Thank you for offering to help. We’ll be in touch soon.' : 'Thanks — your message is on its way. We’ll reply within a few days.'} />;
  }

  return (
    <form
      className="relative flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        void submit(e.currentTarget, kind === 'volunteer' ? { helpWith: role } : {});
      }}
    >
      <Honeypot />
      <div className="grid gap-4 md:grid-cols-2 md:gap-3">
        <Field label="First name" name="name" autoComplete="given-name" required />
        <Field label="Last name" name="lastName" autoComplete="family-name" required />
        <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" placeholder="07…" required />
      </div>
      {kind === 'volunteer' ? (
        <ChoiceChips label="How would you like to help?" name="helpWith" options={ROLES} value={role} onChange={setRole} />
      ) : (
        <Field label="Subject" name="subject" placeholder="What’s it about?" required />
      )}
      <Field label="Message" name="message" textarea placeholder={kind === 'volunteer' ? 'Tell us a little about yourself' : 'How can we help?'} required />
      <FormStatus status={status} error={error} sent="" />
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <Button type="submit" size="l" disabled={status === 'sending'} className="md:self-start">
          {status === 'sending' ? 'Sending…' : 'Send'}
        </Button>
        <p className="text-tiny text-muted">We’ll reply within a few days. We never share your details.</p>
      </div>
    </form>
  );
}
