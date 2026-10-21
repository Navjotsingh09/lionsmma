'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { classTags, clubs, firstSession, type Club, type Discipline, type Group } from '@/data/clubs';
import { ClubMap } from './club-map';
import { Icon } from './icons';
import { ButtonLink, cx, Tag } from './ui';

type Filter = { label: string; group?: Group; discipline?: Discipline };
const FILTERS: Filter[] = [
  { label: 'All classes' },
  { label: 'Kids', group: 'Kids' },
  { label: 'Adults', group: 'Adults' },
  { label: 'Women’s', group: 'Women' },
  { label: 'Muay Thai', discipline: 'Muay Thai' },
  { label: 'Jiu-Jitsu', discipline: 'Jiu-Jitsu' },
  { label: 'Boxing', discipline: 'Boxing' },
  { label: 'MMA', discipline: 'MMA' },
];

function matches(c: Club, q: string, f: Filter) {
  const query = q.trim().toLowerCase().replace(/\s+/g, '');
  if (query) {
    const hay = [c.name, c.town, c.venue, c.postcode].join(' ').toLowerCase();
    const hayNoSpace = hay.replace(/\s+/g, '');
    if (!hayNoSpace.includes(query) && !c.postcode.toLowerCase().replace(/\s/g, '').startsWith(query.slice(0, 2))) return false;
  }
  if (f.group && !c.sessions.some((s) => s.group === f.group)) return false;
  if (f.discipline && !c.sessions.some((s) => s.discipline === f.discipline)) return false;
  return true;
}

function Row({ c, selected }: { c: Club; selected: boolean }) {
  const next = firstSession(c);
  return (
    <Link href={`/clubs/${c.slug}`} className={cx('flex gap-4 rounded-none py-4 transition-colors md:rounded-[10px] md:p-4', selected ? 'md:bg-surface' : 'md:hover:bg-surface')}>
      <div className="relative size-[84px] shrink-0 overflow-hidden rounded-lg md:size-28">
        <Image src={c.photo} alt="" fill sizes="112px" className="object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="text-lead md:text-h4">{c.name}</h3>
        <p className="text-small text-muted">
          {c.venue}
          {c.venueDetail && ` · ${c.venueDetail}`}
        </p>
        <p className="text-tiny text-muted">
          {c.street}, {c.postcode}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1.5">
          {c.sessions.length ? classTags(c).map((t) => <Tag key={t}>{t}</Tag>) : <Tag>Timetable coming soon</Tag>}
        </div>
      </div>
      <div className="hidden flex-col items-end justify-between md:flex">
        <span className="text-tiny text-muted">{next ? `Next: ${next}` : 'Get in touch'}</span>
        <Icon name="chevronRight" size={18} />
      </div>
    </Link>
  );
}

export function ClubFinder() {
  const [q, setQ] = useState('');
  const [f, setF] = useState(0);
  const list = useMemo(() => clubs.filter((c) => matches(c, q, FILTERS[f])), [q, f]);
  const visible = useMemo(() => new Set(list.map((c) => c.slug)), [list]);
  const selected = list[0]?.slug;

  return (
    <>
      <div className="flex flex-col gap-4 px-5 md:flex-row md:items-end md:justify-between md:px-10">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2.5 rounded-full border border-line py-1.5 pr-1.5 pl-4 md:order-2 md:w-[460px]">
          <Icon name="search" size={18} className="text-muted" />
          <label htmlFor="club-search" className="sr-only">
            Search by town or postcode
          </label>
          <input
            id="club-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Town or postcode"
            className="min-w-0 flex-1 bg-transparent text-small outline-none placeholder:text-muted md:text-body"
          />
          <button type="submit" className="rounded-full bg-black px-5 py-2.5 text-small text-white">
            Search
          </button>
        </form>
      </div>
      <div className="flex gap-2 overflow-x-auto px-5 pt-4 scrollbar-none md:px-10 md:pt-6" role="group" aria-label="Filter classes">
        {FILTERS.map((x, i) => (
          <button
            key={x.label}
            type="button"
            onClick={() => setF(i)}
            aria-pressed={i === f}
            className={cx('shrink-0 rounded-full px-3.5 py-[7px] text-small transition-colors', i === f ? 'bg-black text-white' : 'border border-line hover:bg-surface')}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 pt-4 md:flex-row md:gap-10 md:px-10 md:pt-8">
        <div className="px-5 md:hidden">
          <ClubMap selected={selected} visible={visible} labels={false} className="h-[300px]" />
        </div>
        <div className="flex flex-col px-5 md:w-[620px] md:shrink-0 md:px-0">
          <p className="text-small text-muted" aria-live="polite">
            {list.length} {list.length === 1 ? 'club' : 'clubs'}
          </p>
          <ul className="divide-y divide-line md:divide-y-0">
            {list.map((c) => (
              <li key={c.slug}>
                <Row c={c} selected={c.slug === selected} />
              </li>
            ))}
          </ul>
          {!list.length && (
            <div className="flex flex-col items-start gap-3 py-10">
              <p className="text-body">No clubs match that search.</p>
              <button type="button" onClick={() => (setQ(''), setF(0))} className="text-small underline underline-offset-4">
                Show all clubs
              </button>
            </div>
          )}
        </div>
        <div className="sticky top-6 hidden h-[860px] flex-1 md:block">
          <ClubMap selected={selected} visible={visible} className="h-full" />
          {list[0] && (
            <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-[0_8px_24px_rgba(0,0,0,.12)]">
              <div className="relative size-16 overflow-hidden rounded-md">
                <Image src={list[0].photo} alt="" fill sizes="64px" className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-lead">{list[0].name}</span>
                <span className="text-tiny text-muted">
                  {list[0].street}, {list[0].postcode}
                </span>
                <span className="text-tiny text-muted">{list[0].sessions.length ? `${list[0].sessions.length} ${list[0].sessions.length === 1 ? 'class' : 'classes'} a week` : 'Timetable coming soon'}</span>
              </div>
              <ButtonLink href={`/clubs/${list[0].slug}`} className="ml-2">
                View club
              </ButtonLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
