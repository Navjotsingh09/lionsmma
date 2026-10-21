'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { clubs, directionsUrl, formatRange, getClub, sortedSessions, type Session } from '@/data/clubs';
import { Field, FormStatus, Honeypot, useEnquiry } from './form';
import { Icon } from './icons';
import { Button, ButtonLink, Check, cx } from './ui';

const WHO = ['My child', 'Me', 'Me and my child'] as const;
type Who = (typeof WHO)[number];
const sessionKey = (s: Session) => `${s.day}-${s.start}`;

function Steps({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2">
      {['Club', 'Class', 'Details'].map((x, i) => (
        <li key={x} className="flex items-center gap-2">
          <span className={cx('grid size-[22px] place-items-center rounded-full text-tiny', i <= current ? 'bg-black text-white' : 'bg-surface text-muted')}>{i + 1}</span>
          <span className={cx('text-small', i <= current ? 'text-ink' : 'text-muted')}>{x}</span>
          {i < 2 && <span className="h-px w-6 bg-line md:w-8" />}
        </li>
      ))}
    </ol>
  );
}

export function BookForm() {
  const params = useSearchParams();
  const [clubSlug, setClubSlug] = useState(getClub(params.get('club') ?? '')?.slug ?? '');
  const club = getClub(clubSlug);
  const sessions = club ? sortedSessions(club) : [];
  const [chosen, setChosen] = useState(params.get('class') ?? '');
  const session = sessions.find((s) => sessionKey(s) === chosen) ?? (sessions.length === 1 ? sessions[0] : undefined);
  const [who, setWho] = useState<Who>('My child');
  const [childName, setChildName] = useState('');
  const { status, error, submit } = useEnquiry('trial');
  const step = !club ? 0 : !session ? 1 : 2;

  if (status === 'sent' && club && session) {
    return (
      <div className="mx-auto flex max-w-[760px] flex-col items-start gap-5 px-5 py-14 md:items-center md:gap-6 md:py-24 md:text-center">
        <span className="grid size-12 place-items-center rounded-full bg-black text-white md:size-14">
          <Icon name="check" size={24} strokeWidth={2.5} />
        </span>
        <h1 className="text-display-m md:text-display">You’re booked in{childName ? `, ${childName}` : ''}</h1>
        <p className="text-body text-muted">
          {session.name}
          {session.detail ? ` · ${session.detail}` : ''} — {session.day} {formatRange(session)} at {club.name}. The club will be in touch to confirm.
        </p>
        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
          <ButtonLink href={directionsUrl(club)} size="l" target="_blank" rel="noreferrer">
            Get directions
          </ButtonLink>
          <ButtonLink href={`/clubs/${club.slug}`} variant="outline" size="l">
            See the club
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-5 pt-6 pb-14 md:px-10 md:pt-6 md:pb-30">
      <div className="md:flex md:justify-center">
        <Steps current={step} />
      </div>
      <div className="flex flex-col gap-10 md:flex-row md:justify-center md:gap-16 md:pt-4">
        <form
          className="relative flex flex-col gap-7 md:w-[600px]"
          onSubmit={(e) => {
            e.preventDefault();
            if (!club || !session) return;
            void submit(e.currentTarget, { club: club.slug, clubName: club.name, class: `${session.name}${session.detail ? ` (${session.detail})` : ''}, ${session.day} ${formatRange(session)}`, whoFor: who });
          }}
        >
          <Honeypot />
          <div className="flex flex-col gap-2.5">
            <p className="text-small text-muted">Step {step + 1} of 3</p>
            <h1 className="text-h1-m md:text-h1">{step === 0 ? 'Choose your club' : step === 1 ? 'Pick your free class' : 'Your details'}</h1>
          </div>

          <div className="flex flex-col gap-2.5">
            <label htmlFor="club" className="text-lead">
              Club
            </label>
            <div className="relative">
              <select
                id="club"
                value={clubSlug}
                onChange={(e) => {
                  setClubSlug(e.target.value);
                  setChosen('');
                }}
                className="w-full appearance-none rounded-xl bg-surface py-3.5 pr-10 pl-4 text-body outline-none focus:ring-2 focus:ring-ink"
                required
              >
                <option value="">Select a club</option>
                {clubs.map((c) => (
                  <option key={c.slug} value={c.slug} disabled={!c.sessions.length}>
                    {c.name}
                    {!c.sessions.length ? ' — timetable coming soon' : ''}
                  </option>
                ))}
              </select>
              <Icon name="chevronRight" size={16} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 rotate-90" />
            </div>
            {club && (
              <p className="text-small text-muted">
                {club.venue}
                {club.venueDetail && ` · ${club.venueDetail}`}, {club.street}
              </p>
            )}
          </div>

          {club && (
            <>
              <fieldset className="flex flex-col gap-2.5">
                <legend className="pb-2.5 text-lead">Who is it for?</legend>
                <div className="flex flex-wrap gap-2">
                  {WHO.map((w) => (
                    <label key={w} className={cx('cursor-pointer rounded-full px-4 py-2 text-small has-focus-visible:outline-2 has-focus-visible:outline-orange', who === w ? 'bg-black text-white' : 'border border-line hover:bg-surface')}>
                      <input type="radio" name="whoFor" value={w} checked={who === w} onChange={() => setWho(w)} className="sr-only" />
                      {w}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="flex flex-col gap-2.5">
                <legend className="pb-2.5 text-lead">Choose a class</legend>
                {sessions.map((s) => {
                  const on = session && sessionKey(s) === sessionKey(session);
                  return (
                    <label key={sessionKey(s)} className={cx('flex cursor-pointer items-center gap-3.5 rounded-xl p-4 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-orange', on ? 'border-[1.5px] border-ink' : 'border border-line hover:bg-surface')}>
                      <input type="radio" name="sessionPick" checked={!!on} onChange={() => setChosen(sessionKey(s))} className="sr-only" />
                      <span className={cx('grid size-5 shrink-0 place-items-center rounded-full', on ? 'bg-black' : 'border border-line')}>{on && <span className="size-2 rounded-full bg-white" />}</span>
                      <span className="flex flex-1 flex-col">
                        <span className="text-body">
                          {s.name}
                          {s.detail ? ` · ${s.detail}` : ''}
                        </span>
                        <span className="text-small text-muted">
                          {s.day} · {formatRange(s)}
                        </span>
                      </span>
                      <span className="text-small">Free</span>
                    </label>
                  );
                })}
              </fieldset>
            </>
          )}

          {club && session && (
            <fieldset className="flex flex-col gap-4">
              <legend className="pb-3.5 text-lead">Your details</legend>
              {who !== 'Me' && (
                <div className="grid gap-4 md:grid-cols-2 md:gap-3">
                  <Field label="Child’s first name" name="childName" value={childName} onChange={(e) => setChildName((e.target as HTMLInputElement).value)} required />
                  <Field label="Child’s age" name="childAge" inputMode="numeric" maxLength={2} required />
                </div>
              )}
              <div className="grid gap-4 md:grid-cols-2 md:gap-3">
                <Field label="Your name" name="name" autoComplete="name" required />
                <Field label="Mobile" name="phone" type="tel" autoComplete="tel" required />
              </div>
              <Field label="Email" name="email" type="email" autoComplete="email" required />
              <Field label="Anything we should know?" name="notes" textarea placeholder="Injuries, health conditions or nerves" required={false} />
              <label className="flex items-start gap-2.5 text-small text-muted">
                <input type="checkbox" required className="mt-0.5 size-[18px] shrink-0 accent-black" />
                {who === 'Me' ? 'I agree to the club’s terms.' : 'I’m the parent or guardian and agree to the club’s terms.'} We’ll ask a few health questions at the class.
              </label>
            </fieldset>
          )}

          <FormStatus status={status} error={error} sent="" />
          <Button type="submit" size="l" full disabled={!club || !session || status === 'sending'}>
            {status === 'sending' ? 'Booking…' : 'Book free class'}
          </Button>
          <p className="text-tiny text-muted">No payment needed. The club will confirm your place.</p>
        </form>

        <aside className="flex flex-col gap-[18px] self-start rounded-2xl bg-surface p-5 md:sticky md:top-6 md:w-[420px] md:p-6">
          <div className="relative aspect-[372/200] overflow-hidden rounded-[10px]">
            <Image src={club?.photo ?? 'https://images.pexels.com/photos/31403621/pexels-photo-31403621.jpeg?auto=compress&cs=tinysrgb&w=1600'} alt="" fill sizes="420px" className="object-cover" />
          </div>
          <p className="text-small text-muted">Your free class</p>
          <p className="text-h4">{session ? `${session.name}${session.detail ? ` · ${session.detail}` : ''}` : club ? 'Choose a class' : 'Choose a club'}</p>
          <ul className="flex flex-col gap-2.5 text-body">
            <li className="flex items-center gap-2.5">
              <Icon name="calendar" size={16} /> {session ? `${session.day} · ${formatRange(session)}` : '—'}
            </li>
            <li className="flex items-center gap-2.5">
              <Icon name="pin" size={16} /> {club ? `${club.name} · ${club.venueDetail ?? club.venue}` : '—'}
            </li>
          </ul>
          <hr className="border-line" />
          <p className="text-small text-muted">What to bring</p>
          <div className="flex flex-col gap-2.5">
            <Check>Comfortable sportswear</Check>
            <Check>A water bottle</Check>
            <Check>Arrive 10 minutes early</Check>
          </div>
          {!club && (
            <Link href="/clubs" className="text-small underline underline-offset-4">
              Not sure which club? See them all
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
}
